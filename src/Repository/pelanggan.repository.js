import { AppDataSource } from "../config/database.js";
import { PelangganEntity } from "../Entity/pelanggan.entity.js";

class PelangganRepository {
  constructor() {
    this.pelangganRepository = AppDataSource.getRepository(PelangganEntity);
  }

  async create(req, res) {
    const { user_id, id_card, nama, no_telp, foto } = req.body;
    const data = await this.pelangganRepository.findOne({
      where: { id_card },
    });
    if (data) {
      return res.status(403).json({
        status: false,
        message: "data already exist",
      });
    }
    const newData = await this.pelangganRepository.create({
      user_id,
      id_card,
      nama,
      no_telp,
      foto,
    });
    await this.pelangganRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "pelanggan created successfully",
      data: newData,
    });
  }
  async list(req, res) {
    const data = await this.pelangganRepository.find();
    return res.status(200).json({
      status: true,
      message: "list pelanggan",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.pelangganRepository.findOne({
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
      message: "list pelanggan",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { user_id, id_card, nama, no_telp, foto } = req.body;
    const data = await this.pelangganRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    await this.pelangganRepository.update(id, {
      user_id,
      id_card,
      nama,
      no_telp,
      foto,
    });
    const newData = await this.pelangganRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "pelanggan updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.pelangganRepository.findOne({
      where: { id },
    });
    if (!data) {
      return res.status(404).json({
        status: true,
        message: "id not found",
      });
    }
    const newData = await this.pelangganRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "pelanggan deleted successfully",
      data: newData,
    });
  }
}

export default PelangganRepository;
