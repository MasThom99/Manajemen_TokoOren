import { EntitySchema } from "typeorm";
export const supplierEntity = new EntitySchema({
  name: "Supplier",
  tableName: "supplier",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    nama_supplier: {
      type: "varchar",
    },

    alamat_supplier: {
      type: "varchar",
    },

    no_telp: {
      type: "int",
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
    pembelian: {
      type: "one-to-many",
      target: "Pembelian",
      cascade: true,
      inverseSide: "supplier",
    },
  },
});
