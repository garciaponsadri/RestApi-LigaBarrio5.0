import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Jugador } from "./models/Jugador";

@Injectable({ providedIn: "root" })
export class EquipoService {
  private url2 = "https://api-liga20-21.herokuapp.com/";
  private url = "http://localhost:3000"
  constructor(private http: HttpClient) {}
  getEquiposApi() {
    const urlget = `${this.url}/equipos`;
    return this.http.get(urlget);
  }

  addEquipo(doc: any) {
    return this.http.post(`${this.url}/equipo`, doc);
  }

  getEquipo(id: string) {
    const url = `${this.url}/equipo/${id}`;
    return this.http.get(url);
  }

  addJugador(doc: any) {
    const url = `${this.url}/jugador`;
    return this.http.post(url, doc);
  }

  updateEquipo(doc: any) {
    const url = `${this.url}/equipo/${doc.id}`;
    return this.http.put(url, doc);
  }

  deleteJugador(jugador: Jugador) {
    const url = `${this.url}/deleteJugador/${jugador.dorsal}/${jugador.equipo}`;
    return this.http.get(url);
  }

  getJugador(dorsal: string, equipo: string) {
    const url = `${this.url}/jugador/${dorsal}/${equipo}`;
    return this.http.get(url);
  }

  updateJugador(doc: any) {
    const url = `${this.url}/jugador/${doc.dorsal}/${doc.equipo}`;
    return this.http.put(url, doc);
  }
}
