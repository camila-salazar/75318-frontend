import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasService, Citas } from './service/citas.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  citas: Citas[] = [];

  constructor(private citasService: CitasService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas(): void {
    this.citasService.listar().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos:', data);
        this.citas = data;
      },
      error: (err) => {
        console.error('❌ Error al cargar citas:', err);
      },
    });
  }
}
