import { Component, ViewChild } from '@angular/core';
import { SharkToastrService } from '@ntesmail/shark-angular2';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
    constructor(
        private sharkToastrService: SharkToastrService
    ) { }
    
};
