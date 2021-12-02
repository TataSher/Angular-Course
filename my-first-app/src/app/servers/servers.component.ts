import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent {
  allowNewServer = false;
  usernameFilled = false;
  serverCreationStatus = "No server was created";
  serverName = "";
  username = "";
  serverCreated = false;
  servers = ['Test Server', 'Test Server2'];
  showSecret = false;
  log = [];

  constructor() {
     setTimeout(() => {
       this.allowNewServer = true
     }, 2000);
  }

  ngOnInit() {

  }
  
  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Server Name is ' + this.serverName
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

   ResetUsername() {
     this.username = ""
  }

  onToggleDisplay() {
    this.showSecret = !this.showSecret
    // this.log.push(this.log.length + 1)
    this.log.push(new Date())
  }

}
