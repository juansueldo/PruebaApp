import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator(){
    this.form.controls.confirmPassword.setValidators(
      [
        Validators.required,
        CustomValidators.matchValues(this.form.controls.password)
      ])
      this.form.controls.confirmPassword.updateValueAndValidity();
  }

  submit() {
    if (this.form.valid) {
      this.utilsSvc.presentLoading({message: 'Registrando'})
      this.firebaseSvc.signinUp(this.form.value as User).then(async res =>{

        await this.firebaseSvc.updateUser({displayName: this.form.value.name})
        
        let user: User={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        this.utilsSvc.setElementInLocalstorage('user',user)
        this.utilsSvc.routerLink('/auth')
        
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: `Te registraste con exito ${user.name}`,
          duration: 3500,
          color: 'warning',
          icon: 'person-outline'
        })

        this.form.reset();
      }, error =>{
        this.utilsSvc.presentToast({
          message: 'Error usuario invalido',
          duration: 5500,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
        this.utilsSvc.dismissLoading();
      })
    }
  }
}
