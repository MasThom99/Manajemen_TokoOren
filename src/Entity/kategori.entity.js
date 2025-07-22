import { EntitySchema } from "typeorm";
export const KategoriEntity = new EntitySchema({
  name: "Kategori",
  tableName: "kategori",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    nama_kategori: {
      type: "varchar",
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
    pembelian: {
      type: "one-to-many",
      target: "Pembelian",
      cascade: true,
      inverseSide: "kategori",
    },

    penjualan: {
      type: "one-to-many",
      target: "Penjualan",
      cascade: true,
      inverseSide: "kategori",
    },

    produk: {
      type: "one-to-many",
      target: "Produk",
      cascade: true,
      inverseSide: "kategori",
    },
  },
});
