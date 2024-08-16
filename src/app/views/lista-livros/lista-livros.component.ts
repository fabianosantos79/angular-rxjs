import { FormControl } from '@angular/forms';
import { VolumeInfo, ImageLinks, Item } from './../../models/interfaces';
import { Component, OnDestroy } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subscription, switchMap, tap } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl()
  listaLivros: Livro[]
  // subscription: Subscription
  // livro: Livro

  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(valorDigitado => valorDigitado.length >= 3),
    tap(() => console.log("Fluxo inicial ")),
    distinctUntilChanged(),
    switchMap(valorDigitado => this.service.buscar(valorDigitado)),
    tap(resposta => console.log(resposta)),
    map(items => {
            this.listaLivros = this.livrosResultadosParaLivros(items)
        })
  )

  // buscaLivros(){
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: items => {
  //       console.log("Requisicoes ao servidor");
  //       this.listaLivros = this.livrosResultadosParaLivros(items)
  //     },
  //     error: erro => console.log(erro)
  //   });
  // }

  livrosResultadosParaLivros(items: Item[]): LivroVolumeInfo[]{
    return items.map(item =>
      new LivroVolumeInfo(item)
    )}

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }
}



