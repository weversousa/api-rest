import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ws-angular';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
    // this.getUser();
    // this.postUser();
    // this.putUser();
    // this.deleteUser();
  }

  getUsers() {
    this.userService
      .getUsers()
      .subscribe(response => console.log(response));
  }

  getUser() {
    this.userService
      .getUser(2)
      .subscribe(response => console.log(response));
  }

  postUser() {
    this.userService
      .postUser({'name': 'ceci', 'admin': true})
      .subscribe(response => console.log(response));
  }

  putUser() {
    this.userService
      .putUser({'id': 1, 'name': 'mary', 'admin': false})
      .subscribe(response => console.log(response));
  }

  deleteUser() {
    this.userService
      .deleteUser(3)
      .subscribe(response => console.log(response));
  }

}
