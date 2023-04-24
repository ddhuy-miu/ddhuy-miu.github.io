function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.grades = [];
}

Student.prototype.inputNewGrade = function (g) {
    this.grades.push(g);
};

Student.prototype.computeAverageGrade = function () {
    return this.grades.reduce((x, y) => x + y, 0) / this.grades.length;
};

let s1 = new Student('Huy', 'Dang');
s1.inputNewGrade(8);
s1.inputNewGrade(9);
s1.testFunction = function () {
    console.log("This is testFunction: " + this.firstName + " " + this.lastName);
};
console.log(s1);

let s2 = new Student('Mai', 'Nguyen');
s2.inputNewGrade(8);
s2.inputNewGrade(8);
console.log(s2);

let students = [s1, s2];

students.forEach((s) => {
    console.log(s.computeAverageGrade());
});