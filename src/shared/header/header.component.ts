import { HttpApiService } from 'src/services/http-api.service';
import { Component, OnInit, DoCheck, AfterViewChecked } from '@angular/core';
import { FunctionService } from 'src/services/function.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  isLogged: boolean = false;
  constructor(public fun:FunctionService, private request: HttpApiService) {}

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token') == null ? true : false;
    if(localStorage.getItem('token') != null && this.fun.getUser() == null){
      this.request.auth.dinamycReq("persona", "get").then((res) =>{
        this.fun.setUser(res)
      });
    }
  }

  signOut(){
    localStorage.removeItem('token');
    location.reload();
  }
}
