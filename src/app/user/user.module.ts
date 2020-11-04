import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreateComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule,

  ]
})
export class UserModule {
  // constructor() {
  //   console.log(' In Side ==> User Module')
  // }

}
