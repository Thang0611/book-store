import { IsNotEmpty } from "class-validator"
import { BaseDto } from "src/shared/config/base.dto"

export class CreateAddressDto extends BaseDto {


    @IsNotEmpty()
    province: string

    @IsNotEmpty()
    ward: string
    
    @IsNotEmpty()
    district: string

    @IsNotEmpty()
    addressLine: string
}
