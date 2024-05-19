import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectSideService {

  private showSideBySide = new BehaviorSubject<boolean>(false);

  private selectedOptionLeftSubject = new BehaviorSubject<string>('layer1');
  selectedOptionLeft$ = this.selectedOptionLeftSubject.asObservable();

  private selectedOptionRightSubject = new BehaviorSubject<string>('layer1');
  selectedOptionRight$ = this.selectedOptionRightSubject.asObservable();

  constructor() { }

  setSelectedOptionLeft(option: string) {
    this.selectedOptionLeftSubject.next(option);
  }

  setSelectedOptionRight(option: string) {
    this.selectedOptionRightSubject.next(option);
  }

  getValueBtnSide(): Observable<boolean> {
    return this.showSideBySide.asObservable();
  }

  updateValueBtnSide(newData: boolean) {
    this.showSideBySide.next(newData);
  }


}
