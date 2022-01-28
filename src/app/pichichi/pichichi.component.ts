import { Component, OnInit } from "@angular/core";
import { EquipoService } from "../equipo.service";
import { Equipo } from "../models/Equipo";
import { Jugador } from "../models/Jugador";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-pichichi",
  templateUrl: "./pichichi.component.html",
  styleUrls: ["./pichichi.component.css"]
})
export class PichichiComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  equipos: Array<Equipo> = [];
  equiposApi = null;
  equipoTmp: any;
  jugadores: Array<Jugador> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: "#b0ffba",
      borderRadius: 15,
      spacing: [20, 20, 20, 20]
    },
    title: {
      text: "Pichichi",
      style: {
        fontFamily: "verdana",
        fontSize: "20px",
        color: "#512418"
      }
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: "Pichichi"
      }
    },

    series: [
      {
        type: "column",
        name: "Goles",
        data: [],
        color: "#512418"
      }
    ],
    noData: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "#303030"
      }
    }
  };

  constructor(private equipoService: EquipoService) {}

  getJugadores() {
    this.equipoService.getEquiposApi().subscribe(equipos => {
      this.equiposApi = equipos;
      for (let equipo of this.equiposApi) {
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
          this.jugadores.push(j);
        }
      }
      this.jugadores.sort((a, b) => (a.goles > b.goles ? -1 : 1));
      let pichichi = this.jugadores.slice(0, 10);
      this.chartOptions.xAxis["categories"] = pichichi.map(
        (x: Jugador) => x.nombre
      );
      this.chartOptions.series[0]["data"] = pichichi.map(
        (x: Jugador) => x.goles
      );

      Highcharts.chart("miGrafico01", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getJugadores();
  }
}
