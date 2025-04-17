export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

export const Roles = {
  ADMIN: Role.ADMIN,
  MEMBER: Role.MEMBER
} as const;