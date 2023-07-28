import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../note.model';
import { NoteService } from '../../note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() noteItem: Note;
  noteId: number;

  constructor(private noteService: NoteService,
    private router: Router) { }



  ngOnInit(): void {
    this.noteId = this.noteService.getNoteId(this.noteItem);

    this.noteService.notesUpdated
      .subscribe(() => {
        this.noteId = this.noteService.getNoteId(this.noteItem);

        if (this.noteId === 0) {
          const amountOfNotes = this.noteService.getNotes().length;

          amountOfNotes === 0 ? this.router.navigate(['/notes', 'new']) : this.router.navigate(['/notes']);
        }
      });
  }

}
