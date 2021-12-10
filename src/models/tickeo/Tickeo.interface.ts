export interface TickeoInterface{
    id?:number;
    entryTimeTomorrow:Date;
    departureTimeTomorrow:Date;
    minutesLateTomorrow:number;
    lateEntryTime:Date;
    lateCheckOutTime:Date;
    minutesLateInAfternoon:number;
}
