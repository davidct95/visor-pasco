import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private showModal = new BehaviorSubject<boolean>(false);
  private showModalLeyenda = new BehaviorSubject<boolean>(false);

  constructor(){}

  getStatusModalCapas(): Observable<boolean>{
    return this.showModal.asObservable();
  }

  getStatusModalLeyenda(): Observable<boolean>{
    return this.showModalLeyenda.asObservable();
  }

  updateStatusModalCapas(newData: boolean){
    this.showModal.next(newData);
  }

  updateStatusModalLeyenda(newData: boolean){
    this.showModalLeyenda.next(newData);
  }


}
