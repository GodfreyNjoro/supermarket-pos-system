// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: [
    'VIEW_SALES', 'CREATE_SALES', 'VOID_SALES', 'VIEW_REPORTS',
    'VIEW_PRODUCTS', 'CREATE_PRODUCTS', 'EDIT_PRODUCTS', 'DELETE_PRODUCTS',
    'VIEW_INVENTORY', 'ADJUST_INVENTORY', 'TRANSFER_STOCK',
    'VIEW_SUPPLIERS', 'MANAGE_SUPPLIERS', 'CREATE_PURCHASE_ORDERS', 'RECEIVE_ORDERS',
    'VIEW_USERS', 'MANAGE_USERS', 'MANAGE_SETTINGS', 'MANAGE_STORES'
  ],
  MANAGER: [
    'VIEW_SALES', 'CREATE_SALES', 'VOID_SALES', 'VIEW_REPORTS',
    'VIEW_PRODUCTS', 'CREATE_PRODUCTS', 'EDIT_PRODUCTS',
    'VIEW_INVENTORY', 'ADJUST_INVENTORY', 'TRANSFER_STOCK',
    'VIEW_SUPPLIERS', 'CREATE_PURCHASE_ORDERS', 'RECEIVE_ORDERS',
    'VIEW_USERS'
  ],
  CASHIER: [
    'VIEW_SALES', 'CREATE_SALES',
    'VIEW_PRODUCTS',
    'VIEW_INVENTORY'
  ],
  INVENTORY_CLERK: [
    'VIEW_PRODUCTS',
    'VIEW_INVENTORY', 'ADJUST_INVENTORY',
    'VIEW_SUPPLIERS', 'RECEIVE_ORDERS'
  ]
};

export function hasPermission(role: string, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: string, permissions: string[]): boolean {
  return permissions.some(p => hasPermission(role, p));
}

export function getUserPermissions(role: string): string[] {
  return ROLE_PERMISSIONS[role] || [];
}
