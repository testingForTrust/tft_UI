import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretabilitySettingsComponent } from './interpretability-settings.component';

describe('InterpretabilitySettingsComponent', () => {
  let component: InterpretabilitySettingsComponent;
  let fixture: ComponentFixture<InterpretabilitySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretabilitySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretabilitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
