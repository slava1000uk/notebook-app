import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Note } from "./note.model";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[] = [
    new Note(
      'RxJs',
      "RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.Think of RxJS as Lodash for events. ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events. The essential concepts in RxJS which solve async event management are: Observable: represents the idea of an invokable collection of future values or events. Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable. Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution. Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc. Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers. Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g.setTimeout or requestAnimationFrame or others."
    ),
    new Note(
      'Pull versus Push',
      "Observables are lazy Push collections of multiple values. To invoke the Observable and see these values, we need to subscribe to it. Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer. What is Pull ? In Pull systems, the Consumer determines when it receives data from the data Producer.The Producer itself is unaware of when the data will be delivered to the Consumer. Every JavaScript Function is a Pull system.The function is a Producer of data, and the code that calls the function is consuming it by 'pulling' out a single return value from its call."
    )
  ];

  notesUpdated = new Subject();

  getNotes() {
    return [...this.notes];
  }

  getNote(id: number): Note {
    const note = this.notes[id - 1];
    return note;
  }

  getNoteId(note: Note) {
    const noteIndex = this.notes
      .findIndex(item => item.title === note.title && item.content === note.content);

    return noteIndex + 1;
  }

  removeNote(id: number) {
    this.notes.splice(id - 1, 1);

    this.notesUpdated.next();
  }

  addNote(note: Note) {
    const allowedToAdd = !this.notes.some(n => n.title === note.title && n.content === note.content);

    if (allowedToAdd) {
      this.notes = [...this.notes, note];
      this.notesUpdated.next();
    }
  }
}