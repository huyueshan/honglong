import { Component } from '@angular/core';
import { AuthService } from '../../../router/user.service';


@Component ({
    selector: 'chen_noloading',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class Chentest2Component {
    public text;
    constructor( private authserve: AuthService){}
    isloading(){
        this.text = this.authserve.isLoggedIn;
        console.log('登录状态' + this.authserve.isLoggedIn)
    }
    toloading(){
        this.authserve.login();
        this.isloading();
    }
	
};