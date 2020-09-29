import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/data/schema/user';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  hidePassword:boolean=true;
  user:User;
  showOverlay:boolean = false;

  profileForm = new FormGroup({
    fullname: new FormControl('',[
      Validators.required,
      Validators.maxLength(100),
      Validators.minLength(4)
    ]),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })


  constructor(
    public auth:AuthService
  ){}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.profileForm.controls.fullname.setValue(user.displayName)
      this.user = user
    })
  }


  onUpdateData(): void{
    this.showOverlay = true
    if(this.profileForm.valid && this.profileForm.value.password === this.profileForm.value.confirmPassword){
      const  data:User = {
        displayName: this.profileForm.value.fullname,
        email: this.user.email,
        uid: this.user.uid,
        photoURL: this.user.photoURL,
        myCustomData: this.user.photoURL
      }

      this.auth.updateData(data,this.profileForm.value.password)
      
    }
  }

  getMessageErrorFullName() :String{

    if(this.profileForm.controls.fullname.hasError('required')){
      return 'El nombre completo es requerido'
    }else if(this.profileForm.controls.fullname.hasError('minlength')){
      return 'El nombre completo debe tener mínimo 4 carácteres'
    }else if(this.profileForm.controls.fullname.hasError('maxlength')){
      return 'El nombre completo debe tener maximo 100 carácteres'
    }
  }

}