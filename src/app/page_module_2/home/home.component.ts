import { Component } from '@angular/core';
import {Base} from '../../../factory/base.model';
import { Api } from '../../../factory/api.model';
import { SharkModule } from '@ntesmail/shark-angular2';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
	constructor(private FormsModule:FormsModule) { 
        let that = this
	}
	ngOnInit(){
		
	}
	
    tooltipContent = '用户名和密码请随便输入';
    username = '';
    filterData(value, config) {
        let arr = ['sina.com'];
        var list = [];
        if(!value){
            return list;
        }
        if (value.indexOf('@') > -1) {
            var email = value.split('@');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].indexOf(email[1]) > -1) {
                    list.push({
                        name: email[0] + '@' + arr[i]
                    });
                }
            }
        } else {
            for (var i = 0; i < arr.length; i++) {
                list.push({
                    name: value + '@' + arr[i]
                });
            }
        }
        return list;
    }
};
