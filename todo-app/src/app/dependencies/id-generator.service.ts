import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {

  public generateUniqueId(): string {
    return Math.random().toString(16).slice(2, 9);
  }
  constructor() { }
}
