import { Component, OnInit } from '@angular/core';
import { ChannelDto } from '../channel-dto';
import { ChannelService } from '../channel.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-user-channel',
  templateUrl: './user-channel.component.html',
  styleUrls: ['./user-channel.component.css']
})
export class UserChannelComponent implements OnInit{

  channelName: string="";
  channelAvailable: boolean= false;
  channelData= {} as ChannelDto;
  channelVideos: Array<VideoDto> = [];
  subscribersCount=0;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;

  openedTab:number = 0;

  constructor(private channelService: ChannelService, private activatedRoute: ActivatedRoute, private userService: UserService, private videoService: VideoService) {

    var x = this.activatedRoute.snapshot.params['channelName'];
    if(x === null){
      console.warn("Null channelName")
      //REDIRECT_ERROR
    }
    else{
      this.channelName=x;
      this.channelService.getChannel(x).subscribe(data => {
        this.channelData=data;
        if(this.channelData.channelName === null){
          console.warn("Wrong videoId")
          //REDIRECT_ERROR
        }
        else{ 
          this.subscribersCount=this.channelData.subscribers.length;
          this.channelAvailable = true;    
        }




      });
    }
  }
  ngOnInit(): void {
    
  }

  setOpenedTab(num: number){
    this.openedTab=num;
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
