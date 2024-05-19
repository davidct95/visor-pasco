import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import * as L from 'leaflet';
import * as GeoJSON from 'geojson';

@Injectable({
  providedIn: 'root'
})
export class GeovisorService {

  constructor(private http: HttpClient) { }

  //Capas Base

  getGeojsonLimDep(): Observable<GeoJSON.GeoJsonObject | any>{
    return this.http.get<any>('assets/capas-geojson/capas-base/limite_departamental.geojson');
  }

  getGeojsonLimProv(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/limite_provincia.geojson');
  }

  getGeojsonLimDist(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/limite_distrital.geojson');
  }

  getGeojsonCuencaHidro(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/cuenca_hidro.geojson');
  }

  getGeojsonRedHidroPrinc(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/red_hidri_princ.geojson');
  }

  getGeojsonCapDist(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/capital_dist.geojson');
  }

  getGeojsonCapDep(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/capital_dep.geojson');
  }

  getGeojsonCapProv(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-base/capital_prov.geojson');
  }

  //Capas Economia

  getGeoJsonEmpNeg(): Observable<GeoJSON.GeoJsonObject>{
    return this.http.get<any>('assets/capas-geojson/capas-economia/points_empresa.geojson');
  }

  getGeoJsonIngFam(): Observable<GeoJSON.GeoJsonObject | any>{
    return this.http.get<any>('assets/capas-geojson/capas-economia/ingreso_familiar.geojson');
  }

  getGeoJsonIDH(): Observable<GeoJSON.GeoJsonObject | any>{
    return this.http.get<any>('assets/capas-geojson/capas-economia/idh_2019.geojson');
  }

  getGeoJsonNumHog(): Observable<GeoJSON.GeoJsonObject | any>{
    return this.http.get<any>('assets/capas-geojson/capas-economia/num_hogares.geojson');
  }
}
