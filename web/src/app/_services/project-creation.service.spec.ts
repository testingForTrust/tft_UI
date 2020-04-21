import { TestBed, inject } from '@angular/core/testing';
import { ProjectCreationService } from './project-creation.service';

describe('ProjectCreationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectCreationService]
    });
  });

  it('should be created', inject([ProjectCreationService], (service: ProjectCreationService) => {
    expect(service).toBeTruthy();
  }));
});
