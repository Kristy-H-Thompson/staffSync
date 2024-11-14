const db = require('./db');

// View all departments
const viewDepartments = () => {
    return db.query('SELECT * FROM department;');
};

// View all roles
const viewRoles = () => {
    return db.query(`
        SELECT role.title, role.id AS role_id, department.name AS department, role.salary
        FROM role
        JOIN department ON role.department_id = department.id;
    `);
};

// View all employees
const viewEmployees = () => {
    return db.query(`
        SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
               manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
        FROM employee
        JOIN role ON employee.role_id = role.id
        JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;
    `);
};

// Add a department
const addDepartment = (name) => {
    return db.query('INSERT INTO department (name) VALUES ($1) RETURNING *;', [name]);
};

// Add a role
const addRole = (title, salary, departmentId) => {
    return db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [title, salary, departmentId]);
};

// Add an employee
const addEmployee = (firstName, lastName, roleId, managerId) => {
    return db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;', [firstName, lastName, roleId, managerId]);
};

// Update employee role
const updateEmployeeRole = (employeeId, newRoleId) => {
    return db.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;', [newRoleId, employeeId]);
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};