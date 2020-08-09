const inquirer = require('inquirer');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employee_trackerDB'
});
connection.connect(function(err){
    if (err) throw err;
    console.log('listening on port:' + connection.port);
    init();
});

const init = function(){
    inquirer.prompt({
        type: 'list',
        name: 'initialize',
        message: 'What would you like to do?',
        choices: [
            'Add department',
            'Add role',
            'Add employee',
            'View departments',
            'View roles',
            'View employees',
        ]
    }).then(function(res){
        console.log(res);
        switch (res.initialize){
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'View departments':
                viewDepartments();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
                break;
        }
    });
};
function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "Please enter the new department name",
        name: "addDept"
      }).then(function(res){
        connection.query(
          "INSERT INTO department SET ?",
          {
            name: res.addDept
          },
          function(err,res){
            if (err) throw err;
            console.table(res)
          });
        init();
      });
  }
function addRole(){
    inquirer.prompt([
        {
          type: "input",
          message: "Please enter the new employee title",
          name: "title"
        },
        {
          type: "input",
          message: "Please enter the new employee salary",
          name: "salary"
        },
        {
          type: "input",
          message: "Please enter the new employee department id",
          name: "DepId"
        }
      ]).then(function(res){
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: res.title,
            salary: res.salary,
            department_id: res.DepId
          },
          function(err,res){
            if (err) throw err;
            console.table(res)
          });
        init();
      });
  }
function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Please enter the new employee's first name"
        },
        {
            type: 'input',
            name: 'last_name',
            message: "Please enter the new employee's last name"
        }
    ]).then(function(res){
        connection.query('INSERT INTO employee SET ?',{
            first_name: res.first_name,
            last_name: res.last_name,
            role_id: null,
            manager_id: null
        },function(err,res){
            if (err) throw err;
            console.table(res)
        });
        init();
    });
}
function viewDepartments(){
    connection.query('SELECT * FROM department',function(err,res){
        if (err) throw err;
        console.log('\n departments displayed \n');
        console.table(res);
    });
    init();
}
function viewRoles(){
    connection.query('SELECT * FROM role',function(err,res){
        if (err) throw err;
        console.log('\n roles displayed \n');
        console.table(res);
    });
    init();
}
function viewEmployees(){
    connection.query('SELECT * FROM employee',function(err,res){
        if (err) throw err;
        console.log('\n employees displayed \n');
        console.table(res);
    });
    init();
}
