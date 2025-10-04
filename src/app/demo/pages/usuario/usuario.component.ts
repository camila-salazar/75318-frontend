import { Component } from '@angular/core';
import { UsuarioService } from './service/usuario.service';
import { Usuario } from './models/usuario';
import { CommonModule } from '@angular/common';

import Swal from 'sweetalert2';
// Importa los objetos necesarios de Bootstrap
import Modal from 'bootstrap/js/dist/modal';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  mostrarPassword: boolean = false;
  modalInstance: Modal | null = null;
  modoFormulario: string = '';
  usuarios: Usuario[] = [];
  titleModal: string = '';
  titleBoton: string = '';
  usuarioSelected: Usuario;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    pass: new FormControl(''),
    rol: new FormControl(''),
    activo: new FormControl('')
  });

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly formBuilder: FormBuilder
  ) {
    this.listarUsuarios();
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      pass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)], [this.passwordAsyncValidator]],
      rol: ['', [Validators.required]],
      activo: [true]
    });
  }

  passwordAsyncValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const contrasenasProhibidas = ['123456', 'password', 'admin'];

    return of(contrasenasProhibidas.includes(control.value)).pipe(
      delay(800), // simulamos llamada a servidor
      map((invalida) => (invalida ? { passwordProhibida: true } : null))
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  listarUsuarios() {
    console.log('Listando Usuarios..');
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: (error) => {
        console.error('Error al listar usuarios', error);
      }
    });
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  openModal(modo: string) {
    this.titleModal = modo === 'C' ? 'Crear Usuario' : 'Editar Usuario';
    this.titleBoton = modo === 'C' ? 'Guardar Usuario' : 'Actualizar Usuario';
    this.modoFormulario = modo;
    const modalElement = document.getElementById('modalCrearUsuario');
    if (modalElement) {
      // Verificar si ya existe una instancia del modal
      this.modalInstance ??= new Modal(modalElement);
      this.modalInstance.show();
    }
  }

  abrirNuevoUsuario() {
    this.usuarioSelected = new Usuario();
    this.limpiarFormulario();
    // Dejamos el formulario en blanco
    this.openModal('C');
  }

  abrirEditarUsuario(usuario: Usuario) {
    this.limpiarFormulario();
    this.usuarioSelected = usuario;
    this.openModal('E');
  }

  guardarUsuario() {
    if (this.modoFormulario === 'C') {
      this.form.get('activo')?.setValue(true);
    }
    if (this.form.invalid) {
      // Manejar el formulario inválido
      Swal.fire('Error', 'Por favor, corrige los errores en el formulario.', 'error');
      return;
    }

    if (this.modoFormulario === 'C') {
      // Modo Creación
      this.usuarioService.guardarUsuario(this.form.getRawValue()).subscribe({
        next: (data) => {
          console.log(data);
          if (data.status === 200) {
            Swal.fire('Éxito', data.mensaje, 'success');
            this.closeModal();
            this.listarUsuarios();
          } else {
            Swal.fire('Error', data.mensaje, 'error');
          }
        },
        error: (error) => {
          console.error('Error al guardar usuario', error);
          Swal.fire('Error', error.error.message, 'error');
        }
      });
    } else {
      // Modo Edición
    }
  }

limpiarFormulario() {
  this.form.reset();
  this.form.markAsPristine();
  this.form.markAsUntouched();
}

}
