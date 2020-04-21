import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdversarialInputsSettingsComponent } from './adversarial-inputs-settings.component';

describe('AdversarialInputsSettingsComponent', () => {
  let component: AdversarialInputsSettingsComponent;
  let fixture: ComponentFixture<AdversarialInputsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdversarialInputsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdversarialInputsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
