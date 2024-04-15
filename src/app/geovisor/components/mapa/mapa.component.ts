import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { GeovisorService } from '../../services/geovisor.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit {

  lotes: any;
  lim_prov?: GeoJsonObject;
  colores: any[] = ['red', 'green', 'blue'];
  capaBaseWaterColor: any;
  capasSeleccionadas: string[] = [];

  constructor(private http: HttpClient, private geovisorService: GeovisorService) { }

  ngOnInit(): void {
    const map = L.map('map').setView([-10.3436, -75.4168], 9);


// Guardar la URL original del tileLayer
const urlOriginal = 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';

// Crear el tileLayer con la URL original
const capaBase = L.tileLayer(urlOriginal, {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 18
}).addTo(map);

// Agregar un controlador de eventos para el evento 'zoomend'
map.on('zoomend', function () {
  // Obtener el nivel de zoom actual del mapa
  var zoomLevel = map.getZoom();

  // Verificar si el nivel de zoom es 12 o mayor
  if (zoomLevel >= 12) {
    // Cambiar la URL del tileLayer cuando el nivel de zoom sea 12 o más
    capaBase.setUrl('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}');
  } else {
    // Restaurar la URL original del tileLayer cuando el nivel de zoom sea menor que 12
    capaBase.setUrl(urlOriginal);
  }
});


    this.agregarCapaLimiteDistrital(map);
    this.agregarCapaLimiteDepartamental(map);
    this.agregarCapaLimiteProvincial(map);
    this.agregarCapaRedHidricaPrincipal(map);
    //this.agregarCapaRedHidrica(map);
    this.agregarCapaCapitalProvincial(map);


    this.geovisorService.capasSeleccionadasSubject.subscribe(capas => {
      this.capasSeleccionadas = capas;
      this.actualizarCapasMapa(map, capaBase);
    });
  }

  // Agregar capa de límites departamentales por defecto
  agregarCapaLimiteDepartamental(map: any) {
    this.http.get<any>('assets/geojson/limite_departamental.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: {
          color: 'black',
          weight: 5,
          fillOpacity: 0
        }
      }).addTo(map);
    });
  }

  // Agregar capa de límites provinciales por defecto
  agregarCapaLimiteProvincial(map: any) {
    this.http.get<any>('assets/geojson/limite_provincia.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: {
          color: 'black',
          weight: 5,
          fillOpacity: 0
        }
      }).addTo(map);
    });
  }

  agregarCapaLimiteDistrital(map: any) {
    this.http.get<any>('assets/geojson/limite_distrital.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: {
          color: 'black',
          weight: 1,
          dashArray: '5',
          fillOpacity: 0
        }
      }).addTo(map);
    });
  }

  // agregarCapaRedHidrica(map: any) {
  //   L.tileLayer.wms('https://geo.ceplan.gob.pe:8084/geoserver/wms', {
  //     layers: 'geoceplan:cb_redhidricax',
  //     format: 'image/png',
  //     transparent: true,
  //     version: '1.3.0',
  //     CQL_FILTER: 'iddpto=19'
  //   }).addTo(map);
  // }

  agregarCapaRedHidricaPrincipal(map: any) {
    this.http.get<any>('assets/geojson/red_hidri_princ.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: {
          color: '#0081ed',
          weight: 2,
          fillOpacity: 0
        }
      }).addTo(map);
    });
  }

  agregarCapaCapitalProvincial(map: any) {
    this.http.get<any>('assets/geojson/capital_prov.geojson').subscribe(data => {
      L.geoJSON(data, {

        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/punto_prov.png', // URL de la imagen del icono
            iconSize: [40, 40], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }

      }).addTo(map);
    });
  }

  //Capas de economia

  agregarCapaIngresoFamiliar(map: any) {

    this.http.get<any>('assets/geojson/economia/ingreso_familiar.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: this.estiloIngresoFamiliar.bind(this)
      }).addTo(map);
    });

  }

  agregarCapaIDH(map: any) {
    this.http.get<any>('assets/geojson/economia/idh_2019.geojson').subscribe(data => {
      L.geoJSON(data, {
        style: this.estiloIDH.bind(this)
      }).addTo(map);
    });
  }

  agregarCapaNumHogares(map: any) {
    this.http.get<any>('assets/geojson/economia/num_hogares.geojson').subscribe(data => {
      console.log(data)
      L.geoJSON(data, {
        style: this.estiloNumHogares.bind(this)
      }).addTo(map);
    });
  }

  agregarCapaEmpresas(map: any) {
    this.http.get<any>('assets/geojson/economia/points_empresa.geojson').subscribe(data => {
      L.geoJSON(data, {

        pointToLayer: function (feature, latlng) {
          // Aquí defines el icono personalizado
          const customIcon = L.icon({
            iconUrl: 'assets/img/iconos/emp.png', // URL de la imagen del icono
            iconSize: [20, 20], // Tamaño del icono [ancho, alto]
          });

          // Retorna el marcador con el icono personalizado
          return L.marker(latlng, { icon: customIcon });
        }

      }).addTo(map);
    });
  }

  actualizarCapasMapa(map: any, capaBase: any) {
    // Eliminar todas las capas del mapa excepto la capa base
    map.eachLayer((layer: any) => {
      if (layer !== capaBase) {
        map.removeLayer(layer);
      }
    });

    // Agregar las capas seleccionadas al mapa
    this.capasSeleccionadas.forEach(capa => {
      switch (capa) {
        case 'Limite Departamental':
          this.agregarCapaLimiteDepartamental(map);
          break;
        case 'Limite Provincial':
          this.agregarCapaLimiteProvincial(map);
          break;

        case 'Limite Distrital':
          this.agregarCapaLimiteDistrital(map);
          break;

        case 'Cuenca hidrográfica':
          this.http.get<any>('assets/geojson/cuenca_hidro.geojson').subscribe(data => {
            L.geoJSON(data, {
              style: {
                color: 'green',
                weight: 2,
                fillOpacity: 0
              }
            }).addTo(map);
          });
          break;

        case 'Red hídrica principal':
          this.agregarCapaRedHidricaPrincipal(map);
          break;

        // case 'Red hídrica':
        //   this.agregarCapaRedHidrica(map);
        //   break;

        case 'Capital distrital':
          this.http.get<any>('assets/geojson/capital_dist.geojson').subscribe(data => {
            L.geoJSON(data, {
              pointToLayer: function (feature, latlng) {
                // Aquí defines el icono personalizado
                const customIcon = L.icon({
                  iconUrl: 'assets/img/iconos/punto_dist.png', // URL de la imagen del icono
                  iconSize: [25, 25], // Tamaño del icono [ancho, alto]
                });

                // Retorna el marcador con el icono personalizado
                return L.marker(latlng, { icon: customIcon });
              }
            }).addTo(map);
          });
          break;

        case 'Capital departamental':
          this.http.get<any>('assets/geojson/capital_dep.geojson').subscribe(data => {
            L.geoJSON(data, {
              pointToLayer: function (feature, latlng) {
                // Aquí defines el icono personalizado
                const customIcon = L.icon({
                  iconUrl: 'assets/img/iconos/punto_depar.png', // URL de la imagen del icono
                  iconSize: [50, 50], // Tamaño del icono [ancho, alto]
                });

                // Retorna el marcador con el icono personalizado
                return L.marker(latlng, { icon: customIcon });
              }
            }).addTo(map);
          });
          break;

        case 'Capital provincial':
          // Agregar capa de límites provinciales
          this.agregarCapaCapitalProvincial(map);
          break;

        case 'Ingreso Familiar':
          this.agregarCapaIngresoFamiliar(map);
          break;

        case 'IDH 2019':
          this.agregarCapaIDH(map);
          break

        case 'Número de Hogares':
          this.agregarCapaNumHogares(map);
          break

        case 'Empresas - Negocios':
          this.agregarCapaEmpresas(map);
          break
      }
    });
  }

  //Estilos

  ingresoFamiliar: number[] = [1174.8, 1020.7, 970.52, 957.32, 942.09, 906.24, 866.31, 847.92, 846.99, 835.21, 551.87, 522, 477.39, 475.45, 448.53, 423.22, 419.16, 417.15, 415.42, 388.52, 374.98, 374.52, 345.39, 324.01, 304.04, 295.17, 263.11, 174.82, 640.62]
  idh: number[] = [0.632231, 0.580525, 0.607204, 0.38973, 0.619342, 0.341406, 0.363912, 0.630841, 0.380981, 0.550412, 0.572006, 0.498129, 0.353942, 0.430736, 0.438059, 0.409866, 0.389669, 0.341064, 0.412797, 0.294734, 0.392301, 0.383846, 0.359346, 0.343383, 0.343007, 0.354511, 0.503856, 0.534194, 0.493502]
  numHogares: number[] = [7303, 7227, 5081, 5060, 4514, 3879, 3749, 3399, 3343, 3518, 2144, 2056, 1997, 1946, 1569, 1436, 1408, 1299, 1236, 1217, 1047, 936, 869, 797, 700, 608, 592, 575, 384
  ];

  coloresMapa: string[] = [
    '#FF0000', '#FF0C00', '#FF1900', '#FF2600', '#FF3300', '#FF4000',
    '#FF4D00', '#FF5A00', '#FF6700', '#FF7400', '#FF8100', '#FF8E00',
    '#FF9B00', '#FFA800', '#FFB500', '#FFC200', '#FFCF00', '#FFDC00',
    '#FFE900', '#FFF600', '#FFFF00', '#E9FF00', '#D3FF00', '#BDFF00',
    '#A7FF00', '#91FF00', '#7BFF00', '#00FF00', '#00FF7B'
  ];
  getcolor(d: any, campo: number[], colores: string[]) {
    for (let i = 0; i <= campo.length; i++) {
      if (d == campo[i]) {
        return colores[i];
      }
    }
    return '#000000';
  }

  estiloIngresoFamiliar = (feature: any) => {
    return {
      fillColor: this.getcolor(feature.properties.ingr_fam, this.ingresoFamiliar, this.coloresMapa),
      color: 'black',
      weight: 3,
      dashArray: '5',
      opacity: 0.5,
      fillOpacity: 0.5
    };
  }

  estiloIDH = (feature: any) => {
    return {
      fillColor: this.getcolor(feature.properties.idh, this.idh, this.coloresMapa),
      color: 'black',
      weight: 3,
      dashArray: '5',
      opacity: 0.5,
      fillOpacity: 0.5
    };
  }

  estiloNumHogares = (feature: any) => {
    return {
      fillColor: this.getcolor(feature.properties.n_hogares, this.numHogares, this.coloresMapa),
      color: 'black',
      weight: 3,
      dashArray: '5',
      opacity: 0.5,
      fillOpacity: 0.5
    };
  }

}
