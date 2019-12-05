import * as tslib_1 from "tslib";
import { Directive, AfterContentInit, ContentChildren, QueryList, ElementRef } from "@angular/core";
import { SuiRadio } from "../components/radio";
import { Util } from "../../../misc/util/helpers/util";
var SuiRadioManager = /** @class */ (function () {
    function SuiRadioManager(element) {
        this.element = element;
        this.isNested = false;
        this._radioSubs = [];
    }
    SuiRadioManager_1 = SuiRadioManager;
    SuiRadioManager.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updateNesting();
        this.subManagers.changes.subscribe(function () { return _this.updateNesting(); });
        this.updateRadios();
        this.renderedRadios.changes.subscribe(function () { return _this.updateRadios(); });
    };
    SuiRadioManager.prototype.updateNesting = function () {
        var _this = this;
        this.subManagers
            .filter(function (m) { return m !== _this; })
            .forEach(function (m) { return (m.isNested = true); });
    };
    SuiRadioManager.prototype.updateRadios = function () {
        var _this = this;
        this._radioSubs.forEach(function (s) { return s.unsubscribe(); });
        this._radioSubs = [];
        var groups = Util.Array.groupBy(this.renderedRadios.toArray(), "name");
        Object.keys(groups)
            .map(function (k) { return groups[k]; })
            .forEach(function (g) {
            return g.forEach(function (r) {
                return _this._radioSubs.push(r.onCurrentValueChange.subscribe(function (v) {
                    if (!_this.isNested) {
                        g.forEach(function (radio) { return radio.writeValue(v); });
                    }
                }));
            });
        });
    };
    var SuiRadioManager_1;
    SuiRadioManager.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChildren(SuiRadioManager_1, { descendants: true })
    ], SuiRadioManager.prototype, "subManagers", void 0);
    tslib_1.__decorate([
        ContentChildren(SuiRadio, { descendants: true })
    ], SuiRadioManager.prototype, "renderedRadios", void 0);
    SuiRadioManager = SuiRadioManager_1 = tslib_1.__decorate([
        Directive({
            selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
        })
    ], SuiRadioManager);
    return SuiRadioManager;
}());
export { SuiRadioManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2hlY2tib3gvZGlyZWN0aXZlcy9yYWRpby1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUNULGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFL0MsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBS3ZEO0lBV0kseUJBQW1CLE9BQWtCO1FBQWxCLFlBQU8sR0FBUCxPQUFPLENBQVc7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQzt3QkFkUSxlQUFlO0lBZ0JqQiw0Q0FBa0IsR0FBekI7UUFBQSxpQkFNQztRQUxHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxhQUFhLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLEVBQUUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFTyx1Q0FBYSxHQUFyQjtRQUFBLGlCQUlDO1FBSEcsSUFBSSxDQUFDLFdBQVc7YUFDWCxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEtBQUssS0FBSSxFQUFWLENBQVUsQ0FBQzthQUN2QixPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sc0NBQVksR0FBcEI7UUFBQSxpQkFxQkM7UUFwQkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEVBQzdCLE1BQU0sQ0FDVCxDQUFDO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDZCxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQVQsQ0FBUyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDTixPQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO2dCQUNQLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFHO29CQUNqQyxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRTt3QkFDaEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQztxQkFDM0M7Z0JBQ0wsQ0FBQyxDQUFDLENBQ0w7WUFORCxDQU1DLENBQ0o7UUFSRCxDQVFDLENBQ0osQ0FBQztJQUNWLENBQUM7OztnQkF4QzBCLFVBQVU7O0lBUHJDO1FBREMsZUFBZSxDQUFDLGlCQUFlLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7d0RBQ1A7SUFHakQ7UUFEQyxlQUFlLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDOzJEQUNKO0lBUHBDLGVBQWU7UUFIM0IsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLG9EQUFvRDtTQUNqRSxDQUFDO09BQ1csZUFBZSxDQW9EM0I7SUFBRCxzQkFBQztDQUFBLEFBcERELElBb0RDO1NBcERZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIERpcmVjdGl2ZSxcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBRdWVyeUxpc3QsXG4gICAgRWxlbWVudFJlZlxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpUmFkaW8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yYWRpb1wiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9oZWxwZXJzL3V0aWxcIjtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiZm9ybTpub3QoW25nRm9ybV0pOm5vdChbW25nRm9ybV1dKSxuZ0Zvcm0sW25nRm9ybV1cIlxufSlcbmV4cG9ydCBjbGFzcyBTdWlSYWRpb01hbmFnZXI8VD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgICBwdWJsaWMgaXNOZXN0ZWQ6Ym9vbGVhbjtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oU3VpUmFkaW9NYW5hZ2VyLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pXG4gICAgcHVibGljIHN1Yk1hbmFnZXJzOlF1ZXJ5TGlzdDxTdWlSYWRpb01hbmFnZXI8VD4+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlSYWRpbywgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHB1YmxpYyByZW5kZXJlZFJhZGlvczpRdWVyeUxpc3Q8U3VpUmFkaW88VD4+O1xuXG4gICAgcHJpdmF0ZSBfcmFkaW9TdWJzOlN1YnNjcmlwdGlvbltdO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsZW1lbnQ6RWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmlzTmVzdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JhZGlvU3VicyA9IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTp2b2lkIHtcbiAgICAgICAgdGhpcy51cGRhdGVOZXN0aW5nKCk7XG4gICAgICAgIHRoaXMuc3ViTWFuYWdlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVOZXN0aW5nKCkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUmFkaW9zKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZWRSYWRpb3MuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVSYWRpb3MoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVOZXN0aW5nKCk6dm9pZCB7XG4gICAgICAgIHRoaXMuc3ViTWFuYWdlcnNcbiAgICAgICAgICAgIC5maWx0ZXIobSA9PiBtICE9PSB0aGlzKVxuICAgICAgICAgICAgLmZvckVhY2gobSA9PiAobS5pc05lc3RlZCA9IHRydWUpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVJhZGlvcygpOnZvaWQge1xuICAgICAgICB0aGlzLl9yYWRpb1N1YnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX3JhZGlvU3VicyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFV0aWwuQXJyYXkuZ3JvdXBCeShcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRSYWRpb3MudG9BcnJheSgpLFxuICAgICAgICAgICAgXCJuYW1lXCJcbiAgICAgICAgKTtcbiAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXBzKVxuICAgICAgICAgICAgLm1hcChrID0+IGdyb3Vwc1trXSlcbiAgICAgICAgICAgIC5mb3JFYWNoKGcgPT5cbiAgICAgICAgICAgICAgICBnLmZvckVhY2gociA9PlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yYWRpb1N1YnMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIHIub25DdXJyZW50VmFsdWVDaGFuZ2Uuc3Vic2NyaWJlKCh2OlQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNOZXN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZy5mb3JFYWNoKHJhZGlvID0+IHJhZGlvLndyaXRlVmFsdWUodikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==