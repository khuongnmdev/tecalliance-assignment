import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ToDo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getTodoList() {
    return this.httpClient
      .get<ToDo[]>('https://jsonplaceholder.typicode.com/todos')
  }
}
