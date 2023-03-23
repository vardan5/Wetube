import { Component, Input, OnInit } from '@angular/core';
import { ChannelDto } from '../channel-dto';
import { UserService } from '../user.service';


@Component({
  selector: 'app-channel-card',
  templateUrl: './channel-card.component.html',
  styleUrls: ['./channel-card.component.css']
})
export class ChannelCardComponent implements OnInit{

  @Input()
  channelData={} as ChannelDto;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  cardAvailable: boolean = false;

  constructor(private userService: UserService) {
    
  }
  ngOnInit(): void {
    console.warn("ChannelName: "+this.channelData.channelName);
    
    if(this.channelData.channelName !== ""){
      this.cardAvailable = true;
    }
  }

  formatNumber(num: number): string {
    var s = "0";
    if (num < 1000) {
      s = num.toString();
    } else if (num < 1000000) {
      s = (num / 1000).toFixed(1) + "K";
    } else if (num < 1000000000) {
      s = (num / 1000000).toFixed(1) + "M";
    } else if (num < 1000000000000) {
      s = (num / 1000000000).toFixed(1) + "B";
    } else {
      s = (num / 1000000000000).toFixed(1) + "T";
    }
    
    return s + " subscribers";
  }

  subscribeToUser(){
    this.userService.subscribeToUser(this.channelData.userId)
    this.showSubscribeButton = false;
    this.showUnSubscribeButton = true;
  }

  unSubscribeToUser(){
    this.userService.unsubscribeToUser(this.channelData.userId)
    this.showSubscribeButton = true;
    this.showUnSubscribeButton = false;
  }
}
