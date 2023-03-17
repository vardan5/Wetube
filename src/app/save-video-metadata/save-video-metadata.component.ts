import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { VideoService } from '../video.service';
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { VideoDto } from '../video-dto';

@Component({
  selector: 'app-save-video-metadata',
  templateUrl: './save-video-metadata.component.html',
  styleUrls: ['./save-video-metadata.component.css']
})
export class SaveVideoMetadataComponent {
  
  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  //tags: string[] = [];
  selectedFile!: File;
  selectedFileName = '';
  videoId = '';
  fileSelected = false;
  videoData = {} as VideoDto;
  videoUrl!: string;
  
  constructor(private activatedRoute: ActivatedRoute, private videoService:VideoService, private matSnackBar:MatSnackBar) {

    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoData=data;
      this.videoUrl=data.videoUrl;
      this.title.setValue(this.videoData.videoName);
      this.description.setValue(this.videoData.description);
      this.videoStatus.setValue(this.videoData.videoStatus);
    });
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tag
    if (value) {
      this.videoData.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.videoData.tags.indexOf(value);

    if (index >= 0) {
      this.videoData.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event){
    this.fileSelected = true;
    //@ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name; 
  }

  onUpload(){
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId)
    .subscribe(data => {
      console.log(data);
      this.matSnackBar.open("Thumbnail Upload Successful", "Ok");
    })
  }

  saveVideoMetadata(){
    this.videoData.videoName = this.saveVideoDetailsForm.get('title')?.value;
    this.videoData.description = this.saveVideoDetailsForm.get('description')?.value;
    //this.videoData.tags = this.videoData.tags;
    this.videoData.videoStatus = this.saveVideoDetailsForm.get('videoStatus')?.value;
    this.videoData.dateUploaded = new Date();
    this.videoData.likeCount = 0;
    this.videoData.dislikeCount = 0;
    this.videoData.viewCount = 0;

    this.videoService.saveVideoMetadata(this.videoData).subscribe(data=> {
      this.matSnackBar.open("Video Metadata Updated Successfully", "OK")
    })
  }
}
