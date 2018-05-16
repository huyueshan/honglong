import { enableProdMode } from '@angular/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from "@angular/router";
import { SharkModule } from '@ntesmail/shark-angular2';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import "../styles/scss/index.scss";
import { AppComponent } from './app.component';
import { AppRoutingModule } from '../router/router.module';
import { RouteguardService } from '../router/router.service';
import { InterceptorService } from '../router/ljq.service';


if (ENV === 'prod') {
    enableProdMode();
}

@NgModule({
    imports: [BrowserModule, FormsModule, SharkModule, AppRoutingModule,HttpClientModule],
    declarations: [AppComponent],
	providers: [
		{provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true}
	],
    bootstrap: [AppComponent]
}) 
export class AppModule {
    constructor(public appRef: ApplicationRef,private router:Router) { 
		
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

// 启动
platformBrowserDynamic().bootstrapModule(AppModule); 
