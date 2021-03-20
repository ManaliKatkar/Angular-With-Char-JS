import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  registerData: any =[];
  constructor() { }

  setRegisteredData(object){
    this.registerData.push(object);
  }

  getRegisteredAllUsers(){
    return this.registerData;
  }
}
