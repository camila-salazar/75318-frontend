import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Especializacion {
  id?: number;
  nombre: string;
  descripcion?: string;
  codigoEspecializacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EspecializacionService {
  private apiUrl = `${environment.apiUrl}/especializacion`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Especializacion[]> {
    return this.http.get<Especializacion[]>(`${this.apiUrl}/listar`);
  }

  guardar(especializacion: Especializacion): Observable<Especializacion> {
    return this.http.post<Especializacion>(`${this.apiUrl}/guardar`, especializacion);
  }

  actualizar(id: number, especializacion: Especializacion): Observable<Especializacion> {
    return this.http.put<Especializacion>(`${this.apiUrl}/actualizar/${id}`, especializacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }
}
