import { AppDataSource } from "../config/database.js";
import { KategoriEntity } from "../Entity/kategori.entity.js";

class KategoriRepository {
  constructor() {
    this.kategoriRepository = AppDataSource.getRepository(KategoriEntity);
  }

  async create(req, res) {
    const { nama_kategori } = req.body;
    const data = await this.kategoriRepository.findOne({
      where: { nama_kategori },
    });
    if (data) {
      return res.status(404).json({
        status: false,
        message: "kategori already exist",
      });
    }
    const newData = this.kategoriRepository.create({
      nama_kategori,
    });
    await this.kategoriRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "kategori created successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.kategoriRepository.find();
    return res.status(200).json({
      status: true,
      message: "List kategori",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.kategoriRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "kategori not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list kategori",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nama_kategori } = req.body;
    const data = await this.kategoriRepository.findOne({ where: { id } });
    if (!id) {
      return res.status(404).json({
        status: true,
        message: "kategori not found",
      });
    }
    await this.kategoriRepository.update(id, {
      nama_kategori,
    });
    const newData = this.kategoriRepository.findOne({ where: 
      { id } });
    return res.status(200).json({
      status: true,
      message: "kategori updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.kategoriRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id kategori not found",
      });
    }
    await this.kategoriRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "kategori deleted successfully",
      data: data,
    });
  }
}

export default KategoriRepository;
