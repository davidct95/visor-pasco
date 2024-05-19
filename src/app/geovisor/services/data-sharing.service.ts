import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private checkbox1base = new BehaviorSubject<boolean>(true);
  private checkbox2base = new BehaviorSubject<boolean>(false);
  private checkbox3base = new BehaviorSubject<boolean>(false);
  private checkbox4base = new BehaviorSubject<boolean>(false);
  private checkbox5base = new BehaviorSubject<boolean>(false);
  private checkbox6base = new BehaviorSubject<boolean>(false);
  private checkbox7base = new BehaviorSubject<boolean>(false);
  private checkbox8base = new BehaviorSubject<boolean>(false);

  constructor() { }

  getSharedCheckbox1base(): Observable<boolean> {
    return this.checkbox1base.asObservable();
  }
  updateSharedCheckbox1base(newData: boolean) {
    this.checkbox1base.next(newData);
  }

  getSharedCheckbox2base(): Observable<boolean> {
    return this.checkbox2base.asObservable();
  }
  updateSharedCheckbox2base(newData: boolean) {
    this.checkbox2base.next(newData);
  }

  getSharedCheckbox3base(): Observable<boolean> {
    return this.checkbox3base.asObservable();
  }
  updateSharedCheckbox3base(newData: boolean) {
    this.checkbox3base.next(newData);
  }
  
  getSharedCheckbox4base(): Observable<boolean> {
    return this.checkbox4base.asObservable();
  }
  updateSharedCheckbox4base(newData: boolean) {
    this.checkbox4base.next(newData);
  }

  getSharedCheckbox5base(): Observable<boolean> {
    return this.checkbox5base.asObservable();
  }
  updateSharedCheckbox5base(newData: boolean) {
    this.checkbox5base.next(newData);
  }

  getSharedCheckbox6base(): Observable<boolean> {
    return this.checkbox6base.asObservable();
  }
  updateSharedCheckbox6base(newData: boolean) {
    this.checkbox6base.next(newData);
  }

  getSharedCheckbox7base(): Observable<boolean> {
    return this.checkbox7base.asObservable();
  }
  updateSharedCheckbox7base(newData: boolean) {
    this.checkbox7base.next(newData);
  }

  getSharedCheckbox8base(): Observable<boolean> {
    return this.checkbox8base.asObservable();
  }
  updateSharedCheckbox8base(newData: boolean) {
    this.checkbox8base.next(newData);
  }
}
