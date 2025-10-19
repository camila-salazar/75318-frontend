import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulasService, Formulas } from './service/formulas.service';

@Component({
  selector: 'app-formulas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.scss']
})
export class FormulasComponent implements OnInit {

  formulas: Formulas[] = [];

  constructor(private formulasService: FormulasService) {}

  ngOnInit(): void {
    this.cargarFormulas();
  }

  cargarFormulas(): void {
    this.formulasService.listar().subscribe({
      next: (data) => {
        this.formulas = data;
      },
      error: (err) => {
        console.error('Error al cargar fórmulas', err);
      }
    });
  }
}
