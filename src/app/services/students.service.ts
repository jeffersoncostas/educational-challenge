import { Injectable } from '@angular/core';

import studentsList from '../models/students.json';
import classesList from '../models/classes.json';
import degreesList from '../models/degrees.json';
import { StudentTable, Student, ChartData } from '../models/models.js';

@Injectable({
    providedIn: 'root'
})
export class StudentsService {

    private chartData: ChartData[] = [];


    async getStudents() {
        this.chartData = [];
        const studentsTable = await studentsList.map(item => {
            let testobj: StudentTable = {
                ...item,
                className: '',
                degreeName: ''
            };
            classesList.forEach(className => {
                if (item.classId === className.id) {
                    testobj = {
                        ...item,
                        className: className.name,
                        degreeName: ''
                    };
                }
            });

            degreesList.forEach(degree => {
                if (item.degreeId === degree.id) {
                    testobj = {
                        ...testobj,
                        degreeName: degree.name
                    };

                    const charItem = this.chartData.find(itemx => {
                        return itemx.name === degree.name;
                    });

                    if (charItem) {
                        charItem.y++;
                    } else {
                        const newChartItem: ChartData = {
                            y: 1,
                            name: degree.name
                        };
                        this.chartData.push(newChartItem);
                    }
                    return;
                }
            });

            return testobj;
        });

        return studentsTable;
    }
    async addStudents() {
        const lastId = studentsList[studentsList.length - 1].id + 1;
        console.log(lastId);
        for (let index = 0; index < 300; index++) {
            const newStudent: Student = {
                id: lastId + index,
                name: `Nome do aluno ${lastId + index}`,
                ra: Math.floor(Math.random() * (999999 - 100000 + 1) + 100000),
                degreeId:
                    Math.floor(Math.random() * 13 + 1),
                classId:
                    Math.floor(Math.random() * 6 + 1),
            };
            console.log(newStudent.degreeId);

            studentsList.push(newStudent);
        }
    }
    getChartData() {
        return this.chartData;
    }
    async editStudent(result: any) {
        console.log(result);
        const index = studentsList.findIndex((student) => {
            return student.id === result.new.id;
        })

        console.log(index);
        studentsList[index] = result.new;

    }
}
