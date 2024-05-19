import { Component, Input, OnInit } from '@angular/core';

//@ts-ignore
import * as L from 'node_modules/leaflet/dist/leaflet.js';
import 'src/assets/lib/leaflet-side-by-side-gh-pages/leaflet-side-by-side.js';
import 'src/assets/lib/leaflet-geojson-vt-master/src/leaflet-geojson-vt.js';
import 'node_modules/leaflet.vectorgrid/dist/Leaflet.VectorGrid.bundled.js'

import { GeovisorService } from '../../services/geovisor.service';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { SelectSideService } from '../../services/select-side.service';



@Component({
  selector: 'app-leaflet-side-by-side',
  templateUrl: './leaflet-side-by-side.component.html',
  styles: [
  ]
})
export class LeafletSideBySideComponent implements OnInit {

  @Input() map?: L.Map;

  coloresMapa: string[] = [
    "#30123b", "#3a2c78", "#4145aa", "#455dd1", "#4774ec",
    "#458afc", "#3ba0fd", "#2cb6f0", "#1ecadb", "#18dcc4",
    "#1fe9ae", "#35f394", "#55fa76", "#78fe5a", "#98fe43",
    "#b0fa37", "#c6f034", "#dbe236", "#ecd13a", "#f8bf39",
    "#feaa33", "#fe922a", "#f9771e", "#f15d13", "#e5470b",
    "#d73606", "#c42503", "#ae1801", "#940d01", "#7a0403"
  ];

  sideBySideControl: any; // Referencia al control sideBySide actual
  geoJSONLayers: any[] = [];

  constructor(private geovisorService: GeovisorService, private selectSideService: SelectSideService) { }

  ngOnInit(): void {

    this.selectSideService.getValueBtnSide().subscribe(value => {

      if (value == true) {
        combineLatest([
          this.selectSideService.selectedOptionLeft$,
          this.selectSideService.selectedOptionRight$
        ]).subscribe(([left, right]) => {
          this.getGeoJson(left, right);
        });

      } else {

        if (this.sideBySideControl) {
          this.map.removeControl(this.sideBySideControl);
        }

        this.geoJSONLayers.forEach(layer => {
          this.map.removeLayer(layer);
        });
      }

    })
  }

  getGeoJson(leftLayer: string, rightLayer: string) {

    this.geoJSONLayers.forEach(layer => {
      this.map.removeLayer(layer);
    });

    const layers: { [key: string]: [any, () => Observable<any>] } = {
      'layer1': ['ingr_fam', this.getGeoJsonIngFam.bind(this)],
      'layer2': ['idh', this.getGeoJsonIDH.bind(this)],
      'layer3': ['n_hogares', this.getGeoJsonNumHog.bind(this)]
    };

    const getLeftData = layers[leftLayer][1]();
    const getRightData = layers[rightLayer][1]();


    combineLatest(
      [
        getLeftData,
        getRightData
      ]
    ).subscribe(([data1, data2]) => {

      const left = this.addMapa(data1, layers[leftLayer][0])
      const right = this.addMapa(data2, layers[rightLayer][0])



      this.geoJSONLayers.push(left, right);

      // Eliminar el control sideBySide anterior si existe
      if (this.sideBySideControl) {
        this.map.removeControl(this.sideBySideControl);
      }

      this.sideBySideControl = L.control.sideBySide(left, right).addTo(this.map);

    })
  }

  addMapa(data: any, capa: string) {

    const array: number[] = [];

    for (let feature of data.features) {

      array.push(feature.properties[capa]);

    }

    const arraySort = array.sort((a, b) => a - b);

    const options1 = {
      maxZoom: 19,
      tolerance: 3,
      debug: 0,
      style: (properties: any) => {
        for (let i = 0; i < arraySort.length; i++) {
          if (properties[capa] == arraySort[i]) {
            return { fillColor: this.coloresMapa[i], color: "black", weight: 1, fillOpacity: 1 }
          }
        }
        return { fillColor: 'yellow' }
      }
    }

    return L.geoJSON.vt(data, options1).addTo(this.map)
  }

  getGeoJsonIngFam(): Observable<any> {
    return this.geovisorService.getGeoJsonIngFam();
  }

  getGeoJsonIDH(): Observable<any> {
    return this.geovisorService.getGeoJsonIDH();
  }

  getGeoJsonNumHog(): Observable<any> {
    return this.geovisorService.getGeoJsonNumHog();
  }

}
