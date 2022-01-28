import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HighchartsChartModule } from "highcharts-angular";

import​ {​APP_BASE_HREF​} ​from​​'@angular/common'​;

import { AppComponent } from "./app.component";
import { EquipoService } from "./equipo.service";
import { EquiposComponent } from "./equipos/equipos.component";
import { AppRoutingModule } from "./app-routing.module";
import { EquipoComponent } from "./equipo/equipo.component";
import { JugadorComponent } from "./jugador/jugador.component";
import { PichichiComponent } from "./pichichi/pichichi.component";
import { TarjetasComponent } from './tarjetas/tarjetas.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  declarations: [
    AppComponent,
    EquiposComponent,
    EquipoComponent,
    JugadorComponent,
    PichichiComponent,
    TarjetasComponent
  ],
  bootstrap: [AppComponent],
  providers: [EquipoService, {​provide:APP_BASE_HREF​, ​useValue:​​'/'​}]
})
export class AppModule {}
