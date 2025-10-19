import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EspecializacionService, Especializacion } from './service/especializacion.service';

@Component({
  selector: 'app-especializacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './especializacion.component.html',
  styleUrls: ['./especializacion.component.scss']
})
export class EspecializacionComponent implements OnInit {

  especializaciones: Especializacion[] = [];

  constructor(private especializacionService: EspecializacionService) {}

  ngOnInit(): void {
    this.cargarEspecializaciones();
  }

  cargarEspecializaciones(): void {
    this.especializacionService.listar().subscribe({
      next: (data) => {
        this.especializaciones = data;
        console.log('Especializaciones cargadas:', this.especializaciones);
      },
      error: (err) => console.error('Error al cargar especializaciones', err)
    });
  }
}
