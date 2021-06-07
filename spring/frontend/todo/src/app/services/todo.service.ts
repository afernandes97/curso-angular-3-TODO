import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';



//responsavel por fazer a comunicacao com o beck end e criar os metodos
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  //metodo responsavel por recuperar todos os dados da api
  //utilizando observable
  findAll(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl);
  }

  findById(id: any): Observable<Todo>{
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Todo>(url);

  }

  delete(id: any): Observable<void>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url)
  }

  update(todo: Todo): Observable<Todo>{
    const url = `${this.baseUrl}/${todo.id}`
    return this.http.put<Todo>(url, todo);

  }

  create(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.baseUrl, todo)
  }

  message(msg: string): void{
    this.snack.open(`${msg}`, 'OK',{
    horizontalPosition: 'end',
    verticalPosition:'top',
    duration: 4000}
    )
  }
}
