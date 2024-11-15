const inquirer = require('inquirer');
const {
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
            'Update employee manager',
            'View employees by manager',
            'View employees by department',
            'Delete a department',
            'Delete a role',
            'Delete an employee',
            'View total budget of a department',
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
            const { firstName, lastName, roleId, employeeManagerId } = await inquirer.prompt([
                { type: 'input', name: 'firstName', message: 'Enter employee first name:' },
                { type: 'input', name: 'lastName', message: 'Enter employee last name:' },
                { type: 'input', name: 'roleId', message: 'Enter role ID:' },
                { type: 'input', name: 'employeeManagerId', message: 'Enter manager ID (leave blank if none):' }
            ]);
            await addEmployee(firstName, lastName, roleId, employeeManagerId || null);
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
        case 'Update employee manager':
            const { empId, newManagerId } = await inquirer.prompt([
                { type: 'input', name: 'empId', message: 'Enter employee ID to update manager:' },
                { type: 'input', name: 'newManagerId', message: 'Enter new manager ID:' }
            ]);
            await updateEmployeeManager(empId, newManagerId);
            console.log('Employee manager updated!');
            break;
        case 'View employees by manager':
            const { managerId } = await inquirer.prompt({
                type: 'input',
                name: 'managerId',
                message: 'Enter manager ID to view employees under this manager:'
            });
            const employeesByManager = await viewEmployeesByManager(managerId);
            console.table(employeesByManager.rows);
            break;
        case 'View employees by department':
            const { departmentIdView } = await inquirer.prompt({
                type: 'input',
                name: 'departmentIdView',
                message: 'Enter department ID to view employees in this department:'
            });
            const employeesByDepartment = await viewEmployeesByDepartment(departmentIdView);
            console.table(employeesByDepartment.rows);
            break;
        case 'Delete a department':
            const { departmentIdDelete } = await inquirer.prompt({
                type: 'input',
                name: 'departmentIdDelete',
                message: 'Enter department ID to delete:'
            });
            await deleteDepartment(departmentIdDelete);
            console.log('Department deleted!');
            break;
        case 'Delete a role':
            const { roleIdDelete } = await inquirer.prompt({
                type: 'input',
                name: 'roleIdDelete',
                message: 'Enter role ID to delete:'
            });
            await deleteRole(roleIdDelete);
            console.log('Role deleted!');
            break;
        case 'Delete an employee':
            const { employeeIdDelete } = await inquirer.prompt({
                type: 'input',
                name: 'employeeIdDelete',
                message: 'Enter employee ID to delete:'
            });
            await deleteEmployee(employeeIdDelete);
            console.log('Employee deleted!');
            break;
        case 'View total budget of a department':
            const { departmentIdBudget } = await inquirer.prompt({
                type: 'input',
                name: 'departmentIdBudget',
                message: 'Enter department ID to view the total budget (sum of salaries):'
            });
            const totalBudget = await totalDepartmentBudget(departmentIdBudget);
            console.log(`Total department budget: $${totalBudget.rows[0].total_budget}`);
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