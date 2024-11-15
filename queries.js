const db = require('./db');

// View all departments
const viewDepartments = async () => {
    try {
        return await db.query('SELECT * FROM department;');
    //error handling
    } catch (error) {
        console.error('Error fetching departments:', error.message);
        throw new Error('Error fetching departments.');
    }
};

// View all roles
const viewRoles = async () => {
    try {
        return await db.query(`
            SELECT role.title, role.id AS role_id, department.name AS department, role.salary
            FROM role
            JOIN department ON role.department_id = department.id;
        `);
    //error handling
    } catch (error) {
        console.error('Error fetching roles:', error.message);
        throw new Error('Error fetching roles.');
    }
};

// View all employees
const viewEmployees = async () => {
    try {
        return await db.query(`
            SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                   manager.first_name AS manager_first_name, manager.last_name AS manager_last_name
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id;
        `);
    //error handling
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        throw new Error('Error fetching employees.');
    }
};

// Add a department
const addDepartment = async (name) => {
    try {
        if (!name) {
            throw new Error('Department name is required.');
        }
        return await db.query('INSERT INTO department (name) VALUES ($1) RETURNING *;', [name]);
    // error handling
    } catch (error) {
        console.error('Error adding department:', error.message);
        throw new Error('Error adding department.');
    }
};

// Add a role
const addRole = async (title, salary, departmentId) => {
    try {
        // Check if the role already exists
        const existingRole = await db.query('SELECT * FROM role WHERE title = $1;', [title]);

        if (existingRole.rows.length > 0) {
            throw new Error(`The role title "${title}" already exists. Please choose a different title.`);
        }

        if (!title || !salary || !departmentId) {
            throw new Error('All fields are required: title, salary, and department ID.');
        }

        return await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *;', [title, salary, departmentId]);
    } catch (error) {
        console.error('Error adding role:', error.message);
        throw new Error('Error adding role.');
    }
};

// Add an employee
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        if (!firstName || !lastName || !roleId) {
            throw new Error('First name, last name, and role ID are required.');
        }
        return await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *;', [firstName, lastName, roleId, managerId || null]);
    } catch (error) {
        console.error('Error adding employee:', error.message);
        throw new Error('Error adding employee.');
    }
};

// Update employee role
const updateEmployeeRole = async (employeeId, newRoleId) => {
    try {
        if (!employeeId || !newRoleId) {
            throw new Error('Employee ID and new role ID are required.');
        }
        return await db.query('UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *;', [newRoleId, employeeId]);
    } catch (error) {
        console.error('Error updating employee role:', error.message);
        throw new Error('Error updating employee role.');
    }
};

// Update employee manager
const updateEmployeeManager = async (employeeId, newManagerId) => {
    try {
        if (!employeeId || !newManagerId) {
            throw new Error('Employee ID and new manager ID are required.');
        }
        return await db.query('UPDATE employee SET manager_id = $1 WHERE id = $2 RETURNING *;', [newManagerId, employeeId]);
    } catch (error) {
        console.error('Error updating employee manager:', error.message);
        throw new Error('Error updating employee manager.');
    }
};

// View employees by manager
const viewEmployeesByManager = async (managerId) => {
    try {
        if (!managerId) {
            throw new Error('Manager ID is required.');
        }
        return await db.query(`
            SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary 
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            WHERE employee.manager_id = $1;
        `, [managerId]);
    } catch (error) {
        console.error('Error fetching employees by manager:', error.message);
        throw new Error('Error fetching employees by manager.');
    }
};

// View employees by department
const viewEmployeesByDepartment = async (departmentId) => {
    try {
        if (!departmentId) {
            throw new Error('Department ID is required.');
        }
        return await db.query(`
            SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary 
            FROM employee
            JOIN role ON employee.role_id = role.id
            JOIN department ON role.department_id = department.id
            WHERE department.id = $1;
        `, [departmentId]);
    } catch (error) {
        console.error('Error fetching employees by department:', error.message);
        throw new Error('Error fetching employees by department.');
    }
};

// Delete a department
const deleteDepartment = async (departmentId) => {
    try {
        if (!departmentId) {
            throw new Error('Department ID is required.');
        }
        return await db.query('DELETE FROM department WHERE id = $1;', [departmentId]);
    } catch (error) {
        console.error('Error deleting department:', error.message);
        throw new Error('Error deleting department.');
    }
};

// Delete a role
const deleteRole = async (roleId) => {
    try {
        if (!roleId) {
            throw new Error('Role ID is required.');
        }
        return await db.query('DELETE FROM role WHERE id = $1;', [roleId]);
    } catch (error) {
        console.error('Error deleting role:', error.message);
        throw new Error('Error deleting role.');
    }
};

// Delete an employee
const deleteEmployee = async (employeeId) => {
    try {
        if (!employeeId) {
            throw new Error('Employee ID is required.');
        }
        return await db.query('DELETE FROM employee WHERE id = $1;', [employeeId]);
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        throw new Error('Error deleting employee.');
    }
};

// Total budget of a department (sum of salaries)
async function totalDepartmentBudget(departmentId) {
    console.log('Received departmentId:', departmentId);
    try {
      if (!departmentId) {
        throw new Error('Invalid department ID provided.');
      }
  
      const result = await db.query(
        'SELECT SUM(budget) AS total_budget FROM departments WHERE department_id = $1',
        [departmentId]
      );
  
      console.log('Query result:', result.rows); 
  
      if (!result.rows || result.rows.length === 0 || result.rows[0].total_budget === null) {
        throw new Error('No budget data found for department.');
      }
  
      return result.rows[0].total_budget;
    } catch (error) {
      console.error('Error fetching total department budget:', error);
      throw new Error('Error fetching total department budget.');
    }
  }


module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    updateEmployeeManager,
    viewEmployeesByManager,
    viewEmployeesByDepartment,
    deleteDepartment,
    deleteRole,
    deleteEmployee,
    totalDepartmentBudget
};