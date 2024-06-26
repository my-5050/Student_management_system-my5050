#! usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
// ----------------------------------Class to represent a student--------------------------------------//
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.courses = [];
        this.balance = 5000;
    }
    // Method to enroll in courses
    enrollCourse(course) {
        this.courses.push(course);
        console.log(chalk.yellow(`${this.name} enrolled in ${course}`));
    }
    // Method to view balance
    viewBalance() {
        console.log(chalk.yellow(`${this.name}, your balance is ${this.balance}`));
    }
    // Method to pay fee
    payFee(amount) {
        this.balance -= amount;
        console.log(chalk.yellow(`$${amount} fee paid successfully. Now ${this.name}'s account balance is ${this.balance}`));
    }
    // Method to show status
    showStatus() {
        console.log(chalk.yellow("ID:", this.id));
        console.log(chalk.yellow("Name:", this.name));
        console.log(chalk.yellow("Courses:", this.courses.join(", ")));
        console.log(chalk.yellow("Balance:", this.balance));
    }
}
//---------------------------------------- Class to manage students--------------------------------------------------
class StudentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a student
    addStudent(name) {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(chalk.yellow(`Student: ${name} added successfully, ID: ${newStudent.id}`));
    }
    // Method to find a student by ID
    findStudentById(studentId) {
        return this.students.find(student => student.id === studentId);
    }
    // Method to enroll a student in a course
    enrollStudentInCourse(studentId, course) {
        const student = this.findStudentById(studentId);
        if (student) {
            student.enrollCourse(course);
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter the correct student ID."));
        }
    }
    // Method to view a student's balance
    viewStudentBalance(studentId) {
        const student = this.findStudentById(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter the correct student ID."));
        }
    }
    // Method to pay a student's fee
    payStudentFee(studentId, amount) {
        const student = this.findStudentById(studentId);
        if (student) {
            student.payFee(amount);
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter the correct student ID."));
        }
    }
    // Method to show a student's status
    showStudentStatus(studentId) {
        const student = this.findStudentById(studentId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(chalk.redBright("Student not found. Please enter the correct student ID."));
        }
    }
}
//------------------------------------- Main function to run the program-------------------------------------
async function main() {
    console.log(chalk.blue("Welcome to the Student Management System"));
    console.log(chalk.yellow("-".repeat(50)));
    const studentManager = new StudentManager();
    //while Loop to keep the program running
    while (true) {
        const choice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select your option",
                choices: [
                    "Add student",
                    "Enroll student in course",
                    "View student balance",
                    "Pay student fee",
                    "Show student status",
                    "Exit"
                ]
            }]);
        //-------------------------------------------------------using switch cases---------------------------------------------- 
        switch (choice.choice) {
            case "Add student":
                const nameInput = await inquirer.prompt([{
                        name: "name",
                        type: "input",
                        message: "Enter the student's name"
                    }]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll student in course":
                const courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter the student ID"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter the course name"
                    }
                ]);
                studentManager.enrollStudentInCourse(courseInput.studentId, courseInput.course);
                break;
            case "View student balance":
                const balanceInput = await inquirer.prompt([{
                        name: "studentId",
                        type: "number",
                        message: "Enter the student ID"
                    }]);
                studentManager.viewStudentBalance(balanceInput.studentId);
                break;
            case "Pay student fee":
                const feeInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: "Enter the student ID"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount"
                    }
                ]);
                studentManager.payStudentFee(feeInput.studentId, feeInput.amount);
                break;
            case "Show student status":
                const statusInput = await inquirer.prompt([{
                        name: "studentId",
                        type: "number",
                        message: "Enter the student ID"
                    }]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log(chalk.red("Exiting!!!!"));
                process.exit();
        }
    }
}
//----------------------------------finally Call the main function-------------------------------------
main();
