import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  todo: Todo = {titulo: '', descricao: '',dataParaFinalizar: new Date(),
  finalizado: false
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }

  create(): void {
    //ao cliclar em criar sera primeiramente formatado a data
    this.formataData();
    this.service.create(this.todo).subscribe((resposta)=>{
      this.service.message('Tarefa Criada com Sucesso');
      this.router.navigate([''])
    },err=>{
      this.service.message('Falha na criação da Tarefa');
      this.router.navigate([''])
    })
  }

  cancel(): void{
    this.router.navigate([''])
  }

  formataData(): void{
    let data = new Date(this.todo.dataParaFinalizar);
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
  
}
