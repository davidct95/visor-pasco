import { Component, Input, OnInit } from '@angular/core';
import { GeovisorService } from '../../services/geovisor.service';

import * as L from 'leaflet';

import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-leaflet-capas-base',
  templateUrl: './leaflet-capas-base.component.html',
  styles: [
  ]
})
export class LeafletCapasBaseComponent implements OnInit {

  @Input() map?: L.Map;
  layerLimDep?: L.GeoJSON;
  layerLimProv?: L.GeoJSON;
  layerLimDist?: L.GeoJSON;
  layerCuencaHidro?: L.GeoJSON;
  layerRedHidroPrinc?: L.GeoJSON;
  layerCapDist?: L.GeoJSON;
  layerCapDep?: L.GeoJSON;
  layerCapProv?: L.GeoJSON;

  constructor(private geoService: GeovisorService, private dataService: DataSharingService) {

  }

  ngOnInit(): void {
    this.getDataCheckbox1base();
    this.getDataCheckbox2base();
    this.getDataCheckbox3base();
    this.getDataCheckbox4base();
    this.getDataCheckbox5base();
    this.getDataCheckbox6base();
    this.getDataCheckbox7base();
    this.getDataCheckbox8base();
  }


  createArrayKeys(data: any) {
    const keysArrays: any[] = []

    for (const feature of data.features) {
      for (const keys in feature.properties) {
        keysArrays.push(keys)
      }
    }

    return keysArrays
  }

  addPopUp(capa: any, campos: any[]) {
    capa.eachLayer((layer: any) => {
      const popupContent = campos.map((campo) => {
        const valor = layer.feature.properties[campo];
        return "<p><strong>" + campo.toUpperCase() + ":</strong> " + valor + "</p>";
      }).join("");

      layer.bindPopup(popupContent);
    });
  }

  addLayerLimDep() {
    this.geoService.getGeojsonLimDep().subscribe((data) => {
      this.layerLimDep = L.geoJSON(data, {
        style: {
          color: 'black',
          weight: 5,
          fillOpacity: 0
        }
      }).addTo(this.map!)

      const array = this.createArrayKeys(data);

      let index1 = array.indexOf('DEPARTAMEN')
      let index2 = array.indexOf('CAPITAL')

      const arraySeleccionad = [array[index1], array[index2]]

      this.addPopUp(this.layerLimDep, arraySeleccionad);

    })
  }

  addLayerLimProv() {
    this.geoService.getGeojsonLimProv().subscribe((data) => {
      this.layerLimProv = L.geoJSON(data, {
        style: {
          color: '#120681',
          weight: 5,
          fillOpacity: 0
        }
      }).addTo(this.map!)

      const array = this.createArrayKeys(data);

      let index1 = array.indexOf('PROVINCIA')

      const arraySeleccionad = [array[index1]]

      this.addPopUp(this.layerLimProv, arraySeleccionad);

    })


  }

  addLayerLimDist() {
    this.geoService.getGeojsonLimDist().subscribe((data) => {
      this.layerLimDist = L.geoJSON(data, {
        style: {
          color: 'black',
          weight: 2,
          dashArray: '5',
          fillOpacity: 0
        }
      }).addTo(this.map!)


      const array = this.createArrayKeys(data);

      let index1 = array.indexOf('prov');
      let index2 = array.indexOf('dist');

      const arraySeleccionad = [array[index1], array[index2]]

      this.addPopUp(this.layerLimDist, arraySeleccionad);

    })
  }

  addLayerCuencaHidro() {
    this.geoService.getGeojsonCuencaHidro().subscribe((data) => {
      this.layerCuencaHidro = L.geoJSON(data, {
        style: {
          color: 'green',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(this.map!)
    })
  }

  addLayerRedHidroPrinc() {
    this.geoService.getGeojsonRedHidroPrinc().subscribe((data) => {
      this.layerRedHidroPrinc = L.geoJSON(data, {
        style: {
          color: '#0081ed',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(this.map!)
    })
  }

  addLayerCapDist() {
    this.geoService.getGeojsonCapDist().subscribe((data) => {
      this.layerCapDist = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/punto_dist.png', // URL de la imagen del icono
            iconSize: [25, 25], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }
      }).addTo(this.map!)
    })
  }

  addLayerCapDep() {
    this.geoService.getGeojsonCapDep().subscribe((data) => {
      this.layerCapDep = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/punto_depar.png', // URL de la imagen del icono
            iconSize: [50, 50], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }
      }).addTo(this.map!)
    })
  }

  addLayerCapProv() {
    this.geoService.getGeojsonCapProv().subscribe((data) => {
      this.layerCapProv = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/punto_prov.png', // URL de la imagen del icono
            iconSize: [40, 40], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }
      }).addTo(this.map!)
    })
  }

  getDataCheckbox1base() {
    this.dataService.getSharedCheckbox1base().subscribe(data => {
      if (data) {
        this.addLayerLimDep();
      } else {
        if (this.layerLimDep) {
          this.map?.removeLayer(this.layerLimDep);
        }
      }
    });
  }

  getDataCheckbox2base() {
    this.dataService.getSharedCheckbox2base().subscribe(data => {
      if (data) {
        this.addLayerLimProv();
      } else {
        if (this.layerLimProv) {
          this.map?.removeLayer(this.layerLimProv);
        }
      }
    });
  }

  getDataCheckbox3base() {
    this.dataService.getSharedCheckbox3base().subscribe(data => {
      if (data) {
        this.addLayerLimDist();
      } else {
        if (this.layerLimDist) {
          this.map?.removeLayer(this.layerLimDist);
        }
      }
    });
  }

  getDataCheckbox4base() {
    this.dataService.getSharedCheckbox4base().subscribe(data => {
      if (data) {
        this.addLayerCuencaHidro();
      } else {
        if (this.layerCuencaHidro) {
          this.map?.removeLayer(this.layerCuencaHidro);
        }
      }
    });
  }

  getDataCheckbox5base() {
    this.dataService.getSharedCheckbox5base().subscribe(data => {
      if (data) {
        this.addLayerRedHidroPrinc();
      } else {
        if (this.layerRedHidroPrinc) {
          this.map?.removeLayer(this.layerRedHidroPrinc);
        }
      }
    });
  }

  getDataCheckbox6base() {
    this.dataService.getSharedCheckbox6base().subscribe(data => {
      if (data) {
        this.addLayerCapDist();
      } else {
        if (this.layerCapDist) {
          this.map?.removeLayer(this.layerCapDist);
        }
      }
    });
  }

  getDataCheckbox7base() {
    this.dataService.getSharedCheckbox7base().subscribe(data => {
      if (data) {
        this.addLayerCapDep();
      } else {
        if (this.layerCapDep) {
          this.map?.removeLayer(this.layerCapDep);
        }
      }
    });
  }

  getDataCheckbox8base() {
    this.dataService.getSharedCheckbox8base().subscribe(data => {
      if (data) {
        this.addLayerCapProv();
      } else {
        if (this.layerCapProv) {
          this.map?.removeLayer(this.layerCapProv);
        }
      }
    });
  }
}
