import { AppDataSource } from "../config/database.js";
import { PenjualanEntity } from "../Entity/penjualan.entity.js";
import { PelangganEntity } from "../Entity/pelanggan.entity.js";
import { KategoriEntity } from "../Entity/kategori.entity.js";
import { KaryawanEntity } from "../Entity/karyawan.entity.js";
import { ProdukEntity } from "../Entity/produk.entity.js";

class PenjualanRepository {
  constructor() {
    this.penjualanRepository = AppDataSource.getRepository(PenjualanEntity);
    this.karyawanRepository = AppDataSource.getRepository(KaryawanEntity);
  }

  async create(req, res) {
    const {
      id_pelanggan,
      id_kategori,
      id_karyawan,
      id_produk,
      nota_jual,
      total_harga,
    } = req.body;
    const data = await this.penjualanRepository.findOne({
      where: { nota_jual },
    });
    if (data) {
      return res.status(403).json({
        status: false,
        data: "nota_jual already exist",
      });
    }
    const dataKaryawan = await this.karyawanRepository.findOne({
      where: { id: id_karyawan },
    });
    if (!dataKaryawan) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    console.log(dataKaryawan);
    
    const newData = this.penjualanRepository.create({
      id_pelanggan,
      id_kategori,
      id_karyawan : dataKaryawan,
      id_produk,
      nota_jual,
      total_harga,
    });
   await this.penjualanRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "Transanction successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.penjualanRepository.find();
    return res.status(200).json({
      status: true,
      message: "transanction list",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.penjualanRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id penjualan not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "transanction list",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      id_pelanggan,
      id_kategori,
      id_karyawan,
      id_produk,
      nota_jual,
      total_harga,
    } = req.body;
    const data = await this.penjualanRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id transanction not found",
      });
    }
    await this.penjualanRepository.update(id, {
      id_pelanggan,
      id_kategori,
      id_karyawan,
      id_produk,
      nota_jual,
      total_harga,
    });
    const newData = await this.penjualanRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "transanction updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.penjualanRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id transanction not found",
      });
    }
    const newData = await this.penjualanRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "transaction deleted successfully",
      data: newData,
    });
  }
}

export default PenjualanRepository;
