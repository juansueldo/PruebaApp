import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  @Input() title: string;
  nameTitle: string
  constructor(

    private route: ActivatedRoute,
    private router: UtilsService,
    private firebaseSvc: FirebaseService
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const email = params['email'];
      const name = params['name'];
      console.log(email, name);
      this.nameTitle = name;
    });
  }

  logut(){
    this.firebaseSvc.logout().then(()=>
    this.router.routerLink('/auth'))
  }
  

}