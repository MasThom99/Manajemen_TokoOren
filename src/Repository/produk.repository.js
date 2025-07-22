import { AppDataSource } from "../config/database.js";
import { ProdukEntity } from "../Entity/produk.entity.js";
import { KategoriEntity } from "../Entity/kategori.entity.js";
import { UserEntity } from "../Entity/users.entity.js";

class ProdukRepository {
  constructor() {
    this.produkRepository = AppDataSource.getRepository(ProdukEntity);
    this.kategoriRepository = AppDataSource.getRepository(KategoriEntity);
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async create(req, res) {
    const { id_kategori, user_id, nama_produk, stok, harga_beli, harga_jual } =
      req.body;
    const data = await this.produkRepository.findOne({
      where: { nama_produk },
    });
    if (data) {
      return res.status(403).json({
        status: false,
        message: "produk already exist",
      });
    }
    const dataKategori = await this.kategoriRepository.findOne({
      where: { id: id_kategori },
    });
    if (!dataKategori) {
      return res.status(404).json({
        status: false,
        message: "id kategori not found",
      });
    }
    console.log(dataKategori);
    const dataUser = await this.userRepository.findOne({
      where: { id: user_id },
    });
    if (!dataUser) {
      return res.status(404).json({
        status: false,
        message: "id user not found",
      });
    }
    const newData = this.produkRepository.create({
      id_kategori: dataKategori.id,
      user_id: dataUser.id,
      nama_produk,
      stok,
      harga_beli,
      harga_jual,
    });
    await this.produkRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "produk created successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.produkRepository.find();
    return res.status(200).json({
      status: true,
      message: "list produk",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.produkRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id produk not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list produk",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { id_kategori, user_id, nama_produk, stok, harga_beli, harga_jual } =
      req.body;
    const data = await this.produkRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id produk not found",
      });
    }
    await this.produkRepository.update(id, {
      id_kategori,
      user_id,
      nama_produk,
      stok,
      harga_beli,
      harga_jual,
    });
    const newData = await this.produkRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "produk updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.produkRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    await this.produkRepository.softDelete(id);
    return res.status(200).json({
      status: true,
      message: "produk deleted successfully",
      data: data,
    });
  }
}

export default ProdukRepository;
