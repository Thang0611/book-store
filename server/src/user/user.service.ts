import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { hasPassword } from 'src/shared/utils';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { UserEntity } from './entities/user.entity';
import { Role } from 'src/auth/emuns/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @InjectDataSource() private dataSource: DataSource,
  ) { }

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    if (user.password !== user.passwordCf) {
      throw new HttpException('Password Not Match', 400);
    }
    const isExistUser = await this.findUserByUserName(user.username);
    if (isExistUser) {
      throw new ConflictException(`Username ${user.username} already exist!`);
    }
    if (user?.role !== Role.Admin) {
      user.role = Role.User;
    }
    const password = hasPassword(user.password);
    const newUser = this.usersRepository.create({ ...user, password });
    return this.usersRepository.save(newUser);
  }

  async findUserByUserName(username: string): Promise<UserEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { username },
    });
    return user;
  }
  async findUserAndAddress(id: string) {
    return await this.usersRepository.findOne({ where: { id: id }, relations: { address: true } });
  }
  async findUserById(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.findUserById(id)
    updateUserDto = this.usersRepository.create(updateUserDto)
    if (updateUserDto.password) {
      delete updateUserDto.password
    }
    const userUpdate = {
      ...user,
      ...updateUserDto
    };
    await this.usersRepository.update({ id }, { ...userUpdate })
    return this.usersRepository.findOneBy({ id: userUpdate.id })
  }

  findCartByUserID(id: string): Promise<UserEntity> {
    return this.dataSource
      .createQueryBuilder(UserEntity, 'user')
      .leftJoinAndSelect('user.cart', 'cart ')
      .select(['user'])
      .where('user.id = :id', { id })
      .getOne();
  }

  getAllUser() {
    return this.usersRepository.find({ relations: { address: true } })
  }
}
