import { NgModule } from '@angular/core';
import { SharkModule } from '@ntesmail/shark-angular2';
import { RouterModule } from '@angular/router';
/***********components***************/
import { HomeComponent } from './home.component';

const routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        SharkModule, RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
