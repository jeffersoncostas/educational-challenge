import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';



@Component({
    selector: 'app-button-toggle',
    templateUrl: './button-toggle.component.html',
    styleUrls: ['./button-toggle.component.scss']
})
export class ButtonToggleComponent implements OnInit {

    @Input() filterValue = 'ra';
    @Output() valueEmmiter = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }
    print(e) {
        console.log(e);
    }

    emitFilterValue(filterVal) {
        if (filterVal) {


            this.valueEmmiter.emit({ filterValue: filterVal });

        }
    }
}
