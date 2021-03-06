import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})

export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() shmooCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() wabaDabaCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement): void {

    this.serverCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
     })
  };

  onAddBlueprint(nameInput: HTMLInputElement): void {
      this.blueprintCreated.emit({
        serverName: nameInput.value,
        serverContent: this.serverContentInput.nativeElement.value
     })
  };

  onAddShmoo(nameInput: HTMLInputElement): void {
    this.shmooCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    })
  }

    onAddWabaDaba(nameInput: HTMLInputElement): void {
    this.wabaDabaCreated.emit({
      serverName: nameInput.value,
      serverContent: this.serverContentInput.nativeElement.value
    })
  }
  
}
