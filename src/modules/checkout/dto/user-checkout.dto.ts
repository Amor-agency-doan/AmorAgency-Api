import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserCheckout {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    fullname: string;
  
    @ApiProperty()
    @IsString()
    company: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'Phone is required' })
    @IsString()
    phone: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    @IsString()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'Contact is required' })
    @IsString()
    contact: string;
  
    @ApiProperty()
    @IsString()
    note: string;
  }