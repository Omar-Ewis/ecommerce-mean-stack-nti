import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFaq } from './add-faq';

describe('AddFaq', () => {
  let component: AddFaq;
  let fixture: ComponentFixture<AddFaq>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFaq]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFaq);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
