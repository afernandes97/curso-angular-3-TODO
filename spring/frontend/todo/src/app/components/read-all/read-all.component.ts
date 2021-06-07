import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  //instanciando lista de Todo
  list: Todo[] = [];

  //todos fechados
  closed = 0;

  //lista de itens finalizados
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  //recuperar valores do service e fazer um databinding
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if (todo.finalizado) {
          this.listFinished.push(todo);
        } else {
          this.list.push(todo);
        }

      })

      this.closed = this.listFinished.length;
    });
  }

  finalizar(item: Todo): void {
    item.finalizado = true;
    this.service.update(item).subscribe(() => {
        this.service.message('Task finalizada com sucesso!');
        this.list = this.list.filter(todo => todo.id !== item.id);
        this.closed++;
    });
}
  delete(id: any): void {
    this.service.delete(id).subscribe((resposta) => {
      //se delete deu certo, caso o id deletado nao seja encontrado é que deu certo entao seguira o if abaixo
      if (resposta === null) {
        this.service.message('Item deletado');
        //filtrando todo todo que é diferente do id deletado
        this.list = this.list.filter(todo => todo.id !== id)
      }
    })
  }


  navegarFinalizados(): void {
    this.router.navigate(['finalizados'])
  }



}
