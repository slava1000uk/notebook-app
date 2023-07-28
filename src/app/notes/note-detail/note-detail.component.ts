import { Component, OnDestroy, OnInit } from '@angular/core';
import { Note } from '../note.model';
import { ActivatedRoute, Params } from '@angular/router';
import { NoteService } from '../note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit, OnDestroy {
  note: Note;
  noteIdSubscription: Subscription;
  noteId: number;

  constructor(private route: ActivatedRoute,
    private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteId = +this.route.snapshot.params['id'];
    this.note = this.noteService.getNote(this.noteId);

    this.noteIdSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.noteId = +params['id'];
        this.note = this.noteService.getNote(this.noteId);
      }
    );

  }

  ngOnDestroy(): void {
    this.noteIdSubscription.unsubscribe();
  }

  onDeleteNote() {
    this.noteService.removeNote(this.noteId);
  }

}
