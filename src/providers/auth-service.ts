import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

export class User {
  constructor(public username: string, public password: string) {}
}

@Injectable()
export class AuthService {

  currentUser :User;

  login(username: string, password: string) :boolean {
    let userList:Array<User> = JSON.parse(localStorage.getItem("users"));
    if(userList !== null) {
      let user:User = userList.filter((item) => {
        return item.username.indexOf(username) > -1;
      })[0];

      if(user !== null) {
        this.currentUser = user;
        return user.password === password;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  register(username: string, password: string) :boolean {
    let userList:Array<User> = JSON.parse(localStorage.getItem("users"));
    if(userList === null) {
      userList = [];
    }

    let user = userList.filter((item) => {
      return item.username.indexOf(username) > -1;
    });

    if(user.length ===0 && username !== null && password !== null) {
      let newUser = new User(username, password);
      userList.push(newUser);
      localStorage.setItem("users", JSON.stringify(userList));
      this.currentUser = newUser;
      console.log("Added new user: " + JSON.stringify(newUser));
      return true;
    } else {
      return false;
    }
  }

  getUserInfo() : User {
    return this.currentUser;
  }

  logout() {
      this.currentUser = null;
  }

}