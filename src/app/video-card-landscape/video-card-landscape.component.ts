import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-video-card-landscape',
  templateUrl: './video-card-landscape.component.html',
  styleUrls: ['./video-card-landscape.component.css']
})

export class VideoCardLandscapeComponent {
  
  @Input()
  video!: VideoDto;

  constructor(private router: Router) {
  }
  
  navigate(){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigateByUrl("watch-video/" + this.video.videoId);
    });
    
    // this.router.navigateByUrl("watch-video/" + this.video.videoId);
  }

}
