import { EntitySchema, JoinColumn } from "typeorm";
export const detail_jualEntity = new EntitySchema({
  name: "Detail_jual",
  tablename: "detail_jual",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    id_penjualan: {
      type: "uuid",
    },

    id_produk: {
      type: "uuid",
    },

    harga: {
      type: "int",
    },

    jumlah_barang: {
      type: "int",
    },

    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },

    deletedAt: {
      type: "timestamp",
      nullable: true,
    },
  },
  relations: {
    penjualan: {
      type: "many-to-one",
      target: "Penjualan",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_penjualan", referencedColumn: "id" },
    },

    produk: {
      type: "many-to-one",
      target: "produk",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_produk", referencedColumn: "id" },
    },
  },
});
