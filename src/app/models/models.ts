
export interface Relationship {
    id: number;
    teacherId: number;
    matterId: number;
    degrees: Degree[];
}

export interface Degree {
    id: number;
    name: string;
}

export interface Class {
    id: number;
    name: string;
}

export interface Student {
    id: number;
    ra: number;
    name: string;
    degreeId: number;
    classId: number;
}
export interface StudentTable {
    id: number;
    ra: number;
    name: string;
    degreeName: string;
    className: string;
}

export interface ChartData {
    y: number;
    name: string;

}
