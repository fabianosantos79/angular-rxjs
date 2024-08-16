import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  campoBusca: string = ''
  listaLivros: [];
  subscription: Subscription;

  constructor(private service: LivroService) { }

  buscaLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe({
      next: retornoApi => console.log(retornoApi),
      error: erro => console.log(erro),
      complete: () => console.log("Completado com sucesso")

    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}



