import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  
  email: string = '';
  password: string = '';
  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController) {
    
  }
  
  async onSubmit() {

    if (!this.email || !this.password) {
      this.presentToast('Todos os campos têm de ser prenchidos.', 'danger');
      return;
    }
    
    

    // Verifica se o email é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.presentToast('Por favor insere um email válido.', 'danger');
      return;
    }

    

    // Processar o envio do formulário (ex: chamada de API para registro)
    console.log('Form submitted', this.email, this.password);
    this.presentToast('Login realizado com sucesso!', 'success');
    this.router.navigate(['/home']);

    
  }
  
  // Função para mostrar o Toast
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duração do Toast (2 segundos)
      color: color,  // Cor do Toast (success, danger, etc.)
      position: 'bottom', // Posição do Toast
    });
    toast.present();
  }

  

  togglePasswordVisibility(field: string, show: boolean) {
    const input = <HTMLInputElement>document.querySelector(`input[name="${field}"]`);
    if (show) {
      input.type = "text";  // Torna a senha visível
    } else {
      input.type = "password";  // Volta a esconder a senha
    }
  }

}
