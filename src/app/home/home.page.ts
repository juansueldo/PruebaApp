import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform
  ) { 

    this.platform.backButton.subscribeWithPriority(9999, () => {
      navigator['app'].exitApp();
    });
  }



 
}
