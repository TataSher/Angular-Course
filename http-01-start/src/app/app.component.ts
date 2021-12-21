import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error = null
  private errorSub: Subscription;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.error.subscribe(errorMessage => {
       this.error = errorMessage
     });
     this.fetchPostsHelper();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
   this.fetchPostsHelper();
  
  }

  onClearPosts() {
    this.postsService.clearPosts()
        .subscribe(() => {
              this.loadedPosts=[];
            });
  }

  private fetchPostsHelper(){
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, error => {
        this.isFetching=false;
        console.log(error)
        this.error = error.message;
      });
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy() {
      this.errorSub.unsubscribe()
  }

}
