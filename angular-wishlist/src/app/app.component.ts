import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-wishlist';
  time = new Observable(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
    return null;
    });

    constructor(public translate: TranslateService) {
      translate.getTranslation('fr').subscribe(x => console.log('x: ' + JSON.stringify(x)));
      translate.getTranslation('en').subscribe(x => console.log('x: ' + JSON.stringify(x)));
      translate.setDefaultLang('es');
    }
}

