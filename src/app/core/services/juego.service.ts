import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

export interface Topo {
  id: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class JuegoService {

  private topos?: Topo[]
  private _random$ = new Subject<number>();

  constructor() {
    setInterval(() => {
      this._random$.next(this.randomNumber);
    }, 2000)
  }

  get randomNumber(): number {
    return Math.floor(Math.random() * 5)
  }

  get random(): Observable<number> {
    return this._random$.asObservable()
      .pipe(
        map(n => {
          return n
        })
      )
  }

  getTopos(cant_topos: number):Topo[]{
    this.topos = []
    for (let i = 0; i < cant_topos; i++) {
        this.topos.push({
          id : i.toString(),
          status: false
        })
    }
    return this.topos
  }

}
