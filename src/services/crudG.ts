import { HttpApiService } from './http-api.service';



export class CrudG<T> {
  constructor(private name: string, private serv: HttpApiService) {}
  async getAll(arg = '') {
    return (await this.serv.request({ endpoint: `${this.name}/${arg}`, method: 'get' }).toPromise()) as T[];
  }
  async getOne(arg = '') {
    return (await this.serv.request({ endpoint: `/${this.name}/${arg}`, method: 'get' }).toPromise()) as T;
  }
  async deleteOne(id = '') {
    return (await this.serv.request({ endpoint: `${this.name}/${id}`, method: 'delete' }).toPromise()) as T;
  }
  async createOne(model: T | any | any[], arg?: string ) {
    //console.log('url =>', `${this.name}/${arg}`);
    //console.log('model =>', model);
    if (!arg) {
      arg = '';
    }
    return (await this.serv.request({ endpoint: `${this.name}/${arg}`, method: 'post', data: model }).toPromise()) as T;
  }
  // async updateOne(model:   <T extends { id?: string }> (mod:T) =>{} ) {
  //   return (await this.serv.request( `${this.name}/${model.id}`,'patch',  model ).toPromise()) as T;
  // }
  async dinamycReq(arg = '', method:string, model?: any | any[]) {
    //console.log('url =>', `${arg}`);
    //console.log('model =>', model);

    const methods = ['patch', 'post', 'get', 'delete'];
    if(methods.includes(method.toLowerCase())){
      return (await this.serv.request({ endpoint: `${this.name}/${arg}`, method, data: model }).toPromise());
    }
  }
}
