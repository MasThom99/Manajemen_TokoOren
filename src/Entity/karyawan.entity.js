import { EntitySchema, JoinColumn } from "typeorm";
export const karyawanEntity = new EntitySchema({
  name: "Karyawan",
  tableName: "karyawan",
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
    },

    tgl_masuk: {
      type: "date",
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
      target: "user",
      onDelete: "CASCADE",
      JoinColumn: { name: "user_id", referencedColumn: "id" },
    },

    penjualan: {
      type: "one-to-many",
      target: "Penjualan",
      cascade: true,
      inverseSide: "kategori",
    },
  },
});
