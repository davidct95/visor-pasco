import { Component } from '@angular/core';
import { DataSharingEconomiaService } from '../../services/data-sharing-economia.service';
import { SelectSideService } from '../../services/select-side.service';

@Component({
  selector: 'app-boton-side',
  templateUrl: './boton-side.component.html',
  styles: [
  ]
})
export class BotonSideComponent {

  sideBySide: boolean = false;

  constructor(private dataSharingServiceEcon: DataSharingEconomiaService,private selectSideService: SelectSideService){}

  showSideBySide(){
    this.sideBySide = !this.sideBySide;
    if(this.sideBySide){
      this.dataSharingServiceEcon.updateSharedCheckbox2econ(false);
      this.dataSharingServiceEcon.updateSharedCheckbox3econ(false);
      this.dataSharingServiceEcon.updateSharedCheckbox4econ(false);
      this.dataSharingServiceEcon.updateSharedBtnDesc(true);
    } else {
      this.dataSharingServiceEcon.updateSharedBtnDesc(false);
    }

    this.selectSideService.updateValueBtnSide(this.sideBySide);

  }

}
