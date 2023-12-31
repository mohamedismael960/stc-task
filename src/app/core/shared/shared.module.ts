import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTabsModule } from "@angular/material/tabs";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { HasAnyAuthorityDirective } from "../directives/hasAnyAuthority.directive";
import {MatMenuModule} from '@angular/material/menu';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports:[
        HasAnyAuthorityDirective,
        TranslateModule
    ],
    exports:[
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDialogModule,
        HasAnyAuthorityDirective,
        MatMenuModule,
        TranslateModule
    ],
    providers: [  
        MatDatepickerModule,  
    ],
    declarations: [
      
    ],
  })
  export class SharedModule { }