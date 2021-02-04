const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "weekend",
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "start",
        choices: [
          "View all Departments",
          "View all Role",
          "View all Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Remove Employee",
          "Exit",
        ],
      },
    ])
    .then(function (answer) {
      switch (answer.start) {
        case "View all Departments":
          viewDepartment();
          break;

        case "View all Role":
          viewRoles();
          break;

        case "View all Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewDepartment() {
  connection.query("SELECT * FROM departments", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the department name?",
        name: "deptName",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO departments SET ? ", {
        name: res.deptName,
      });
      connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the Role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for this position?",
        name: "roleSalary",
      },
      {
        type: "input",
        message: "What is the department ID number?",
        name: "deptID",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO roles SET ?", {
        title: res.roleName,
        salary: res.roleSalary,
        department_id: res.deptID,
      });
      connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is this employee's role ID?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager's ID number?",
        name: "managerID",
      },
    ])
    .then(function (res) {
      connection.query("INSERT INTO employees SET ?", {
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleID,
        manager_id: res.managerID,
      });
      connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
      });
    });
}
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate",
      },
      {
        type: "input",
        message: "What are you going to update?",
        name: "roleUpdate",
      },
    ])
    .then(function (res) {
      // connection.query("UPDATE employees SET ? WHERE ?", {
      //   first_name: res.employeeUpdate,
      //   role_id: res.roleUpdate,
      // });
      // connection.query("SELECT * FROM roles", function (err, res) {
      //   if (err) throw err;
      //   console.table(res);
      //   runSearch();
      // });
      connection.query(
        "UPDATE employees SET role_id=? WHERE first_name= ?",
        [res.employeeUpdate, res.roleUpdate]);

        connection.query("SELECT * FROM roles", function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}
