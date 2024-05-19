import { Component, OnInit } from '@angular/core';
import { SelectSideService } from '../../services/select-side.service';

@Component({
  selector: 'app-side-by-side',
  templateUrl: './side-by-side.component.html',
  styles: [
  ]
})
export class SideBySideComponent implements OnInit{

  selectedLeftOption: string = 'layer1';
  selectedRightOption: string = 'layer1';

  constructor(private sharedService: SelectSideService) { }


  ngOnInit(): void {
     // Recuperar los valores seleccionados de localStorage si están presentes
     const selectedLeftOption = localStorage.getItem('selectedLeftOption');
     const selectedRightOption = localStorage.getItem('selectedRightOption');
     if (selectedLeftOption) {
       this.selectedLeftOption = selectedLeftOption;
     }
     if (selectedRightOption) {
       this.selectedRightOption = selectedRightOption;
     }
  }

  selectLeft(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.selectedLeftOption = value;
      this.sharedService.setSelectedOptionLeft(value);
      localStorage.setItem('selectedLeftOption', this.selectedLeftOption); // Utiliza una clave diferente para la izquierda
    }
  }

  selectRight(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    if (value) {
      this.selectedRightOption = value;
      this.sharedService.setSelectedOptionRight(value);
      localStorage.setItem('selectedRightOption', this.selectedRightOption); // Utiliza una clave diferente para la derecha
    }
  }
}
