import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateHourDto {

    @ApiProperty()
    @IsNotEmpty()
    hourHandId:number;

    @ApiProperty()
    @IsNotEmpty()
    entryTomorrow:Date;

    @ApiProperty()
    @IsNotEmpty()
    departureTomorrow:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateEntry:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateCheckOut:Date;

    @ApiProperty()
    @IsNotEmpty()
    entryTomorrowLimitInitial:Date;

    @ApiProperty()
    @IsNotEmpty()
    entryTomorrowLimitFinal:Date;

    @ApiProperty()
    @IsNotEmpty()
    departureTomorrowLimitInitial:Date;

    @ApiProperty()
    @IsNotEmpty()
    departureTomorrowLimitFinal:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateEntryLimitInitial:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateEntryLimitFinal:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateCheckOutLimitInitial:Date;

    @ApiProperty()
    @IsNotEmpty()
    lateCheckOutLimitFinal:Date;

    @ApiProperty()
    @IsNotEmpty()
    dischargeDate:Date;
}