import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/services/auth.service';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { equalValue: true } : null;
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  invalidEmail:boolean = false;
  showOverlay:boolean = false;

  registerForm = new FormGroup({
    fullname:new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100)
    ]),
    email:new FormControl('',[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100)
    ]),
    password:new FormControl('',[
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(100),
    ]),
    confirmPassword:new FormControl(''),
  }, {validators: passwordValidator})

  hidePassword:boolean=true;

  constructor(
    private auth:AuthService,
    private afs:AngularFirestore,
    private router:Router
  ){}

  ngOnInit(): void {
  }

  getErrorMessageFullName() :String{
    if(this.registerForm.controls.fullname.hasError('required')){
      return 'El nombre completo es requerido'
    }else if(this.registerForm.controls.fullname.hasError('maxlength')){
      return 'El nombre completo debe tener maximo 100 carácteres'
    }else if(this.registerForm.controls.fullname.hasError('minlength')){
      return 'El nombre completo debe tener mínimo  carácteres'
    }
  }

  getErrorMessageEmail() :String{
    if(this.registerForm.controls.email.hasError('required')){
      return 'El correo e es requerido'
    }else if(this.registerForm.controls.email.hasError('maxlength')){
      return 'El correo debe tener maximo 100 carácteres'
    }else if(this.registerForm.controls.email.hasError('minlength')){
      return 'El correo completo debe tener mínimo 8 carácteres'
    }
  }
  
  getErrorMessagePassword() :String{
    if(this.registerForm.controls.password.hasError('required')){
      return 'La contraseña es requerida'
    }else if(this.registerForm.controls.password.hasError('maxlength')){
      return 'La contraseña debe tener maximo 100 carácteres'
    }else if(this.registerForm.controls.password.hasError('minlength')){
      return 'La contraseña debe tener mínimo 6 carácteres'
    }
  }

  onSignup() :void{
    if(this.registerForm.valid){

      this.invalidEmail = false;
      this.showOverlay = true
      
      const fullname = this.registerForm.controls.fullname.value

      from(this.auth.createUser(this.registerForm.controls.email.value,this.registerForm.controls.password.value))
        .pipe(
          mergeMap(data => {
            const user:User = {
              displayName:fullname,
              photoURL:'https://firebasestorage.googleapis.com/v0/b/youlzphone.appspot.com/o/default-user-image.png?alt=media&token=1a68073e-98de-439e-83cb-741b642b853b',
              email:data.user.email,
              uid:data.user.uid
            }
            return this.afs.doc('users/'+user.uid).set(user)
          })
        ).subscribe(
          ()=>{
            this.showOverlay = false;
            this.router.navigate(['/'])
          }
          ,(err)=>{
              this.showOverlay = false;

              this.invalidEmail = true
          })
    
    }
  }
}
