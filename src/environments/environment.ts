
import { webSocket } from 'rxjs/webSocket';
// export const ip = 'backend.petcitydo.me';

export const ip = 'localhost';//local
export const port = 7000;// local




export const environment = {
  production: false,
  sever_url: `http://${ip}:${port}/api/v1`, // local
  sever_urlImg: `http://${ip}:${port}/`, // local
  ipWebSocket:`ws:${ip}:${port}`,//local
  // sever_url: `https://${ip}/api/v1`, // apuntando al servidor
  // sever_urlImg: `https://${ip}/`, // apuntando al servidor
  // ipWebSocket:`wss:${ip}`,//apuntando al servidor

  // sever_url: 'https://nest-bakend.herokuapp.com/api/v1'
  // sever_url: URL_SERV
};
