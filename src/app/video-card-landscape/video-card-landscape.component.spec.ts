import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCardLandscapeComponent } from './video-card-landscape.component';

describe('VideoCardLandscapeComponent', () => {
  let component: VideoCardLandscapeComponent;
  let fixture: ComponentFixture<VideoCardLandscapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCardLandscapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCardLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
