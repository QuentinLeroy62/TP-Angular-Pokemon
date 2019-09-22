import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.scss']
})
export class UnauthorizedComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  /**
   * Navigate to the home page
   */
  backHome(){
    this.location.back();
  }
}
