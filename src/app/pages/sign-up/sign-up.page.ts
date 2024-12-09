import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private toastController: ToastController,
    private router: Router
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

    

    // Processar o envio do formulário (ex: chamada de API para registro)
    console.log('Form submitted', this.username, this.email, this.password);
    this.presentToast('Conta criado com sucesso!', 'success');
    this.router.navigate(['/home']);
  }

  
}
