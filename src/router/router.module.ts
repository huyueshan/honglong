import { NgModule }             from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { RouteguardService } from '../router/router.service';
import { ResolveService } from '../router/resole.service';
import { HomeComponent } from '../app/page_module_1/home/home.component';
import { ChentestComponent } from '../app/page_module_1/chen_test/home.component';

// 定义常量 路由
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
		canActivate: [RouteguardService]
    }, 
    {
        path: 'chen',
        component: ChentestComponent,
		canActivate: [RouteguardService]
    }, 
	{
        path: 'detail',
        loadChildren: '../app/page_module_1/detail/detail.module#DetailModule',
		canActivate: [RouteguardService]
    },
    {
		path: '**',   // 错误路由重定向[写在最后一个],可作为404页面
		redirectTo: 'home',
		pathMatch: 'full'  // 必须要设置
	}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
  providers: [RouteguardService,ResolveService]
})

export class AppRoutingModule {
	constructor(private router:Router,private httpClient : HttpClient) { 
        let that = this
		// $.ajax({
			// type: "get",
			// url: 'https://api.github.com/orgs/angular/members?page=1&per_page=5',
			// dataType: 'json',
			// timeout: 5000, 
			// error: function (xmlHttpRequest, error) { 
				// console.log('1231')
			// }, 
			// success: function (data) {
				// for(let i=2;i<router.config.length;i++){
					// delete router.config[i].loadChildren
					// router.config[i].component = HomeComponent
				// }
				// that.router.resetConfig(router.config)
			// } 
		// });
		// this.httpClient.get('https://api.github.com/orgs/angular/members?page=1&per_page=5')  
	    // .subscribe(response => 
			// val => {  
				  
				// for(let i=2;i<router.config.length;i++){
					// delete router.config[i].loadChildren
					// router.config[i].loadChildren = HomeComponent
				// }
				// that.router.resetConfig(router.config)
				  
			  // },  
			  // error => {  
				// console.log('get请求失败', error);  
			  // }  
	    // ) 
	}
}