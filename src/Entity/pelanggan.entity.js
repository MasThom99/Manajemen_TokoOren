import { EntitySchema, JoinColumn } from "typeorm";
export const PelangganEntity = new EntitySchema({
  name: "Pelanggan",
  tableName: "pelanggan",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    user_id: {
      type: "uuid",
    },

    id_card: {
      type: "varchar",
    },

    nama: {
      type: "varchar",
    },

    no_telp: {
      type: "varchar",
    },

    foto: {
      type: "varchar",
      nullable : true,
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
      JoinColumn: { name: "user_id", referencedColumn: "id" },
    },

    penjualan: {
      type: "one-to-many",
      target: "Penjualan",
      cascade: true,
      inverseSide: "pelanggan",
    },
  },
});
