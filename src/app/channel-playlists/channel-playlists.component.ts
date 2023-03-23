import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-channel-playlists',
  templateUrl: './channel-playlists.component.html',
  styleUrls: ['./channel-playlists.component.css']
})
export class ChannelPlaylistsComponent {

  @Input()
  playlistIdList: Array<string> = [];
}
