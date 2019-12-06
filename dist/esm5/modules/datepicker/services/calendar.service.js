import { EventEmitter } from "@angular/core";
import { DateUtil } from "../../../misc/util/index";
export var CalendarMode;
(function (CalendarMode) {
    CalendarMode[CalendarMode["DateOnly"] = 0] = "DateOnly";
    CalendarMode[CalendarMode["TimeOnly"] = 1] = "TimeOnly";
    CalendarMode[CalendarMode["Both"] = 2] = "Both";
})(CalendarMode || (CalendarMode = {}));
var CalendarService = /** @class */ (function () {
    function CalendarService(config, localeValues) {
        this.localeValues = localeValues;
        this.onManualUpdate = function () { };
        this.config = config;
        this.currentDate = new Date();
        this.firstDayOfWeek = this.localeValues.firstDayOfWeek;
        this.onDateChange = new EventEmitter();
        this.reset();
    }
    Object.defineProperty(CalendarService.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
            config.updateBounds(this._selectedDate || this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarService.prototype, "inFinalView", {
        get: function () {
            return this.currentView === this.config.mappings.finalView;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarService.prototype, "selectedDate", {
        get: function () {
            return this._selectedDate;
        },
        set: function (date) {
            if (date) {
                this._selectedDate = DateUtil.clone(date);
                this.currentDate = DateUtil.clone(date);
            }
            else {
                this._selectedDate = undefined;
            }
            this.config.updateBounds(this._selectedDate || this.currentDate);
            this.onManualUpdate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarService.prototype, "minDate", {
        get: function () {
            if (this._minDate && this.config.dateMinBound) {
                return this._minDate > this.config.dateMinBound ? this._minDate : this.config.dateMinBound;
            }
            return this._minDate || this.config.dateMinBound;
        },
        set: function (min) {
            this._minDate = min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarService.prototype, "maxDate", {
        get: function () {
            if (this._maxDate && this.config.dateMaxBound) {
                return this._maxDate < this.config.dateMaxBound ? this._maxDate : this.config.dateMaxBound;
            }
            return this._maxDate || this.config.dateMaxBound;
        },
        set: function (max) {
            this._maxDate = max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarService.prototype, "firstDayOfWeek", {
        get: function () {
            return this._firstDayOfWeek;
        },
        set: function (firstDayOfWeek) {
            if (firstDayOfWeek != undefined) {
                this._firstDayOfWeek = Math.max(0, Math.min(6, firstDayOfWeek));
            }
        },
        enumerable: true,
        configurable: true
    });
    CalendarService.prototype.reset = function () {
        this.currentView = this.config.mappings.finalView;
        if (!this._selectedDate) {
            var current = this.currentDate.getTime();
            if (this._minDate) {
                current = Math.max(current, this._minDate.getTime());
            }
            if (this._maxDate) {
                current = Math.min(current, this._maxDate.getTime());
            }
            this.currentDate = new Date(current);
            this.config.updateBounds(this.currentDate);
            this.currentView = this.config.mappings.initialView;
        }
    };
    CalendarService.prototype.changeDate = function (date, fromView) {
        this.currentDate = date;
        if (fromView === this.config.mappings.finalView) {
            this.selectedDate = date;
            return this.onDateChange.emit(date);
        }
        this.updateView(this.config.mappings.changed, fromView);
    };
    CalendarService.prototype.zoomOut = function (fromView) {
        this.updateView(this.config.mappings.zoom, fromView);
    };
    CalendarService.prototype.updateView = function (mappings, fromView) {
        var mapping = mappings.get(fromView);
        if (mapping == undefined) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    };
    return CalendarService;
}());
export { CalendarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBSXBELE1BQU0sQ0FBTixJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDcEIsdURBQVksQ0FBQTtJQUNaLHVEQUFZLENBQUE7SUFDWiwrQ0FBUSxDQUFBO0FBQ1osQ0FBQyxFQUpXLFlBQVksS0FBWixZQUFZLFFBSXZCO0FBRUQ7SUEyRUkseUJBQVksTUFBcUIsRUFBUyxZQUFvQztRQUFwQyxpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFZdkUsbUJBQWMsR0FBYyxjQUFPLENBQUMsQ0FBQztRQVh4QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztRQUV2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFsRkQsc0JBQVcsbUNBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLE1BQXFCO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BTEE7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QyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQW5JRCxJQW1JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2luZGV4XCI7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaW5kZXhcIjtcbmltcG9ydCB7IENhbGVuZGFyVmlld1R5cGUgfSBmcm9tIFwiLi4vdmlld3MvY2FsZW5kYXItdmlld1wiO1xuaW1wb3J0IHsgQ2FsZW5kYXJDb25maWcgfSBmcm9tIFwiLi4vY2xhc3Nlcy9jYWxlbmRhci1jb25maWdcIjtcblxuZXhwb3J0IGVudW0gQ2FsZW5kYXJNb2RlIHtcbiAgICBEYXRlT25seSA9IDAsXG4gICAgVGltZU9ubHkgPSAxLFxuICAgIEJvdGggPSAyXG59XG5cbmV4cG9ydCBjbGFzcyBDYWxlbmRhclNlcnZpY2Uge1xuICAgIHByaXZhdGUgX2NvbmZpZzpDYWxlbmRhckNvbmZpZztcblxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6Q2FsZW5kYXJDb25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgY29uZmlnKGNvbmZpZzpDYWxlbmRhckNvbmZpZykge1xuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gICAgICAgIGNvbmZpZy51cGRhdGVCb3VuZHModGhpcy5fc2VsZWN0ZWREYXRlIHx8IHRoaXMuY3VycmVudERhdGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjdXJyZW50VmlldzpDYWxlbmRhclZpZXdUeXBlO1xuICAgIHB1YmxpYyBnZXQgaW5GaW5hbFZpZXcoKTpib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFZpZXcgPT09IHRoaXMuY29uZmlnLm1hcHBpbmdzLmZpbmFsVmlldztcbiAgICB9XG5cbiAgICBwdWJsaWMgY3VycmVudERhdGU6RGF0ZTtcbiAgICBwcml2YXRlIF9zZWxlY3RlZERhdGU/OkRhdGU7XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkRGF0ZSgpOkRhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWREYXRlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2VsZWN0ZWREYXRlKGRhdGU6RGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gRGF0ZVV0aWwuY2xvbmUoZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gRGF0ZVV0aWwuY2xvbmUoZGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZERhdGUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbmZpZy51cGRhdGVCb3VuZHModGhpcy5fc2VsZWN0ZWREYXRlIHx8IHRoaXMuY3VycmVudERhdGUpO1xuICAgICAgICB0aGlzLm9uTWFudWFsVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbWluRGF0ZT86RGF0ZTtcbiAgICBwcml2YXRlIF9tYXhEYXRlPzpEYXRlO1xuXG4gICAgcHVibGljIGdldCBtaW5EYXRlKCk6RGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmICh0aGlzLl9taW5EYXRlICYmIHRoaXMuY29uZmlnLmRhdGVNaW5Cb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGUgPiB0aGlzLmNvbmZpZy5kYXRlTWluQm91bmQgPyB0aGlzLl9taW5EYXRlIDogdGhpcy5jb25maWcuZGF0ZU1pbkJvdW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlIHx8IHRoaXMuY29uZmlnLmRhdGVNaW5Cb3VuZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG1pbkRhdGUobWluOkRhdGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fbWluRGF0ZSA9IG1pbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heERhdGUoKTpEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKHRoaXMuX21heERhdGUgJiYgdGhpcy5jb25maWcuZGF0ZU1heEJvdW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZSA8IHRoaXMuY29uZmlnLmRhdGVNYXhCb3VuZCA/IHRoaXMuX21heERhdGUgOiB0aGlzLmNvbmZpZy5kYXRlTWF4Qm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGUgfHwgdGhpcy5jb25maWcuZGF0ZU1heEJvdW5kO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWF4RGF0ZShtYXg6RGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gbWF4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpcnN0RGF5T2ZXZWVrOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgZmlyc3REYXlPZldlZWsoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBmaXJzdERheU9mV2VlayhmaXJzdERheU9mV2VlazpudW1iZXIpIHtcbiAgICAgICAgaWYgKGZpcnN0RGF5T2ZXZWVrICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig2LCBmaXJzdERheU9mV2VlaykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8RGF0ZT47XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6Q2FsZW5kYXJDb25maWcsIHB1YmxpYyBsb2NhbGVWYWx1ZXM6SURhdGVwaWNrZXJMb2NhbGVWYWx1ZXMpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgdGhpcy5maXJzdERheU9mV2VlayA9IHRoaXMubG9jYWxlVmFsdWVzLmZpcnN0RGF5T2ZXZWVrO1xuXG4gICAgICAgIHRoaXMub25EYXRlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRlPigpO1xuXG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NYW51YWxVcGRhdGU6KCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gICAgcHVibGljIHJlc2V0KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLmNvbmZpZy5tYXBwaW5ncy5maW5hbFZpZXc7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5jdXJyZW50RGF0ZS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5fbWluRGF0ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBNYXRoLm1heChjdXJyZW50LCB0aGlzLl9taW5EYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fbWF4RGF0ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBNYXRoLm1pbihjdXJyZW50LCB0aGlzLl9tYXhEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZShjdXJyZW50KTtcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnVwZGF0ZUJvdW5kcyh0aGlzLmN1cnJlbnREYXRlKTtcblxuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IHRoaXMuY29uZmlnLm1hcHBpbmdzLmluaXRpYWxWaWV3O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNoYW5nZURhdGUoZGF0ZTpEYXRlLCBmcm9tVmlldzpDYWxlbmRhclZpZXdUeXBlKTp2b2lkIHtcbiAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgaWYgKGZyb21WaWV3ID09PSB0aGlzLmNvbmZpZy5tYXBwaW5ncy5maW5hbFZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlID0gZGF0ZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub25EYXRlQ2hhbmdlLmVtaXQoZGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5jb25maWcubWFwcGluZ3MuY2hhbmdlZCwgZnJvbVZpZXcpO1xuICAgIH1cblxuICAgIHB1YmxpYyB6b29tT3V0KGZyb21WaWV3OkNhbGVuZGFyVmlld1R5cGUpOnZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcodGhpcy5jb25maWcubWFwcGluZ3Muem9vbSwgZnJvbVZpZXcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlVmlldyhtYXBwaW5nczpNYXA8Q2FsZW5kYXJWaWV3VHlwZSwgQ2FsZW5kYXJWaWV3VHlwZT4sIGZyb21WaWV3OkNhbGVuZGFyVmlld1R5cGUpOnZvaWQge1xuICAgICAgICBjb25zdCBtYXBwaW5nID0gbWFwcGluZ3MuZ2V0KGZyb21WaWV3KTtcbiAgICAgICAgaWYgKG1hcHBpbmcgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHZpZXcgdHlwZS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50VmlldyA9IG1hcHBpbmc7XG4gICAgfVxufVxuIl19