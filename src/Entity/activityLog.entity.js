import { EntitySchema } from "typeorm";
export const activityLogEntity = new EntitySchema({
  name: "ActivityLog",
  tableName: "activityLog",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    user_id: {
      type: "uuid",
    },

    action: {
      type: "varchar",
    },

    data: {
      type: "text",
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
      type: "many-to-one",
      target: "User",
      onDelete: "CASCADE",
      joinColumn: { name: "userId", referencedColumnName: "id" },
    },
  },
});