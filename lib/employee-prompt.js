const employeesPrompt = [
    {
      name: 'employees_menu',
      message: `Options for Employees?`,
      type: 'list',
      choices: ['View Employees', 'Update Employee', 'Add Employee', 'Delete Employee'],
    }
  ]
  
  const empViewOptions = [
    {
      name: 'employees_view',
      message: `What's the criteria to view employee?`,
      type: 'list',
      choices: ['View All', 'View by Role', 'View by Manager'],
    }
  ]
  
  const updateEmpQ = [
    {
      name: 'update_select',
      message: `Update this employee by Role or Manager? `,
      type: 'list',
      choices: ['Role', 'Manager'],
    }
  ]
  
  const renderManagerList = (managersRes) => {
  
    const managersList = managersRes.map((item) => {
      const formattedManager = { name: item.manager, value: item.id };
      return formattedManager;
    });
    return managersList;
  
  };
  
  const renderEmpsList = (empsRes) => {
  
    const EmpsList = empsRes.map((item) => {
      const formattedEmp = { name: item.name, value: item.id };
      return formattedEmp;
    });
    return EmpsList;
  };
  
  module.exports = { employeesPrompt, empViewOptions, renderManagerList, renderEmpsList, updateEmpQ }