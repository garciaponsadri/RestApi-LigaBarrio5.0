export class Jugador {
  private _dorsal: number;
  private _nombre: string;
  private _equipo: string;
  private _partidosJugados: number;
  private _minutosJugados: number;
  private _golesEncajados: number;
  private _goles: number;
  private _asistencias: number;
  private _tarjetasAmarillas: number;
  private _tarjetasRojas: number;

  public constructor(
    dorsal: number,
    nombre: string,
    equipo: string,
    partidosJugados: number,
    minutosJugados: number,
    golesEncajados: number,
    goles: number,
    asistencias: number,
    tarjetasAmarillas: number,
    tarjetasRojas: number
  ) {
    (this._dorsal = dorsal),
      (this._nombre = nombre),
      (this._equipo = equipo),
      (this._partidosJugados = partidosJugados),
      (this._minutosJugados = minutosJugados),
      (this._golesEncajados = golesEncajados),
      (this._goles = goles),
      (this._asistencias = asistencias),
      (this._tarjetasAmarillas = tarjetasAmarillas),
      (this._tarjetasRojas = tarjetasRojas);
  }

  get dorsal() {
    return this._dorsal;
  }
  get nombre() {
    return this._nombre;
  }
  get equipo() {
    return this._equipo;
  }
  get partidosJugados() {
    return this._partidosJugados;
  }
  get minutosJugados() {
    return this._minutosJugados;
  }
  get golesEncajados() {
    return this._golesEncajados;
  }
  get goles() {
    return this._goles;
  }
  get asistencias() {
    return this._asistencias;
  }
  get tarjetasAmarillas() {
    return this._tarjetasAmarillas;
  }
  get tarjetasRojas() {
    return this._tarjetasRojas;
  }
}
