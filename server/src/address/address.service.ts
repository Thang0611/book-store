import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private userService:UserService
  ) {}

  async getAddress(id:string):Promise<Address>{
    const user=await this.userService.findUserAndAddress(id)
    if(!user?.address?.id){
      throw new BadRequestException('Address not exits')
    }
    return this.addressRepository.findOneBy({id:user?.address?.id})
  }
  
  async create(id:string,createAddressDto: CreateAddressDto) {
    const user= await this.userService.findUserById(id)
    const address=this.addressRepository.create({...createAddressDto,user})
    return this.addressRepository.save(address)
  }


  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const user= await this.userService.findUserAndAddress(id)
    updateAddressDto=this.addressRepository.create(updateAddressDto)
    const addressupdate = {
      ...user.address,
      ...updateAddressDto,
    };
    addressupdate.updatedAt=new Date()
    return this.addressRepository.update({id:user.address.id},{...addressupdate})
  }
}
