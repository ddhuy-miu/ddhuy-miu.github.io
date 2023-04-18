export class Person {
    #name;
    #dateOfBirth;

    constructor(name, dateOfBirth) {
        this.#name = name;
        this.#dateOfBirth = dateOfBirth;
    }

    get getName() {
        return this.#name;
    }

    set setName(name) {
        this.#name = name;
    }

    get getDateOfBirth() {
        return this.#dateOfBirth;
    }

    set setDateOfBirth(dob) {
        this.#dateOfBirth = dob;
    }

    toString() {
        return `{Name: ${this.getName}, Date Of Birth: ${this.getDateOfBirth
            .toISOString()
            .slice(0, 10)}}`;
    }
}

export class Employee extends Person {
    #salary;
    #hireDate;

    constructor(name, dob, salary, hireDate) {
        super(name, dob);
        this.#salary = salary;
        this.#hireDate = hireDate;
    }

    get getSalary() {
        return this.#salary.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    }

    set setSalary(s) {
        this.#salary = s;
    }

    doJob(jobTitle) {
        console.log(`${this.getName} is a ${jobTitle} who earn salary ${this.getSalary}`);
    }
}