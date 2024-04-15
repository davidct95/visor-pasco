import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LeyendaComponent } from 'src/app/geovisor/components/leyenda/leyenda.component';
import { GeovisorService } from 'src/app/geovisor/services/geovisor.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  modalAbierto: boolean = false;
  modalRef: MatDialogRef<LeyendaComponent> | undefined;

  constructor(public dialog: MatDialog, private geovisorService: GeovisorService) { }

  ngOnInit() {
    // Inicializa modalRef para evitar problemas de tipo
    this.modalRef = undefined;

    this.modalAbierto = this.geovisorService.getModalAbierto();

    this.geovisorService.modalAbiertoChanged.subscribe((modalAbierto: boolean) => {
      this.modalAbierto = modalAbierto;
    });
  }

  openModalLeyenda() {
    if (!this.modalAbierto) {
      this.modalRef = this.dialog.open(LeyendaComponent, {
        width: '400px',
        height: '90vh',
        position: { right: '5' },
        panelClass: 'custom-modal-left'
      });
      this.geovisorService.setModalRefLeyenda(this.modalRef)
      this.geovisorService.cerrarModalCapas();
      this.modalAbierto = true;
    } else if (this.modalAbierto) {
      this.modalRef?.close();
      this.modalAbierto = false;
    }
  }

}
