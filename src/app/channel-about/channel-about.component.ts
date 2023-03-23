import { Component, Input } from '@angular/core';
import { ChannelDto } from '../channel-dto';

@Component({
  selector: 'app-channel-about',
  templateUrl: './channel-about.component.html',
  styleUrls: ['./channel-about.component.css']
})
export class ChannelAboutComponent {

  @Input()
  channelData= {} as ChannelDto;
}
