import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTickeoDto {

    @ApiProperty()
    @IsNotEmpty()
    entryTimeTomorrow:Date;

    @ApiProperty()
    @IsNotEmpty()
    departureTimeTomorrow:Date;

    @ApiProperty()
    @IsNotEmpty()
    minutesLateTomorrow:number;

    @ApiProperty()
    @IsNotEmpty()
    lateEntryTime:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateCheckOutTime:Date;

    @ApiProperty()
    @IsNotEmpty()
    minutesLateInAfternoon:number;

    @ApiProperty()
    @IsNotEmpty()
    employeeId:number;

    @ApiProperty()
    @IsNotEmpty()
    hourId:number;
    

}