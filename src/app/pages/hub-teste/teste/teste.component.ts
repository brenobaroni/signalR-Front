import { Component, OnInit } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr'


@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css']
})
export class TesteComponent{

  //Canal All.
  broadCast: string =  'loginGroup';
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnectionToHub();
    this.startConnection();
    this.registerOnServerEvents();
  }

  createConnectionToHub(){
    this._hubConnection = new HubConnectionBuilder()
    .withUrl('https://localhost:44342/hub/')
    .configureLogging(LogLevel.Information)
    .build();
    console.log()
  }

   startConnection(): void {
    this._hubConnection.start().then(() => {
      console.log("Hub Connection Start...");
      this.connectToLocalGroup();
    }).catch(() => {
      setTimeout(function () {this.startConnection(); }, 5000);
    });
  }

  async connectToLocalGroup(){
    this._hubConnection.invoke('ConnectToGroup', this.broadCast);
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('newLogin', (data: any) => {
      console.log('novo login realizado com o e-mail: ' + data);
    });

    this._hubConnection.on('logout', (data: any) => {
      console.log('logout realizado com o e-mail: ' + data);
    });
  }

}
