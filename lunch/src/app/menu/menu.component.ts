import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IItems, IMenu } from '../models/menu';
import { CATEGORIES } from '../enums/categories.enum';
import { FormBuilder, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public menuData: IMenu | null = null;
  public isAdminUser: boolean = false;
  public canMakeOrder: boolean = false;
  public vegMenu: IItems[] = [];
  public nonVegMenu: IItems[] = [];
  public DesertMenu: IItems[] = [];
  public date: string = '';

  public ordersData =[
    {
      "userId": 1,
      "date": "20/09/2023",
      "items": [
        "e3ef423a-88d4-4284-c942-bb2e46730279",
        "cc50cb85-265d-4e1d-f754-0c4422abf592"
      ],
      "id": "fef1d3d5-6cf9-45ff-77e1-6288ba94c8bb"
    },
    {
      "userId": 1,
      "date": "20/09/2023",
      "items": [
        "e3ef423a-88d4-4284-c942-bb2e46730279",
        "cc50cb85-265d-4e1d-f754-0c4422abf592"
      ],
      "id": "a04b3e42-e017-460d-5bf7-313c11a5c783"
    },
    {
      "userId": 1,
      "date": "20/09/2023",
      "items": [
        "e3ef423a-88d4-4284-c942-bb2e46730279",
        "cc50cb85-265d-4e1d-f754-0c4422abf592"
      ],
      "id": "0abe013f-37f1-4c9f-251c-dfcc0d48f668"
    },
    {
      "userId": 1,
      "date": "20/09/2023",
      "items": [
        "e3ef423a-88d4-4284-c942-bb2e46730279",
        "8bc0e9ae-043a-40c2-532c-f9e23b2f45a0"
      ],
      "id": "a5397f0b-48cb-4d2c-b545-307f7246395e"
    },
    {
      "userId": 1,
      "date": "20/09/2023",
      "items": [
        "e3ef423a-88d4-4284-c942-bb2e46730279",
        "8bc0e9ae-043a-40c2-532c-f9e23b2f45a0"
      ],
      "id": "1e99ee0e-b612-455d-3f55-416f2d7b0889"
    }
  ]

  menuFormControl = new FormControl();
  desertFormControl = new FormControl();
  private menuForm = this.formBuilder.group({
    selectedMenu: this.menuFormControl,
    selectedDesert: this.desertFormControl,
  });

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const today = new Date();
    this.date = today.toLocaleDateString('en-GB');
    this.getMenuByDate(this.date);
    this.subscribeToAuthChanges();
    this.checkTime();
  }
  checkTime() {
    const currentTime = new Date();
    const startTime = new Date(currentTime);
    startTime.setHours(9, 0, 0);
    const endTime = new Date(currentTime);
    endTime.setHours(11, 0, 0);
    if (currentTime >= startTime && currentTime <= endTime) {
      this.canMakeOrder = false;
    } else {
      this.canMakeOrder = true;
    }
  }

  private subscribeToAuthChanges() {
    this.auth.userAuthenticated.subscribe(() => {
      this.isAdminUser = this.auth.userType === 'admin';
      console.log(this.isAdminUser);
    });
  }
  private getMenuByDate(date: string) {
    this.http
      .get<IMenu>(`http://localhost:3000/api/menu?date=${date}`)
      .subscribe((response) => {
        this.menuData = response;
        this.setMenuData(this.menuData);
      });
  }

  private setMenuData(menuData: IMenu) {
    menuData.items.forEach((menuItem) => {
      if (menuItem.category === CATEGORIES.VEG) {
        this.vegMenu.push(menuItem);
      } else if (menuItem.category === CATEGORIES.NON_VEG) {
        this.nonVegMenu.push(menuItem);
      } else {
        this.DesertMenu.push(menuItem);
      }
    });
  }

  submitForm() {
    if (this.auth.isUserAuthenticated) {
      console.log(this.menuForm);

      const order = {
        order: {
          userId: 1,
          date: this.date,
          items: [this.desertFormControl.value, this.menuFormControl.value],
        },
      };
      console.log(order);
      this.http
        .post(' http://localhost:3000/api/orders', order)
        .subscribe((response) => {
          this.getOrderByDate(this.date);
          console.log(response);
          this.menuForm.reset();
        });
    } else {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '500px',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('Dialog closed', result);
      });
    }
  }

  resetForm() {
    this.menuForm.reset();
  }
  private getOrderByDate(date: string) {
    this.http
      .get(` http://localhost:3000/api/orders?date=${date}`)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
