import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { User } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  userName = '';

  users: User[] = [
    {
      id: 1,
      name: 'Luis',
      lastName: 'Rangel',
      email: 'luisrangel@gmail.com',
    },
    {
      id: 2,
      name: 'Ana',
      lastName: 'Pereira',
      email: 'apereira@gmail.com',
    },
    {
      id: 3,
      name: 'Sara',
      lastName: 'Loaiza',
      email: 'saralo@gmail.com',
    },
    {
      id: 4,
      name: 'Fernanda',
      lastName: 'Garcia',
      email: 'fgarcia@gmail.com',
    },
    {
      id: 5,
      name: 'Gonzalo',
      lastName: 'Muñoz',
      email: 'gmuñoz@gmail.com',
    },
    {
      id: 6,
      name: 'Michelle',
      lastName: 'Arevalo',
      email: 'amichelle@gmail.com',
    },
    {
      id: 7,
      name: 'Henry',
      lastName: 'Santiago',
      email: 'hsantiago@gmail.com',
    },
    {
      id: 8,
      name: 'Indira',
      lastName: 'Gonzalez',
      email: 'igonzalez@gmail.com',
    }
  ]

  constructor(private matDialog: MatDialog) {}

    openUsersDialog(): void {
      
      this.matDialog.open(UsersDialogComponent)
      .afterClosed ()
      .subscribe ({
        next: (v) => {
          console.log('VALOR:', v);
          if (!!v) {
            this.users = [
              ...this.users,
              {
                ...v,
                id: new Date().getTime(),
              }
            ];
          }
        },
      });

    }
    
onEditUser(user: User): void {
  this.matDialog.open(UsersDialogComponent, {
    data: user,
  }).afterClosed().subscribe({
    next: (v) => {
      if (!!v){

        const arrayNuevo = [...this.users];

        const indiceToEdit = arrayNuevo.findIndex((u) => u.id === user.id);

        arrayNuevo[indiceToEdit] = {... arrayNuevo[indiceToEdit], ... v };

        this.users = [... arrayNuevo ];
      }
    }
  });
   
}

onDeleteUser(userId: number): void {
      if (confirm ('Esta seguro?'))
      this.users = this.users.filter((u) => u.id !== userId);
    }

}
