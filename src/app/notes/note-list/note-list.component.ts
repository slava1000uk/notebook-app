import { Component, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes: Note[];

  constructor(private noteService: NoteService) { }


  ngOnInit(): void {
    this.notes = this.noteService.getNotes();

    this.noteService.notesUpdated
      .subscribe(() => {
        this.notes = this.noteService.getNotes();
      });
  }

}
