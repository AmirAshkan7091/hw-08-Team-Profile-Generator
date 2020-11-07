const inquirer = require("inquirer");
const fs = require("fs");
const Employee = require("./lib/employee")
const Engineer = require("./lib/engineer")
const Manager = require("./lib/manager")
const Intern = require("./lib/intern")

let finalTeamArray = [];


function startingPrompt() {
    inquirer.prompt([
        {
            message: "Welcome to Team Generator. Please write your team name:",
            name: "teamname"
        }
    ])
        .then(function(data){
            const teamName = data.teamname
            finalTeamArray.push(teamName)
            addManager();
        })

    
}

function addManager() {
    inquirer.prompt([
        {
            message: "What is your team manager's name?",
            name: "name"
        },
        {
            message: "What is your team manager's email address?",
            name: "email"
        },

        {
            type: "number",
            message: "What is your team manager's office number?",
            name: "officeNumber"
        },
    ])

        .then(function (data) {
            const name = data.name
            const id = 1
            const email = data.email
            const officeNumber = data.officeNumber
            const teamMember = new Manager(name, id, email, officeNumber)
            finalTeamArray.push(teamMember)
            addTeamMembers();
        });

}

function addTeamMembers() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: ["Yes, add an engineer", "Yes, add an intern", "No, my team is complete"],
            name: "addMemberData"
        }
    ])

        .then(function (data) {

            switch (data.addMemberData) {
                case "Yes, add an engineer":
                    addEngineer();
                    break;

                case "Yes, add an intern":
                    addIntern();
                    break;
                case "No, my team is complete":
                    compileTeam();
                    break;
            }
        });
}

function addEngineer() {
    inquirer.prompt([
        {
            message: "What is this engineer's name?",
            name: "name"
        },
        {
            message: "What is this engineer's email address?",
            name: "email"
        },
        {
            message: "What is this engineer's Github profile?",
            name: "github"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const github = data.github
            const teamMember = new Engineer(name, id, email, github)
            finalTeamArray.push(teamMember)
            addTeamMembers()
        });

};

function addIntern() {
    inquirer.prompt([
        {
            message: "What is this intern's name?",
            name: "name"
        },
        {
            message: "What is this intern's email address?",
            name: "email"
        },
        {
            message: "What is this intern's school?",
            name: "school"
        }
    ])

        .then(function (data) {
            const name = data.name
            const id = finalTeamArray.length + 1
            const email = data.email
            const school = data.school
            const teamMember = new Intern(name, id, email, school)
            finalTeamArray.push(teamMember)
            addTeamMembers()
        });

};





function compileTeam() {
    console.log(" Now give your team a raise.")

    const htmlArray = []
 
const htmlBeginning = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${finalTeamArray[0]}</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/c502137733.js"></script>

</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 jumbotron mb-3 team-heading">
                <h1 class="text-center">${finalTeamArray[0]}</h1>
            </div>
        </div>
    </div>
    <div class="container">
    <div class="row">
    <div class="team-area col-12 d-flex justify-content-center">

`


 htmlArray.push(htmlBeginning);

for (let i = 1; i < finalTeamArray.length; i++) {
    let object = `

    <div class="card employee-card">
    <div class="card-header">
        <h2 class="card-title">${finalTeamArray[i].name}</h2>
        <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${finalTeamArray[i].title}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${finalTeamArray[i].id}</li>
            <li class="list-group-item">Email: <a href="mailto:${finalTeamArray[i].email}">${finalTeamArray[i].email}</a></li>

    `
    if (finalTeamArray[i].officeNumber) {
        object += `
        <li class="list-group-item">Office number: ${finalTeamArray[i].officeNumber}</li>

        `
    }
    if (finalTeamArray[i].github) {
        object += `
        <li class="list-group-item"> GitHub: <a href="https://github.com/${finalTeamArray[i].github}">${finalTeamArray[i].github}</a></li>
        `
    }
    if (finalTeamArray[i].school) {
        object += `
        <li class="list-group-item"> School: ${finalTeamArray[i].school}</li>
        `
    }
    object += `
    </ul>
    </div>
    </div>

    `
    htmlArray.push(object)
}
    
    const htmlEnd = `

    </div>
    </div>
    </div>
    </body>
    </html>
    `
    htmlArray.push(htmlEnd);

    fs.writeFile(`./generated-html/${finalTeamArray[0]}.html`, htmlArray.join(""), function (err) {
        
    })
}

startingPrompt()

