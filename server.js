const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const prompt = inquirer.createPromptModule();
const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});

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
            return updateEmployee();
            }
            default: {
                return process.exit();
            }
        }
    });
};

init();