import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel-videos',
  templateUrl: './channel-videos.component.html',
  styleUrls: ['./channel-videos.component.css']
})
export class ChannelVideosComponent implements OnInit{

  //channelName: String = "";
  @Input()
  videoIdList: Array<string> = [];
  videoList: Array<VideoDto> = [];
  videosAvailable:boolean = false;


  constructor(private videoService: VideoService, private activatedRoute: ActivatedRoute) {
           
  }
  ngOnInit(): void {
    console.warn(this.videoIdList.length); 
    
    if(this.videoIdList.length>0){
      this.videoIdList.forEach(videoId => {
        this.videoService.getVideo(videoId).subscribe(data=>
          {
            this.videoList.push(data);
            //console.warn(data.videoName);
          });
        this.videosAvailable=true;  
      });
    }
  }

}
