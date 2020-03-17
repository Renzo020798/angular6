import { NgModule } from '@angular/core';
import { PaginationModule } from 'ng2-bootstrap/pagination';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
 
@NgModule({
  imports: [
    PaginationModule.forRoot(),
    CommonModule,
    FormsModule,
    NgbModule,
    EditorModule
  ],
  declarations: [
  ],
  exports: [
  ],
   providers: [
   ]
})
export class ModalsModule { }
