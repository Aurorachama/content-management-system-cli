const inquirer = require('inquirer');
const db = require('./config/connection');
require('console.table');

const {
  viewAll, getRoles, queryRole, getManagers, queryManager, getShort, updateRole, updateManager, addNew, deleteEmp,
  getRolesTable, addNewRole, deleteRole,
  getDepts, getDeptSalaries, deleteDept, addNewDept
} = require('./lib/db-query');

//import questions
const menuPrompt = require('./lib/prompt');
const { employeesPrompt, empViewOptions, renderManagerList, renderEmpsList, updateEmpQ } = require('./lib/employee-prompt');
const { renderRolesList, rolesPrompt } = require('./lib/role-prompt');
const { renderDeptsList, deptsPrompt, addDept } = require('./lib/department-prompt');


const entryPrompt = async () => {

  const { selected_menu: menuSelect } = await inquirer.prompt(menuPrompt);

  if (menuSelect === 'Employees') {
    employeesMenu();
  } else if (menuSelect === 'Roles') {
    rolesMenu();
  } else if (menuSelect === 'Departments') {
    departmentsMenu();
  } else {
    db.end();
  }
  ;
}

const employeesMenu = async () => {
  const { employees_menu: employeesAction } = await inquirer.prompt(employeesPrompt);

  if (employeesAction === 'View Employees') {
    viewEmpMenu();
  } else if (employeesAction === 'Update Employee') {
    updateEmpMenu();
  } else if (employeesAction === 'Add Employee') {
    addEmpMenu();
  } else if (employeesAction === 'Delete Employee') {
    delEmpMenu();
  }
};


const viewEmpMenu = async () => {

  const { employees_view: empViewSelect } = await inquirer.prompt(empViewOptions);

  if (empViewSelect === 'View All') {

    const allEmps = await viewAll();
    console.table(allEmps);

    return entryPrompt();

  } else if (empViewSelect === 'View by Role') {

    const rolesRes = await getRoles();
    const rolesList = await renderRolesList(rolesRes);

    let rolesQ =
      [
        {
          name: 'selected_role',
          message: 'Search by: ',
          type: 'list',
          choices: rolesList
        }
      ]

    const { selected_role: selectedRole } = await inquirer.prompt(rolesQ);
    const empsByRole = await queryRole(selectedRole);

    console.table(empsByRole);

    return entryPrompt();

  } else if (empViewSelect === 'View by Manager') {

    const managerRes = await getManagers();
    const managersList = await renderManagerList(managerRes);

    let managersQ =
      [
        {
          name: 'selected_manager',
          message: 'Search by: ',
          type: 'list',
          choices: managersList
        }
      ]


    const { selected_manager: selectedManager } = await inquirer.prompt(managersQ);


    const empsByManager = await queryManager(selectedManager);
    console.table(empsByManager);


    return entryPrompt();
  }
};


const updateEmpMenu = async () => {

  const empsRes = await getShort();
  const empsList = await renderEmpsList(empsRes);

  let empNamesQ =
    [
      {
        name: 'selected_emp',
        message: 'Select an Employee: ',
        type: 'list',
        choices: empsList

      }
    ]

  const { selected_emp: selectedEmp } = await inquirer.prompt(empNamesQ);


  const { update_select: selectedEmpUpdate } = await inquirer.prompt(updateEmpQ);


  if (selectedEmpUpdate === 'Role') {

    const rolesRes = await getRoles();
    const rolesList = await renderRolesList(rolesRes);

    let rolesQ =
      [
        {
          name: 'selected_role',
          message: 'Select new Role: ',
          type: 'list',
          choices: rolesList
        }
      ]

    const { selected_role: newRole } = await inquirer.prompt(rolesQ);

    updateRole(newRole, selectedEmp);

    console.log(`Employee's Role Updated!`)
    return entryPrompt();
  } else if (selectedEmpUpdate === 'Manager') {

    let empNamesQ =
      [
        {
          name: 'selected_emp',
          message: 'Select new Manager: ',
          type: 'list',
          choices: empsList
        }
      ]

    const { selected_emp: newManager } = await inquirer.prompt(empNamesQ);

    updateManager(newManager, selectedEmp);

    console.log(`Employee's Manager Updated!`)
    return entryPrompt();
  }
}

const addEmpMenu = async () => {
  const rolesRes = await getRoles();
  const rolesList = await renderRolesList(rolesRes);   
  const empsRes = await getShort();
  const empsList = await renderEmpsList(empsRes);

  const addEmpQ = [
    {
      name: 'first_name',
      message: 'Enter first name: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'last_name',
      message: 'Enter last name: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'role_id',
      message: `Select employee's role: `,
      type: 'list',
      choices: rolesList
    },
    {
      name: 'manager_id',
      message: `Select employee's manager: `,
      type: 'list',
      choices: empsList
    }
  ]

  const newEmpData = await inquirer.prompt(addEmpQ);
  addNew(newEmpData);
  console.log('Employee Added!');
  return entryPrompt();
}


