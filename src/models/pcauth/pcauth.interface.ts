export interface PcAuthInterface{
    id?:number;
    ip:string;
    mac:string;
    lastUpdate:Date;
    lastConnection:Date;
    enabled:boolean;
}
