import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EquipoService } from "../equipo.service";
import { Equipo } from "../models/Equipo";
import { Jugador } from "../models/Jugador";
import { Location } from "@angular/common";

import * as Highcharts from "highcharts";

@Component({
  selector: "app-equipo",
  templateUrl: "./equipo.component.html",
  styleUrls: ["./equipo.component.css"]
})
export class EquipoComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  equipo: Equipo;
  equipoApi = null;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      backgroundColor: "#b0ffba",
      plotShadow: false,
      type: "pie"
    },
    title: {
      text: "Reparto de goles en el equipo"
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    series: [
      {
        type: "pie",
        data: []
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private equipoService: EquipoService,
    private location: Location
  ) {}

  getEquipo(): void {
    let id = this.route.snapshot.paramMap.get("id");
    this.equipoService.getEquipo(id).subscribe(e => {
      this.equipoApi = e;
      let jugadores: Array<Jugador> = new Array();
      for (let jugador of this.equipoApi[0].jugadores) {
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
      this.equipo = new Equipo(
        this.equipoApi[0].id,
        this.equipoApi[0].nombre,
        this.equipoApi[0].ganados,
        this.equipoApi[0].empatados,
        this.equipoApi[0].perdidos,
        jugadores
      );
      type tDoc = {
        name: string;
        y: number;
      };

      let goles: Array<tDoc> = new Array();

      for (let j of this.equipo.jugadores) {
        let a: tDoc = {
          name: j.nombre,
          y: j.goles
        };
        goles.push(a);
      }

      console.log(goles);

      this.chartOptions.series[0]["data"] = goles;
      this.chartOptions.series[0]["name"] = "Goles";

      Highcharts.chart("miGrafico01", this.chartOptions);
    });
  }

  add(
    dorsal: string,
    nombre: string,
    partidosJugados: string,
    minutosJugados: string,
    golesEncajados: string,
    goles: string,
    asistencias: string,
    tarjetasAmarillas: string,
    tarjetasRojas: string
  ) {
    const dorsalV = parseInt(dorsal);
    const nombreV = nombre.trim();
    const partidosJugadosV = parseInt(partidosJugados);
    const minutosJugadosV = parseInt(minutosJugados);
    const golesEncajadosV = parseInt(golesEncajados);
    const golesV = parseInt(goles);
    const asistenciasV = parseInt(asistencias);
    const tarjetasAmarillasV = parseInt(tarjetasAmarillas);
    const tarjetasRojasV = parseInt(tarjetasRojas);

    if (
      dorsalV < 0 ||
      partidosJugadosV < 0 ||
      minutosJugadosV < 0 ||
      golesEncajadosV < 0 ||
      golesV < 0 ||
      asistenciasV < 0 ||
      tarjetasAmarillasV < 0 ||
      tarjetasRojasV < 0
    ) {
      return;
    }

    const newDoc: any = {
      dorsal: dorsalV,
      nombre: nombreV,
      equipo: this.equipo.id,
      partidosJugados: partidosJugadosV,
      minutosJugados: minutosJugadosV,
      golesEncajados: golesEncajadosV,
      goles: golesV,
      asistencias: asistenciasV,
      tarjetasAmarillas: tarjetasAmarillasV,
      tarjetasRojas: tarjetasRojasV
    };

    this.equipoService.addJugador(newDoc).subscribe(j => {
      const jugadorTmp: any = newDoc;
      this.equipo.jugadores.push(jugadorTmp);
    });
  }

  save(ganados: string, empatados: string, perdidos: string): void {
    const ganadosV = parseInt(ganados);
    const empatadosV = parseInt(empatados);
    const perdidosV = parseInt(perdidos);
    if (ganadosV < 0 || empatadosV < 0 || perdidosV < 0) {
      return;
    }
    const doc = {
      id: this.equipo.id,
      nombre: this.equipo.nombre,
      ganados: ganadosV,
      empatados: empatadosV,
      perdidos: perdidosV
    };
    this.equipoService.updateEquipo(doc).subscribe(() => this.goBack());
  }

  delete(jugador: Jugador): void {
    this.equipo.jugadores.forEach((j, index) => {
      if (j === jugador) this.equipo.jugadores.splice(index, 1);
    });
    this.equipoService.deleteJugador(jugador).subscribe();
  }

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    this.getEquipo();
  }
}
