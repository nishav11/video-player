import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
import { Router } from "@angular/router";


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    
})
export class SigninComponent implements OnInit {
 
    myForm: FormGroup;
    
    constructor(private authService: AuthService, private router: Router ) {}
        onSubmit() {
           const user = new User(this.myForm.value.email,
            this.myForm.value.password)
            this.authService.signIn(user)
            .subscribe(
                data => {
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.log(error)
            )
            this.myForm.reset();
        }
    
        ngOnInit() {
            this.myForm = new FormGroup({
                email: new FormControl(null, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                ]),
                password: new FormControl(null, Validators.required)
            });
        }
}