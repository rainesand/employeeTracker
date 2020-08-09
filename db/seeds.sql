USE employee_trackerDB;

INSERT INTO department (name)
VALUES ('employees'), ('managers'), ('supervisors');

INSERT INTO role (title, salary, department_id)
VALUES ('employee',100,1), ('manager',1000,2), ('supervisor',10000,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Will','Baker',1,2), ('Jerry','Rice',2,3), ('Jimbo', 'McGee',3,NULL);