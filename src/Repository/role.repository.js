import { AppDataSource } from "../config/database.js";
import { RoleEntity } from "../Entity/role.entity.js";
import { UserEntity } from "../Entity/users.entity.js";

class RoleRepository {
  constructor() {
    this.roleRepository = AppDataSource.getRepository(RoleEntity);
    this.userRepository = AppDataSource.getRepository(UserEntity);
  }

  async create(req, res) {
    const { roleName } = req.body;
    const data = await this.roleRepository.findOne({
      where: { roleName },
    });
    if (data) {
      return res.status.json({
        status: false,
        message: "role already exist",
      });
    }
    const newData = this.roleRepository.create({
      roleName,
    });
    await this.roleRepository.save(newData);
    return res.status(200).json({
      status: true,
      message: "role created successfully",
      data: newData,
    });
  }

  async find(req, res) {
    const data = await this.roleRepository.find({});
    return res.status(200).json({
      status: true,
      message: "List role",
      data: data,
    });
  }

  async detail(req, res) {
    const { id } = req.params;
    const data = await this.roleRepository.findOne({ where: { id } });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "roleId not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "list role",
      data: data,
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const { roleName } = req.body;
    const data = await this.roleRepository.findOne({
      where: { id },
    });
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found",
      });
    }
    await this.roleRepository.update(id, {
      roleName,
    });
    const newData = await this.roleRepository.findOne({
      where: { id },
    });
    return res.status(200).json({
      status: true,
      message: "role updated successfully",
      data: newData,
    });
  }
}

export default RoleRepository;
