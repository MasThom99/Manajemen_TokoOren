import { AppDataSource } from "../config/database.js";
import { SupplierEntity } from "../Entity/supplier.entity.js";

class SupplierRepository {
  constructor() {
    this.supplierRepository = AppDataSource.getRepository(SupplierEntity);
  }

  async create(req, res) {
    const { nama_supplier, alamat_supplier, no_telp, nama_produk } = req.body;
    const data = await this.supplierRepository.findOne({
      where: { nama_supplier },
    });
    if (data) {
      return res.status(400).json({
        status: false,
        message: "supplier already exist",
      });
    }
    const newData = this.supplierRepository.create({
      nama_supplier,
      alamat_supplier,
      no_telp,
      nama_produk,
    });
    await this.supplierRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "supplier created successfully",
      data: newData,
    });
  }

  async list(req, res) {
    const data = await this.supplierRepository.find();
    return res.status(200).json({
      status: true,
      message: "List supplier",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.supplierRepository.findOne({
      where: { id },
    });
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "supplier not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "List supplier",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { nama_supplier, alamat_supplier, no_telp, nama_produk } = req.body;
    const data = await this.supplierRepository.findOne({
      where: { id },
    });
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "supplier not found",
      });
    }
    await this.supplierRepository.update(id, {
      nama_supplier,
      alamat_supplier,
      no_telp,
      nama_produk,
    });
     const newData = await this.supplierRepository.findOne({
       where: { id: id },
     });
    // await this.supplierRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "supplier updated successfully",
      data: newData,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const data = await this.supplierRepository.findOne({ where: { id } });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id supplier not found",
      });
    }
    await this.supplierRepository.delete(id);
    return res.status(200).json({
      status: true,
      message: "supplier deleted successfully",
      data: data,
    });
  }
}

export default SupplierRepository;
