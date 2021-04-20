import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-show-message-container',
  templateUrl: './show-message-container.component.html',
  styleUrls: ['./show-message-container.component.scss']
})
export class ShowMessageContainerComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

}
