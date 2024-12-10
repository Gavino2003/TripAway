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

  constructor(private fb: FormBuilder, private router: Router, private toastController: ToastController) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
      password: ['', [Validators.required,Validators.minLength(8),this.passwordStrengthValidator]],
    });
  }

  emailDomainValidator(control: any) {
    const email = control.value;
    if (email && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  }

  // Validação de força da senha
  passwordStrengthValidator(control: any) {
    const password = control.value;
    if (password && !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)) {
      return { weakPassword: true };
    }
    return null;
  }
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,  
      position: 'bottom', 
    });
    toast.present();
  }
  
  async onSubmit() {
    if (this.loginForm.valid) {
      this.presentToast('Login realizado com sucesso!', 'success');
      this.router.navigate(['/home'])
      console.log('Formulário enviado com sucesso!', this.loginForm.value);
    } else {
      this.presentToast('Por favor, preencha todos os campos corretamente!', 'danger');
  
      console.log('Formulário inválido');
    }
  }
  

}
