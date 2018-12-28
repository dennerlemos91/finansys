import { Component, OnInit } from '@angular/core';

import { EntryService } from '../shared/entry.service';
import { Entry } from '../shared/entry.model';
import { Subscription } from 'rxjs';

import toastr from 'toastr';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {

  entries: Entry[] = [];
  busy: Subscription;

  constructor(
    private entryService: EntryService
  ) { }

  ngOnInit() {
    this.busy = this.entryService.getAll().subscribe(
      entries => this.entries = entries,
      error => alert('Error ao carregar a lista')
    );
  }

  deleteEntry(entry: Entry) {
    const mustDelete = confirm('Deseja realmente excluir este item ?');

    if (mustDelete) {
      this.busy = this.entryService.delete(entry.id).subscribe(
        () => {
          this.entries = this.entries.filter(element => element !== entry);
          toastr.success('Solicitação processada com sucesso!');
        },
        () => alert('Error ao tentar excluir')
      );
    }
  }

}
