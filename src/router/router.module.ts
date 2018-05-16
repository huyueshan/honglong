import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { RouteguardService } from '../router/router.service';
import { ResolveService } from '../router/resole.service';


// 定义默认 路由
const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: '../app/page_module_1/home/home.module#HomeModule',
		canActivate: [RouteguardService]
    }, 
	{
        path: 'detail',
        loadChildren: '../app/page_module_1/detail/detail.module#DetailModule',
		canActivate: [RouteguardService]
    },
	{
        path: 'test',
        loadChildren: '../app/page_module_1/test/detail.module#DetailModule',
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
	}
}