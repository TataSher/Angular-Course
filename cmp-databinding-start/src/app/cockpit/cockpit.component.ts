import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(): void {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
     })
  };

  onAddBlueprint(): void {
      this.blueprintCreated.emit({
        serverName: this.newServerName,
        serverContent: this.newServerContent
     })
  };

  onAddShmoo(): void {
    this.shmooCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }

    onAddWabaDaba(): void {
    this.wabaDabaCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }
  
}
