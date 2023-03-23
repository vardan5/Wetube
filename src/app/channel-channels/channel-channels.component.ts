import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChannelDto } from '../channel-dto';
import { ChannelService } from '../channel.service';

@Component({
  selector: 'app-channel-channels',
  templateUrl: './channel-channels.component.html',
  styleUrls: ['./channel-channels.component.css']
})
export class ChannelChannelsComponent {
  
  @Input()
  channelNameList: Array<string> = [];
  channelList: Array<ChannelDto> = [];
  channelsAvailable:boolean = false;


  constructor(private channelService: ChannelService, private activatedRoute: ActivatedRoute) {
           
  }
  ngOnInit(): void {
    console.warn(this.channelNameList.length); 
    
    if(this.channelNameList.length>0){
      this.channelNameList.forEach(channelName => {
        this.channelService.getChannel(channelName).subscribe(data=>
          {
            this.channelList.push(data);
            //console.warn(data.videoName);
          });
        this.channelsAvailable=true;  
      });
    }
  }
}
