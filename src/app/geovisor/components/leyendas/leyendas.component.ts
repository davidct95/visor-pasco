import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';
import { DataSharingEconomiaService } from '../../services/data-sharing-economia.service';
import { GeovisorService } from '../../services/geovisor.service';
import { ModalService } from '../../services/modal.service';
import { SelectSideService } from '../../services/select-side.service';
import { combineLatest, forkJoin } from 'rxjs';

@Component({
  selector: 'app-leyendas',
  templateUrl: './leyendas.component.html',
  styles: [
  ]
})
export class LeyendasComponent implements OnInit {


  coloresMapa: string[] = [
    "#30123b", "#3a2c78", "#4145aa", "#455dd1", "#4774ec",
    "#458afc", "#3ba0fd", "#2cb6f0", "#1ecadb", "#18dcc4",
    "#1fe9ae", "#35f394", "#55fa76", "#78fe5a", "#98fe43",
    "#b0fa37", "#c6f034", "#dbe236", "#ecd13a", "#f8bf39",
    "#feaa33", "#fe922a", "#f9771e", "#f15d13", "#e5470b",
    "#d73606", "#c42503", "#ae1801", "#940d01"
  ];

  //Capas Base

  limDep?: boolean;
  limProv?: boolean;
  limDist?: boolean;
  cuencaHidro?: boolean;
  redHidriPrinc?: boolean;
  capDist?: boolean;
  capDep?: boolean;
  capProv?: boolean;


  //Data Economia

  dataIngresoFam?: any[];
  dataIdh?: any[];
  dataNumHogares?: any[];

  //Capas Economia
  puntosEmpresas?: boolean;
  ingresoFamiliar?: boolean;
  idh?: boolean;
  numHogares?: boolean;

  constructor(
    private dataSharingService: DataSharingService,
    private dataSharingServiceEconomia: DataSharingEconomiaService,
    private geovisorService: GeovisorService,
    private modalService: ModalService,
    private selectSideService: SelectSideService
  ) { }

  closeModal() {
    this.modalService.updateStatusModalLeyenda(false);
  }

  ngOnInit(): void {
    this.getValueLimDep();
    this.getValueLimProv();
    this.getValueLimDist();
    this.getValueCuencaHidro();
    this.getValueRedHidriPrinc();
    this.getValueCapDist();
    this.getValueCapDep();
    this.getValueCapProv();

    //Data Economia
    this.getDataIngrFamiliar();
    this.getDataIdh();
    this.getDataNumHogares();

    //Economia
    this.getValueCapEmpre();
    this.getValueCapIngrFam();
    this.getValueCapIdh();
    this.getValueCapNumHogares();

    combineLatest(
      [
        this.selectSideService.getValueBtnSide(),
        this.selectSideService.selectedOptionLeft$,
        this.selectSideService.selectedOptionRight$
      ]
    ).subscribe(([data1, left, right]) => {
      if (data1 == true) {

        this.getValueCapIngrFam();
        this.getValueCapIdh();
        this.getValueCapNumHogares();

        if (left == 'layer1') {
          this.ingresoFamiliar = true;

        } else if (left == 'layer2') {
          this.idh = true;

        } else if (left == 'layer3') {
          this.numHogares = true;
        }


        if (right == 'layer1') {
          this.ingresoFamiliar = true;

        } else if (right == 'layer2') {
          this.idh = true;

        } else if (right == 'layer3') {
          this.numHogares = true;
        }
      } else {
        this.getValueCapIngrFam();
        this.getValueCapIdh();
        this.getValueCapNumHogares();
      }
    })
  }

  //Capas base

  getValueLimDep() {
    this.dataSharingService.getSharedCheckbox1base().subscribe(data => {
      this.limDep = data;
    })
  }

  getValueLimProv() {
    this.dataSharingService.getSharedCheckbox2base().subscribe(data => {
      this.limProv = data;
    })
  }

  getValueLimDist() {
    this.dataSharingService.getSharedCheckbox3base().subscribe(data => {
      this.limDist = data;
    })
  }

  getValueCuencaHidro() {
    this.dataSharingService.getSharedCheckbox4base().subscribe(data => {
      this.cuencaHidro = data;
    })
  }

  getValueRedHidriPrinc() {
    this.dataSharingService.getSharedCheckbox5base().subscribe(data => {
      this.redHidriPrinc = data;
    })
  }

  getValueCapDist() {
    this.dataSharingService.getSharedCheckbox6base().subscribe(data => {
      this.capDist = data;
    })
  }

  getValueCapDep() {
    this.dataSharingService.getSharedCheckbox7base().subscribe(data => {
      this.capDep = data;
    })
  }

  getValueCapProv() {
    this.dataSharingService.getSharedCheckbox8base().subscribe(data => {
      this.capProv = data;
    })
  }

  //Datos Economia

  getDataIngrFamiliar() {
    this.geovisorService.getGeoJsonIngFam().subscribe(data => {

      const arrayIngresoFamiliar: number[] = [];

      for (const feature of data.features) {
        arrayIngresoFamiliar.push(feature.properties.ingr_fam);
      }

      const arrayIngresoFamiliarOrdenado = arrayIngresoFamiliar.sort((a, b) => a - b);

      this.dataIngresoFam = this.coloresMapa.map((item, index) => ({
        colores: item,
        item2: arrayIngresoFamiliarOrdenado[index]
      }))
    })
  }

  getDataIdh() {
    this.geovisorService.getGeoJsonIDH().subscribe(data => {
      const arrayIdh: number[] = [];

      for (const feature of data.features) {
        arrayIdh.push(feature.properties.idh);
      }

      const arrayIdhOrdenado = arrayIdh.sort((a, b) => a - b);

      this.dataIdh = this.coloresMapa.map((item, index) => ({
        colores: item,
        item2: arrayIdhOrdenado[index]
      }))
    })
  }

  getDataNumHogares() {
    this.geovisorService.getGeoJsonNumHog().subscribe(data => {
      const arrayNumHogares: number[] = [];

      for (const feature of data.features) {
        arrayNumHogares.push(feature.properties.n_hogares);
      }

      const arraNumHogaresOrdenado = arrayNumHogares.sort((a, b) => a - b);

      this.dataNumHogares = this.coloresMapa.map((item, index) => ({
        colores: item,
        item2: arrayNumHogares[index]
      }))
    })
  }

  //Capas Economia

  getValueCapEmpre() {
    this.dataSharingServiceEconomia.getSharedCheckbox1econ().subscribe(data => {
      this.puntosEmpresas = data;
    })
  }

  getValueCapIngrFam() {
    this.dataSharingServiceEconomia.getSharedCheckbox2econ().subscribe(data => {
      this.ingresoFamiliar = data;
    })
  }

  getValueCapIdh() {
    this.dataSharingServiceEconomia.getSharedCheckbox3econ().subscribe(data => {
      this.idh = data;
    })
  }

  getValueCapNumHogares() {
    this.dataSharingServiceEconomia.getSharedCheckbox4econ().subscribe(data => {
      this.numHogares = data;
    })
  }

}
