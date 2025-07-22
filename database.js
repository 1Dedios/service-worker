export const rolesDB = [
  {
    demo: {
      role: 'Admin',
    },
  },
];

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
