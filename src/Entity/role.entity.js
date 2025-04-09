import { EntitySchema, JoinColumn } from "typeorm";
export const RoleEntity = new EntitySchema({
  name: "Role",
  tableName: "role",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    roleName: {
      type: "enum",
      enum: ["admin", "user", "general"],
      default: "general",
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },

    deleted_at: {
      type: "timestamp",
      nullable: true,
    },
  },

  relations: {
    user: {
      type: "one-to-many",
      target: "User",
      cascade: true,
      inverseSide: "role",
    },
  },
});
