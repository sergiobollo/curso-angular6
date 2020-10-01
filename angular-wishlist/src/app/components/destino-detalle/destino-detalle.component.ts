import { AppConfig, AppState, APP_CONFIG } from './../../app.module';
import { Component, OnInit, InjectionToken, Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from 'src/app/models/destinos-api-client.model';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

class DestinosApiClientViejo {
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase vieja');
    return null;
  }
}

/*interface AppConfig {
  apiEndpoint: string;
}
const APP_CONFIG_VALUE: AppConfig = {
  apiEndpoint: 'mi_api.com'
};
const APP_CONFIG = new InjectionToken<AppConfig>('app.config');*/

// comenté esta parte porque estoy importando APP_CONFIG desde app.module.ts

@Injectable()
class DestinosApiClientDecorated extends DestinosApiClient {
  constructor(@Inject(APP_CONFIG) config: AppConfig, store: Store<AppState>, http: HttpClient) {
    super(store, config, http);
  }
  getById(id: string): DestinoViaje {
    console.log('llamando por la clase decorada');
    console.log('config: ' + this.config.apiEndpoint);
    return super.getById(id);
  }
}

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [
    //{provide: APP_CONFIG, useValue: APP_CONFIG_VALUE},
    {provide: DestinosApiClient, useClass: DestinosApiClientDecorated},
    {provide: DestinosApiClientViejo, useExisting: DestinosApiClient}
  ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;

  constructor(private route: ActivatedRoute, private destinosApiClient: DestinosApiClientViejo) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinosApiClient.getById(id);
  }

}
