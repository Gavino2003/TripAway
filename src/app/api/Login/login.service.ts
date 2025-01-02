import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiUrl: string = 'https://mobile-api-one.vercel.app/api';
  travels: any[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Registra um novo utilizador.
   * @param username O username do utilizador.
   * @param password A password do utilizador.
   */
  async registerUser(username: string, password: string): Promise<any> {
    try {
      // Verifica se o utilizador já existe
      const existingUsers: any[] = await this.getAllUsers();
      const userExists = existingUsers.some(
        (user) => user.prop1 === username
      );

      if (userExists) {
        throw new Error('Usuário já existe.');
      }

      // Cria o novo utilizador
      const newUser = {
        prop1: username,
        prop2: password,
        description: 'Novo utilizador',
        type: 'lazer',
        state: 'planeamento',
        map: '',
        startAt: '',
        endAt: '',
        createdBy: username,
        prop3: '', // Pode ser preenchido com uma URL de imagem, se necessário
        isFav: false,
      };

      const response = await firstValueFrom(
        this.http.post(`${this.apiUrl}/users`, newUser, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
      );

      return response;
    } catch (error) {
      console.error('Erro ao registrar o utilizador:', error);
      throw error;
    }
  }

  /**
   * Faz o login do utilizador.
   * @param username O username do utilizador.
   * @param password A password do utilizador.
   */
  async loginUser(username: string, password: string): Promise<any> {
    try {
      const existingUsers: any[] = await this.getAllUsers();
      const user = existingUsers.find(
        (user) => user.prop1 === username && user.prop2 === password
      );

      if (!user) {
        throw new Error('Usuário ou senha inválidos.');
      }

      return user;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  /**
   * Obtém todos os utilizadores.
   */
  private async getAllUsers(): Promise<any[]> {
    try {
      const response = await firstValueFrom(
        this.http.get<any[]>(`${this.apiUrl}/users`, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
      );

      return response;
    } catch (error) {
      console.error('Erro ao buscar utilizadores:', error);
      throw error;
    }
  }
}
