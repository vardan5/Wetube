import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SaveVideoMetadataComponent } from './save-video-metadata/save-video-metadata.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { HomeComponent } from './home/home.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { HistoryComponent } from './history/history.component';
import { LikedVideosComponent } from './liked-videos/liked-videos.component';
import { FeaturedComponent } from './featured/featured.component';
import { CallbackComponent } from './callback/callback.component';
import { UserChannelComponent } from './user-channel/user-channel.component';
import { ChannelPlaylistsComponent } from './channel-playlists/channel-playlists.component';
import { ChannelChannelsComponent } from './channel-channels/channel-channels.component';
import { ChannelAboutComponent } from './channel-about/channel-about.component';
import { ChannelVideosComponent } from './channel-videos/channel-videos.component';

const routes: Routes = [
  { path: 'upload-video', component: UploadVideoComponent },
  { path: 'save-video-metadata/:videoId', component: SaveVideoMetadataComponent },
  { path: 'watch-video/:videoId', component: WatchVideoComponent },
  { path: '', component: HomeComponent,
    children: [
      { path: 'featured', component: FeaturedComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'liked-videos', component: LikedVideosComponent },
    ] 
  },
  { path: 'callback', component: CallbackComponent },
  { path: 'channel/:channelName', component: UserChannelComponent,
    children: [ 
      { path: 'channel-videos', component: ChannelVideosComponent },
      { path: 'channel-playlists', component: ChannelPlaylistsComponent },
      { path: 'channel-channels', component: ChannelChannelsComponent },
      { path: 'channel-about', component: ChannelAboutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