const delEmpMenu = async () => {
  const empsRes = await getShort();
  const empsList = await renderEmpsList(empsRes);

  const delEmpQ = [
    {
      name: 'id',
      message: 'Select which employee to delete: ',
      type: 'list',
      choices: empsList
    }
  ]

  let { id: delEmp } = await inquirer.prompt(delEmpQ);
  deleteEmp(delEmp);

  console.log('Employee Deleted!');
  return entryPrompt();
}


const rolesMenu = async () => {
  const { roles_menu: rolesAction } = await inquirer.prompt(rolesPrompt);

  if (rolesAction === 'View Roles') {
    viewRoles();
  } else if (rolesAction === 'Add Role') {
    addRoleMenu();
  } else if (rolesAction === 'Delete Role') {
    delRoleMenu();
  }
}


const viewRoles = async () => {

  const fullRoles = await getRolesTable();
  console.table(fullRoles);

  return entryPrompt();
}


const addRoleMenu = async () => {

  const deptsRes = await getDepts();
  const deptsList = await renderDeptsList(deptsRes);


  const addRoleQ = [
    {
      name: 'title',
      message: 'Enter title of new role: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'salary',
      message: 'What is the salary for this role? ',
      type: 'input',
      validate: inputVal => {
        return inputVal > 0 && !isNaN(inputVal) ? true : false;
      }
    },
    {
      name: 'department_id',
      message: 'Which department does this role belong to? ',
      type: 'list',
      choices: deptsList
    }
  ]

  const newRoleData = await inquirer.prompt(addRoleQ);


  addNewRole(newRoleData);
  console.log('Role Added!');

  return entryPrompt();
}


// ====================================================================================================================================================================================
// User has selected to delete role:
const delRoleMenu = async () => {
  //get roles (we don't need all the data so let's use this one:) --> if there's time make a more general query SELECT ? from ROLES and etc
  const rolesRes = await getRoles(); //query DB to get list of all roles
  const rolesList = await renderRolesList(rolesRes);   //format response in a nice array

  const delRoleQ = [
    {
      name: 'id',
      message: 'Select which role to delete: ',
      type: 'list',
      choices: rolesList
    }
  ]

  let { id: delRole } = await inquirer.prompt(delRoleQ);
  //console.log(delEmp);

  //delRole = 9;

  deleteRole(delRole);

  console.log('Role Deleted!');
  return entryPrompt();

}

// ====================================================================================================================================================================================
// User has selected Departments menu
// *************************************===============================================================================================================================================

//call Departments prompt which asks user if they want to View Departments/View Department Budget/Add Dpt/Delete Dpt
//if View -> show all dpts -> call Entry Prompt
// if View Budget -> prompt to Select Dpt from List -> show budget
// if Add call Add D prompts (name)
// if Delete call Delete R prompts (list)
const departmentsMenu = async () => {
  const { depts_menu: deptsAction } = await inquirer.prompt(deptsPrompt);

  if (deptsAction === 'View Departments') { // Display ID / Title / Salary / Dpt name
    viewDepts();
  } else if (deptsAction === 'View Budget') {
    viewBudget();
  } else if (deptsAction === 'Add Department') { //     if Add call Add R prompts (input Title/select Dpt)
    addDeptMenu();
  } else if (deptsAction === 'Delete Department') { //     if Delete call Delete R prompts
    delDeptMenu();
  }
}

// ====================================================================================================================================================================================
// User has selected to view departments:
const viewDepts = async () => {
  //get dept id / name
  const deptsRes = await getDepts();
  console.table(deptsRes);

  return entryPrompt();
}

// ====================================================================================================================================================================================
// User has selected to view department's budget:
const viewBudget = async () => {
  const deptsRes = await getDepts();
  //console.table(deptsRes); 
  const deptsList = await renderDeptsList(deptsRes);

  const viewBudgetQ = [
    {
      name: 'id',
      message: `Select which Department's budget to view: `,
      type: 'list',
      choices: deptsList
    }
  ]

  const { id: deptSelected } = await inquirer.prompt(viewBudgetQ);

  const deptSalaries = await getDeptSalaries(deptSelected);

  let deptBudget = 0;

  deptSalaries.forEach(employee => {
    deptBudget = deptBudget + parseFloat(employee.salary);
  });

  console.log(`Departmental budget: ${deptBudget}`);
}


const addDeptMenu = async () => {

  const newDeptData = await inquirer.prompt(addDept);

  addNewDept(newDeptData);
  console.log('Department Added!');

  return entryPrompt();
}

const delDeptMenu = async () => {
  const deptsRes = await getDepts();
  const deptsList = await renderDeptsList(deptsRes);

  const delDeptQ = [
    {
      name: 'id',
      message: `Select which Department to delete: `,
      type: 'list',
      choices: deptsList
    }
  ]

  let { id: delDept } = await inquirer.prompt(delDeptQ);

  deleteDept(delDept);
  console.log('Department Deleted!');

  return entryPrompt();
}

db.connect(err => {
    console.log(err);
    entryPrompt();
});