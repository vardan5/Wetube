import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent {

  videoId!: string;
  videoData = {} as VideoDto;
  videoAvailable: boolean = false;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private userService: UserService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoData=data;
      this.videoAvailable = true;
      // this.title.setValue(this.videoData.videoName);
      // this.description.setValue(this.videoData.description);
      // this.videoStatus.setValue(this.videoData.videoStatus);

      
    });
  }


  likeVideo() {
    this.videoService.likeVideo(this.videoId).subscribe(data => {
      this.videoData.likeCount = data.likeCount;
      this.videoData.dislikeCount = data.dislikeCount;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoId).subscribe(data => {
      this.videoData.likeCount = data.likeCount;
      this.videoData.dislikeCount = data.dislikeCount;
    })
  }

  subscribeToUser(){
    this.userService.subscribeToUser(this.videoData.userId)
    this.showSubscribeButton = false;
    this.showUnSubscribeButton = true;
  }

  unSubscribeToUser(){
    this.userService.unsubscribeToUser(this.videoData.userId)
    this.showSubscribeButton = true;
    this.showUnSubscribeButton = false;
  }
}
