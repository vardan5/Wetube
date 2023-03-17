import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SaveVideoMetadataComponent } from './save-video-metadata/save-video-metadata.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';

const routes: Routes = [
  { path: 'upload-video', component: UploadVideoComponent },
  { path: 'save-video-metadata/:videoId', component: SaveVideoMetadataComponent },
  { path: 'watch-video/:videoId', component: WatchVideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
