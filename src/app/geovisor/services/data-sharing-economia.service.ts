import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingEconomiaService {

  private checkbox1econ = new BehaviorSubject<boolean>(false);
  private checkbox2econ = new BehaviorSubject<boolean>(false);
  private checkbox3econ = new BehaviorSubject<boolean>(false);
  private checkbox4econ = new BehaviorSubject<boolean>(false);

  private botonDesactivado = new BehaviorSubject<boolean>(false);


  constructor() { }

  getSharedCheckbox1econ(): Observable<boolean> {
    return this.checkbox1econ.asObservable();
  }

  getSharedCheckbox2econ(): Observable<boolean> {
    return this.checkbox2econ.asObservable();
  }

  getSharedCheckbox3econ(): Observable<boolean> {
    return this.checkbox3econ.asObservable();
  }

  getSharedCheckbox4econ(): Observable<boolean> {
    return this.checkbox4econ.asObservable();
  }


  updateSharedCheckbox1econ(newData: boolean) {
    this.checkbox1econ.next(newData);
  }

  updateSharedCheckbox2econ(newData: boolean) {
    this.checkbox2econ.next(newData);
  }

  updateSharedCheckbox3econ(newData: boolean) {
    this.checkbox3econ.next(newData);
  }

  updateSharedCheckbox4econ(newData: boolean) {
    this.checkbox4econ.next(newData);
  }

  //Desactivar checkbox

  getSharedBtnDesc(): Observable<boolean> {
    return this.botonDesactivado.asObservable();
  }


  updateSharedBtnDesc(newData: boolean) {
    this.botonDesactivado.next(newData);
  }

}
