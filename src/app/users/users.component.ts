import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { UsersService } from '../api/users/users.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '../api/users';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [
    TableModule,
    CardModule,
    CommonModule,
    ButtonModule,
    IconField,
    InputIcon,
    FormsModule,
    MultiSelectModule,
    InputTextModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  private readonly usersService: UsersService = inject(UsersService);

  pageOptions: Signal<number[]> = signal([25, 50, 100]);
  isLoading = signal<boolean>(true);
  selectedUsers = signal<User[]>([]);
  searchValue: string = '';

  users: Signal<User[]> = toSignal(
    this.usersService
      .getUsers({
        limit: 0,
        select: 'firstName,lastName,age,address',
      })
      .pipe(tap(() => this.isLoading.set(false))),
    { initialValue: [] }
  );

  ngOnInit() {}
}
