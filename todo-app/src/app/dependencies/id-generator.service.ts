import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private _newID: string = this.idGenerator();
  private idValidity: boolean = false;

  private idGenerator(): string {
    return Math.random().toString(16).slice(2, 9);
  }

  public generateUniqueId(): string {
    while (this.idValidity === false) {
      this.idValidity = this.taskApiService.checkNewTaskId(this._newID);
      if (this.idValidity === true) { break; }
      this._newID = this.idGenerator();
    }

    return this._newID;
  }

  constructor(private taskApiService: TaskService) { }
}
