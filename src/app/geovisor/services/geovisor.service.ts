import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LeyendaComponent } from '../components/leyenda/leyenda.component';
import { Observable, Subject } from 'rxjs';
import { CapasComponent } from '../components/capas/capas.component';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeovisorService {


  //Checkbox

  capasSeleccionadas: string[] = ['Limite Departamental', 'Limite Provincial', 'Limite Distrital', 'Red hídrica principal','Red hídrica', 'Capital provincial'];
  capasSeleccionadasSubject = new Subject<string[]>();


  //Modal

  private modalRefLeyenda: MatDialogRef<LeyendaComponent> | undefined;
  private modalRefCapas: MatDialogRef<CapasComponent> | undefined;
  modalAbierto: boolean = false;
  modalAbiertoChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  setModalRefLeyenda(modalRef: MatDialogRef<LeyendaComponent>) {
    this.modalRefLeyenda = modalRef;
  }

  setModalRefCapas(modalRef: MatDialogRef<CapasComponent>){
    this.modalRefCapas = modalRef;
  }

  cerrarModalCapas(){
    if (this.modalRefCapas) {
      this.modalRefCapas.close();
      this.modalAbierto = false;
      this.modalAbiertoChanged.next(this.modalAbierto); // Notificar cambio
    }
  }

  cerrarModalLeyenda() {
    if (this.modalRefLeyenda) {
      this.modalRefLeyenda.close();
      this.modalAbierto = false;
      this.modalAbiertoChanged.next(this.modalAbierto); // Notificar cambio
    }
  }

  // Método para obtener el estado actual de modalAbierto
  getModalAbierto(): boolean {
    return this.modalAbierto;
  }

  

  toggleCapa(capa: string) {
    const index = this.capasSeleccionadas.indexOf(capa);
    if (index === -1) {
      this.capasSeleccionadas.push(capa);
    } else {
      this.capasSeleccionadas.splice(index, 1);
    }
    this.capasSeleccionadasSubject.next(this.capasSeleccionadas);
  }

}
