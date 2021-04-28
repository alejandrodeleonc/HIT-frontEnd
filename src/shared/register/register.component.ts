import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpApiService } from 'src/services/http-api.service';
import { FunctionService } from 'src/services/function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private request: HttpApiService,
    private fun: FunctionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      address: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  register() {
    if (!this.form.valid) {
      this.fun.toasError('Complete el formulario');
    } else {
      const formValues = this.form.value;
      console.log(formValues);

      this.request.auth
      .dinamycReq('registrar', 'POST',  formValues)
      .then((res) => {
        this.fun.toasSuccess(res.msg)
        this.fun.setUser(res.user);
        this.router.navigate(['/']);
        localStorage.setItem('token', res.token);
      }).catch((err)=>{
        this.fun.toasError(err.error.msg);
      });

    }
  }
}

//  "name"
//  "birthDate"
//  "address"
//  "username"
//  "password"
//  "email"
