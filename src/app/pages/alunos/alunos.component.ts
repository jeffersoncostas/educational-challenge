import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



import studentsList from '../../models/students.json';


import { Student, StudentTable } from 'src/app/models/models.js';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from 'src/app/services/students.service.js';
import { ChartComponent } from '../../components/chart/chart.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../../components/modal-edit/modal-edit.component';

const students: Student[] = studentsList;

@Component({
    selector: 'app-alunos',
    templateUrl: './alunos.component.html',
    styleUrls: ['./alunos.component.scss']
})
export class AlunosComponent implements OnInit {
    studentsTable: StudentTable[] = [];
    displayedColumns: string[] = ['id', 'name', 'ra', 'degreeName', 'className'];
    dataSource: MatTableDataSource<StudentTable>;
    chart;

    filterSearchValue = 'name';

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @ViewChild(ChartComponent, { static: false }) chartComponent: ChartComponent;


    constructor(private studentsService: StudentsService, public modalEdit: MatDialog) {


    }
    async ngOnInit() {
        await this.getStudentData();

        await this.addStudentsToTable();
        this.addFilterPredicate();

        this.chartComponent.setData(this.studentsService.getChartData());
    }


    async getStudentData() {
        await this.studentsService.getStudents().then(e => {
            this.studentsTable = e;
            console.log(this.studentsTable);
        });
    }

    addFilterPredicate() {
        this.dataSource.filterPredicate = (data: StudentTable, filter: string) =>
            (!filter || data.name.toLowerCase().trim().includes(filter));
    }

    changeFilterPredicate(toggleResult) {
        const { filterValue } = toggleResult;
        this.filterSearchValue = filterValue;
        console.log(toggleResult);
        if (!this.dataSource) return;
        console.log(filterValue)
        this.dataSource.filterPredicate = (data: StudentTable, filter: string) => {
            if (filterValue === 'ra' || filterValue === 'id') {

                return !filter || data[filterValue].toString().includes(filter);
            }
            return !filter || data[filterValue].toLowerCase().trim().includes(filter);
        };

    }

    applyFilter(e) {

        console.log(e.target.value);
        const value: string = e.target.value;
        this.dataSource.filter = value.trim().toLowerCase();
    }
    async addStudents() {
        console.log('on after view init', this.chartComponent);

        console.log(this.chartComponent);
        await this.studentsService.addStudents().then(async () => {
            await this.getStudentData();
            this.dataSource = new MatTableDataSource<StudentTable>(
                this.studentsTable
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.filterSearchValue = 'name';
            this.chartComponent.setData(this.studentsService.getChartData());

        });
    }


    addStudentsToTable() {
        this.dataSource = new MatTableDataSource<StudentTable>(this.studentsTable);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.filterSearchValue = 'name';

    }

    openModalEditStudent(e) {
        console.log('opeened', e);
        const modalRef = this.modalEdit.open(ModalEditComponent, {
            width: '400px',
            data: { otherData: { title: 'Edit Student' }, student: e }
        });

        modalRef.afterClosed().subscribe(async result => {
            if (result) {
                await this.studentsService.editStudent(result);
                await this.getStudentData();
                this.addStudentsToTable();
                this.chartComponent.setData(this.studentsService.getChartData());
            }
        })
    }


}
