import { PaginationQuery } from "../dtos/pagination.dto"
import { TypeQueryInterface } from "../interface/type-query.interface";

export enum TypeCasePagination{
    TEXT = 'text',
    NUMBER= 'number',
    DATE= 'date',
    NONE= 'none',
}

export const TypeQuery=({search,range1,range2}:PaginationQuery): TypeQueryInterface=>{
    if(search){
        const r=isNumber(search);
        if(r==-1){
            const data:TypeQueryInterface={
                type:TypeCasePagination.TEXT,
                search
            };
            return data;
        }else{
            const data:TypeQueryInterface={
                type:TypeCasePagination.NUMBER,
                search:r
            };
            return data;
        }
    }else if(range1&&range2&&isDate(range1)&&isDate(range2)){
        const data:TypeQueryInterface={
            type:TypeCasePagination.DATE,
            date1:new Date(range1),
            date2:new Date(range2),
        };
        return data;
    }else{
        const data:TypeQueryInterface={
            type:TypeCasePagination.NONE,
        };
        return data;
    }
}

const isNumber=(x:string)=>{
    const result:number=parseInt(x);
    if(isNaN(result)){
        return -1;
    }else{
        return result;
    }
}

const isDate=(x:Date)=>{
    const date:Date=new Date(x);
    return (date instanceof Date && !isNaN(date.valueOf()));
}