import * as tslib_1 from "tslib";
import { Input, ViewChildren } from "@angular/core";
import { SuiCalendarItem } from "../directives/calendar-item";
import { KeyCode } from "../../../misc/util/helpers/util";
export var CalendarViewType;
(function (CalendarViewType) {
    CalendarViewType[CalendarViewType["Year"] = 0] = "Year";
    CalendarViewType[CalendarViewType["Month"] = 1] = "Month";
    CalendarViewType[CalendarViewType["Date"] = 2] = "Date";
    CalendarViewType[CalendarViewType["Hour"] = 3] = "Hour";
    CalendarViewType[CalendarViewType["Minute"] = 4] = "Minute";
})(CalendarViewType || (CalendarViewType = {}));
var CalendarView = /** @class */ (function () {
    function CalendarView(_renderer, viewType, ranges) {
        var _this = this;
        this._renderer = _renderer;
        this._type = viewType;
        this.ranges = ranges;
        this._documentKeyDownListener = _renderer.listen("document", "keydown", function (e) { return _this.onDocumentKeyDown(e); });
    }
    Object.defineProperty(CalendarView.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (service) {
            var _this = this;
            this._service = service;
            this.ranges.loadService(service);
            this.service.onManualUpdate = function () {
                _this.ranges.refresh();
                delete _this._highlightedItem;
                _this.autoHighlight();
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarView.prototype, "currentDate", {
        get: function () {
            return this.service.currentDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarView.prototype, "selectedDate", {
        get: function () {
            return this.service.selectedDate;
        },
        enumerable: true,
        configurable: true
    });
    // Template Methods
    CalendarView.prototype.setDate = function (item) {
        this.service.changeDate(item.date, this._type);
    };
    CalendarView.prototype.zoomOut = function () {
        this.service.zoomOut(this._type);
    };
    // Keyboard Control
    CalendarView.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._renderedItems.changes.subscribe(function () {
            return _this.onRenderedItemsChanged();
        });
        this.onRenderedItemsChanged();
    };
    CalendarView.prototype.onRenderedItemsChanged = function () {
        var _this = this;
        this._renderedItems.forEach(function (i) {
            return i.onFocussed.subscribe(function (hasFocus) {
                if (hasFocus) {
                    _this.highlightItem(i.item);
                }
            });
        });
        this.autoHighlight();
        this.highlightItem(this._highlightedItem);
    };
    CalendarView.prototype.autoHighlight = function () {
        var _this = this;
        var date = this.selectedDate &&
            this.ranges.current.containsDate(this.selectedDate)
            ? this.selectedDate
            : this.currentDate;
        if (this._highlightedItem &&
            this.ranges.current.containsDate(this._highlightedItem.date)) {
            date = this._highlightedItem.date;
        }
        var initiallyHighlighted = this.ranges.current.items.find(function (i) {
            return _this.ranges.dateComparer.equal(i.date, date);
        });
        if (initiallyHighlighted && !initiallyHighlighted.isDisabled) {
            this._highlightedItem = initiallyHighlighted;
        }
    };
    CalendarView.prototype.highlightItem = function (item) {
        if (item) {
            this._renderedItems.forEach(function (i) { return (i.hasFocus = false); });
            var rendered = this._renderedItems.find(function (ri) { return ri.item === item; });
            if (rendered && !rendered.hasFocus) {
                rendered.hasFocus = true;
                rendered.detectChanges();
            }
            this._highlightedItem = item;
        }
    };
    CalendarView.prototype.onDocumentKeyDown = function (e) {
        if (this._highlightedItem && e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }
        if (!this._highlightedItem) {
            this.autoHighlight();
        }
        var index = this.ranges.current.findIndex(this._highlightedItem);
        var isMovingForward = true;
        var delta = 0;
        switch (e.keyCode) {
            case KeyCode.Right:
                delta += 1;
                break;
            case KeyCode.Left:
                delta -= 1;
                isMovingForward = false;
                break;
            case KeyCode.Down:
                delta += this.ranges.columns;
                break;
            case KeyCode.Up:
                delta -= this.ranges.columns;
                isMovingForward = false;
                break;
            default:
                return;
        }
        // Stop these keypresses being captured elsewhere.
        e.preventDefault();
        var nextItem = this.ranges.current.items[index + delta];
        if (nextItem && nextItem.isDisabled) {
            return;
        }
        if (nextItem && !nextItem.isOutsideRange) {
            return this.highlightItem(nextItem);
        }
        if (nextItem && nextItem.isOutsideRange) {
            if (index + delta >= this.ranges.current.inRange.length) {
                isMovingForward = true;
            }
        }
        if (!nextItem) {
            var adjustedIndex = this.ranges.current.findIndex(this._highlightedItem);
            var nextItems = this.ranges.calc(isMovingForward).inRange;
            if (isMovingForward) {
                adjustedIndex -= this.ranges.current.inRange.length;
            }
            else {
                adjustedIndex += nextItems.length;
            }
            nextItem = nextItems[adjustedIndex + delta];
            if (nextItem.isDisabled) {
                return;
            }
        }
        this.ranges.move(isMovingForward);
        this._highlightedItem = this.ranges.current.find(nextItem);
    };
    CalendarView.prototype.ngOnDestroy = function () {
        this._documentKeyDownListener();
    };
    tslib_1.__decorate([
        ViewChildren(SuiCalendarItem)
    ], CalendarView.prototype, "_renderedItems", void 0);
    tslib_1.__decorate([
        Input()
    ], CalendarView.prototype, "service", null);
    return CalendarView;
}());
export { CalendarView };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvZGF0ZXBpY2tlci92aWV3cy9jYWxlbmRhci12aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsS0FBSyxFQUVMLFlBQVksRUFLZixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWdCLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRzVFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUUxRCxNQUFNLENBQU4sSUFBWSxnQkFNWDtBQU5ELFdBQVksZ0JBQWdCO0lBQ3hCLHVEQUFRLENBQUE7SUFDUix5REFBUyxDQUFBO0lBQ1QsdURBQVEsQ0FBQTtJQUNSLHVEQUFRLENBQUE7SUFDUiwyREFBVSxDQUFBO0FBQ2QsQ0FBQyxFQU5XLGdCQUFnQixLQUFoQixnQkFBZ0IsUUFNM0I7QUFHRDtJQXFDSSxzQkFDYyxTQUFtQixFQUM3QixRQUF5QixFQUN6QixNQUEyQjtRQUgvQixpQkFhQztRQVphLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFJN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQzVDLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBQyxDQUFlLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQ2pELENBQUM7SUFDTixDQUFDO0lBekNELHNCQUFXLGlDQUFPO2FBWWxCO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFkRCxVQUFtQixPQUF1QjtZQUQxQyxpQkFXQztZQVRHLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1lB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QUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFFNUQsSUFBSSxlQUFlLEVBQUU7Z0JBQ2pCLGFBQWEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2FBQ3ZEO2lCQUFNO2dCQUNILGFBQWEsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDO2FBQ3JDO1lBRUQsUUFBUSxHQUFHLFNBQVMsQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFFNUMsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO2dCQUNyQixPQUFPO2FBQ1Y7U0FDSjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDcEMsQ0FBQztJQS9MRDtRQURDLFlBQVksQ0FBQyxlQUFlLENBQUM7d0RBQ29CO0lBSWxEO1FBREMsS0FBSyxFQUFFOytDQVdQO0lBa0xMLG1CQUFDO0NBQUEsQUFyTUQsSUFxTUM7U0FyTXFCLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIElucHV0LFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBWaWV3Q2hpbGRyZW4sXG4gICAgQWZ0ZXJWaWV3SW5pdCxcbiAgICBIb3N0TGlzdGVuZXIsXG4gICAgUmVuZGVyZXIyLFxuICAgIE9uRGVzdHJveVxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJJdGVtLCBTdWlDYWxlbmRhckl0ZW0gfSBmcm9tIFwiLi4vZGlyZWN0aXZlcy9jYWxlbmRhci1pdGVtXCI7XG5pbXBvcnQgeyBDYWxlbmRhclNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvY2FsZW5kYXIuc2VydmljZVwiO1xuaW1wb3J0IHsgQ2FsZW5kYXJSYW5nZVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvY2FsZW5kYXItcmFuZ2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgS2V5Q29kZSB9IGZyb20gXCIuLi8uLi8uLi9taXNjL3V0aWwvaGVscGVycy91dGlsXCI7XG5cbmV4cG9ydCBlbnVtIENhbGVuZGFyVmlld1R5cGUge1xuICAgIFllYXIgPSAwLFxuICAgIE1vbnRoID0gMSxcbiAgICBEYXRlID0gMixcbiAgICBIb3VyID0gMyxcbiAgICBNaW51dGUgPSA0XG59XG5leHBvcnQgdHlwZSBDYWxlbmRhclZpZXdSZXN1bHQgPSBbRGF0ZSwgQ2FsZW5kYXJWaWV3VHlwZV07XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWxlbmRhclZpZXcgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIHByaXZhdGUgX3R5cGU6Q2FsZW5kYXJWaWV3VHlwZTtcbiAgICBwcml2YXRlIF9zZXJ2aWNlOkNhbGVuZGFyU2VydmljZTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oU3VpQ2FsZW5kYXJJdGVtKVxuICAgIHByaXZhdGUgX3JlbmRlcmVkSXRlbXM6UXVlcnlMaXN0PFN1aUNhbGVuZGFySXRlbT47XG4gICAgcHJpdmF0ZSBfaGlnaGxpZ2h0ZWRJdGVtPzpDYWxlbmRhckl0ZW07XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBzZXQgc2VydmljZShzZXJ2aWNlOkNhbGVuZGFyU2VydmljZSkge1xuICAgICAgICB0aGlzLl9zZXJ2aWNlID0gc2VydmljZTtcbiAgICAgICAgdGhpcy5yYW5nZXMubG9hZFNlcnZpY2Uoc2VydmljZSk7XG5cbiAgICAgICAgdGhpcy5zZXJ2aWNlLm9uTWFudWFsVXBkYXRlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yYW5nZXMucmVmcmVzaCgpO1xuXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5faGlnaGxpZ2h0ZWRJdGVtO1xuICAgICAgICAgICAgdGhpcy5hdXRvSGlnaGxpZ2h0KCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXJ2aWNlKCk6Q2FsZW5kYXJTZXJ2aWNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHJhbmdlczpDYWxlbmRhclJhbmdlU2VydmljZTtcblxuICAgIHB1YmxpYyBnZXQgY3VycmVudERhdGUoKTpEYXRlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5jdXJyZW50RGF0ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdGVkRGF0ZSgpOkRhdGUgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLnNlbGVjdGVkRGF0ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9kb2N1bWVudEtleURvd25MaXN0ZW5lcjooKSA9PiB2b2lkO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByb3RlY3RlZCBfcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICB2aWV3VHlwZTpDYWxlbmRhclZpZXdUeXBlLFxuICAgICAgICByYW5nZXM6Q2FsZW5kYXJSYW5nZVNlcnZpY2VcbiAgICApIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHZpZXdUeXBlO1xuICAgICAgICB0aGlzLnJhbmdlcyA9IHJhbmdlcztcblxuICAgICAgICB0aGlzLl9kb2N1bWVudEtleURvd25MaXN0ZW5lciA9IF9yZW5kZXJlci5saXN0ZW4oXG4gICAgICAgICAgICBcImRvY3VtZW50XCIsXG4gICAgICAgICAgICBcImtleWRvd25cIixcbiAgICAgICAgICAgIChlOktleWJvYXJkRXZlbnQpID0+IHRoaXMub25Eb2N1bWVudEtleURvd24oZSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBUZW1wbGF0ZSBNZXRob2RzXG5cbiAgICBwdWJsaWMgc2V0RGF0ZShpdGVtOkNhbGVuZGFySXRlbSk6dm9pZCB7XG4gICAgICAgIHRoaXMuc2VydmljZS5jaGFuZ2VEYXRlKGl0ZW0uZGF0ZSwgdGhpcy5fdHlwZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHpvb21PdXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnpvb21PdXQodGhpcy5fdHlwZSk7XG4gICAgfVxuXG4gICAgLy8gS2V5Ym9hcmQgQ29udHJvbFxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlZEl0ZW1zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICB0aGlzLm9uUmVuZGVyZWRJdGVtc0NoYW5nZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLm9uUmVuZGVyZWRJdGVtc0NoYW5nZWQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uUmVuZGVyZWRJdGVtc0NoYW5nZWQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcmVuZGVyZWRJdGVtcy5mb3JFYWNoKGkgPT5cbiAgICAgICAgICAgIGkub25Gb2N1c3NlZC5zdWJzY3JpYmUoKGhhc0ZvY3VzOmJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzRm9jdXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRJdGVtKGkuaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmF1dG9IaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHRJdGVtKHRoaXMuX2hpZ2hsaWdodGVkSXRlbSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhdXRvSGlnaGxpZ2h0KCk6dm9pZCB7XG4gICAgICAgIGxldCBkYXRlID1cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWREYXRlICYmXG4gICAgICAgICAgICB0aGlzLnJhbmdlcy5jdXJyZW50LmNvbnRhaW5zRGF0ZSh0aGlzLnNlbGVjdGVkRGF0ZSlcbiAgICAgICAgICAgICAgICA/IHRoaXMuc2VsZWN0ZWREYXRlXG4gICAgICAgICAgICAgICAgOiB0aGlzLmN1cnJlbnREYXRlO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZEl0ZW0gJiZcbiAgICAgICAgICAgIHRoaXMucmFuZ2VzLmN1cnJlbnQuY29udGFpbnNEYXRlKHRoaXMuX2hpZ2hsaWdodGVkSXRlbS5kYXRlKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRhdGUgPSB0aGlzLl9oaWdobGlnaHRlZEl0ZW0uZGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluaXRpYWxseUhpZ2hsaWdodGVkID0gdGhpcy5yYW5nZXMuY3VycmVudC5pdGVtcy5maW5kKGkgPT5cbiAgICAgICAgICAgIHRoaXMucmFuZ2VzLmRhdGVDb21wYXJlci5lcXVhbChpLmRhdGUsIGRhdGUpXG4gICAgICAgICk7XG4gICAgICAgIGlmIChpbml0aWFsbHlIaWdobGlnaHRlZCAmJiAhaW5pdGlhbGx5SGlnaGxpZ2h0ZWQuaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0ZWRJdGVtID0gaW5pdGlhbGx5SGlnaGxpZ2h0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGhpZ2hsaWdodEl0ZW0oaXRlbTpDYWxlbmRhckl0ZW0gfCB1bmRlZmluZWQpOnZvaWQge1xuICAgICAgICBpZiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZWRJdGVtcy5mb3JFYWNoKGkgPT4gKGkuaGFzRm9jdXMgPSBmYWxzZSkpO1xuICAgICAgICAgICAgY29uc3QgcmVuZGVyZWQgPSB0aGlzLl9yZW5kZXJlZEl0ZW1zLmZpbmQocmkgPT4gcmkuaXRlbSA9PT0gaXRlbSk7XG4gICAgICAgICAgICBpZiAocmVuZGVyZWQgJiYgIXJlbmRlcmVkLmhhc0ZvY3VzKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyZWQuaGFzRm9jdXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlbmRlcmVkLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faGlnaGxpZ2h0ZWRJdGVtID0gaXRlbTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25Eb2N1bWVudEtleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2hpZ2hsaWdodGVkSXRlbSAmJiBlLmtleUNvZGUgPT09IEtleUNvZGUuRW50ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0ZSh0aGlzLl9oaWdobGlnaHRlZEl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLl9oaWdobGlnaHRlZEl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b0hpZ2hsaWdodCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJhbmdlcy5jdXJyZW50LmZpbmRJbmRleCh0aGlzLl9oaWdobGlnaHRlZEl0ZW0pO1xuICAgICAgICBsZXQgaXNNb3ZpbmdGb3J3YXJkID0gdHJ1ZTtcbiAgICAgICAgbGV0IGRlbHRhID0gMDtcblxuICAgICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlLlJpZ2h0OlxuICAgICAgICAgICAgICAgIGRlbHRhICs9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuTGVmdDpcbiAgICAgICAgICAgICAgICBkZWx0YSAtPSAxO1xuICAgICAgICAgICAgICAgIGlzTW92aW5nRm9yd2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBLZXlDb2RlLkRvd246XG4gICAgICAgICAgICAgICAgZGVsdGEgKz0gdGhpcy5yYW5nZXMuY29sdW1ucztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5VcDpcbiAgICAgICAgICAgICAgICBkZWx0YSAtPSB0aGlzLnJhbmdlcy5jb2x1bW5zO1xuICAgICAgICAgICAgICAgIGlzTW92aW5nRm9yd2FyZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9wIHRoZXNlIGtleXByZXNzZXMgYmVpbmcgY2FwdHVyZWQgZWxzZXdoZXJlLlxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IG5leHRJdGVtID0gdGhpcy5yYW5nZXMuY3VycmVudC5pdGVtc1tpbmRleCArIGRlbHRhXTtcblxuICAgICAgICBpZiAobmV4dEl0ZW0gJiYgbmV4dEl0ZW0uaXNEaXNhYmxlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5leHRJdGVtICYmICFuZXh0SXRlbS5pc091dHNpZGVSYW5nZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0SXRlbShuZXh0SXRlbSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV4dEl0ZW0gJiYgbmV4dEl0ZW0uaXNPdXRzaWRlUmFuZ2UpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCArIGRlbHRhID49IHRoaXMucmFuZ2VzLmN1cnJlbnQuaW5SYW5nZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpc01vdmluZ0ZvcndhcmQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFuZXh0SXRlbSkge1xuICAgICAgICAgICAgbGV0IGFkanVzdGVkSW5kZXggPSB0aGlzLnJhbmdlcy5jdXJyZW50LmZpbmRJbmRleChcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWdobGlnaHRlZEl0ZW1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IG5leHRJdGVtcyA9IHRoaXMucmFuZ2VzLmNhbGMoaXNNb3ZpbmdGb3J3YXJkKS5pblJhbmdlO1xuXG4gICAgICAgICAgICBpZiAoaXNNb3ZpbmdGb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgYWRqdXN0ZWRJbmRleCAtPSB0aGlzLnJhbmdlcy5jdXJyZW50LmluUmFuZ2UubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhZGp1c3RlZEluZGV4ICs9IG5leHRJdGVtcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHRJdGVtID0gbmV4dEl0ZW1zW2FkanVzdGVkSW5kZXggKyBkZWx0YV07XG5cbiAgICAgICAgICAgIGlmIChuZXh0SXRlbS5pc0Rpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yYW5nZXMubW92ZShpc01vdmluZ0ZvcndhcmQpO1xuICAgICAgICB0aGlzLl9oaWdobGlnaHRlZEl0ZW0gPSB0aGlzLnJhbmdlcy5jdXJyZW50LmZpbmQobmV4dEl0ZW0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpOnZvaWQge1xuICAgICAgICB0aGlzLl9kb2N1bWVudEtleURvd25MaXN0ZW5lcigpO1xuICAgIH1cbn1cbiJdfQ==