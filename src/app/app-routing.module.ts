import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EquiposComponent } from "./equipos/equipos.component";
import { RouterModule, Routes } from "@angular/router";
import { EquipoComponent } from "./equipo/equipo.component";
import { JugadorComponent } from "./jugador/jugador.component";
import { PichichiComponent } from "./pichichi/pichichi.component";
import { TarjetasComponent } from "./tarjetas/tarjetas.component";

const routes: Routes = [
  { path: "clasificacion", component: EquiposComponent },
  { path: "equipo/:id", component: EquipoComponent },
  { path: "jugador/:dorsal/:equipo", component: JugadorComponent },
  { path: "pichichi", component: PichichiComponent },
  { path: "tarjetas", component: TarjetasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
