import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-capas',
  templateUrl: './capas.component.html',
  styles: [
  ]
})
export class CapasComponent {

  textoBoton: string = '';

  constructor(
    public dialogRef: MatDialogRef<CapasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.textoBoton = this.data.textoBoton; // Recibe el texto del botón desde el componente padre
  }

  onClose() {
    this.dialogRef.close();
  }

}
