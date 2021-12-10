import { Body, Controller, Get, HttpException, Param, Post, Put, Query, Response, StreamableFile } from '@nestjs/common';
import { AppResource } from 'src/app.roles';
import { join } from 'path';
import { Auth } from 'src/common/decorators/auth.decorator';
import { PaginationQuery } from 'src/common/dtos/pagination.dto';
import { CreateFingerPrintDto } from './dtos/create-finger-print.dto';
import { EditFingerPrintDto } from './dtos/edit-finger-print.dto';
import { FingerPrintService } from './finger-print.service';
import { createReadStream } from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Finger Print routes')
@Controller('finger-print')
export class FingerPrintController {

    constructor(
        private fingerService:FingerPrintService,
    ){}

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.FINGER,
    })
    @Get()
    async findFingerPrints(@Query() paginationQuery: PaginationQuery) {
        try { 
            const data=await this.fingerService.getFingerPrints(paginationQuery);
            return { data }
        } catch (error) {
            return new HttpException(error, 409);
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.FINGER,
    })
    @Get(':id')
    async findFingerPrint(@Param('id') id: number) {
        try {
            const data = await this.fingerService.getFingerPrint(id);
            return { data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'create',
        resource: AppResource.FINGER,
    })
    @Post()
    async createFingerPrint(@Body() dto: CreateFingerPrintDto){
        try {
            const data=await this.fingerService.createFingerPrint(dto);
            return { message:'Registro creado', data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.FINGER,
    })
    @Put(':id')
    async editFingerPrint(
        @Param('id') id: number,
        @Body() dto: EditFingerPrintDto,
    ) {
        try { 
            const data = await this.fingerService.editFingerPrint(id, dto);
            return { message:'Registro actualizado', data };
        } catch (error) {
            return error;
        }
    }

    @Auth({
        possession: 'own',
        action: 'read',
        resource: AppResource.FINGER,
    })
    @Get('img/:img')
    async getImg(@Param('img') img:string,@Response({ passthrough: true }) res){
        try {
            const data=`${__dirname}/../images/finger-prints/${img}`;
            const file = createReadStream(join(data));
            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="image_profile.png"',
            });
            return new StreamableFile(file);
        } catch (error) {
            return error;
        }
    }
}
