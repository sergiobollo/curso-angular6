import { ReservasApiClientService } from './../reservas-api-client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservas-listado',
  templateUrl: './reservas-listado.component.html',
  styleUrls: ['./reservas-listado.component.css']
})
export class ReservasListadoComponent implements OnInit {

  constructor(public api: ReservasApiClientService) { }

  ngOnInit(): void {
  }

}
