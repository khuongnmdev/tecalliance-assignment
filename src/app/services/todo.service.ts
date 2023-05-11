import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDo } from '../models/todo';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getTodoListByUserId(userId: User['id']) {
    return this.httpClient
      .get<ToDo[]>(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
  }

  public addTodo(item: ToDo) {
    return this.httpClient
      .post<ToDo>('https://jsonplaceholder.typicode.com/posts', item)
  }

  public updateTodo(item: ToDo) {
    return this.httpClient
      .put<ToDo>(`https://jsonplaceholder.typicode.com/posts/${item.id}`, item)
  }

  public deleteTodo(item: ToDo) {
    return this.httpClient
      .delete<ToDo>(`https://jsonplaceholder.typicode.com/posts/${item.id}`)
  }
}
