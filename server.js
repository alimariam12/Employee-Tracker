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

// function viewDepartment(){
//     connection.query("SELECT * FROM departments", function(err, res) {
//       if (err) throw err;
//       console.table(res);
//       runSearch();
//     });
// }

// function viewRoles(){
//     connection.query("SELECT * FROM roles", function(err, res) {
//       if (err) throw err;
//       console.table(res);
//       runSearch();
//     });
// }

// function viewEmployees(){
//   connection.query("SELECT * FROM employees", function(err, res) {
//     if (err) throw err;
//     console.table(res);
//     runSearch();
//   });
// }

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
      connection.query(
        "INSERT INTO departments SET ? ",
        { name: res.deptName },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
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
    .then(function (answer) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: answer.roleName,
          salary: answer.roleSalary,
          department_id: answer.deptID,
        },
        function (err, answer) {
          if (err) throw err;
          console.table(answer);
        }
      );
      runSearch();
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
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?)",
        [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          runSearch();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the ID of the employee whose role is being chamged?",
      name: "employeeID",
    },
    {
      type: "input",
      message: "What is the ID of their new role?",
      name: "newRoleID",
    },
  ]);
  // .then(function(data){
  //
  // })
}

function removeEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the ID of the employee that is being removed?",
      name: "employeeInfo",
    },
  ]);
  // .then(function(data){

  // })
}
