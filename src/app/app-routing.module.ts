import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component'
import { RegisterComponent} from './register/register.component'
import { MainPageComponent} from './main-page/main-page.component'

// route file defined
const routes: Routes = [
  {
    path: '',pathMatch:'full',redirectTo:'login',
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    path: 'register',component: RegisterComponent
  },
  {
    path: 'dashboard',component: MainPageComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
