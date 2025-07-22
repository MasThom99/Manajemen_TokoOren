import { AppDataSource } from "../config/database.js";
import { pembelianEntity } from "../Entity/pembelian.entity.js";
import { KategoriEntity } from "../Entity/kategori.entity.js";
import { SupplierEntity } from "../Entity/supplier.entity.js";
import { ProdukEntity } from "../Entity/produk.entity.js";

class PembelianRepository {
  constructor() {
    this.pembelianRepository = AppDataSource.getRepository(pembelianEntity);
    this.kategoriRepository = AppDataSource.getRepository(KategoriEntity);
    this.supplierRepository = AppDataSource.getRepository(SupplierEntity);
    this.produkRepository = AppDataSource.getRepository(ProdukEntity);
  }

  async create(req, res) {
    const {
      id_kategori,
      id_supplier,
      id_produk,
      nota_beli,
      nama_barang,
      harga,
      jumlah_produk,
      total_harga,
      date,
    } = req.body;
    const data = await this.pembelianRepository.findOne({
      where: { nota_beli },
    });
    if (data) {
      return res.status(404).json({
        status: false,
        message: "data already exist",
      });
    }
    const dataProduk = await this.produkRepository.findOne({
      where: { id: id_produk },
    });
    const dataSupplier = await this.supplierRepository.findOne({
      where: { id: id_supplier },
    });
    const dataKategori = await this.kategoriRepository.findOne({
      where: { id: id_kategori },
    });
    console.log(dataProduk);
    const newData = this.pembelianRepository.create({
      id_kategori,
      id_supplier,
      id_produk,
      nota_beli,
      nama_barang,
      harga,
      jumlah_produk,
      total_harga,
      date,
    });
    await this.pembelianRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "Pembelian successfully",
      data: newData,
    });
  }

  async list(req, res) {
    // const dataProduk = await this.produkRepository.findOne({ where: { id } });
    // const dataSupplier = await this.supplierRepository.findOne({
    //   where: { id },
    // });
    // const dataKategori = await this.kategoriRepository.findOne({
    //   where: { id },
    // });
    const data = await this.pembelianRepository.find();
    return res.status(200).json({
      status: true,
      message: "list pembelian",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.pembelianRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list pembelian",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      id_kategori,
      id_supplier,
      id_produk,
      nota_beli,
      nama_barang,
      harga,
      jumlah_produk,
      total_harga,
      date,
    } = req.body;
    const data = await this.pembelianRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    await this.pembelianRepository.update(id, {
      id_kategori,
      id_supplier,
      id_produk,
      nota_beli,
      nama_barang,
      harga,
      jumlah_produk,
      total_harga,
      date,
    });
    const newData = await this.pembelianRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "pembelian updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.pembelianRepository.findOne({ where: { id } });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const newData = await this.pembelianRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "pembelian deleted successfully",
      data: newData,
    });
  }
}

export default PembelianRepository;
