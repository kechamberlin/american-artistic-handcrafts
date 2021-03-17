import { permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

// At its simplest, access control returns a yes or no value depending on user's session
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session; // !! coerces truthy/falsy values into true booleans
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
);

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
};

// Rule-based functions
// Rules can return a boolean or filter, which limits what products they can access
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If NOT, do they own this item?
    return { user: { id: session.itemId } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If NOT, do they own this item?
    return { user: { id: session.itemId } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If NOT, do they own this item?
    return { order: { user: { id: session.itemId } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageProducts({ session })) {
      return true; // They can read everything
    }
    // They should only see available products basedon the status field
    return { status: 'AVAILABLE' };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of to manage Users?
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. If NOT, they may only update themselves
    return { id: session.itemId };
  },
};
