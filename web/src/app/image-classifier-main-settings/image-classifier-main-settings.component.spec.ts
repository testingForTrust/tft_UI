import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageClassifierMainSettingsComponent } from './image-classifier-main-settings.component';

describe('ImageClassifierMainSettingsComponent', () => {
  let component: ImageClassifierMainSettingsComponent;
  let fixture: ComponentFixture<ImageClassifierMainSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageClassifierMainSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageClassifierMainSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
