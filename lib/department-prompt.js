const deptsPrompt =[
    {
      name: 'depts_menu',
      message: `Options for Department`,
      type: 'list',
      choices: ['View Departments', 'View Budget', 'Add Department', 'Delete Department']
    }
  ]
  
  const addDept = [
    {
      name: 'name',
      message: `Enter the name for the new Department: `,
      type: 'input',
      validate: inputVal => (inputVal ? true: false)
    }
  ]
  
  const renderDeptsList = (deptsRes) => {
    const deptList = deptsRes.map((dept) => {
      const formattedDept = { name: dept.name, value: dept.id };
      return formattedDept;
    });
    return deptList;
  };
  
  module.exports = {
    renderDeptsList, deptsPrompt, addDept
  }