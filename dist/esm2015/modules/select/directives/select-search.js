import * as tslib_1 from "tslib";
import { Directive, Input, EventEmitter, Renderer2, ElementRef, HostListener, HostBinding } from "@angular/core";
let SuiSelectSearch = class SuiSelectSearch {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.onQueryUpdated = new EventEmitter();
        this.onQueryKeyDown = new EventEmitter();
        this.searchClass = true;
        this.autoComplete = "off";
    }
    set query(query) {
        this._renderer.setProperty(this._element.nativeElement, "value", query);
    }
    updateQuery(query) {
        this.onQueryUpdated.emit(query);
    }
    onKeyDown(e) {
        this.onQueryKeyDown.emit(e);
    }
    focus() {
        // Slightly delay to support in menu search.
        this._element.nativeElement.focus();
        setTimeout(() => this._element.nativeElement.focus());
    }
};
SuiSelectSearch.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
tslib_1.__decorate([
    HostBinding("class.search")
], SuiSelectSearch.prototype, "searchClass", void 0);
tslib_1.__decorate([
    HostBinding("attr.autocomplete")
], SuiSelectSearch.prototype, "autoComplete", void 0);
tslib_1.__decorate([
    HostListener("input", ["$event.target.value"])
], SuiSelectSearch.prototype, "updateQuery", null);
tslib_1.__decorate([
    HostListener("keydown", ["$event"])
], SuiSelectSearch.prototype, "onKeyDown", null);
SuiSelectSearch = tslib_1.__decorate([
    Directive({
        selector: "input[suiSelectSearch]"
    })
], SuiSelectSearch);
export { SuiSelectSearch };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LXNlYXJjaC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvc2VsZWN0L2RpcmVjdGl2ZXMvc2VsZWN0LXNlYXJjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQUt2QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBY3hCLFlBQW9CLFNBQW1CLEVBQVUsUUFBbUI7UUFBaEQsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7UUFFeEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQWJELElBQVcsS0FBSyxDQUFDLEtBQVk7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFjTSxXQUFXLENBQUMsS0FBWTtRQUMzQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBR00sU0FBUyxDQUFDLENBQWU7UUFDNUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLEtBQUs7UUFDUiw0Q0FBNEM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNKLENBQUE7O1lBdkJpQyxTQUFTO1lBQW1CLFVBQVU7O0FBWnBFO0lBREMsV0FBVyxDQUFDLGNBQWMsQ0FBQztvREFDRDtBQUczQjtJQURDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQztxREFDTjtBQWtCM0I7SUFEQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMsQ0FBQztrREFHOUM7QUFHRDtJQURDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnREFHbkM7QUE5QlEsZUFBZTtJQUgzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsd0JBQXdCO0tBQ3JDLENBQUM7R0FDVyxlQUFlLENBcUMzQjtTQXJDWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIFJlbmRlcmVyMixcbiAgICBFbGVtZW50UmVmLFxuICAgIEhvc3RMaXN0ZW5lcixcbiAgICBIb3N0QmluZGluZ1xufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJpbnB1dFtzdWlTZWxlY3RTZWFyY2hdXCJcbn0pXG5leHBvcnQgY2xhc3MgU3VpU2VsZWN0U2VhcmNoIHtcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5zZWFyY2hcIilcbiAgICBwdWJsaWMgc2VhcmNoQ2xhc3M6Ym9vbGVhbjtcblxuICAgIEBIb3N0QmluZGluZyhcImF0dHIuYXV0b2NvbXBsZXRlXCIpXG4gICAgcHVibGljIGF1dG9Db21wbGV0ZTpzdHJpbmc7XG5cbiAgICBwdWJsaWMgc2V0IHF1ZXJ5KHF1ZXJ5OnN0cmluZykge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFwidmFsdWVcIiwgcXVlcnkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblF1ZXJ5VXBkYXRlZDpFdmVudEVtaXR0ZXI8c3RyaW5nPjtcbiAgICBwdWJsaWMgb25RdWVyeUtleURvd246RXZlbnRFbWl0dGVyPEtleWJvYXJkRXZlbnQ+O1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcmVuZGVyZXI6UmVuZGVyZXIyLCBwcml2YXRlIF9lbGVtZW50OkVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5vblF1ZXJ5VXBkYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICAgICAgICB0aGlzLm9uUXVlcnlLZXlEb3duID0gbmV3IEV2ZW50RW1pdHRlcjxLZXlib2FyZEV2ZW50PigpO1xuXG4gICAgICAgIHRoaXMuc2VhcmNoQ2xhc3MgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dG9Db21wbGV0ZSA9IFwib2ZmXCI7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImlucHV0XCIsIFtcIiRldmVudC50YXJnZXQudmFsdWVcIl0pXG4gICAgcHVibGljIHVwZGF0ZVF1ZXJ5KHF1ZXJ5OnN0cmluZyk6dm9pZCB7XG4gICAgICAgIHRoaXMub25RdWVyeVVwZGF0ZWQuZW1pdChxdWVyeSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIHB1YmxpYyBvbktleURvd24oZTpLZXlib2FyZEV2ZW50KTp2b2lkIHtcbiAgICAgICAgdGhpcy5vblF1ZXJ5S2V5RG93bi5lbWl0KGUpO1xuICAgIH1cblxuICAgIHB1YmxpYyBmb2N1cygpOnZvaWQge1xuICAgICAgICAvLyBTbGlnaHRseSBkZWxheSB0byBzdXBwb3J0IGluIG1lbnUgc2VhcmNoLlxuICAgICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSk7XG4gICAgfVxufVxuIl19