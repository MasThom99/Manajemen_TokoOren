import { EntitySchema, JoinColumn } from "typeorm";
export const ProdukEntity = new EntitySchema({
  name: "Produk",
  tableName: "produk",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    id_kategori: {
      type: "uuid",
    },

    user_id: {
      type: "uuid",
    },

    nama_produk: {
      type: "varchar",
    },

    stok: {
      type: "int",
    },

    harga_beli: {
      type: "int",
    },

    harga_jual: {
      type: "int",
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
    kategori: {
      type: "many-to-one",
      target: "Kategori",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_kategori", referenceColumn: "id" },
    },

    user: {
      type: "many-to-one",
      target: "User",
      onDelete: "CASCADE",
      JoinColumn: { name: "user_id", referenceColumn: "id" },
    },

    penjualan: {
      type: "one-to-many",
      target: "Penjualan",
      cascade: true,
      inverseSide: "produk",
    },

    pembelian: {
      type: "one-to-many",
      target: "Pembelian",
      cascade: true,
      inverseSide: "produk",
    },

    detail_jual: {
      type: "one-to-many",
      target: "Detail_jual",
      cascade: true,
      inverseSide: "produk",
    },
  },
});
