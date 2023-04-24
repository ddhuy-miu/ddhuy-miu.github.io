let student = {
    firstName: '',
    lastName: '',
    inputNewGrade(g) {
        this.grades.push(g);
    },
    computeAverageGrade() {
        return this.grades.reduce((x, y) => x + y, 0) / this.grades.length;
    },
};

let s1 = Object.create(student);
s1.firstName = 'Huy';
s1.lastName = 'Dang';
s1.grades = [];
s1.inputNewGrade(9);
s1.inputNewGrade(8);

let s2 = Object.create(student);
s2.firstName = 'Mai';
s2.lastName = 'Nguyen';
s2.grades = [];
s2.inputNewGrade(10);
s2.inputNewGrade(9.5);

let students = [s1, s2];
console.log(students);

students.forEach((s) => {
    console.log(s.computeAverageGrade());
});
