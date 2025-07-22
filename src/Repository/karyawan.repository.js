import { AppDataSource } from "../config/database.js";
import { KaryawanEntity } from "../Entity/karyawan.entity.js";

class KaryawanRepository {
  constructor() {
    this.karyawanRepository = AppDataSource.getRepository(KaryawanEntity);
  }

  async create(req, res) {
    const { user_id, id_card, nama, no_telp, foto, tgl_masuk } = req.body;
    const data = await this.karyawanRepository.findOne({
      where: { nama },
    });
    if (data) {
      res.status(403).json({
        status: false,
        message: "data already exist",
      });
    }
    const newData = this.karyawanRepository.create({
      user_id,
      id_card,
      nama,
      no_telp,
      foto,
      tgl_masuk,
    });
    await this.karyawanRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "data created successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.karyawanRepository.find();
    return res.status(200).json({
      status: true,
      message: "list karyawan",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.karyawanRepository.findOne({
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
      message: "list karyawan",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { user_id, id_card, nama, no_telp, foto, tgl_masuk } = req.body;
    const data = await this.karyawanRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    await this.karyawanRepository.update(id, {
      user_id,
      id_card,
      nama,
      no_telp,
      foto,
      tgl_masuk,
    });
    const newData = await this.karyawanRepository.findOne({
      where: { id },
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.karyawanRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    const newData = await this.karyawanRepository.delete(id);
    return res.status(200).json({
      status: true,
      message: "data deleted successfully",
      data: newData,
    });
  }
}

export default KaryawanRepository;
