import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, HostBinding } from "@angular/core";
let SuiPagination = class SuiPagination {
    constructor() {
        this.paginationClasses = true;
        this.pageChange = new EventEmitter();
        this.pageSize = 10;
        this._page = 1;
        this._pages = [];
        this.pageCount = 1;
        this.hasNavigationLinks = true;
        this.hasBoundaryLinks = false;
        this.canRotate = false;
        this.hasEllipses = true;
    }
    get maxSize() {
        return this._maxSize;
    }
    set maxSize(value) {
        this._maxSize = value != undefined ? Math.max(value, 1) : undefined;
    }
    get collectionSize() {
        return this._collectionSize;
    }
    set collectionSize(value) {
        this._collectionSize = Math.max(value, 0);
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));
    }
    get hasNavigationLinks() {
        const maxSize = this._maxSize || this.pageCount;
        return this._hasNavigationLinks || maxSize < this.pageCount;
    }
    set hasNavigationLinks(value) {
        this._hasNavigationLinks = value;
    }
    get page() {
        return this._page;
    }
    set page(value) {
        this.setPage(value);
    }
    get pages() {
        return this._pages;
    }
    // Public methods
    hasPrevious() {
        return this.page > 1;
    }
    hasNext() {
        return this.page < this.pageCount;
    }
    setPage(newPage) {
        const value = Number.isInteger(newPage)
            ? Math.min(Math.max(newPage, 1), this.pageCount)
            : 1;
        if (value !== this._page) {
            this._page = value;
            this.pageChange.emit(this._page);
        }
    }
    // Lifecycle hooks
    ngOnChanges() {
        this.updatePages();
    }
    // Private methods
    updatePages() {
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));
        const [start, end] = this.applyPagination();
        this._pages = Array(end - start)
            .fill(start + 1)
            .map((s, i) => s + i);
    }
    applyPagination() {
        const maxSize = this.maxSize != undefined
            ? Math.min(this.maxSize, this.pageCount)
            : this.pageCount;
        const page = Math.ceil(this.page / maxSize) - 1;
        let start = 0;
        let end = this.pageCount;
        if (this.canRotate) {
            const leftOffset = Math.floor(maxSize / 2);
            const rightOffset = maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
            if (this.page <= leftOffset) {
                end = maxSize;
            }
            else if (this.pageCount - this.page < leftOffset) {
                start = this.pageCount - maxSize;
            }
            else {
                start = this.page - leftOffset - 1;
                end = this.page + rightOffset;
            }
        }
        else {
            start = page * maxSize;
            end = start + maxSize;
        }
        return [start, Math.min(end, this.pageCount)];
    }
};
tslib_1.__decorate([
    HostBinding("class.ui"),
    HostBinding("class.pagination"),
    HostBinding("class.menu")
], SuiPagination.prototype, "paginationClasses", void 0);
tslib_1.__decorate([
    Output()
], SuiPagination.prototype, "pageChange", void 0);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "maxSize", null);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "pageSize", void 0);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "collectionSize", null);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "hasNavigationLinks", null);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "hasBoundaryLinks", void 0);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "canRotate", void 0);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "hasEllipses", void 0);
tslib_1.__decorate([
    Input()
], SuiPagination.prototype, "page", null);
SuiPagination = tslib_1.__decorate([
    Component({
        selector: "sui-pagination",
        template: `
        <a
            *ngIf="hasBoundaryLinks"
            class="item"
            (click)="setPage(1)"
            [class.disabled]="page === 1"
        >
            <span><i class="angle double left icon"></i></span>
        </a>
        <a
            *ngIf="hasNavigationLinks"
            class="item"
            (click)="setPage(page - 1)"
            [class.disabled]="!hasPrevious()"
        >
            <span><i class="angle left icon"></i></span>
        </a>
        <ng-container *ngIf="hasEllipses">
            <a class="item" (click)="setPage(1)" *ngIf="pages[0] !== 1">
                <span>1</span>
            </a>
            <a class="disabled item" *ngIf="pages[0] > 2">...</a>
        </ng-container>
        <a
            *ngFor="let p of pages"
            class="item"
            [class.active]="p === page"
            (click)="setPage(p)"
        >
            {{ p }}
        </a>
        <ng-container *ngIf="hasEllipses">
            <a
                class="disabled item"
                *ngIf="pages[pages.length - 1] < pageCount - 1"
                >...</a
            >
            <a
                class="item"
                (click)="setPage(pageCount)"
                *ngIf="pages[pages.length - 1] !== pageCount"
            >
                <span>{{ pageCount }}</span>
            </a>
        </ng-container>
        <a
            *ngIf="hasNavigationLinks"
            class="item"
            (click)="setPage(page + 1)"
            [class.disabled]="!hasNext()"
        >
            <span><i class="angle right icon"></i></span>
        </a>
        <a
            *ngIf="hasBoundaryLinks"
            class="item"
            (click)="setPage(pageCount)"
            [class.disabled]="page === pageCount"
        >
            <span><i class="angle double right icon"></i></span>
        </a>
    `,
        styles: [`
            :host .item {
                transition: none;
            }
        `]
    })
], SuiPagination);
export { SuiPagination };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbImNvbGxlY3Rpb25zL3BhZ2luYXRpb24vY29tcG9uZW50cy9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBRU4sWUFBWSxFQUNaLFdBQVcsRUFDZCxNQUFNLGVBQWUsQ0FBQztBQTBFdkIsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQTRFdEI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU3QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBcEVELElBQVcsT0FBTztRQUNkLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBRUQsSUFBVyxPQUFPLENBQUMsS0FBd0I7UUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hFLENBQUM7SUFNRCxJQUFXLGNBQWM7UUFDckIs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QUFDLGtCQUFrQixDQUFDO0lBQy9CLFdBQVcsQ0FBQyxZQUFZLENBQUM7d0RBQ087QUFNakM7SUFEQyxNQUFNLEVBQUU7aURBQzhCO0FBVXZDO0lBREMsS0FBSyxFQUFFOzRDQUdQO0FBT0Q7SUFEQyxLQUFLLEVBQUU7K0NBQ2U7QUFHdkI7SUFEQyxLQUFLLEVBQUU7bURBR1A7QUFXRDtJQURDLEtBQUssRUFBRTt1REFJUDtBQU9EO0lBREMsS0FBSyxFQUFFO3VEQUN3QjtBQUdoQztJQURDLEtBQUssRUFBRTtnREFDaUI7QUFHekI7SUFEQyxLQUFLLEVBQUU7a0RBQ21CO0FBRzNCO0lBREMsS0FBSyxFQUFFO3lDQUdQO0FBbEVRLGFBQWE7SUF4RXpCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkRUO2lCQUVHOzs7O1NBSUM7S0FFUixDQUFDO0dBQ1csYUFBYSxDQTZKekI7U0E3SlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LFxuICAgIElucHV0LFxuICAgIE91dHB1dCxcbiAgICBPbkNoYW5nZXMsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEhvc3RCaW5kaW5nXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcInN1aS1wYWdpbmF0aW9uXCIsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGFcbiAgICAgICAgICAgICpuZ0lmPVwiaGFzQm91bmRhcnlMaW5rc1wiXG4gICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldFBhZ2UoMSlcIlxuICAgICAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cInBhZ2UgPT09IDFcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj48aSBjbGFzcz1cImFuZ2xlIGRvdWJsZSBsZWZ0IGljb25cIj48L2k+PC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxhXG4gICAgICAgICAgICAqbmdJZj1cImhhc05hdmlnYXRpb25MaW5rc1wiXG4gICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldFBhZ2UocGFnZSAtIDEpXCJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaGFzUHJldmlvdXMoKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiYW5nbGUgbGVmdCBpY29uXCI+PC9pPjwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGFzRWxsaXBzZXNcIj5cbiAgICAgICAgICAgIDxhIGNsYXNzPVwiaXRlbVwiIChjbGljayk9XCJzZXRQYWdlKDEpXCIgKm5nSWY9XCJwYWdlc1swXSAhPT0gMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPjE8L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBjbGFzcz1cImRpc2FibGVkIGl0ZW1cIiAqbmdJZj1cInBhZ2VzWzBdID4gMlwiPi4uLjwvYT5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxhXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgcCBvZiBwYWdlc1wiXG4gICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJwID09PSBwYWdlXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRQYWdlKHApXCJcbiAgICAgICAgPlxuICAgICAgICAgICAge3sgcCB9fVxuICAgICAgICA8L2E+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNFbGxpcHNlc1wiPlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBjbGFzcz1cImRpc2FibGVkIGl0ZW1cIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicGFnZXNbcGFnZXMubGVuZ3RoIC0gMV0gPCBwYWdlQ291bnQgLSAxXCJcbiAgICAgICAgICAgICAgICA+Li4uPC9hXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNldFBhZ2UocGFnZUNvdW50KVwiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJwYWdlc1twYWdlcy5sZW5ndGggLSAxXSAhPT0gcGFnZUNvdW50XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyBwYWdlQ291bnQgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8YVxuICAgICAgICAgICAgKm5nSWY9XCJoYXNOYXZpZ2F0aW9uTGlua3NcIlxuICAgICAgICAgICAgY2xhc3M9XCJpdGVtXCJcbiAgICAgICAgICAgIChjbGljayk9XCJzZXRQYWdlKHBhZ2UgKyAxKVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiIWhhc05leHQoKVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPVwiYW5nbGUgcmlnaHQgaWNvblwiPjwvaT48L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgICAgPGFcbiAgICAgICAgICAgICpuZ0lmPVwiaGFzQm91bmRhcnlMaW5rc1wiXG4gICAgICAgICAgICBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNldFBhZ2UocGFnZUNvdW50KVwiXG4gICAgICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwicGFnZSA9PT0gcGFnZUNvdW50XCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+PGkgY2xhc3M9XCJhbmdsZSBkb3VibGUgcmlnaHQgaWNvblwiPjwvaT48L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICBgLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgICAgICA6aG9zdCAuaXRlbSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYFxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgU3VpUGFnaW5hdGlvbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MudWlcIilcbiAgICBASG9zdEJpbmRpbmcoXCJjbGFzcy5wYWdpbmF0aW9uXCIpXG4gICAgQEhvc3RCaW5kaW5nKFwiY2xhc3MubWVudVwiKVxuICAgIHB1YmxpYyBwYWdpbmF0aW9uQ2xhc3Nlczpib29sZWFuO1xuXG4gICAgLy8gUHVibGljIG1lbWJlcnNcbiAgICBwdWJsaWMgcGFnZUNvdW50Om51bWJlcjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBwYWdlQ2hhbmdlOkV2ZW50RW1pdHRlcjxudW1iZXI+O1xuXG4gICAgLy8gUHJpdmF0ZSBtZW1iZXJzXG4gICAgcHJpdmF0ZSBfbWF4U2l6ZT86bnVtYmVyO1xuICAgIHByaXZhdGUgX2NvbGxlY3Rpb25TaXplOm51bWJlcjtcbiAgICBwcml2YXRlIF9wYWdlOm51bWJlcjtcbiAgICBwcml2YXRlIF9wYWdlczpudW1iZXJbXTtcbiAgICBwcml2YXRlIF9oYXNOYXZpZ2F0aW9uTGlua3M6Ym9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBtYXhTaXplKCk6bnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21heFNpemU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBtYXhTaXplKHZhbHVlOm51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9tYXhTaXplID0gdmFsdWUgIT0gdW5kZWZpbmVkID8gTWF0aC5tYXgodmFsdWUsIDEpIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHBhZ2VTaXplOm51bWJlcjtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBjb2xsZWN0aW9uU2l6ZSgpOm51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uU2l6ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IGNvbGxlY3Rpb25TaXplKHZhbHVlOm51bWJlcikge1xuICAgICAgICB0aGlzLl9jb2xsZWN0aW9uU2l6ZSA9IE1hdGgubWF4KHZhbHVlLCAwKTtcbiAgICAgICAgdGhpcy5wYWdlQ291bnQgPSBNYXRoLm1heChcbiAgICAgICAgICAgIDEsXG4gICAgICAgICAgICBNYXRoLmNlaWwodGhpcy5fY29sbGVjdGlvblNpemUgLyB0aGlzLnBhZ2VTaXplKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGdldCBoYXNOYXZpZ2F0aW9uTGlua3MoKTpib29sZWFuIHtcbiAgICAgICAgY29uc3QgbWF4U2l6ZSA9IHRoaXMuX21heFNpemUgfHwgdGhpcy5wYWdlQ291bnQ7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYXNOYXZpZ2F0aW9uTGlua3MgfHwgbWF4U2l6ZSA8IHRoaXMucGFnZUNvdW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgaGFzTmF2aWdhdGlvbkxpbmtzKHZhbHVlOmJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faGFzTmF2aWdhdGlvbkxpbmtzID0gdmFsdWU7XG4gICAgfVxuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgaGFzQm91bmRhcnlMaW5rczpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgY2FuUm90YXRlOmJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIHB1YmxpYyBoYXNFbGxpcHNlczpib29sZWFuO1xuXG4gICAgQElucHV0KClcbiAgICBwdWJsaWMgZ2V0IHBhZ2UoKTpudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFnZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBhZ2UodmFsdWU6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc2V0UGFnZSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBwYWdlcygpOm51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhZ2VzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRpb25DbGFzc2VzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICAgICAgdGhpcy5wYWdlU2l6ZSA9IDEwO1xuICAgICAgICB0aGlzLl9wYWdlID0gMTtcbiAgICAgICAgdGhpcy5fcGFnZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wYWdlQ291bnQgPSAxO1xuICAgICAgICB0aGlzLmhhc05hdmlnYXRpb25MaW5rcyA9IHRydWU7XG4gICAgICAgIHRoaXMuaGFzQm91bmRhcnlMaW5rcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNhblJvdGF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmhhc0VsbGlwc2VzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xuICAgIHB1YmxpYyBoYXNQcmV2aW91cygpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlID4gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzTmV4dCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlIDwgdGhpcy5wYWdlQ291bnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldFBhZ2UobmV3UGFnZTpudW1iZXIpOnZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZTpudW1iZXIgPSBOdW1iZXIuaXNJbnRlZ2VyKG5ld1BhZ2UpXG4gICAgICAgICAgICA/IE1hdGgubWluKE1hdGgubWF4KG5ld1BhZ2UsIDEpLCB0aGlzLnBhZ2VDb3VudClcbiAgICAgICAgICAgIDogMTtcbiAgICAgICAgaWYgKHZhbHVlICE9PSB0aGlzLl9wYWdlKSB7XG4gICAgICAgICAgICB0aGlzLl9wYWdlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBhZ2VDaGFuZ2UuZW1pdCh0aGlzLl9wYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIExpZmVjeWNsZSBob29rc1xuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcygpOnZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VzKCk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgcHJpdmF0ZSB1cGRhdGVQYWdlcygpOnZvaWQge1xuICAgICAgICB0aGlzLnBhZ2VDb3VudCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgMSxcbiAgICAgICAgICAgIE1hdGguY2VpbCh0aGlzLl9jb2xsZWN0aW9uU2l6ZSAvIHRoaXMucGFnZVNpemUpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgW3N0YXJ0LCBlbmRdID0gdGhpcy5hcHBseVBhZ2luYXRpb24oKTtcblxuICAgICAgICB0aGlzLl9wYWdlcyA9IEFycmF5PG51bWJlcj4oZW5kIC0gc3RhcnQpXG4gICAgICAgICAgICAuZmlsbChzdGFydCArIDEpXG4gICAgICAgICAgICAubWFwKChzLCBpKSA9PiBzICsgaSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhcHBseVBhZ2luYXRpb24oKTpbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAgICAgY29uc3QgbWF4U2l6ZSA9XG4gICAgICAgICAgICB0aGlzLm1heFNpemUgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgPyBNYXRoLm1pbih0aGlzLm1heFNpemUsIHRoaXMucGFnZUNvdW50KVxuICAgICAgICAgICAgICAgIDogdGhpcy5wYWdlQ291bnQ7XG5cbiAgICAgICAgY29uc3QgcGFnZSA9IE1hdGguY2VpbCh0aGlzLnBhZ2UgLyBtYXhTaXplKSAtIDE7XG4gICAgICAgIGxldCBzdGFydCA9IDA7XG4gICAgICAgIGxldCBlbmQgPSB0aGlzLnBhZ2VDb3VudDtcblxuICAgICAgICBpZiAodGhpcy5jYW5Sb3RhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZnRPZmZzZXQgPSBNYXRoLmZsb29yKG1heFNpemUgLyAyKTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0T2Zmc2V0ID0gbWF4U2l6ZSAlIDIgPT09IDAgPyBsZWZ0T2Zmc2V0IC0gMSA6IGxlZnRPZmZzZXQ7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2UgPD0gbGVmdE9mZnNldCkge1xuICAgICAgICAgICAgICAgIGVuZCA9IG1heFNpemU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFnZUNvdW50IC0gdGhpcy5wYWdlIDwgbGVmdE9mZnNldCkge1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gdGhpcy5wYWdlQ291bnQgLSBtYXhTaXplO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdGFydCA9IHRoaXMucGFnZSAtIGxlZnRPZmZzZXQgLSAxO1xuICAgICAgICAgICAgICAgIGVuZCA9IHRoaXMucGFnZSArIHJpZ2h0T2Zmc2V0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhcnQgPSBwYWdlICogbWF4U2l6ZTtcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgbWF4U2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbc3RhcnQsIE1hdGgubWluKGVuZCwgdGhpcy5wYWdlQ291bnQpXTtcbiAgICB9XG59XG4iXX0=