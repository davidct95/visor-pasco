import { Component, Input, OnInit } from '@angular/core';
import { GeovisorService } from '../../services/geovisor.service';
import { DataSharingEconomiaService } from '../../services/data-sharing-economia.service';
import { SelectSideService } from '../../services/select-side.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-modal-estadisticas',
  templateUrl: './modal-estadisticas.component.html',
  styles: [
  ]
})
export class ModalEstadisticasComponent implements OnInit {

  @Input() showModalEstadisticas: boolean = false;

  showIngrFam: boolean = false;

  provincias: string[] = [];
  distritosPasco: string[] = [];
  distritosDanAlcCarr: string[] = [];
  distritosOxapampa: string[] = [];

  ingrFamPasco: number[] = [];
  ingrFamDanAlcCarr: number[] = [];
  ingrFamOxapampa: number[] = [];

  graphIngrFamPasco: any = {};
  graphIngrFamDanielAlcides: any = {};
  graphIngrFamOxapampa: any = {};


  constructor(private geovisorService: GeovisorService, private datasSharingEconomia: DataSharingEconomiaService, private selectSideService: SelectSideService) { }

  ngOnInit(): void {
    this.getDataIngrFam();
    this.getValueCheckBoxIngrFam();

    combineLatest(
      [
        this.selectSideService.getValueBtnSide(),
        this.selectSideService.selectedOptionLeft$,
        this.selectSideService.selectedOptionRight$
      ]
    ).subscribe(([data1, left, right]) => {
      if(data1 == true){
        this.getValueCheckBoxIngrFam();

        if(left == 'layer1'){
          this.showIngrFam = true;
        }

        if(right == 'layer1'){
          this.showIngrFam = true;
        }

      } else{
        this.getValueCheckBoxIngrFam();
      }
    })
  }

  getDataIngrFam() {
    this.geovisorService.getGeoJsonIngFam().subscribe(data => {
      for (let feature of data.features) {
        if (feature.properties.nombprov == 'PASCO') {
          this.distritosPasco.push(feature.properties.nombdist);
          this.ingrFamPasco.push(feature.properties.ingr_fam);
        } else if(feature.properties.nombprov == 'DANIEL ALCIDES CARRION'){
          this.distritosDanAlcCarr.push(feature.properties.nombdist);
          this.ingrFamDanAlcCarr.push(feature.properties.ingr_fam);
        } else if(feature.properties.nombprov == 'OXAPAMPA'){
          this.distritosOxapampa.push(feature.properties.nombdist);
          this.ingrFamOxapampa.push(feature.properties.ingr_fam);
        }
      }

      const graphPasco = this.cuadroEstadistico(this.distritosPasco, this.ingrFamPasco, 'PROVINCIA PASCO');
      const graphDanAlcCarr = this.cuadroEstadistico(this.distritosDanAlcCarr, this.ingrFamDanAlcCarr, 'PROVINCIA DANIEL ALCIDES CARRION');
      const graphOxapampa = this.cuadroEstadistico(this.distritosOxapampa, this.ingrFamOxapampa, 'PROVINCIA OXAPAMPA');

      this.graphIngrFamPasco = graphPasco;
      this.graphIngrFamDanielAlcides = graphDanAlcCarr;
      this.graphIngrFamOxapampa = graphOxapampa;
    })
  }

  cuadroEstadistico(distritos: string[], ingrFam: number[], titulo: string) {
    const graph = {
      data: [{
        values: ingrFam,
        labels: distritos,
        type: 'pie'
      }
      ],
      layout: {
        width: 400, height: 400, title: titulo, legend: {
          font: { size: 9 }, // Tamaño de fuente de la leyenda en pixeles
          itemwidth: 20,
          with: 50,
          x: 1.8
        },
        margin: {
          l: 80,
          r: 20,
          b: 40,
          t: 80,
        },
      },
      config: { displayModeBar: false }
    };

    return graph;
  }

  getValueCheckBoxIngrFam(){
    this.datasSharingEconomia.getSharedCheckbox2econ().subscribe(value => {
      this.showIngrFam = value;
    })
  }
}
