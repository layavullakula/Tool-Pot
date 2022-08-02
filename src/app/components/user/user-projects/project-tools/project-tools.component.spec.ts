import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectToolsComponent } from './project-tools.component';

describe('ProjectToolsComponent', () => {
  let component: ProjectToolsComponent;
  let fixture: ComponentFixture<ProjectToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectToolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
