import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeComponent } from './judge.component';

describe('JudgeComponent', () => {
  let component: JudgeComponent;
  let fixture: ComponentFixture<JudgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JudgeComponent]
    });
    fixture = TestBed.createComponent(JudgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
