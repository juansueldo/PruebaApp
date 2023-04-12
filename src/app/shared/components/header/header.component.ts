import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;
  
  darkMode: BehaviorSubject<boolean>;
  constructor(
    private themeSvc: ThemeService
  ) { }

  ngOnInit() {
    this.darkMode = this.themeSvc.darkMode;
  }

  
  setTheme(darkMode: boolean){
    this.themeSvc.setTheme(darkMode);
  }

}
