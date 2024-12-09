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
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private toastController: ToastController) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      // Exibir Toast de sucesso
      const toast = await this.toastController.create({
        message: 'Login realizado com sucesso!',
        duration: 2000,
        color: 'success', // cor do toast
        position: 'bottom', // posição do toast
      });
      toast.present();

      console.log('Formulário enviado com sucesso!', this.loginForm.value);
    } else {
      // Exibir Toast de erro
      const toast = await this.toastController.create({
        message: 'Por favor, preencha todos os campos corretamente!',
        duration: 2000,
        color: 'danger', // cor do toast
        position: 'bottom',
      });
      toast.present();

      console.log('Formulário inválido');
    }
  }

}
