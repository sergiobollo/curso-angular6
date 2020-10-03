import { VoteDownAction, VoteResetAction, VoteUpAction } from '../../models/destinos-viajes-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../../models/destino-viaje.model';
import { AppState } from '../../app.module';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css'],
  animations: [
    trigger('esFavorito', [
      state('estadoFavorito', style({
        backgroundColor: 'PaleTurquoise'
      })),
      state('estadoNoFavorito', style({
        backgroundColor: 'WhiteSmoke'
      })),
      transition('estadoNoFavorito => estadoFavorito', [
        animate('3s')
      ]),
      transition('estadoFavorito => estadoNoFavorito', [
        animate('1s')
      ]),
    ])
  ]
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino: DestinoViaje;
  @Input('idx') position: number;
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;
  constructor(private store: Store<AppState>) {
    this.clicked = new EventEmitter();
   }

  ngOnInit(): void {
  }

   ir(){
     this.clicked.emit(this.destino);
    return false;
   }
   voteUp() {
     this.store.dispatch(new VoteUpAction(this.destino));
     return false;
   }

   voteDown() {
     this.store.dispatch(new VoteDownAction(this.destino));
     return false;
   }

   voteReset() {
     this.store.dispatch(new VoteResetAction(this.destino));
     return false;
   }

}
