import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { JuegoService, Topo } from '../core/services/juego.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  topos: Topo[]
  numeroRandom: Observable<number>;
  subscription: Subscription | null = null;
  score: number = 0;

  constructor(
    private juegoService: JuegoService,
    private renderer: Renderer2
    ) {
    this.topos = juegoService.getTopos(5)
    this.numeroRandom = this.juegoService.random;
    this.subscription = this.juegoService.random.subscribe((r) =>{
      this.changeStatus(r.toString())
      console.log(this.topos)
    })
  }

  ngOnInit(): void {

    console.log(this.topos)
    console.log(this.numeroRandom)
  }

  ngOnDestroy():void{

  }

  changeStatus(r:string) {

    this.topos.forEach(t => {
      if(t.id === r) t.status = true;
      setTimeout(()=>{
        t.status = false
      },500)

    })
  }

  handleScore(){
    this.score += 1
  }
}
