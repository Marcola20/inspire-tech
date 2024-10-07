import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-form-vagas',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-vagas.component.html',
  styleUrl: './form-vagas.component.css'
})
export class FormVagasComponent {
  formData = {
    nome: '',
    email: '',
    telefone: '',
    vagas: [] as string[] 
  };
  selectedFile: File | null = null;
  statusMessage: string = ''; 
  isError: boolean = false;   
  @ViewChild('fileInput') fileInputRef!: ElementRef;

  constructor(public http: HttpClient) {}

  updateSelectedVagas(vaga: string, event: any) {
    if (event.target.checked) {
      this.formData.vagas.push(vaga);
    } else {
      const index = this.formData.vagas.indexOf(vaga);
      if (index > -1) {
        this.formData.vagas.splice(index, 1);
      }
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(form: NgForm) {
    const requestData = new FormData();
    requestData.append('nome', this.formData.nome);
    requestData.append('email', this.formData.email);
    requestData.append('telefone', this.formData.telefone);
    this.formData.vagas.forEach((vaga, index) => {
      requestData.append(`vagas[${index}]`, vaga);
    });

   // Anexa o arquivo ao FormData
    if (this.selectedFile) {
      requestData.append('curriculo', this.selectedFile, this.selectedFile.name);
    } else {
      this.statusMessage = 'Por favor, anexe seu currículo.';
      this.isError = true;
      return;
    }
    this.http.post('http://localhost:5000/send-email-vagas', requestData).subscribe(
      (response: any) => {
        console.log('E-mail enviado com sucesso:', response);
        this.statusMessage = 'E-mail enviado com sucesso!';
        this.isError = false; 
  
        form.resetForm(); 
        this.formData.vagas = []; 
        // Limpa o campo de arquivo usando ViewChild
        this.fileInputRef.nativeElement.value = '';

        const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
      },
      (error) => {
        console.error('Erro ao enviar o e-mail:', error);
        this.statusMessage = 'Erro ao enviar o e-mail. Por favor, tente novamente.';
        this.isError = true;
      }
    );
  }

  formatPhone(event: any) {
    let input = event.target.value.replace(/\D/g, '');

    if (input.length > 11) {
      input = input.substring(0, 11);
    }

    if (input.length === 0) {
      event.target.value = '';
      return;
    }

    if (input.length > 10) {
      input = input.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (input.length > 6) {
      input = input.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (input.length > 2) {
      input = input.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else {
      input = input.replace(/^(\d{0,2})/, '($1');
    }

    event.target.value = input;
  }

  
}
