import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-search-input',
    template: `

    <section>
    <app-button-toggle (valueEmmiter)="onClickButtonToggle($event)" [filterValue]="filterValue" ></app-button-toggle>

      <input (keyup)="KeyupF($event)" type="text" placeholder="Buscar" />
    </section>
  `,
    styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
    @Output() keyUpEmmiter = new EventEmitter();
    @Output() valueToggle = new EventEmitter();

    @Input() filterValue;
    constructor() { }

    ngOnInit() { }

    KeyupF(e) {
        this.keyUpEmmiter.emit(e);
    }

    onClickButtonToggle(e) {
        this.valueToggle.emit(e);
    }
}
