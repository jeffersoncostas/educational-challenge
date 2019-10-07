import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/models';
import Degress from '../../models/degrees.json';
import Classes from '../../models/classes.json';


@Component({
    selector: 'app-modal-edit',
    templateUrl: './modal-edit.component.html',
    styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {
    degress = Degress;
    classes = Classes;
    oldData = JSON.parse(JSON.stringify(this.data.student));
    constructor(public dialogRef: MatDialogRef<ModalEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { otherData: any, student: Student }) {


    }


    onClose() {
        this.dialogRef.close();
    }
    confirmEdit() {

        this.dialogRef.close({ new: this.data.student, old: this.oldData });
    }

}
