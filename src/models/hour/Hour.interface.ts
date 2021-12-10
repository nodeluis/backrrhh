export interface HourInterface{
    id?:number;
    entryTomorrow:Date;
    departureTomorrow:Date;
    dischargeDate:Date;
    lateEntry:Date;
    lateCheckOut:Date;
    entryTomorrowLimitInitial:Date;
    entryTomorrowLimitFinal:Date;
    departureTomorrowLimitInitial:Date;
    departureTomorrowLimitFinal:Date;
    lateEntryLimitInitial:Date;
    lateEntryLimitFinal:Date;
    lateCheckOutLimitInitial:Date;
    lateCheckOutLimitFinal:Date;
    enabled:boolean;
}
