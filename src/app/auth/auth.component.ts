import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService) {

  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid){
      return
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;
    if(this.isLoginMode){
      //...
    } else {
      this.authService.signUp(email, password).subscribe(resData => {
        console.log('resData', resData);
        this.isLoading = true;
      }, error => {
        console.log('error', error);
        this.error = 'An error occurred!';
        this.isLoading = false;
      });
    }

    authForm.reset();
  }
}
