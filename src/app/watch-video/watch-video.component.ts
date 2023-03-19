import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';
import { Subscription } from 'rxjs';
import { UserDto } from '../user-dto';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit{

  videoId!: string;
  videoData = {} as VideoDto;
  userData = {} as UserDto;
  videoAvailable: boolean = false;
  showSubscribeButton: boolean = true;
  showUnSubscribeButton: boolean = false;
  paramSubscription!: Subscription;
  formattedSubCount=0

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService, private userService: UserService) {
    
    var x = this.activatedRoute.snapshot.params['videoId'];
    if(x === null){
      console.warn("Null videoId")
      //REDIRECT_ERROR
    }
    else{
      this.videoId=x;
      this.videoService.getVideo(x).subscribe(data => {
        this.videoData=data;
        if(this.videoData.videoId === null){
          console.warn("Wrong videoId")
          //REDIRECT_ERROR
        }
        else{
          this.videoAvailable = true;            
        }
      });

      //TestUserData
      this.userData.id="testId";
      this.userData.sub="testSub";
      this.userData.firstName="Vishnu";
      this.userData.lastName="Vardan";
      this.userData.fullName="Vishnu Vardan";
      this.userData.email="vishnuvs7619@kristujayanti.com";
      this.userData.profilePicUrl="https://lh3.googleusercontent.com/a/AGNmyxZFgBjFshpxqJ9SnjN5KAzD8YskwF4d5Cofzro-KQ=s360";
      this.userData.subscribersCount=1395634;
      
    }
  }
  ngOnInit(): void {
    // var x: string | null = null;
    // this.activatedRoute.paramMap.subscribe(params => {
    //   x=params.get('videoId');
    //   this.videoId = x==null?"wrongParam":x;
    //   console.warn("videoId received in Query: "+x)
    // })
    
    // if(x === null || x==="wrongParam"){
    //   console.warn("Wrong videoId")
    //   //REDIRECT_ERROR
    // }
    // else{
    //   this.videoService.getVideo(this.videoId).subscribe(data => {
    //     this.videoData=data;
    //     if(this.videoData.videoId == undefined){
    //       console.warn("Wrong videoId")
    //       //REDIRECT_ERROR
    //     }
    //     else{
    //       this.videoAvailable = true;
    //     }
    //   });
      
    // }
    
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

  loadVideoDetails(){
    
  }


  likeVideo() {
    this.videoService.likeVideo(this.videoData.videoId).subscribe(data => {
      this.videoData.likeCount = data.likeCount;
      this.videoData.dislikeCount = data.dislikeCount;
    })
  }

  dislikeVideo() {
    this.videoService.dislikeVideo(this.videoData.videoId).subscribe(data => {
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
