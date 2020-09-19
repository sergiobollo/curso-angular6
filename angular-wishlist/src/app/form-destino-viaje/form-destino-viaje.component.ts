import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.model';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg:FormGroup;
  minLongitud = 3;

  constructor(fb: FormBuilder) {
    this.onItemAdded = new EventEmitter();
    this.fg = fb.group({
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url: ['', Validators.compose([
        Validators.required,
        this.urlValidator,
      ])]
    });
    this.fg.valueChanges.subscribe((form: any) => {console.log('cambio el formulario: ', form);});
  }

  ngOnInit(): void {
  }

  guardar(nombre: string, url: string): boolean {
    let d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false
  }

  urlValidator(control: FormControl):{[s:string]: boolean} {
    let l = control.value.toString().trim().length;
    if (l>0 && l<5) {
      return {invalidUrl: true};
    }
    return null;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): {[s: string]: boolean} | null => {
      const l =  control.value.toString().trim().length;
      if (l>0 && l<minLong) {
        return {minLongNombre: true};
      }
      return null;
    }
  }

}
