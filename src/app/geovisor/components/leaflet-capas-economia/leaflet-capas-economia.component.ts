import { Component, Input, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { GeovisorService } from '../../services/geovisor.service';
import { DataSharingEconomiaService } from '../../services/data-sharing-economia.service';

@Component({
  selector: 'app-leaflet-capas-economia',
  templateUrl: './leaflet-capas-economia.component.html',
  styles: [
  ]
})
export class LeafletCapasEconomiaComponent implements OnInit {

  @Input() map?: L.Map;
  layerEmpNeg?: L.GeoJSON;
  layerIngFam?: L.GeoJSON;
  layerIDH?: L.GeoJSON;
  layerNumHog?: L.GeoJSON;

  coloresMapa: string[] = [
    "#30123b", "#3a2c78", "#4145aa", "#455dd1", "#4774ec",
    "#458afc", "#3ba0fd", "#2cb6f0", "#1ecadb", "#18dcc4",
    "#1fe9ae", "#35f394", "#55fa76", "#78fe5a", "#98fe43",
    "#b0fa37", "#c6f034", "#dbe236", "#ecd13a", "#f8bf39",
    "#feaa33", "#fe922a", "#f9771e", "#f15d13", "#e5470b",
    "#d73606", "#c42503", "#ae1801", "#940d01", "#7a0403"
  ];

  constructor(private geoService: GeovisorService, private dataService: DataSharingEconomiaService) { }

  ngOnInit(): void {

    this.getDataCheckbox1Economia();
    this.getDataCheckbox2Economia();
    this.getDataCheckbox3Economia();
    this.getDataCheckbox4Economia();

  }

  addLayerEmpNeg() {
    this.geoService.getGeoJsonEmpNeg().subscribe((data) => {

      this.layerEmpNeg = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/emp.png', // URL de la imagen del icono
            iconSize: [20, 20], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }
      }).addTo(this.map!);
    })
  }

  addLayerIngFam() {
    this.geoService.getGeoJsonIngFam().subscribe((data) => {

      const arrayIngresoFamiliar: number[] = [];

      for (const feature of data.features) {
        arrayIngresoFamiliar.push(feature.properties.ingr_fam);
      }

      const arrayIngresoFamiliarSort = arrayIngresoFamiliar.sort((a, b) => a - b);

      this.layerIngFam = L.geoJSON(data, {
        style: (feature) => {
          const ingrFam = feature?.properties.ingr_fam;
          // Buscar el índice del valor en arrayIngresoFamiliar
          const index = arrayIngresoFamiliarSort.indexOf(ingrFam);
          // Si el valor está presente en arrayIngresoFamiliar, usar el color correspondiente
          if (index !== -1) {
            return {
                      fillColor: this.coloresMapa[index],
                      fillOpacity: 0.8,
                      color: 'black',
                      weight: 1
                    };
          } else {
            return { fillColor: 'yellow', fillOpacity: 1 };
          }
        }
      }).addTo(this.map!);
    })
  }

  addLayerIDH() {

    this.geoService.getGeoJsonIDH().subscribe((data) => {

      const arrayIDH: number[] = [];

      for(const feature of data.features){
        arrayIDH.push(feature.properties.idh);
      }

      const arrayIDHSort = arrayIDH.sort((a, b) => a - b)

      this.layerIDH = L.geoJSON(data, {
        style: (feature) => {
          const idh = feature?.properties.idh;
          const index = arrayIDHSort.indexOf(idh);

          if (index !== -1) {
            return {
                      fillColor: this.coloresMapa[index],
                      fillOpacity: 0.8,
                      color: 'black',
                      weight: 1
                    };
          } else {
            return { fillColor: 'yellow', fillOpacity: 1 };
          }
        }
      }).addTo(this.map!);
    })
  }

  addLayerNumHog() {
    this.geoService.getGeoJsonNumHog().subscribe((data) => {

      const arrayNumHogares: number[] = [];

      for(const feature of data.features){
        arrayNumHogares.push(feature.properties.n_hogares);
      }

      const arrayNumHogaresSort = arrayNumHogares.sort((a, b) => a - b);

      this.layerNumHog = L.geoJSON(data, {
        style: (feature) => {
          const n_hogares = feature?.properties.n_hogares;
          const index = arrayNumHogaresSort.indexOf(n_hogares);

          if (index !== -1) {
            return {
                      fillColor: this.coloresMapa[index],
                      fillOpacity: 0.8,
                      color: 'black',
                      weight: 1
                    };
          } else {
            return { fillColor: 'yellow', fillOpacity: 1 };
          }
        }
      }).addTo(this.map!);
    })
  }

  getDataCheckbox1Economia() {
    this.dataService.getSharedCheckbox1econ().subscribe(data => {
      if (data) {
        this.addLayerEmpNeg();
      } else {
        if (this.layerEmpNeg) {
          this.map?.removeLayer(this.layerEmpNeg);
        }
      }
    });
  }

  getDataCheckbox2Economia() {
    this.dataService.getSharedCheckbox2econ().subscribe(data => {
      if (data) {
        this.addLayerIngFam();
      } else {
        if (this.layerIngFam) {
          this.map?.removeLayer(this.layerIngFam);
        }
      }
    });
  }

  getDataCheckbox3Economia() {
    this.dataService.getSharedCheckbox3econ().subscribe(data => {
      if (data) {
        this.addLayerIDH();
      } else {
        if (this.layerIDH) {
          this.map?.removeLayer(this.layerIDH);
        }
      }
    });
  }

  getDataCheckbox4Economia() {
    this.dataService.getSharedCheckbox4econ().subscribe(data => {
      if (data) {
        this.addLayerNumHog();
      } else {
        if (this.layerNumHog) {
          this.map?.removeLayer(this.layerNumHog);
        }
      }
    });
  }
 }
