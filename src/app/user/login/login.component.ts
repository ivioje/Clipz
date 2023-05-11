import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  constructor(
    private auth: AngularFireAuth
  ) { }

  showAlert = false
  alertMsg = 'Please wait we are logging you in'
  inSubmission = false
  alertColor = 'blue'

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait we are logging you in'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch (error) {
      this.inSubmission = false
      this.alertMsg = 'Invalid credentials'
      this.alertColor = 'red'

      console.log(error);

      return
    }
    this.alertMsg = 'Success! You are now logged in'
    this.alertColor = 'green'
  }


}
