import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Formulas {
  id?: number;
  cita_id: string;
  medicamento_id: string;
  dosis?: string;
  indicaciones?: string;
  fecha_creacion_registro?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormulasService {
  private apiUrl = `${environment.apiUrl}/receta`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Formulas[]> {
    return this.http.get<Formulas[]>(`${this.apiUrl}/listar`);
  }

  guardar(formulas: Formulas): Observable<Formulas> {
    return this.http.post<Formulas>(`${this.apiUrl}/guardar`, formulas);
  }

  actualizar(id: number, formulas: Formulas): Observable<Formulas> {
    return this.http.put<Formulas>(`${this.apiUrl}/actualizar/${id}`, formulas);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
