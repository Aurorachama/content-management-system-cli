const rolesPrompt = [
    {
      name: 'roles_menu',
      message: `What would you like to do?`,
      type: 'list',
      choices: ['View Roles', 'Add Role', 'Delete Role'],
    }
  ]
  
  
  const renderRolesList = (rolesRes) => {
    const rolesList = rolesRes.map((item) => {
      const formattedRole = { name: item.title, value: item.id };
      return formattedRole;
    });
    return rolesList
  };
  
  module.exports = {
    rolesPrompt, renderRolesList
  }