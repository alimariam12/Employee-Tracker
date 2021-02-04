INSERT INTO departments (name)
VALUES ('Sales'), ('Accounting'), ('Human Resources'), ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Representative', 156000, 1), 
('Sales Lead', 10000, 1), 
('Lead Engineering', 150000, 4), 
('Software Engineering', 130000, 4), 
('Accountant', 120000, 2), 
('Counselor', 95000, 3),
('Manager', 100000, 2); 

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Sally', 'Mae', 4, 2,
('Ronald', 'McDonald', 4, 3),
('Muna', 'Ali', 1, 2),
('The', 'Undertaker', 2, 3); 