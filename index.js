const inquirer = require('inquirer');
const {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./queries');

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (action) {
        case 'View all departments':
            const departments = await viewDepartments();
            console.table(departments.rows);
            break;
        case 'View all roles':
            const roles = await viewRoles();
            console.table(roles.rows);
            break;
        case 'View all employees':
            const employees = await viewEmployees();
            console.table(employees.rows);
            break;
        case 'Add a department':
            const { departmentName } = await inquirer.prompt({
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:'
            });
            await addDepartment(departmentName);
            console.log('Department added!');
            break;
        case 'Add a role':
            const { roleTitle, roleSalary, departmentId } = await inquirer.prompt([
                { type: 'input', name: 'roleTitle', message: 'Enter role title:' },
                { type: 'input', name: 'roleSalary', message: 'Enter role salary:' },
                { type: 'input', name: 'departmentId', message: 'Enter department ID:' }
            ]);
            await addRole(roleTitle, roleSalary, departmentId);
            console.log('Role added!');
            break;
        case 'Add an employee':
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter employee first name:' },
                { type: 'input', name: 'lastName', message: 'Enter employee last name:' },
                { type: 'input', name: 'roleId', message: 'Enter role ID:' },
                { type: 'input', name: 'managerId', message: 'Enter manager ID (leave blank if none):' }
            ]);
            await addEmployee(firstName, lastName, roleId, managerId || null);
            console.log('Employee added!');
            break;
        case 'Update an employee role':
            const { employeeId, newRoleId } = await inquirer.prompt([
                { type: 'input', name: 'employeeId', message: 'Enter employee ID to update:' },
                { type: 'input', name: 'newRoleId', message: 'Enter new role ID:' }
            ]);
            await updateEmployeeRole(employeeId, newRoleId);
            console.log('Employee role updated!');
            break;
        case 'Exit':
            console.log('Exiting application...');
            process.exit();
            break;
        default:
            console.log('Invalid action, please select a valid option.');
            break;
    }

    // After the action is complete, return to the main menu
    await mainMenu();
};

// Start the main menu
mainMenu();