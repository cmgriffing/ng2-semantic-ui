var SuiRatingValueAccessor_1;
import * as tslib_1 from "tslib";
import { Component, Directive, Input, Output, EventEmitter, HostBinding, HostListener } from "@angular/core";
import { customValueAccessorFactory, CustomValueAccessor } from "../../../misc/util/helpers/custom-value-accessor";
let SuiRating = class SuiRating {
    constructor() {
        this.hoveredIndex = -1;
        this.value = 0;
        this.valueChange = new EventEmitter();
        this.maximum = 5;
        this.isReadonly = false;
        this.ratingClasses = true;
    }
    get maximum() {
        return this._maximum;
    }
    set maximum(value) {
        this._maximum = +value;
    }
    get icons() {
        // tslint:disable-next-line:prefer-literal
        return new Array(this.maximum);
    }
    onClick(i) {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    }
    onMouseover(i) {
        this.hoveredIndex = i;
    }
    onMouseout() {
        this.hoveredIndex = -1;
    }
    writeValue(value) {
        this.value = value;
    }
};
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.rating")
], SuiRating.prototype, "ratingClasses", void 0);
tslib_1.__decorate([
    Output()
], SuiRating.prototype, "valueChange", void 0);
tslib_1.__decorate([
    Input()
], SuiRating.prototype, "maximum", null);
tslib_1.__decorate([
    HostBinding("class.read-only"),
    Input()
], SuiRating.prototype, "isReadonly", void 0);
tslib_1.__decorate([
    HostListener("mouseout")
], SuiRating.prototype, "onMouseout", null);
SuiRating = tslib_1.__decorate([
    Component({
        selector: "sui-rating",
        template: `
        <i
            class="icon"
            *ngFor="let icon of icons; let i = index"
            (mouseover)="onMouseover(i)"
            (click)="onClick(i)"
            [class.selected]="hoveredIndex >= i && !isReadonly"
            [class.active]="value > i"
        >
        </i>
    `,
        styles: [`
            :host.read-only .icon {
                cursor: auto;
            }
        `]
    })
], SuiRating);
export { SuiRating };
let SuiRatingValueAccessor = SuiRatingValueAccessor_1 = class SuiRatingValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiRatingValueAccessor.ctorParameters = () => [
    { type: SuiRating }
];
SuiRatingValueAccessor = SuiRatingValueAccessor_1 = tslib_1.__decorate([
    Directive({
        selector: "sui-rating",
        host: { "(valueChange)": "onChange($event)" },
        providers: [customValueAccessorFactory(SuiRatingValueAccessor_1)]
    })
], SuiRatingValueAccessor);
export { SuiRatingValueAccessor };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmcyLXNlbWFudGljLXVpLyIsInNvdXJjZXMiOlsibW9kdWxlcy9yYXRpbmcvY29tcG9uZW50cy9yYXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNmLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCwwQkFBMEIsRUFDMUIsbUJBQW1CLEVBRXRCLE1BQU0sa0RBQWtELENBQUM7QUF1QjFELElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFnQ2xCO1FBRk8saUJBQVksR0FBVSxDQUFDLENBQUMsQ0FBQztRQUc1QixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU5QyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBM0JELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsS0FBWTtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFNRCxJQUFXLEtBQUs7UUFDWiwwQ0FBMEM7UUFDMUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQWNNLE9BQU8sQ0FBQyxDQUFRO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDTCxDQUFDO0lBRU0sV0FBVyxDQUFDLENBQVE7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUdNLFVBQVU7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBWTtRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0NBQ0osQ0FBQTtBQTFERztJQUZDLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDdkIsV0FBVyxDQUFDLGNBQWMsQ0FBQztnREFDQztBQUs3QjtJQURDLE1BQU0sRUFBRTs4Q0FDK0I7QUFLeEM7SUFEQyxLQUFLLEVBQUU7d0NBR1A7QUFRRDtJQUZDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztJQUM5QixLQUFLLEVBQUU7NkNBQ2tCO0FBK0IxQjtJQURDLFlBQVksQ0FBQyxVQUFVLENBQUM7MkNBR3hCO0FBeERRLFNBQVM7SUFyQnJCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVUO2lCQUVHOzs7O1NBSUM7S0FFUixDQUFDO0dBQ1csU0FBUyxDQTZEckI7U0E3RFksU0FBUztBQW9FdEIsSUFBYSxzQkFBc0IsOEJBQW5DLE1BQWEsc0JBQXVCLFNBQVEsbUJBRzNDO0lBQ0csWUFBWSxJQUFjO1FBQ3RCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0NBQ0osQ0FBQTs7WUFIb0IsU0FBUzs7QUFKakIsc0JBQXNCO0lBTGxDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLElBQUksRUFBRSxFQUFFLGVBQWUsRUFBRSxrQkFBa0IsRUFBRTtRQUM3QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyx3QkFBc0IsQ0FBQyxDQUFDO0tBQ2xFLENBQUM7R0FDVyxzQkFBc0IsQ0FPbEM7U0FQWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBEaXJlY3RpdmUsXG4gICAgSW5wdXQsXG4gICAgT3V0cHV0LFxuICAgIEV2ZW50RW1pdHRlcixcbiAgICBIb3N0QmluZGluZyxcbiAgICBIb3N0TGlzdGVuZXJcbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gICAgY3VzdG9tVmFsdWVBY2Nlc3NvckZhY3RvcnksXG4gICAgQ3VzdG9tVmFsdWVBY2Nlc3NvcixcbiAgICBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Rcbn0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL2N1c3RvbS12YWx1ZS1hY2Nlc3NvclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJzdWktcmF0aW5nXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGlcbiAgICAgICAgICAgIGNsYXNzPVwiaWNvblwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgaWNvbiBvZiBpY29uczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAobW91c2VvdmVyKT1cIm9uTW91c2VvdmVyKGkpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkNsaWNrKGkpXCJcbiAgICAgICAgICAgIFtjbGFzcy5zZWxlY3RlZF09XCJob3ZlcmVkSW5kZXggPj0gaSAmJiAhaXNSZWFkb25seVwiXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInZhbHVlID4gaVwiXG4gICAgICAgID5cbiAgICAgICAgPC9pPlxuICAgIGAsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgICAgIDpob3N0LnJlYWQtb25seSAuaWNvbiB7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICBgXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTdWlSYXRpbmcgaW1wbGVtZW50cyBJQ3VzdG9tVmFsdWVBY2Nlc3Nvckhvc3Q8bnVtYmVyPiB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5yYXRpbmdcIilcbiAgICBwdWJsaWMgcmF0aW5nQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgcHVibGljIHZhbHVlOm51bWJlcjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyB2YWx1ZUNoYW5nZTpFdmVudEVtaXR0ZXI8bnVtYmVyPjtcblxuICAgIHByaXZhdGUgX21heGltdW06bnVtYmVyO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IG1heGltdW0oKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWF4aW11bTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG1heGltdW0odmFsdWU6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX21heGltdW0gPSArdmFsdWU7XG4gICAgfVxuXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MucmVhZC1vbmx5XCIpXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaXNSZWFkb25seTpib29sZWFuO1xuXG4gICAgcHVibGljIGdldCBpY29ucygpOnVuZGVmaW5lZFtdIHtcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1saXRlcmFsXG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkodGhpcy5tYXhpbXVtKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaG92ZXJlZEluZGV4Om51bWJlciA9IC0xO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAgICAgdGhpcy5tYXhpbXVtID0gNTtcbiAgICAgICAgdGhpcy5pc1JlYWRvbmx5ID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5yYXRpbmdDbGFzc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DbGljayhpOm51bWJlcik6dm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1JlYWRvbmx5KSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gaSArIDE7XG4gICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25Nb3VzZW92ZXIoaTpudW1iZXIpOnZvaWQge1xuICAgICAgICB0aGlzLmhvdmVyZWRJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcIm1vdXNlb3V0XCIpXG4gICAgcHVibGljIG9uTW91c2VvdXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5ob3ZlcmVkSW5kZXggPSAtMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZTpudW1iZXIpOnZvaWQge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJzdWktcmF0aW5nXCIsXG4gICAgaG9zdDogeyBcIih2YWx1ZUNoYW5nZSlcIjogXCJvbkNoYW5nZSgkZXZlbnQpXCIgfSxcbiAgICBwcm92aWRlcnM6IFtjdXN0b21WYWx1ZUFjY2Vzc29yRmFjdG9yeShTdWlSYXRpbmdWYWx1ZUFjY2Vzc29yKV1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUmF0aW5nVmFsdWVBY2Nlc3NvciBleHRlbmRzIEN1c3RvbVZhbHVlQWNjZXNzb3I8XG4gICAgbnVtYmVyLFxuICAgIFN1aVJhdGluZ1xuPiB7XG4gICAgY29uc3RydWN0b3IoaG9zdDpTdWlSYXRpbmcpIHtcbiAgICAgICAgc3VwZXIoaG9zdCk7XG4gICAgfVxufVxuIl19