import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export enum TypeSave{
    PROFILE=1,
}

export const saveFile=(b64:string,typeNumber:number):string=>{
    switch (typeNumber) {
        case TypeSave.PROFILE:
            
            const m: RegExpMatchArray =  b64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if(!m)throw new BadRequestException('La imagen no esta en base 64');
            const b: Buffer =  Buffer.from(m[2],'base64');
            const dir: string = `${__dirname}/../../images/profile`;
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir, {recursive: true});
            }
            
            const nameFile: string=`${uuidv4()}_${(formatDate(new Date()))}_image.png`;
            const path: string=`/employee/img/:${nameFile}`;
            fs.writeFileSync(dir+'/'+nameFile,b);
            return path;
    }
}


const formatDate=(x:Date)=>{
    return `${x.getFullYear()}${x.getMonth()+1}${x.getTime()}${x.getHours()}${x.getMinutes()}`;
}