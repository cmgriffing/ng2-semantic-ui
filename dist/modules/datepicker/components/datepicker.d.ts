import { CalendarService } from "./../services/calendar.service";
import { SuiLocalizationService } from "../../../behaviors/localization/services/localization.service";
export declare type DatepickerMode = "year" | "month" | "date" | "datetime" | "time";
export declare const DatepickerMode: {
    Year: "time" | "month" | "date" | "year" | "datetime";
    Month: "time" | "month" | "date" | "year" | "datetime";
    Date: "time" | "month" | "date" | "year" | "datetime";
    Datetime: "time" | "month" | "date" | "year" | "datetime";
    Time: "time" | "month" | "date" | "year" | "datetime";
};
export declare class SuiDatepicker {
    private _localizationService;
    calendarClasses: boolean;
    service: CalendarService;
    constructor(_localizationService: SuiLocalizationService);
    onMouseDown(e: MouseEvent): void;
}
