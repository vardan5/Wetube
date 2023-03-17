import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private activatedRoute: ActivatedRoute, private videoService: VideoService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoData=data;
      this.videoAvailable = true;
      // this.title.setValue(this.videoData.videoName);
      // this.description.setValue(this.videoData.description);
      // this.videoStatus.setValue(this.videoData.videoStatus);
      
    });
  }
}
