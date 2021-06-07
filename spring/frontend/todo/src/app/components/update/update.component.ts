import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todo: Todo = 
  {titulo: '', 
  descricao: '',
  dataParaFinalizar: new Date(),
  finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  update(): void{
    this.formataData()
    this.service.update(this.todo).subscribe((resposta) => {
      
      this.service.message('Alterações Salvas Com Sucesso!')
      this.router.navigate([''])
      this.todo = resposta
    },err => {
      this.service.message('Erro ao alterar')
      this.router.navigate([''])
    })
  }

  findById(): void{
    this.service.findById(this.todo.id).subscribe((resposta)=> {
      this.todo = resposta
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

