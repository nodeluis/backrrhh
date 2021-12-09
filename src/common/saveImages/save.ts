import { BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export enum TypeSave{
    PROFILE=1,
    EDIT_PROFILE=2,
}

export const saveFile=(b64:string, typeNumber:number, deleteFile?:string):string=>{
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
        case TypeSave.EDIT_PROFILE:
            
            const m2: RegExpMatchArray =  b64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            if(!m2)throw new BadRequestException('La imagen no esta en base 64');
            const b2: Buffer =  Buffer.from(m2[2],'base64');
            const dir2: string = `${__dirname}/../../images/profile`;
            if (!fs.existsSync(dir2)){
                fs.mkdirSync(dir2, {recursive: true});
            }
            if(deleteFile){
                const arr=deleteFile.split(':');
                if(arr&&arr[1])fs.unlinkSync(`${dir2}/${arr[1]}`);
            }
            const nameFile2: string=`${uuidv4()}_${(formatDate(new Date()))}_image.png`;
            const path2: string=`/employee/img/:${nameFile2}`;
            fs.writeFileSync(dir2+'/'+nameFile2,b2);
            return path2;
    }
}


const formatDate=(x:Date)=>{
    return `${x.getFullYear()}${x.getMonth()+1}${x.getTime()}${x.getHours()}${x.getMinutes()}`;
}