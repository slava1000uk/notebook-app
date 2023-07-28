import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteStartComponent } from './note-start.component';

describe('NoteStartComponent', () => {
  let component: NoteStartComponent;
  let fixture: ComponentFixture<NoteStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteStartComponent]
    });
    fixture = TestBed.createComponent(NoteStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
