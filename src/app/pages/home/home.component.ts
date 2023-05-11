import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, first, map, of, switchMap } from 'rxjs';
import { ToDo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private readonly _todoList$ = new BehaviorSubject<ToDo[]>([]);

  public readonly todoList$: Observable<ToDo[]>;

  constructor(
    protected readonly userService: UserService,
    protected readonly todoService: TodoService,
    private readonly router: Router,
  ) {
    this.todoList$ = this._todoList$.asObservable();
  }

  ngOnInit() {
    this.getTodoList();
  }

  protected logout(): void {
    of(null).pipe(
      map(() => this.userService.logout()),
      switchMap(() => this.router.navigateByUrl('auth')),
      first(),
    ).subscribe()
  }

  protected trackTodo(index: number, item: ToDo) {
    return item.id;
  }

  protected edit(item: ToDo) {

  }

  protected delete(item: ToDo) {


  }
  private getTodoList() {
    this.todoService.getTodoList().pipe(
      map(todoList => this._todoList$.next(todoList))
    ).subscribe()
  }

}
