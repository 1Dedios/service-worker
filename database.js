export const rolesDB = [
  {
    demo: {
      role: 'Admin',
    },
  },
];
console.log(rolesDB.filter((user) => user['demo']));
export const permissionDB = [
  {
    Admin: {
      editAccess: ['r', 'w', 'x'],
    },
  },
  {
    User: {
      editAccess: ['r'],
    },
  },
];
console.log(permissionDB.filter((permissions) => permissions['Admin']));
