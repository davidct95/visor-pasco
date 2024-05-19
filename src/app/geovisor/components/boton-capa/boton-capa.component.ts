import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-capa',
  templateUrl: './boton-capa.component.html',
  styles: [
  ]
})
export class BotonCapaComponent {

  showButtons: boolean = false;

  cambiarValorBoolean() {
    this.showButtons = !this.showButtons;
  }

  hideButtons(nuevoValor: boolean){
    this.showButtons = nuevoValor;
  }
}
