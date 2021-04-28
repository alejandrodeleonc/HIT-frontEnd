import { Component, OnInit } from '@angular/core';
import { HttpApiService } from 'src/services/http-api.service';
import { FunctionService } from 'src/services/function.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public form: FormGroup;
  agentes: any = [];
  urlMasVisitadas: any = [];
  shortUrl: any = "";
  constructor(
    private request: HttpApiService,
    public fun: FunctionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      longUrl: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.request.mantenimiento
      .dinamycReq(`agentesWebMasUtilizados/10`, 'get')
      .then((res) => {
        console.log('res =>', res);
        this.agentes = res.top;
      });
    this.request.mantenimiento
      .dinamycReq(`misUrlsMasVisitadas/10`, 'get')
      .then((res) => {
        console.log('res =>', res.urls);
        Object.keys(res.urls).map((key) => {
          let aux = res.urls[key].shortUrl;
          console.log();
          this.urlMasVisitadas.push(aux);
        });
      });
  }

  onSubmit() {
    const c = this.form.value;

    console.log(c);
    const obj = {
      url: c.longUrl,
    };

    this.request.mantenimiento
      .dinamycReq('registrar/longUrl', 'POST', obj)
      .then((res) => {
        console.log(res);
        this.shortUrl = `https://${res.shortUrl}`
      });
  }
  // async login() {
  //   const username: string = this.form.controls.username.value;
  //   const password: string = this.form.controls.password.value;
  //   const body = new FormData();
  //   body.append('usuario', username);
  //   body.append('password', password);

  //   this.request.authenticacion.createOne(body).then((res) => {
  //     this.fun.setUser(res['persona'], (res_set) => {
  //       if (res_set) {
  //         this.router.navigate(['/admin/dashboard']);
  //         Cookies.set('usuario', username);
  //         localStorage.setItem('token', res?.token);
  //       }
  //     });
  //   }).catch((err)=>{
  //     this.fun.toasError(err.error.msg);
  //     //console.log("err =>", err.error.msg);

  //   });
}
