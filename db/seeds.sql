USE employee_data;

INSERT INTO department (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary,department_id)
VALUES
  ('Sales Lead', 100000,1),
  ('Salesperson', 80000,1), 
  ('Lead Engineer', 150000,2),
  ('Software Engineer', 120000,2),
  ('Accountant', 125000,3),
  ('Legal Team Lead', 250000,4),
  ('Lawyer', 190000,4);

INSERT INTO employee (first_name, last_name,role_id)
VALUES
  ('Spacetaylor', 'Russellmoondancer', 1),
  ('Howardsef', 'Roberg', 3),
  ('Hermiguilar', 'Wager', 5),
  ('Weane', 'Harkker', 6);

  INSERT INTO employee(first_name, last_name,role_id,manager_id)
  VALUES
    ('Kramcia', 'Firerong', 2, 1),
    ('Waradrin', 'Magicwalker', 4, 2),
    ('Shazora', 'Bradleflame', 7, 4);