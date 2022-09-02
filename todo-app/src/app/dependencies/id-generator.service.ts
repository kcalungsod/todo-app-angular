import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private _newID!: string;
  private idValidity: boolean = false;

  private idGenerator(): string {
    return Math.random().toString(16).slice(2, 9);
  }

  public generateUniqueId(): string {
    do {
      this._newID = this.idGenerator();
      this.idValidity = this.taskApiService.checkNewTaskId(this._newID);
    }
    while (this.idValidity === false)

    return this._newID;
  }

  constructor(private taskApiService: TaskService) { }
}
