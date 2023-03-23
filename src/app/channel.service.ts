import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChannelDto } from './channel-dto';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  
  constructor(private httpClient: HttpClient) { }
  
  
  getChannel(channelName: string) {
    
    return this.httpClient.get<ChannelDto>("http://localhost:8080/api/channel/"+channelName);

  }
}
