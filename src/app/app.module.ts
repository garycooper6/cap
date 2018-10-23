import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ContractListComponent } from './contracts/contract-list.component';
import { StatusConverterPipe } from './shared/status-converter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContractListComponent,
    StatusConverterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
