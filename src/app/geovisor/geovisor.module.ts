import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


import { BuscadorComponent } from './components/buscador/buscador.component';
import { CapasComponent } from './components/capas/capas.component';
import { CategoriasCapasComponent } from './components/categorias-capas/categorias-capas.component';
import { CheckboxCapasComponent } from './components/checkbox-capas/checkbox-capas.component';
import { LeyendaComponent } from './components/leyenda/leyenda.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { SecComponent } from './pages/sec/sec.component';



@NgModule({
  declarations: [
    BuscadorComponent,
    CapasComponent,
    CategoriasCapasComponent,
    CheckboxCapasComponent,
    LeyendaComponent,
    MapaComponent,
    PrincipalComponent,
    SecComponent
  ],
  exports: [
    PrincipalComponent,
    SecComponent,
    LeyendaComponent,
    CapasComponent,
    BuscadorComponent,
    CategoriasCapasComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule
  ]
})
export class GeovisorModule { }
