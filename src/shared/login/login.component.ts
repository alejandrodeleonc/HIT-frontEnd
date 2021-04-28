import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/services/http-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FunctionService } from 'src/services/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private request: HttpApiService,
    private fun: FunctionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  login() {
    const data = this.form.value;

    console.log(data);

    this.request.auth
      .dinamycReq('login', 'POST',  data)
      .then((res) => {
        console.log("res ->", res);
        console.log(res);
        this.fun.toasSuccess(res.msg)
        this.fun.setUser(res.user);
        this.router.navigate(['/home']);
        localStorage.setItem('token', res.token);
      }).catch((err)=>{
        console.log("erro ->", err);
        this.fun.toasError(err.error.msg);
      });
  }
}
