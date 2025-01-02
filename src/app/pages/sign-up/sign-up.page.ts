import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from '../../api/Login/login.service'; // Adjust the path accordingly

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private loginService: LoginService
  
  ) {}

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

  async onSubmit() {
    
    // Verifica se todos os campos estão preenchidos
    if (!this.username || !this.email || !this.password || !this.confirmPassword) {
      this.presentToast('Todos os campos têm de ser prenchidos.', 'danger');
      return;
    }
    
    // Verifica se as senhas coincidem
    if (this.password !== this.confirmPassword) {
      this.presentToast('As passwords não coincidem.', 'danger');
      return;
    }

    // Verifica se o email é válido
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      this.presentToast('Por favor insere um email válido.', 'danger');
      return;
    }

      
    try {
      const response = await this.loginService.registerUser(this.username, this.password);
      console.log('Usuário registrado com sucesso:', response);
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
    // Processar o envio do formulário (ex: chamada de API para registro)
    console.log('Form submitted', this.username, this.email, this.password);
    this.presentToast('Conta criado com sucesso!', 'success');
    this.router.navigate(['/home']);
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
