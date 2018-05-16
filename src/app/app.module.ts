import { enableProdMode } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from "@angular/router";
import { SharkModule } from '@ntesmail/shark-angular2';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Http, ResponseOptions,Headers,HttpModule,URLSearchParams } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { HomeComponent } from '../app/page_module_1/home/home.component';
import { ChentestComponent } from './page_module_1/chen_test/home.component';
import { Chentest1Component } from './page_module_1/chen_test.1/home1.component';
import { Chentest2Component } from './page_module_1/chen_test.2/home2.component';

import { AppRoutingModule } from '../router/router.module';
import { AuthService } from '../router/user.service';

import { ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

if (ENV === 'prod') {
    enableProdMode();
}

@NgModule({
    imports: [BrowserModule, FormsModule, SharkModule,HttpModule, AppRoutingModule,HttpClientModule],
    declarations: [AppComponent, HomeComponent,ChentestComponent,Chentest1Component,Chentest2Component],
    providers:[AuthService],
    bootstrap: [AppComponent]
}) 
export class AppModule {
    constructor(public appRef: ApplicationRef,private http: Http,private router:Router) { 
		
	}
	
	//此部分用来调试，查看报错位置
    hmrOnInit(store: any) {
		
    }
    hmrOnDestroy(store: any) {
        let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement)
        store.disposeOldHosts = createNewHosts(cmpLocation)
        removeNgStyles()
    }
    hmrAfterDestroy(store: any) {
        store.disposeOldHosts()
        delete store.disposeOldHosts
    }
	//end
}

