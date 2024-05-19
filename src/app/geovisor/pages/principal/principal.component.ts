import { Component, HostListener, OnInit } from '@angular/core';
import { SelectSideService } from '../../services/select-side.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styles: [
  ]
})
export class PrincipalComponent implements OnInit{

  mostrarPlantilla = false;

  constructor(private selectSideService: SelectSideService){}

  ngOnInit(): void {
    this.selectSideService.getValueBtnSide().subscribe(value => {
      this.mostrarPlantilla = value;
    })
  }

  @HostListener('window:beforeunload')
  limpiarLocalStorage() {
    // Limpia los datos en localStorage
    localStorage.clear();
  }

}
