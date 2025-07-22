import { EntitySchema } from "typeorm";
export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    username: {
      type: "varchar",
      unique: true,
    },

    password: {
      type: "varchar",
    },

    profile_photo: {
      type: "varchar",
      nullable: true,
    },

    isVerified: {
      type: "boolean",
      default: false,
    },

    roleId: {
      type: "uuid",
      nullable: true,
    },

    created_at: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },

    deleted_at: {
      type: "timestamp",
      deleteDate: true,
      nullable: true,
    },
  },
  relations: {
    role: {
      type: "many-to-one",
      target: "Role",
      onDelete: "CASCADE",
      joinColumn: { name: "roleId", referencedColumnName: "id" },
    },

    token: {
      type: "one-to-many",
      target: "Token",
      cascade: true,
      inverseSide: "user",
    },

    karyawan: {
      type: "one-to-many",
      target: "Karyawan",
      cascade: true,
      inverseSide: "user",
    },

    pelanggan: {
      type: "one-to-many",
      target: "Pelanggan",
      cascade: true,
      inverseSide: "user",
    },

    produk: {
      type: "one-to-many",
      target: "Produk",
      cascade: true,
      inverseSide: "user",
    },

    activityLog: {
      type: "one-to-many",
      target: "activityLog",
      cascade: true,
      inverseSide: "user",
    },
  },
});
