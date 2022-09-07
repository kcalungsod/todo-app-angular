import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubtaskComponent } from './new-subtask.component';

describe('NewSubtaskComponent', () => {
  let component: NewSubtaskComponent;
  let fixture: ComponentFixture<NewSubtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSubtaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSubtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
