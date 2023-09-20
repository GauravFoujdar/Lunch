import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lunch_ordering';
  isUserAuthenticated: boolean = false;
  userName: string = '';
  sampleMenu = {
    menu: {
      date: '20/09/2023',
      items: [
        {
          name: 'Char grilled Moroccan Paneer Thali',
          category: 'vegetarian',
          vendor: 'FreshMenu',
          description: '',
        },
        {
          name: 'Stir fried Paneer Quinoa Bowl',
          category: 'vegetarian',
          vendor: 'FreshMenu',
          description: '',
        },
        {
          name: 'Philly Style Pulled Chicken Thali',
          category: 'non-vegetarian',
          vendor: 'FreshMenu',
          description: '',
        },
        {
          name: 'Asian Hot Chicken Quinoa Bowl',
          category: 'non-vegetarian',
          vendor: 'FreshMenu',
          description: '',
        },
        {
          name: 'Irish Apple Cake',
          category: 'dessert',
          vendor: 'FreshMenu',
          description: '',
        },
      ],
    },
  };
  sampleOrder: any = {
    order: {
      userId: 3,
      date: '13/09/2023',
      items: [
        '7f6bf7f8-4c2a-422f-a09e-ff893e9ad030',
        'ddcf7dc5-559a-4281-bf8f-3ac1cd67793d',
      ],
    },
  };
  data: any = null;
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private auth: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.subscribeToAuthChanges();
    // this.getData();
    // this.loginData("user", "abc");
    // this.getMenuByDate("13/09/2023");
    // this.addMenuItem(this.sampleMenu);
    // this.addOrder(this.sampleOrder);
    // this.getOrderByDate('13/09/2023');
  }

  private subscribeToAuthChanges() {
    this.auth.userAuthenticated.subscribe((auth) => {
      this.isUserAuthenticated = auth;
      this.userName = this.auth.getUserName;
      console.log(this.userName);
    });
  }

  private getData() {
    this.http.get('http://localhost:3000/api/users').subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.loginData('user', 'abc');
      this.loginData('user', 'ab');
    });
  }

  private loginData(name: string, pass: string) {
    this.http
      .post('http://localhost:3000/api/login', {
        userName: name,
        password: pass,
      })
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
        this.addMenuItem(this.sampleMenu);
      });
  }

  private addMenuItem(menu: any) {
    this.http
      .post(' http://localhost:3000/api/menu', menu)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
        this.getMenuByDate('17/09/2023');
      });
  }

  private getMenuByDate(date: string) {
    this.http
      .get(`http://localhost:3000/api/menu?date=${date}`)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
        this.addOrder(this.sampleOrder);
      });
  }

  private addOrder(menu: any) {
    this.http
      .post(' http://localhost:3000/api/orders', menu)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
        // this.getMenuByDate("17/09/2023");
        this.getOrderByDate('13/09/2023');
      });
  }

  private getOrderByDate(date: string) {
    this.http
      .get(` http://localhost:3000/api/orders?date=${date}`)
      .subscribe((response) => {
        this.data = response;
        console.log(this.data);
      });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }
  logOut() {
    this.auth.setUserName = '';
    this.auth.setUserType = '';
    this.auth.setUserAuthentication = false;
  }
}
