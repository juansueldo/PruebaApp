import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CustomValidators } from 'src/app/utils/custom-validators';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  
  form = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required]),
})
    
  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      //console.log(this.form.value);
      this.utilsSvc.presentLoading({message: 'Autenticando...'})
      this.firebaseSvc.login(this.form.value as User).then(async res =>{
        let user: User={
          uid: res.user.uid,
          name: res.user.displayName,
          email: res.user.email
        }
        this.utilsSvc.setElementInLocalstorage('user',user)
        this.utilsSvc.routerLink('/tab')
        this.route.navigate(['/tab'], { queryParams: user });
        
        
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message: `Te damos la bienvenida ${user.name}`,
          duration: 3500,
          color: 'warning',
          icon: 'person-outline'
        })

        this.form.reset();
      }, error =>{
        this.utilsSvc.presentToast({
          message: 'Usuario y/o contraseña inválida',
          duration: 5500,
          color: 'warning',
          icon: 'alert-circle-outline'
        })
        this.utilsSvc.dismissLoading();
      })
    }
  }
}