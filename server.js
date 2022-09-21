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
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        console.table(departments);
        init();
    });
};

//Displays all the roles in database
const viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary,
    department.name AS department 
    FROM role LEFT JOIN department 
    ON role.department_id = department.id`,
        (err, roles) => {
            if (err) throw err;
            console.table(roles);
            init();
        });
};

//Displays all the employees in database
const viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, role.salary, department.name as department,
    CONCAT (manager.first_name, ' ', manager.last_name) AS manager
    FROM employee LEFT JOIN role
    ON employee.role_id = role.id
    LEFT JOIN department 
    ON role.department_id = department.id
    LEFT JOIN employee manager 
    ON employee.manager_id = manager.id`, 
    (err, employees) => {
        if (err) throw err;
        console.table(employees);
        init();
    });
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