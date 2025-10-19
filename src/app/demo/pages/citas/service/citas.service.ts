import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Citas {
  id: number;
  paciente_id: number;
  medico_id: number;
  motivo: string;
  fecha_hora: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = 'http://localhost:8000/clinica/v1/citas/listar';

  constructor(private http: HttpClient) {}

  listar(): Observable<Citas[]> {
    return this.http.get<Citas[]>(this.apiUrl);
  }
}
