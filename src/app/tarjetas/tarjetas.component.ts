import { Component, OnInit } from "@angular/core";
import { EquipoService } from "../equipo.service";
import { Equipo } from "../models/Equipo";
import { Jugador } from "../models/Jugador";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-tarjetas",
  templateUrl: "./tarjetas.component.html",
  styleUrls: ["./tarjetas.component.css"]
})
export class TarjetasComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  equipos: Array<Equipo> = [];
  equiposApi = null;
  equipoTmp: any;
  jugadores: Array<Jugador> = [];

  chartOptions: Highcharts.Options = {
    chart: {
      type: "bar",
      backgroundColor: "#b0ffba"
    },
    title: {
      text: "Acumulación de Tarjetas"
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: "Número de Tarjetas"
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: "normal"
      }
    },
    series: [
      {
        type: "bar",
        name: "Rojas",
        data: [],
        color: "#ff0000"
      },
      {
        type: "bar",
        name: "Amarillas",
        data: [],
        color: "#f0ff00"
      }
    ]
  };
  constructor(private equipoService: EquipoService) {}

  getEquiposApi() {
    this.equipoService.getEquiposApi().subscribe(equipos => {
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
      this.chartOptions.xAxis["categories"] = this.equipos.map(
        (x: Equipo) => x.nombre
      );

      const dataSeries1 = this.equipos.map((x: Equipo) => x.amarillas);
      const dataSeries = this.equipos.map((x: Equipo) => x.rojas);
      this.chartOptions.series[0]["data"] = dataSeries;
      this.chartOptions.series[1]["data"] = dataSeries1;

      Highcharts.chart("miGrafico01", this.chartOptions);
    });
  }

  ngOnInit() {
    this.getEquiposApi();
  }
}
