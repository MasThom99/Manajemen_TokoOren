import { AppDataSource } from "../config/database.js";
import { detail_jualEntity } from "../Entity/detail_jual.entity.js";

class Detail_jualRepository {
  constructor() {
    this.detail_jualRepository = AppDataSource.getRepository(detail_jualEntity);
  }

  async create(req, res) {
    const { id_penjualan, id_produk, harga, jumlahBarang } = req.body;
    const data = await this.detail_jualRepository.findOne({
      where: { id },
    });
    if (data) {
      return res.status(403).json({
        status: false,
        message: "data already exist",
      });
    }
    const newData = await this.detail_jualRepository.create({
      id_penjualan,
      id_produk,
      harga,
      jumlahBarang,
    });
    return res.status(200).json({
      status: true,
      message: "data created successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.detail_jualRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "list data",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.detail_jualRepository.findOne({
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
      message: "list data",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { id_penjualan, id_produk, harga, jumlahBarang } = req.body;
    const data = await this.detail_jualRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: true,
        message: "id not found",
      });
    }
    await this.detail_jualRepository.update(id, {
      id_penjualan,
      id_produk,
      harga,
      jumlahBarang,
    });
    const newData = await this.detail_jualRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "data updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.detail_jualRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const newData = await this.detail_jualRepository.delete(id);
    return res.status(200).json({
      status: true,
      message: "data deleted successfully",
      data: newData,
    });
  }
}

export default Detail_jualRepository;
