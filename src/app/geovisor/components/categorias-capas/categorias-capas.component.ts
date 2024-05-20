import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CapasComponent } from '../capas/capas.component';
import { GeovisorService } from '../../services/geovisor.service';

@Component({
  selector: 'app-categorias-capas',
  templateUrl: './categorias-capas.component.html',
  styles: [
  ]
})
export class CategoriasCapasComponent {

  modalAbierto: boolean = false;
  modalRef: MatDialogRef<CapasComponent> | undefined;

  constructor(public dialog: MatDialog, private geovisorService: GeovisorService) { }

  ngOnInit() {
    // Inicializa modalRef para evitar problemas de tipo
    this.modalRef = undefined;

  }

  accion1(textoBtn: string): void {
    if (this.modalAbierto) {
      this.modalRef?.close();
      this.modalAbierto = false;
      this.abrirModal(textoBtn);
    } else {
      this.abrirModal(textoBtn);
    }
  }

  abrirModal(textoBtn: string): void {
    this.modalRef = this.dialog.open(CapasComponent, {
      width: '400px',
      height: '90vh',
      position: { right: '5' },
      panelClass: 'custom-modal-left',
      data: { textoBoton: textoBtn }
    });
    this.geovisorService.setModalRefCapas(this.modalRef);
    this.geovisorService.cerrarModalLeyenda();
    this.modalAbierto = true;

    console.log(textoBtn);
  }

}
