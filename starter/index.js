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
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the manager's name?",
                name: "name",
            },
            {
                type: "input",
                message: "What is the manager's ID?",
                name: "id",
            },
            {
                type: "input",
                message: "What is the manager's email address?",
                name: "email",
            },
            {
                type: "input",
                message: "What is the manager's office number?",
                name: "officeNumber",
            },
        ])
        .then((response) => {
            const manager = new Manager(
                response.name,
                response.id,
                response.email,
                response.officeNumber
            );
            teamArray.push(manager);
            addTeamMember();
        });
}

function addTeamMember() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"],
                name: "memberType",
            },
        ])
        .then((response) => {
            if (response.memberType === "Engineer") {
                addEngineer();
            } else if (response.memberType === "Intern") {
                addIntern();
            } else {
                renderTeam(teamArray);
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
            addTeamMember();
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
            addTeamMember();
        });
}


function renderTeam(arr) {
    const html = render(arr);
    fs.writeFile(outputPath, html, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Team profile generated at ${outputPath}`);
    });
}

addManager()