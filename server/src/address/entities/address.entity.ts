import { BaseEntity } from "src/shared/config/base.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity('address')
export class Address extends BaseEntity {
 
    @Column()
    province: string
    @Column()
    district: string
    @Column()
    ward:string
    @Column()
    addressLine: string
    @OneToOne(() => UserEntity, user => user.address)
    user: UserEntity

}
