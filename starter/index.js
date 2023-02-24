const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


const render = require("./src/page-template.js");
//call render(myArrayOfTeamMembers)


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const teamArray = [];

inquirer.prompt([
    {
        type: 'input',
        message: "What is the manager's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: "What is the manager's ID?",
        name: 'employeeID'
    },
    {
        type: 'input',
        message: "What is the manager's email address?",
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is the office number?',
        name: 'officeNumber'
    }

]).then(response => {
    console.log(response)

    manager = new Manager(response.name, response.employeeID, response.email, response.officeNumber)

    teamArray.push(manager)
})