const deptsPrompt =[
    {
      name: 'depts_menu',
      message: `What would you like to do?`,
      type: 'list',
      choices: ['View Departments', 'View Budget', 'Add Department', 'Delete Department']
    }
  ]
  
  const addDept = [
    {
      name: 'name',
      message: `Enter name for new Department: `,
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