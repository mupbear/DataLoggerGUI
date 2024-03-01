import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}
  userId: string | null = null;

  /**
   * Initializes the component upon its instantiation.
   * Checks for a stored user ID in the local storage and redirects to the login page if no user ID is found.
   *
   * @remarks
   * This method is typically called after Angular has initialized the component's data-bound properties.
   *
   */
  ngOnInit() {
    this.userId = localStorage.getItem("user_id")
    if (this.userId === null){
      this.router.navigate(["/login"])
    }
  }
}
