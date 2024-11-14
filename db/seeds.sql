-- Insert departments
INSERT INTO department (name) VALUES ('Sales'), ('Engineering'), ('HR');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES 
('Sales Manager', 70000, 1), 
('Software Engineer', 90000, 2), 
('HR Specialist', 50000, 3);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 2, 1),
('Alice', 'Brown', 3, NULL);