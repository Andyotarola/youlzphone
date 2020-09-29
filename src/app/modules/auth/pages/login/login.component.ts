import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hidePassword:boolean=true;
  password:string = '';
  email:string = '';
  isInvalid:boolean = false;
  showOverlay:boolean = false;

  constructor(
    public auth:AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
  }

  onLogin():void{

    this.showOverlay = true;

    this.auth.loginWithEmailAndPassword(this.email, this.password).then(()=>{
      console.clear()
      this.router.navigate([''])
    }).catch(err => {
      this.isInvalid = true      
      this.showOverlay = false
    })  
  }

}
