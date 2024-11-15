# Staff Sync
![License](https://img.shields.io/badge/License-MIT-yellow.svg "License")

## Description
A command-line application to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

- What was your motivation?
I created this project to be able to better track and manage staff memebrs

## Features
- View employees
- View roles
- View departments
- Add an employee
- Add a role
- Add a department
- Update an employee role
- Update an employee's manager
- View employees by manager
- View employees by department
- Delete an employee
- Delete a role
- Delete a department

## Technologies
Node.js, Inquirer, and PostgreSQL


## Table of Contents (Optional)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [UserStories](#userStories)


## Installation
To use this application install all dependencies listed in the package.json file.

## Usage
Once all the dependencies have been installed, then use the node index.js command in your terminal.

## Live demo
[link](https://drive.google.com/file/d/1P4EtECP367esbrNcRkglSNNc58tUQ7KN/view?usp=sharing)

## Credits
### Contributors
- [Kristy Thompson](https://github.com/Kristy-H-Thompson)

### Reasources used

- Node.js: [Link](https://nodejs.org/en/download/package-manager)
- Postgres instalation guide: [Link](https://coding-boot-camp.github.io/full-stack/postgresql/postgresql-installation-guide)
- Postgres documentation: [Link](https://www.postgresql.org/docs/current/app-psql.html)
- Inquirer [link](https://www.npmjs.com/package/inquirer)


## License
MIT License

## User Stories
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business

## Acceptance Criteria
- GIVEN a command-line application that accepts user input
- WHEN I start the application, THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments, THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles, THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees, THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department, THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role, THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee, THEN I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role,THEN I am prompted to select an employee to update and their new role and this information is updated in the database
