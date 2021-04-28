import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiService } from 'src/services/http-api.service';
import { HttpClient } from '@angular/common/http';
import { ip } from 'src/environments/environment';
import { port } from 'src/environments/environment';

interface url {
  msg: string;
  urlToRedirect: string;
}
@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  ht: string ="";
  constructor(
    private route: ActivatedRoute,
    private request: HttpClient,
    private router: Router
  ) {}

   ngOnInit(): void {
    this.route.params.subscribe( (params) => {
      console.log(params.shortURl);

      if (params.shortURl) {
         this.request
          // .get(`http://${ip}:${port}/${params.shortURl}`)
          .get(`https://${ip}/${params.shortURl}`)
          .toPromise().then( (res) =>{
            const response = res as url;
            if (response?.urlToRedirect) {
              // window.location.href = response.urlToRedirect
              this.ht = response?.urlToRedirect;
              this.ht = this.ht.substring(1);

              this.ht = this.ht.substring(0, this.ht.length - 1);
              // location.replace(response.urlToRedirect);

              console.log(this.ht)

              setTimeout(() => {
                document.getElementById("red")?.click();
              }, 1000)
            }

          })
      }
    });
  }
}
