import { Component, OnInit } from "@angular/core";
import { EquipoService } from "../equipo.service";
import { Equipo } from "../models/Equipo";
import { Jugador } from "../models/Jugador";
@Component({
  selector: "app-equipos",
  templateUrl: "./equipos.component.html",
  styleUrls: ["./equipos.component.css"]
})
export class EquiposComponent implements OnInit {
  equipos: Array<Equipo> = [];
  equiposApi = null;
  equipoTmp: any;
  constructor(private equipoService: EquipoService) {}

  getEquiposApi() {
    this.equipoService.getEquiposApi()
    .subscribe(equipos => {
      console.log("EQUIPOS: ")
      console.log(equipos)
      this.equiposApi = equipos;
      for (let equipo of this.equiposApi) {
        let jugadores: Array<Jugador> = new Array();
        for (let jugador of equipo.jugadores) {
          let j = new Jugador(
            jugador.dorsal,
            jugador.nombre,
            jugador.equipo,
            jugador.partidosJugados,
            jugador.minutosJugados,
            jugador.golesEncajados,
            jugador.goles,
            jugador.asistencias,
            jugador.tarjetasAmarillas,
            jugador.tarjetasRojas
          );
          jugadores.push(j);
        }
        let e = new Equipo(
          equipo.id,
          equipo.nombre,
          equipo.ganados,
          equipo.empatados,
          equipo.perdidos,
          jugadores
        );
        this.equipos.push(e);
      }
      this.equipos.sort((a, b) => (a.puntos > b.puntos ? -1 : 1));
    });
  }

  add(
    id: string,
    nombre: string,
    ganados: string,
    empatados: string,
    perdidos: string
  ) {
    const idV = id.trim();
    const nombreV = nombre;
    const ganadosV = parseInt(ganados);
    const empatadosV = parseInt(empatados);
    const perdidosV = parseInt(perdidos);

    if (ganadosV < 0 || empatadosV < 0 || perdidosV < 0) {
      return;
    }

    const newDoc: any = {
      id: idV,
      nombre: nombreV,
      ganados: ganadosV,
      empatados: empatadosV,
      perdidos: perdidosV
    };

    this.equipoService.addEquipo(newDoc).subscribe(j => {
      this.equipoTmp = newDoc;
      this.equipos.push(this.equipoTmp);
    });
  }

  ngOnInit() {
    this.getEquiposApi();
  }
}
