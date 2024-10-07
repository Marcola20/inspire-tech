import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class ContactComponent {
  formData = {
    nome: '',
    empresa: '',
    email: '',
    telefone: '',
    servicos: [] as string[],  
    mensagem: ''
  };
  statusMessage: string = ''; 
  isError: boolean = false;   

  constructor(public http: HttpClient) {}

  updateSelectedServices(service: string, event: any) {
    if (event.target.checked) {
      this.formData.servicos.push(service);
    } else {
      const index = this.formData.servicos.indexOf(service);
      if (index > -1) {
        this.formData.servicos.splice(index, 1);
      }
    }
  }

  onSubmit(form: NgForm) {
    const requestData = {
      ...this.formData,
      servicos: this.formData.servicos,
    };
  
    this.http.post('http://localhost:5000/send-email', requestData).subscribe(
      (response: any) => {
        console.log('E-mail enviado com sucesso:', response);
        this.statusMessage = 'E-mail enviado com sucesso!';
        this.isError = false; 
  
        form.resetForm(); 
        this.formData.servicos = []; 
  
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
