import { EntitySchema, JoinColumn } from "typeorm";
export const pembelianEntity = new EntitySchema({
  name: "Pembelian",
  tableName: "pembelian",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    id_kategori: {
      type: "uuid",
    },

    id_supplier: {
      type: "uuid",
    },

    id_produk: {
      type: "uuid",
    },

    nota_beli: {
      type: "varchar",
    },

    nama_barang: {
      type: "varchar",
    },

    harga: {
      type: "int",
    },

    jumlah_produk: {
      type: "int",
    },

    total_harga: {
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
      deleteDate: true,
      nullable: true,
    },
  },
  relatons: {
    kategori: {
      type: "many-to-one",
      target: "Kategori",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_kategori", referenceColumn: "id" },
    },

    supplier: {
      type: "many-to-one",
      target: "Supplier",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_supplier", referenceColumn: "id" },
    },

    produk: {
      type: "many-to-one",
      target: "Produk",
      onDelete: "CASCADE",
      JoinColumn: { name: "id_produk", referenceColumn: "id" },
    },
  },
});
