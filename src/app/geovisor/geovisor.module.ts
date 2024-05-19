import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './pages/principal/principal.component';
import { HeaderComponent } from './components/header/header.component';
import { BotonLeyendaComponent } from './components/boton-leyenda/boton-leyenda.component';
import { BotonCapaComponent } from './components/boton-capa/boton-capa.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ModalCapasBaseComponent } from './components/modal-capas-base/modal-capas-base.component';
import { BotonesCategoriasComponent } from './components/botones-categorias/botones-categorias.component';
import { FormsModule } from '@angular/forms';
import { ModalCapasEconomiaComponent } from './components/modal-capas-economia/modal-capas-economia.component';
import { LeafletCapasBaseComponent } from './components/leaflet-capas-base/leaflet-capas-base.component';
import { LeafletCapasEconomiaComponent } from './components/leaflet-capas-economia/leaflet-capas-economia.component';
import { ModalLeyendaComponent } from './components/modal-leyenda/modal-leyenda.component';
import { LeyendasComponent } from './components/leyendas/leyendas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ModalEstadisticasComponent } from './components/modal-estadisticas/modal-estadisticas.component';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { HerramientasComponent } from './components/herramientas/herramientas.component';
import { BotonSideComponent } from './components/boton-side/boton-side.component';
import { SideBySideComponent } from './components/side-by-side/side-by-side.component';
import { LeafletSideBySideComponent } from './components/leaflet-side-by-side/leaflet-side-by-side.component';

PlotlyModule.plotlyjs = PlotlyJS;


@NgModule({
  declarations: [
    PrincipalComponent,
    HeaderComponent,
    BotonLeyendaComponent,
    BotonCapaComponent,
    MapaComponent,
    ModalCapasBaseComponent,
    BotonesCategoriasComponent,
    ModalCapasEconomiaComponent,
    LeafletCapasBaseComponent,
    LeafletCapasEconomiaComponent,
    ModalLeyendaComponent,
    LeyendasComponent,
    EstadisticasComponent,
    ModalEstadisticasComponent,
    HerramientasComponent,
    BotonSideComponent,
    SideBySideComponent,
    LeafletSideBySideComponent
  ],
  exports: [
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PlotlyModule
  ]
})
export class GeovisorModule { }
