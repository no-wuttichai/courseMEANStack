import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from "@angular/forms";
import { LoginComponent } from './components/member/login/login.component';
import { RegisterComponent } from './components/member/register/register.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MenuComponent } from './components/shared/menu/menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StockCreateComponent } from './components/stock/stock-create/stock-create.component';
import { StockHomeComponent } from './components/stock/stock-home/stock-home.component';
import { StockEditComponent } from './components/stock/stock-edit/stock-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    StockCreateComponent,
    StockHomeComponent,
    StockEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    
  ], // services
  bootstrap: [AppComponent] //index.html
})
export class AppModule { }
