import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamJudgeComponent } from './exam-judge.component';

describe('ExamJudgeComponent', () => {
  let component: ExamJudgeComponent;
  let fixture: ComponentFixture<ExamJudgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamJudgeComponent]
    });
    fixture = TestBed.createComponent(ExamJudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
