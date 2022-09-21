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
    inquirer.prompt({
        message: 'Please enter a new Department Name',
        name: 'name'
    }).then((input) => {
        db.query('INSERT INTO department SET ?', input, (err) => {
            if (err) throw err;
            console.log(`Saved New Department!`);
            init();
        });
    });
};

//Adds a role to the database
const addRole = () => {
    inquirer.prompt([
        {
            message: 'Please enter a new Role Name',
            name: 'title'
        },
        {
            message: 'Please enter the salary of the New Role',
            name: 'salary'
        },
        {
            message: 'Please enter the Department ID of the New Role',
            name: 'department_id'
        }
    ]).then((input) => {
        db.query('INSERT INTO role SET ?', input, (err) => {
            if (err) throw err;
            console.log(`Saved New Role!`);
            init();
        });
    });
}

//Adds an employee to the database
const addEmployee = () => {
    inquirer.prompt([
        {
            message: 'Please enter the New Employee\'s first name',
            name: 'first_name'
        },
        {
            message: 'Please enter the New Employee\'s last name',
            name: 'last_name'
        },
        {
            message: 'Please enter the Role ID of the New Employee',
            name: 'role_id'
        },
        {
            message: 'Please enter the New Employee\'s Manager\'s ID.',
            name: 'manager_id'
        }
    ]).then((input) => {
        db.query('INSERT INTO employee SET ?', input, (err) => {
            if (err) throw err;
            console.log(`Saved New Employee!`);
            init();
        });
    });
}

//Updates an employee in the database
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            message: 'To Update Employee, please enter the Employee\'s ID',
            name: 'id'
        },
        {
            message: 'Please enter the New Role ID of the employee',
            name: 'role_id'
        }
    ]).then((input) => {
        db.query('UPDATE employee SET employee.role_id = ? WHERE employee.id = ?', [input.role_id, input.id], (err) => {
            if (err) throw err;
            console.log(`Updated Employee!`);
            init();
        });
    });
}

//deletes a department by ID
const deleteDepartment = () => {
    inquirer.prompt({
        message: 'Please enter the ID of the Department to Delete',
        name: 'id'
    }).then((input) => {
        db.query('DELETE FROM department WHERE ?', input, (err) => {
            if (err) throw err;
            console.log(`Deleted Department!`);
            init();
        });
    });
};

//deletes a role by ID
const deleteRole = () => {
    inquirer.prompt({
        message: 'Please enter the ID of the Role to Delete',
        name: 'id'
    }).then((input) => {
        db.query('DELETE FROM role WHERE ?', input, (err) => {
            if (err) throw err;
            console.log(`Deleted Role!`);
            init();
        });
    });
};

//deletes an employee by ID
const deleteEmployee = () => {
    inquirer.prompt({
        message: 'Please enter the ID of the Employee to Delete',
        name: 'id'
    }).then((input) => {
        db.query('DELETE FROM employee WHERE ?', input, (err) => {
            if (err) throw err;
            console.log(`Deleted Employee!`);
            init();
        });
    });
};

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
            'Delete a Department',
            'Delete a Role',
            'Delete an Employee',
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
            case 'Delete a Department': {
                return deleteDepartment();
            }
            case 'Delete a Role': {
                return deleteRole();
            }
            case 'Delete an Employee': {
                return deleteEmployee();
            }
            default: {
                return process.exit();
            }
        }
    });
};

init();