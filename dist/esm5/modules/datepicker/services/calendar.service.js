import { EventEmitter } from "@angular/core";
import { DateUtil } from "../../../misc/util/helpers/date";
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
                return this._minDate > this.config.dateMinBound
                    ? this._minDate
                    : this.config.dateMinBound;
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
                return this._maxDate < this.config.dateMaxBound
                    ? this._maxDate
                    : this.config.dateMaxBound;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci9zZXJ2aWNlcy9jYWxlbmRhci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFJN0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBRTNELE1BQU0sQ0FBTixJQUFZLFlBSVg7QUFKRCxXQUFZLFlBQVk7SUFDcEIsdURBQVksQ0FBQTtJQUNaLHVEQUFZLENBQUE7SUFDWiwrQ0FBUSxDQUFBO0FBQ1osQ0FBQyxFQUpXLFlBQVksS0FBWixZQUFZLFFBSXZCO0FBRUQ7SUErRUkseUJBQ0ksTUFBcUIsRUFDZCxZQUFvQztRQUFwQyxpQkFBWSxHQUFaLFlBQVksQ0FBd0I7UUFheEMsbUJBQWMsR0FBYyxjQUFPLENBQUMsQ0FBQztRQVh4QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQztRQUV2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUF6RkQsc0JBQVcsbUNBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzthQUVELFVBQWtCLE1BQXFCO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEUsQ0FBQzs7O09BTEE7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QUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FBQyxBQTdJRCxJQTZJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDYWxlbmRhclZpZXdUeXBlIH0gZnJvbSBcIi4uL3ZpZXdzL2NhbGVuZGFyLXZpZXdcIjtcbmltcG9ydCB7IENhbGVuZGFyQ29uZmlnIH0gZnJvbSBcIi4uL2NsYXNzZXMvY2FsZW5kYXItY29uZmlnXCI7XG5pbXBvcnQgeyBJRGF0ZXBpY2tlckxvY2FsZVZhbHVlcyB9IGZyb20gXCIuLi8uLi8uLi9iZWhhdmlvcnMvbG9jYWxpemF0aW9uL2ludGVyZmFjZXMvdmFsdWVzXCI7XG5pbXBvcnQgeyBEYXRlVXRpbCB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy9kYXRlXCI7XG5cbmV4cG9ydCBlbnVtIENhbGVuZGFyTW9kZSB7XG4gICAgRGF0ZU9ubHkgPSAwLFxuICAgIFRpbWVPbmx5ID0gMSxcbiAgICBCb3RoID0gMlxufVxuXG5leHBvcnQgY2xhc3MgQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgICBwcml2YXRlIF9jb25maWc6Q2FsZW5kYXJDb25maWc7XG5cbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOkNhbGVuZGFyQ29uZmlnIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGNvbmZpZyhjb25maWc6Q2FsZW5kYXJDb25maWcpIHtcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICAgICAgICBjb25maWcudXBkYXRlQm91bmRzKHRoaXMuX3NlbGVjdGVkRGF0ZSB8fCB0aGlzLmN1cnJlbnREYXRlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3VycmVudFZpZXc6Q2FsZW5kYXJWaWV3VHlwZTtcbiAgICBwdWJsaWMgZ2V0IGluRmluYWxWaWV3KCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRWaWV3ID09PSB0aGlzLmNvbmZpZy5tYXBwaW5ncy5maW5hbFZpZXc7XG4gICAgfVxuXG4gICAgcHVibGljIGN1cnJlbnREYXRlOkRhdGU7XG4gICAgcHJpdmF0ZSBfc2VsZWN0ZWREYXRlPzpEYXRlO1xuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZERhdGUoKTpEYXRlIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkRGF0ZShkYXRlOkRhdGUgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IERhdGVVdGlsLmNsb25lKGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZSA9IERhdGVVdGlsLmNsb25lKGRhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb25maWcudXBkYXRlQm91bmRzKHRoaXMuX3NlbGVjdGVkRGF0ZSB8fCB0aGlzLmN1cnJlbnREYXRlKTtcbiAgICAgICAgdGhpcy5vbk1hbnVhbFVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX21pbkRhdGU/OkRhdGU7XG4gICAgcHJpdmF0ZSBfbWF4RGF0ZT86RGF0ZTtcblxuICAgIHB1YmxpYyBnZXQgbWluRGF0ZSgpOkRhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5fbWluRGF0ZSAmJiB0aGlzLmNvbmZpZy5kYXRlTWluQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9taW5EYXRlID4gdGhpcy5jb25maWcuZGF0ZU1pbkJvdW5kXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9taW5EYXRlXG4gICAgICAgICAgICAgICAgOiB0aGlzLmNvbmZpZy5kYXRlTWluQm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbkRhdGUgfHwgdGhpcy5jb25maWcuZGF0ZU1pbkJvdW5kO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWluRGF0ZShtaW46RGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9taW5EYXRlID0gbWluO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4RGF0ZSgpOkRhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICBpZiAodGhpcy5fbWF4RGF0ZSAmJiB0aGlzLmNvbmZpZy5kYXRlTWF4Qm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXhEYXRlIDwgdGhpcy5jb25maWcuZGF0ZU1heEJvdW5kXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9tYXhEYXRlXG4gICAgICAgICAgICAgICAgOiB0aGlzLmNvbmZpZy5kYXRlTWF4Qm91bmQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21heERhdGUgfHwgdGhpcy5jb25maWcuZGF0ZU1heEJvdW5kO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgbWF4RGF0ZShtYXg6RGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9tYXhEYXRlID0gbWF4O1xuICAgIH1cblxuICAgIHByaXZhdGUgX2ZpcnN0RGF5T2ZXZWVrOm51bWJlcjtcblxuICAgIHB1YmxpYyBnZXQgZmlyc3REYXlPZldlZWsoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3REYXlPZldlZWs7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBmaXJzdERheU9mV2VlayhmaXJzdERheU9mV2VlazpudW1iZXIpIHtcbiAgICAgICAgaWYgKGZpcnN0RGF5T2ZXZWVrICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3REYXlPZldlZWsgPSBNYXRoLm1heCgwLCBNYXRoLm1pbig2LCBmaXJzdERheU9mV2VlaykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0ZUNoYW5nZTpFdmVudEVtaXR0ZXI8RGF0ZT47XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29uZmlnOkNhbGVuZGFyQ29uZmlnLFxuICAgICAgICBwdWJsaWMgbG9jYWxlVmFsdWVzOklEYXRlcGlja2VyTG9jYWxlVmFsdWVzXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuXG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgIHRoaXMuZmlyc3REYXlPZldlZWsgPSB0aGlzLmxvY2FsZVZhbHVlcy5maXJzdERheU9mV2VlaztcblxuICAgICAgICB0aGlzLm9uRGF0ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGF0ZT4oKTtcblxuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTWFudWFsVXBkYXRlOigpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAgIHB1YmxpYyByZXNldCgpOnZvaWQge1xuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gdGhpcy5jb25maWcubWFwcGluZ3MuZmluYWxWaWV3O1xuXG4gICAgICAgIGlmICghdGhpcy5fc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuY3VycmVudERhdGUuZ2V0VGltZSgpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX21pbkRhdGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gTWF0aC5tYXgoY3VycmVudCwgdGhpcy5fbWluRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX21heERhdGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gTWF0aC5taW4oY3VycmVudCwgdGhpcy5fbWF4RGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUoY3VycmVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZy51cGRhdGVCb3VuZHModGhpcy5jdXJyZW50RGF0ZSk7XG5cbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpZXcgPSB0aGlzLmNvbmZpZy5tYXBwaW5ncy5pbml0aWFsVmlldztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjaGFuZ2VEYXRlKGRhdGU6RGF0ZSwgZnJvbVZpZXc6Q2FsZW5kYXJWaWV3VHlwZSk6dm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudERhdGUgPSBkYXRlO1xuXG4gICAgICAgIGlmIChmcm9tVmlldyA9PT0gdGhpcy5jb25maWcubWFwcGluZ3MuZmluYWxWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGU7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9uRGF0ZUNoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuY29uZmlnLm1hcHBpbmdzLmNoYW5nZWQsIGZyb21WaWV3KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgem9vbU91dChmcm9tVmlldzpDYWxlbmRhclZpZXdUeXBlKTp2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KHRoaXMuY29uZmlnLm1hcHBpbmdzLnpvb20sIGZyb21WaWV3KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVZpZXcoXG4gICAgICAgIG1hcHBpbmdzOk1hcDxDYWxlbmRhclZpZXdUeXBlLCBDYWxlbmRhclZpZXdUeXBlPixcbiAgICAgICAgZnJvbVZpZXc6Q2FsZW5kYXJWaWV3VHlwZVxuICAgICk6dm9pZCB7XG4gICAgICAgIGNvbnN0IG1hcHBpbmcgPSBtYXBwaW5ncy5nZXQoZnJvbVZpZXcpO1xuICAgICAgICBpZiAobWFwcGluZyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdmlldyB0eXBlLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmN1cnJlbnRWaWV3ID0gbWFwcGluZztcbiAgICB9XG59XG4iXX0=