import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, first, map, of, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from 'src/app/dialogs/edit-dialog/edit-dialog.component';
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

  public addForm: FormGroup;

  constructor(
    protected readonly userService: UserService,
    protected readonly todoService: TodoService,
    protected readonly dialog: MatDialog,
    private readonly router: Router,
    private readonly fb: FormBuilder,
  ) {
    this.todoList$ = this._todoList$.asObservable();
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(250)]],
    })
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

  protected edit(item: ToDo, index: number) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.updateTodo(result).pipe(
          switchMap(() => {
            return this._todoList$.pipe(
              first(),
              map(todoList => {
                todoList[index] = result;
                this._todoList$.next(todoList);
              })
            )
          })
        ).subscribe()
      }
    });
  }

  protected delete(item: ToDo, index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(item).pipe(
          switchMap(() => {
            return this._todoList$.pipe(
              first(),
              map(todoList => {
                todoList.splice(index, 1);
                this._todoList$.next(todoList);
              })
            )
          })
        ).subscribe()
      }
    });
  }

  protected onSubmit() {
    this.addForm.markAsTouched();
    if (this.addForm.invalid) {
      return;
    }

    of(this.addForm.value).pipe(
      switchMap(formData => this.todoService.addTodo(formData)),
      switchMap(todo => {
        return this._todoList$.pipe(
          first(),
          map(todoList => {
            todoList.push(todo);
            this._todoList$.next(todoList);
          })
        )
      })
    ).subscribe()
  }

  private getTodoList() {
    this.userService.currentUser$.pipe(
      switchMap(user => {
        if (user && user.id) {
          return this.todoService.getTodoListByUserId(user.id);
        }
        else {
          return of([]);
        }
      }),
      tap(todoList => {
        if (todoList !== undefined) {
          this._todoList$.next(todoList);
        }
      }),
    ).subscribe()
  }
}
