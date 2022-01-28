import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EquipoService } from "../equipo.service";
import { Jugador } from "../models/Jugador";
import { Location } from "@angular/common";

@Component({
  selector: "app-jugador",
  templateUrl: "./jugador.component.html",
  styleUrls: ["./jugador.component.css"]
})
export class JugadorComponent implements OnInit {
  jugador: Jugador;
  jugadorApi = null;

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private location: Location
  ) {}

  getJugador(): void {
    let dorsal = this.route.snapshot.paramMap.get("dorsal");
    let equipo = this.route.snapshot.paramMap.get("equipo");
    console.log(equipo)
    let d = dorsal.split("&");

    //dorsal = d[0];
    //let equipo = d[1];
    console.log(dorsal, equipo);

    this.equipoService.getJugador(dorsal, equipo).subscribe(e => {
      this.jugadorApi = e;
      this.jugador = new Jugador(
        this.jugadorApi.dorsal,
        this.jugadorApi.nombre,
        this.jugadorApi.equipo,
        this.jugadorApi.partidosJugados,
        this.jugadorApi.minutosJugados,
        this.jugadorApi.golesEncajados,
        this.jugadorApi.goles,
        this.jugadorApi.asistencias,
        this.jugadorApi.tarjetasAmarillas,
        this.jugadorApi.tarjetasRojas
      );
    });
    console.log(equipo);
  }

  save(
    nombre: string,
    partidosJugados: string,
    minutosJugados: string,
    golesEncajados: string,
    goles: string,
    asistencias: string,
    tarjetasA: string,
    tarjetasR: string
  ): void {
    const nombreV = nombre.trim();
    const partidosJugadosV = parseInt(partidosJugados);
    const minutosJugadosV = parseInt(minutosJugados);
    const golesEncajadosV = parseInt(golesEncajados);
    const golesV = parseInt(goles);
    const asistenciasV = parseInt(asistencias);
    const tarjetasAV = parseInt(tarjetasA);
    const tarjetasRV = parseInt(tarjetasR);
    if (
      partidosJugadosV < 0 ||
      minutosJugadosV < 0 ||
      golesEncajadosV < 0 ||
      golesV < 0 ||
      asistenciasV < 0 ||
      tarjetasAV < 0 ||
      tarjetasRV < 0
    ) {
      return;
    }
    const doc = {
      dorsal: this.jugador.dorsal,
      nombre: nombreV,
      equipo: this.jugador.equipo,
      partidosJugados: partidosJugadosV,
      minutosJugados: minutosJugadosV,
      golesEncajados: golesEncajadosV,
      goles: golesV,
      asistencias: asistenciasV,
      tarjetasAmarillas: tarjetasAV,
      tarjetasRojas: tarjetasRV
    };
    this.equipoService.updateJugador(doc).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getJugador();
  }
}
