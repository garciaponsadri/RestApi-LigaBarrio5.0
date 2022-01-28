import { Jugador } from "./Jugador";

export class Equipo {
  private _id: string;
  private _nombre: string;
  private _ganados: number;
  private _empatados: number;
  private _perdidos: number;
  private _jugadores: Array<Jugador>;

  public constructor(
    id: string,
    nombre: string,
    ganados: number,
    empatados: number,
    perdidos: number,
    jugadores: Array<Jugador>
  ) {
    (this._id = id),
      (this._nombre = nombre),
      (this._ganados = ganados),
      (this._empatados = empatados),
      (this._perdidos = perdidos),
      (this._jugadores = jugadores);
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get ganados() {
    return this._ganados;
  }

  get empatados() {
    return this._empatados;
  }

  get perdidos() {
    return this._perdidos;
  }

  get jugadores() {
    return this._jugadores;
  }

  set nombre(nombre: string) {
    this.nombre = nombre;
  }

  set ganados(ganados: number) {
    this.ganados = ganados;
  }

  set empatados(empatados: number) {
    this.empatados = empatados;
  }

  set perdidos(perdidos: number) {
    this.perdidos = perdidos;
  }

  set jugadores(jugadores: Jugador[]) {
    this.jugadores = jugadores;
  }

  get puntos() {
    let res = this._ganados * 3 + this._empatados;
    return res;
  }

  get golesF() {
    let res = 0;
    for (let j of this.jugadores) {
      res = res + j.goles;
    }
    return res;
  }

  get golesC() {
    let res = 0;
    for (let j of this.jugadores) {
      res = res + j.golesEncajados;
    }
    return res;
  }

  get df() {
    let res = 0;
    res = this.golesF - this.golesC;
    return res;
  }

  get amarillas() {
    let res = 0;
    for (let j of this.jugadores) {
      res = res + j.tarjetasAmarillas;
    }
    return res;
  }

  get rojas() {
    let res = 0;
    for (let j of this.jugadores) {
      res = res + j.tarjetasRojas;
    }
    return res;
  }
}
