import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { VideoDto } from '../video-dto';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-suggestion-bar',
  templateUrl: './suggestion-bar.component.html',
  styleUrls: ['./suggestion-bar.component.css']
})
export class SuggestionBarComponent {
  suggestedVideos: Array<VideoDto> = [];
  getSuggestedVideosSubscription: Subscription;

  constructor(private videoService: VideoService) {
    this.getSuggestedVideosSubscription = videoService.getAllVideos().subscribe(data => {//replace later with getSuggestedVideos()
      this.suggestedVideos = data;
    });
  }
}
