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

function addManager() {
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
        const manager = new Manager(response.name, response.employeeID, response.email, response.officeNumber);
        teamArray.push(manager);
        addEmployee();
    })
}

addManager();
console.log(teamArray)

function addEmployee() {
    inquirer.prompt([{
        type: 'list',
        message: "Which kind of employee would you like to add?",
        choices: ['Engineer', 'Intern', 'No more employees to add'],
        name: 'employeeType'
    }]).then(response => {
        if (response.employeeType == 'Engineer') {
            addEngineer();
        } else if (response.employeeType === "Intern") {
            addIntern();
        } else {
            render(teamArray)
        }
    });
}

function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the engineer's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the engineer's ID?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the engineer's email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What is the engineer's GitHub username?",
          name: "github",
        },
      ])
      .then((response) => {
        const engineer = new Engineer(
          response.name,
          response.id,
          response.email,
          response.github
        );
        teamArray.push(engineer);
        addEmployee();
      });
  }
  
  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the intern's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is the intern's ID?",
          name: "id",
        },
        {
          type: "input",
          message: "What is the intern's email address?",
          name: "email",
        },
        {
          type: "input",
          message: "What school is the intern attending?",
          name: "school",
        },
      ])
      .then((response) => {
        const intern = new Intern(
          response.name,
          response.id,
          response.email,
          response.school
        );
        teamArray.push(intern);
        addEmployee();
      })}