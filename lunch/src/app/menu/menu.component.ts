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

  public vegMenu: IItems[] = [];
  public nonVegMenu: IItems[] = [];
  public DesertMenu: IItems[] = [];

  menuFormControl = new FormControl();
  desertFormControl = new FormControl();
  private menuForm = this.formBuilder.group({
    selectedMenu: this.menuFormControl,
    selectedDesert: this.desertFormControl,
  });
  
  constructor(private http: HttpClient,private formBuilder:FormBuilder,private auth:AuthenticationService,private dialog: MatDialog) {}

  ngOnInit(): void {
    // 13/09/2023
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');
    this.getMenuByDate(formattedDate);
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
      }
      else if(menuItem.category === CATEGORIES.NON_VEG){
        this.nonVegMenu.push(menuItem)
      }
      else {
        this.DesertMenu.push(menuItem)
      }
    });
  }

  submitForm(){
if(this.auth.isUserAuthenticated){

  console.log(this.menuForm)
}else{
  const dialogRef = this.dialog.open(LoginComponent, {
    width: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Dialog closed', result);
  });
}
  }

  resetForm(){
    this.menuForm.reset()
  }
}
