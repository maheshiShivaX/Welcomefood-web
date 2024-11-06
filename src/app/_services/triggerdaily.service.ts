import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TriggerdailyService {

  private dataChangeSubject = new Subject<void>();

  dataChange$ = this.dataChangeSubject.asObservable();

  triggerDataChange(menutype :any) {
    
    this.dataChangeSubject.next(menutype);
  }
}
