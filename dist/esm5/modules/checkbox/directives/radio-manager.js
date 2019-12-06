import * as tslib_1 from "tslib";
import { Directive, AfterContentInit, ContentChildren, QueryList, ElementRef } from "@angular/core";
import { SuiRadio } from "../components/radio";
import { Util } from "../../../misc/util/index";
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
        this._subManagers.changes.subscribe(function () { return _this.updateNesting(); });
        this.updateRadios();
        this._renderedRadios.changes.subscribe(function () { return _this.updateRadios(); });
    };
    SuiRadioManager.prototype.updateNesting = function () {
        var _this = this;
        this._subManagers
            .filter(function (m) { return m !== _this; })
            .forEach(function (m) { return m.isNested = true; });
    };
    SuiRadioManager.prototype.updateRadios = function () {
        var _this = this;
        this._radioSubs.forEach(function (s) { return s.unsubscribe(); });
        this._radioSubs = [];
        var groups = Util.Array.groupBy(this._renderedRadios.toArray(), "name");
        Object
            .keys(groups)
            .map(function (k) { return groups[k]; })
            .forEach(function (g) { return g
            .forEach(function (r) { return _this._radioSubs
            .push(r.onCurrentValueChange
            .subscribe(function (v) {
            if (!_this.isNested) {
                g.forEach(function (radio) { return radio.writeValue(v); });
            }
        })); }); });
    };
    var SuiRadioManager_1;
    SuiRadioManager.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        ContentChildren(SuiRadioManager_1, { descendants: true })
    ], SuiRadioManager.prototype, "_subManagers", void 0);
    tslib_1.__decorate([
        ContentChildren(SuiRadio, { descendants: true })
    ], SuiRadioManager.prototype, "_renderedRadios", void 0);
    SuiRadioManager = SuiRadioManager_1 = tslib_1.__decorate([
        Directive({
            selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
        })
    ], SuiRadioManager);
    return SuiRadioManager;
}());
export { SuiRadioManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8tbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1vZHVsZXMvY2hlY2tib3gvZGlyZWN0aXZlcy9yYWRpby1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFLaEQ7SUFZSSx5QkFBbUIsT0FBa0I7UUFBbEIsWUFBTyxHQUFQLE9BQU8sQ0FBVztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDO3dCQWZRLGVBQWU7SUFpQmpCLDRDQUFrQixHQUF6QjtRQUFBLGlCQU1DO1FBTEcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLGFBQWEsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFlBQVksRUFBRSxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVPLHVDQUFhLEdBQXJCO1FBQUEsaUJBSUM7UUFIRyxJQUFJLENBQUMsWUFBWTthQUNaLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsS0FBSyxLQUFJLEVBQVYsQ0FBVSxDQUFDO2FBQ3ZCLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFqQixDQUFpQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVPLHNDQUFZLEdBQXBCO1FBQUEsaUJBZ0JDO1FBZkcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRSxNQUFNO2FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNaLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBVCxDQUFTLENBQUM7YUFDbkIsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQzthQUNWLE9BQU8sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVO2FBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CO2FBQ3ZCLFNBQVMsQ0FBQyxVQUFDLENBQUc7WUFDWCxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDaEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQW5CLENBQW1CLENBQUMsQ0FBQzthQUMzQztRQUNMLENBQUMsQ0FBQyxDQUFDLEVBTkcsQ0FNSCxDQUFDLEVBUEYsQ0FPRSxDQUFDLENBQUM7SUFDMUIsQ0FBQzs7O2dCQW5DMEIsVUFBVTs7SUFQckM7UUFEQyxlQUFlLENBQUMsaUJBQWUsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQzt5REFDTDtJQUduRDtRQURDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7NERBQ0Y7SUFSdEMsZUFBZTtRQUgzQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsb0RBQW9EO1NBQ2pFLENBQUM7T0FDVyxlQUFlLENBZ0QzQjtJQUFELHNCQUFDO0NBQUEsQUFoREQsSUFnREM7U0FoRFksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkcmVuLCBRdWVyeUxpc3QsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3VpUmFkaW8gfSBmcm9tIFwiLi4vY29tcG9uZW50cy9yYWRpb1wiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anMvU3Vic2NyaXB0aW9uXCI7XG5pbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4uLy4uLy4uL21pc2MvdXRpbC9pbmRleFwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogXCJmb3JtOm5vdChbbmdGb3JtXSk6bm90KFtbbmdGb3JtXV0pLG5nRm9ybSxbbmdGb3JtXVwiXG59KVxuZXhwb3J0IGNsYXNzIFN1aVJhZGlvTWFuYWdlcjxUPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gICAgcHVibGljIGlzTmVzdGVkOmJvb2xlYW47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFN1aVJhZGlvTWFuYWdlciwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3N1Yk1hbmFnZXJzOlF1ZXJ5TGlzdDxTdWlSYWRpb01hbmFnZXI8VD4+O1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihTdWlSYWRpbywgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICAgIHByaXZhdGUgX3JlbmRlcmVkUmFkaW9zOlF1ZXJ5TGlzdDxTdWlSYWRpbzxUPj47XG5cbiAgICBwcml2YXRlIF9yYWRpb1N1YnM6U3Vic2NyaXB0aW9uW107XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxlbWVudDpFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuaXNOZXN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmFkaW9TdWJzID0gW107XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOnZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZU5lc3RpbmcoKTtcbiAgICAgICAgdGhpcy5fc3ViTWFuYWdlcnMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy51cGRhdGVOZXN0aW5nKCkpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlUmFkaW9zKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVkUmFkaW9zLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMudXBkYXRlUmFkaW9zKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlTmVzdGluZygpOnZvaWQge1xuICAgICAgICB0aGlzLl9zdWJNYW5hZ2Vyc1xuICAgICAgICAgICAgLmZpbHRlcihtID0+IG0gIT09IHRoaXMpXG4gICAgICAgICAgICAuZm9yRWFjaChtID0+IG0uaXNOZXN0ZWQgPSB0cnVlKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZGF0ZVJhZGlvcygpOnZvaWQge1xuICAgICAgICB0aGlzLl9yYWRpb1N1YnMuZm9yRWFjaChzID0+IHMudW5zdWJzY3JpYmUoKSk7XG4gICAgICAgIHRoaXMuX3JhZGlvU3VicyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwcyA9IFV0aWwuQXJyYXkuZ3JvdXBCeSh0aGlzLl9yZW5kZXJlZFJhZGlvcy50b0FycmF5KCksIFwibmFtZVwiKTtcbiAgICAgICAgT2JqZWN0XG4gICAgICAgICAgICAua2V5cyhncm91cHMpXG4gICAgICAgICAgICAubWFwKGsgPT4gZ3JvdXBzW2tdKVxuICAgICAgICAgICAgLmZvckVhY2goZyA9PiBnXG4gICAgICAgICAgICAgICAgLmZvckVhY2gociA9PiB0aGlzLl9yYWRpb1N1YnNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goci5vbkN1cnJlbnRWYWx1ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjpUKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTmVzdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcuZm9yRWFjaChyYWRpbyA9PiByYWRpby53cml0ZVZhbHVlKHYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSkpKTtcbiAgICB9XG59XG4iXX0=