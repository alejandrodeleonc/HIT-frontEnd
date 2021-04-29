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
  public formC: FormGroup;
  cantidad: Number = 3;
  agentes: any = [];
  urlMasVisitadas: any = [];
  shortUrl: any = '';
  myUrls: any = [];
  constructor(
    private request: HttpApiService,
    public fun: FunctionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      longUrl: ['', [Validators.required]],
    });

    this.formC = this.fb.group({
      cantidad: [this.cantidad, [Validators.required, Validators.min(0)]],
    });

    // this.form.controls.cantidad.setValue(this.cantidad);
  }

  ngOnInit(): void {
    this.request.mantenimiento
      .dinamycReq(`agentesWebMasUtilizados/10`, 'get')
      .then((res) => {
        console.log('res =>', res);
        this.agentes = res.top;
      });

    this.loadUrlMostVisited(this.cantidad);
    this.loadAllMyUrl();
  }

  reload() {
    const value = this.formC.controls.cantidad.value;

    if (value > 0) {
      console.log(value);
      this.cantidad = value;
      this.loadUrlMostVisited(value);
    } else {
      this.fun.toasError('El Valor debe ser mayor que  cero');
    }
  }
  loadUrlMostVisited(cantidad: Number) {
    this.request.mantenimiento
      .dinamycReq(`misUrlsMasVisitadas/${cantidad}`, 'get')
      .then((res) => {
        this.urlMasVisitadas = [];
        console.log('res =>', res.urls);
        Object.keys(res.urls).map((key) => {
          let aux = res.urls[key].shortUrl;
          console.log();
          this.urlMasVisitadas.push(aux);
        });
      });
  }
  loadAllMyUrl() {
    this.request.mantenimiento
      .dinamycReq(`myUrls`, 'get')
      .then((res) => {
        this.myUrls = [];
        console.log(res);
        Object.keys(res.myUrls).map((key) => {
          let aux = res.myUrls[key].longUrl;
          console.log();
          this.myUrls.push(aux);
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
        this.shortUrl = `https://${res.shortUrl}`;
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
