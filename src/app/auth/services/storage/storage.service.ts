import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private static isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  static saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.setItem(TOKEN, token);
    }
  }

  static saveUser(user: any): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(USER);
      window.localStorage.setItem(USER, JSON.stringify(user));
    }
  }

  static getToken(): string {
    if (this.isLocalStorageAvailable()) {
      return window.localStorage.getItem(TOKEN) ?? '';
    }
    return '';
  }

  static getUser(): any {
    if (this.isLocalStorageAvailable()) {
      const user = window.localStorage.getItem(USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isAdminLoggedIn(): boolean {
    return this.getToken() !== '' && this.getUserRole() === 'ADMIN';
  }

  static isEmployeeLoggedIn(): boolean {
    return this.getToken() !== '' && this.getUserRole() === 'EMPLOYEE';
  }

  static getUserId(): string {
    const user = this.getUser();
    return user ? user.id : '';
  }

  static logout(): void {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(TOKEN);
      window.localStorage.removeItem(USER);
    }
  }

}
