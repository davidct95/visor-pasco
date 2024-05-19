import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: [
  ]
})
export class MapaComponent implements OnInit {

  map?: L.Map;

  constructor() { }

  ngOnInit(): void {

    this.map = L.map('map').setView([-10.3436, -75.4168], 9)

    const map = this.map;

    const urlLayer = 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';

    const capaBase = L.tileLayer(urlLayer, {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    });

    capaBase.addTo(this.map);

    // Agregar un controlador de eventos para el evento 'zoomend'
    this.map.on('zoomend', function () {
      // Obtener el nivel de zoom actual del mapa
      var zoomLevel = map.getZoom();

      // Verificar si el nivel de zoom es 12 o mayor
      if (zoomLevel >= 12) {
        // Cambiar la URL del tileLayer cuando el nivel de zoom sea 12 o más
        capaBase.setUrl('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');
      } else {
        // Restaurar la URL original del tileLayer cuando el nivel de zoom sea menor que 12
        capaBase.setUrl(urlLayer);
      }
    });
  }
}
