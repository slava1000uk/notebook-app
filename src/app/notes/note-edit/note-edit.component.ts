import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Note } from '../note.model';
import { NoteService } from '../note.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  noteId: number;
  editMode = false;
  noteForm: FormGroup;



  constructor(private route: ActivatedRoute,
    private noteService: NoteService) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.noteId = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let title = '';
    let content = '';

    if (this.editMode) {
      const note = this.noteService.getNote(this.noteId);
      title = note.title;

      content = note.content;
    }

    this.noteForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'content': new FormControl(content, Validators.required)
    });

  }



  onSubmit() {
    // const note = {
    //   'title': '',
    //   'content': ''
    // };
    // note.title = this.noteForm.value.title;
    // note.content = this.noteForm.value.content;

    if (this.editMode) {
      const noteToEdit = this.noteService.getNote(this.noteId);

      noteToEdit.title = this.noteForm.value.title;
      noteToEdit.content = this.noteForm.value.content;
    } else {
      const noteToAdd = {
        'title': '',
        'content': ''
      };

      noteToAdd.title = this.noteForm.value.title;
      noteToAdd.content = this.noteForm.value.content;

      this.noteService.addNote(noteToAdd);

    }
  }

  onClear() {
    this.noteForm.reset();
  }

}
