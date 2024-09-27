import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,  
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class ContactComponent {

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
