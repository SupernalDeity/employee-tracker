const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const prompt = inquirer.createPromptModule();

//establishes connection to mysql database
const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});

//Displays all the departments in database
const viewAllDepartments = () => {
    
};

//Displays all the roles in database
const viewAllRoles = () => {
    
};

//Displays all the employees in database
const viewAllEmployees = () => {
    
};

//Adds a deapartment to the database
const addDapartment = () => {
    
}

//Adds a role to the database
const addRole = () => {
    
}

//Adds an employee to the database
const addEmployee = () => {
    
}

//Updates an employee in the database
const updateEmployeeRole = () => {
    
}

//Initial promt with a switch case to run individual functions. 
const init = () => {
    prompt({
        type: 'rawlist',
        name: 'action',
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Dapartment',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Exit',
        ],
        message: 'Please select from the list of available options.'
    }).then((answers) => {
        switch (answers.action) {
            case 'View All Departments': {
                return viewAllDepartments();
            }
            case 'View All Roles': {
                return viewAllRoles();
            }
            case 'View All Employees': {
                return viewAllEmployees();
            }
            case 'Add a Dapartment': {
            return addDapartment();
            }
            case 'Add a Role': {
            return addRole();
            }
            case 'Add an Employee': {
            return addEmployee();
            }
            case 'Update an Employee Role': {
            return updateEmployeeRole();
            }
            default: {
                return process.exit();
            }
        }
    });
};

init();