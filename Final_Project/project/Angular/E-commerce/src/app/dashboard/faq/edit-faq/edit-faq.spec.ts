import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFaq } from './edit-faq';

describe('EditFaq', () => {
  let component: EditFaq;
  let fixture: ComponentFixture<EditFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
