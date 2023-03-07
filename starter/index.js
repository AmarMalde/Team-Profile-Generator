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

function createManager() {
  console.log("Please enter manager's information:");
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
      createTeam();
  });
}

function createTeam() {
  console.log("Please enter team member's information:");
  inquirer.prompt([
      {
          type: 'list',
          message: "What is the team member's role?",
          name: 'role',
          choices: ['Engineer', 'Intern', 'No more team members']
      },
      {
          type: 'input',
          message: "What is the team member's name?",
          name: 'name'
      },
      {
          type: 'input',
          message: "What is the team member's ID?",
          name: 'employeeID'
      },
      {
          type: 'input',
          message: "What is the team member's email address?",
          name: 'email'
      },
      {
          type: 'input',
          message: "What is the engineer's Github username?",
          name: 'github',
          when: (response) => response.role === 'Engineer'
      },
      {
          type: 'input',
          message: "What school is the intern from?",
          name: 'school',
          when: (response) => response.role === 'Intern'
      }
  ]).then(response => {
      if (response.role === 'Engineer') {
          const engineer = new Engineer(response.name, response.employeeID, response.email, response.github);
          teamArray.push(engineer);
      } else if (response.role === 'Intern') {
          const intern = new Intern(response.name, response.employeeID, response.email, response.school);
          teamArray.push(intern);
      } else {
          console.log("End of team building");
      }
      if (response.role !== 'No more team members') {
          createTeam();
      } else {
          renderTeam(teamArray);
      }
  });
}

function renderTeam(teamArray) {
  const html = render(teamArray);
  fs.writeFile(outputPath, html, (err) => {
      if (err) {
          throw err;
      }
      console.log(`Team profile generated at ${outputPath}`);
  });
}

createManager();