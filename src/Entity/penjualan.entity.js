import { EntitySchema, JoinColumn } from "typeorm";
export const penjualanEntity = new EntitySchema({
  name: "Penjualan",
  tableName: "penjualan",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },

    id_pelanggan: {
      type: "uuid",
    },

    id_kategori: {
      type: "uuid",
    },

    id_karyawan: {
      type: "uuid",
    },

    id_produk: {
        type: "uuid",
    },

    nota_jual: {
      type: "varchar",
    },

    total_harga: {
      type: "int",
    },

    point: {
      type: "int",
    },

    date: {
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
    pelanggan: {
      type: "many-to-one",
      target: "Pelanggan",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_pelanggan", referenceColumn: "id" },
    },

    kategori: {
      type: "many-to-one",
      target: "Kategori",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_kategori", referenceColumn: "id" },
    },

    karyawan: {
      type: "many-to-one",
      target: "Karyawan",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_karyawan", referenceColumn: "id" },
    },

    produk: {
        type: "many-to-one",
        target: "Produk",
        onDelete: "CASCADE",
        JoinColumn: {name: "id_produk", referenceColumn: "id"}
    },

    detail_jual: {
      type: "one-to-many",
      target: "Detail_jual",
      cascade: true,
      inverseSide: "penjualan",
    },
  },
});
