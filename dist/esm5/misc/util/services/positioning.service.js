import * as tslib_1 from "tslib";
import Popper from "popper.js";
export var PositioningPlacement = {
    Auto: "auto",
    TopLeft: "top left",
    Top: "top",
    TopRight: "top right",
    LeftTop: "left top",
    Left: "left",
    LeftBottom: "left bottom",
    BottomLeft: "bottom left",
    Bottom: "bottom",
    BottomRight: "bottom right",
    RightTop: "right top",
    Right: "right",
    RightBottom: "right bottom"
};
function placementToPopper(placement) {
    if (!placement || placement === PositioningPlacement.Auto) {
        return "auto";
    }
    // All placements of the format: `direction alignment`, e.g. `top left`.
    var _a = tslib_1.__read(placement.split(" "), 2), direction = _a[0], alignment = _a[1];
    // Direction alone covers case of just `top`, `left`, `bottom`, `right`.
    var chosenPlacement = [direction];
    // Add `start` / `end` to placement, depending on alignment direction.
    switch (alignment) {
        case "top":
        case "left":
            chosenPlacement.push("start");
            break;
        case "bottom":
        case "right":
            chosenPlacement.push("end");
            break;
    }
    // Join with hyphen to create Popper compatible placement.
    return chosenPlacement.join("-");
}
function popperToPlacement(popper) {
    if (!popper || popper === "auto") {
        return "auto";
    }
    var _a = tslib_1.__read(popper.split("-"), 2), direction = _a[0], alignment = _a[1];
    var chosenPlacement = [direction];
    switch (direction) {
        case "top":
        case "bottom":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("left");
                    break;
                case "end":
                    chosenPlacement.push("right");
                    break;
            }
            break;
        case "left":
        case "right":
            switch (alignment) {
                case "start":
                    chosenPlacement.push("top");
                    break;
                case "end":
                    chosenPlacement.push("bottom");
                    break;
            }
            break;
    }
    return chosenPlacement.join(" ");
}
var PositioningService = /** @class */ (function () {
    function PositioningService(anchor, subject, placement, arrowSelector) {
        var _this = this;
        this.anchor = anchor;
        this.subject = subject;
        this._placement = placement;
        var modifiers = {
            computeStyle: {
                gpuAcceleration: false
            },
            preventOverflow: {
                escapeWithReference: true,
                boundariesElement: document.body
            },
            arrow: {
                element: arrowSelector
            }
        };
        if (!arrowSelector) {
            delete modifiers.arrow;
        }
        this._popper = new Popper(anchor.nativeElement, subject.nativeElement, {
            placement: placementToPopper(placement),
            modifiers: modifiers,
            onCreate: function (initial) { return _this._popperState = initial; },
            onUpdate: function (update) { return _this._popperState = update; }
        });
    }
    Object.defineProperty(PositioningService.prototype, "placement", {
        get: function () {
            return this._placement;
        },
        set: function (placement) {
            this._placement = placement;
            this._popper.options.placement = placementToPopper(placement);
            this.update();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PositioningService.prototype, "actualPlacement", {
        get: function () {
            if (!this._popperState) {
                return PositioningPlacement.Auto;
            }
            return popperToPlacement(this._popperState.placement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PositioningService.prototype, "state", {
        get: function () {
            return this._popperState;
        },
        enumerable: true,
        configurable: true
    });
    PositioningService.prototype.update = function () {
        this._popper.update();
    };
    PositioningService.prototype.destroy = function () {
        this._popper.destroy();
    };
    return PositioningService;
}());
export { PositioningService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi1zZW1hbnRpYy11aS8iLCJzb3VyY2VzIjpbIm1pc2MvdXRpbC9zZXJ2aWNlcy9wb3NpdGlvbmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLE1BQXFELE1BQU0sV0FBVyxDQUFDO0FBbUI5RSxNQUFNLENBQUMsSUFBTSxvQkFBb0IsR0FBRztJQUNoQyxJQUFJLEVBQUUsTUFBOEI7SUFDcEMsT0FBTyxFQUFFLFVBQWtDO0lBQzNDLEdBQUcsRUFBRSxLQUE2QjtJQUNsQyxRQUFRLEVBQUUsV0FBbUM7SUFDN0MsT0FBTyxFQUFFLFVBQWtDO0lBQzNDLElBQUksRUFBRSxNQUE4QjtJQUNwQyxVQUFVLEVBQUUsYUFBcUM7SUFDakQsVUFBVSxFQUFFLGFBQXFDO0lBQ2pELE1BQU0sRUFBRSxRQUFnQztJQUN4QyxXQUFXLEVBQUUsY0FBc0M7SUFDbkQsUUFBUSxFQUFFLFdBQW1DO0lBQzdDLEtBQUssRUFBRSxPQUErQjtJQUN0QyxXQUFXLEVBQUUsY0FBc0M7Q0FDdEQsQ0FBQztBQVdGLFNBQVMsaUJBQWlCLENBQUMsU0FBOEI7SUFDckQsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLEtBQUssb0JBQW9CLENBQUMsSUFBSSxFQUFFO1FBQ3ZELE9BQU8sTUFBTSxDQUFDO0tBQ2pCO0lBRUQsd0VBQXdFO0lBQ2xFLElBQUEsNENBQTZDLEVBQTVDLGlCQUFTLEVBQUUsaUJBQWlDLENBQUM7SUFFcEQsd0VBQXdFO0lBQ3hFLElBQU0sZUFBZSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFcEMsc0VBQXNFO0lBQ3RFLFFBQVEsU0FBUyxFQUFFO1FBQ2YsS0FBSyxLQUFLLENBQUM7UUFDWCxLQUFLLE1BQU07WUFDUCxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlCLE1BQU07UUFDVixLQUFLLFFBQVEsQ0FBQztRQUNkLEtBQUss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QVFELHNCQUFXLCtDQUFlO2FBQTFCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BCLE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDO2FBQ3BDO1lBRUQsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzFELENBQUM7OztPQUFBO0lBRUQsc0JBQVcscUNBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFtQ00sbUNBQU0sR0FBYjtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLG9DQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCx5QkFBQztBQUFELENBQUMsQUF0RUQsSUFzRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCBQb3BwZXIsIHsgTW9kaWZpZXJzLCBQb3BwZXJPcHRpb25zLCBQbGFjZW1lbnQsIERhdGEgfSBmcm9tIFwicG9wcGVyLmpzXCI7XG5cbnR5cGUgUG9wcGVyTW9kaWZpZXJzID0gTW9kaWZpZXJzICYge1xuICAgIGNvbXB1dGVTdHlsZT86e1xuICAgICAgICBncHVBY2NlbGVyYXRpb246Ym9vbGVhbjtcbiAgICB9O1xufTtcbnR5cGUgUG9wcGVySW5zdGFuY2UgPSBQb3BwZXIgJiB7XG4gICAgb3B0aW9uczpQb3BwZXJPcHRpb25zICYge1xuICAgICAgICBtb2RpZmllcnM6UG9wcGVyTW9kaWZpZXJzO1xuICAgIH07XG59O1xuXG5leHBvcnQgdHlwZSBQb3NpdGlvbmluZ1BsYWNlbWVudCA9IFwiYXV0b1wiIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3AgbGVmdFwiIHwgXCJ0b3BcIiB8IFwidG9wIHJpZ2h0XCIgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJvdHRvbSBsZWZ0XCIgfCBcImJvdHRvbVwiIHwgXCJib3R0b20gcmlnaHRcIiB8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibGVmdCB0b3BcIiB8IFwibGVmdFwiIHwgXCJsZWZ0IGJvdHRvbVwiIHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJyaWdodCB0b3BcIiB8IFwicmlnaHRcIiB8IFwicmlnaHQgYm90dG9tXCI7XG5cbmV4cG9ydCBjb25zdCBQb3NpdGlvbmluZ1BsYWNlbWVudCA9IHtcbiAgICBBdXRvOiBcImF1dG9cIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBUb3BMZWZ0OiBcInRvcCBsZWZ0XCIgYXMgUG9zaXRpb25pbmdQbGFjZW1lbnQsXG4gICAgVG9wOiBcInRvcFwiIGFzIFBvc2l0aW9uaW5nUGxhY2VtZW50LFxuICAgIFRvcFJpZ2h0OiBcInRvcCByaWdodFwiIGFzIFBvc2l0aW9uaW5nUGxhY2VtZW50LFxuICAgIExlZnRUb3A6IFwibGVmdCB0b3BcIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBMZWZ0OiBcImxlZnRcIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBMZWZ0Qm90dG9tOiBcImxlZnQgYm90dG9tXCIgYXMgUG9zaXRpb25pbmdQbGFjZW1lbnQsXG4gICAgQm90dG9tTGVmdDogXCJib3R0b20gbGVmdFwiIGFzIFBvc2l0aW9uaW5nUGxhY2VtZW50LFxuICAgIEJvdHRvbTogXCJib3R0b21cIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBCb3R0b21SaWdodDogXCJib3R0b20gcmlnaHRcIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBSaWdodFRvcDogXCJyaWdodCB0b3BcIiBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudCxcbiAgICBSaWdodDogXCJyaWdodFwiIGFzIFBvc2l0aW9uaW5nUGxhY2VtZW50LFxuICAgIFJpZ2h0Qm90dG9tOiBcInJpZ2h0IGJvdHRvbVwiIGFzIFBvc2l0aW9uaW5nUGxhY2VtZW50XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIElQb3NpdGlvbkJvdW5kaW5nQm94IHtcbiAgICB3aWR0aDpudW1iZXI7XG4gICAgaGVpZ2h0Om51bWJlcjtcbiAgICB0b3A6bnVtYmVyO1xuICAgIGxlZnQ6bnVtYmVyO1xuICAgIGJvdHRvbTpudW1iZXI7XG4gICAgcmlnaHQ6bnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwbGFjZW1lbnRUb1BvcHBlcihwbGFjZW1lbnQ6UG9zaXRpb25pbmdQbGFjZW1lbnQpOlBsYWNlbWVudCB7XG4gICAgaWYgKCFwbGFjZW1lbnQgfHwgcGxhY2VtZW50ID09PSBQb3NpdGlvbmluZ1BsYWNlbWVudC5BdXRvKSB7XG4gICAgICAgIHJldHVybiBcImF1dG9cIjtcbiAgICB9XG5cbiAgICAvLyBBbGwgcGxhY2VtZW50cyBvZiB0aGUgZm9ybWF0OiBgZGlyZWN0aW9uIGFsaWdubWVudGAsIGUuZy4gYHRvcCBsZWZ0YC5cbiAgICBjb25zdCBbZGlyZWN0aW9uLCBhbGlnbm1lbnRdID0gcGxhY2VtZW50LnNwbGl0KFwiIFwiKTtcblxuICAgIC8vIERpcmVjdGlvbiBhbG9uZSBjb3ZlcnMgY2FzZSBvZiBqdXN0IGB0b3BgLCBgbGVmdGAsIGBib3R0b21gLCBgcmlnaHRgLlxuICAgIGNvbnN0IGNob3NlblBsYWNlbWVudCA9IFtkaXJlY3Rpb25dO1xuXG4gICAgLy8gQWRkIGBzdGFydGAgLyBgZW5kYCB0byBwbGFjZW1lbnQsIGRlcGVuZGluZyBvbiBhbGlnbm1lbnQgZGlyZWN0aW9uLlxuICAgIHN3aXRjaCAoYWxpZ25tZW50KSB7XG4gICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgY2FzZSBcImxlZnRcIjpcbiAgICAgICAgICAgIGNob3NlblBsYWNlbWVudC5wdXNoKFwic3RhcnRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICBjYXNlIFwicmlnaHRcIjpcbiAgICAgICAgICAgIGNob3NlblBsYWNlbWVudC5wdXNoKFwiZW5kXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy8gSm9pbiB3aXRoIGh5cGhlbiB0byBjcmVhdGUgUG9wcGVyIGNvbXBhdGlibGUgcGxhY2VtZW50LlxuICAgIHJldHVybiBjaG9zZW5QbGFjZW1lbnQuam9pbihcIi1cIikgYXMgUGxhY2VtZW50O1xufVxuXG5mdW5jdGlvbiBwb3BwZXJUb1BsYWNlbWVudChwb3BwZXI6c3RyaW5nKTpQb3NpdGlvbmluZ1BsYWNlbWVudCB7XG4gICAgaWYgKCFwb3BwZXIgfHwgcG9wcGVyID09PSBcImF1dG9cIikge1xuICAgICAgICByZXR1cm4gXCJhdXRvXCI7XG4gICAgfVxuXG4gICAgY29uc3QgW2RpcmVjdGlvbiwgYWxpZ25tZW50XSA9IHBvcHBlci5zcGxpdChcIi1cIik7XG5cbiAgICBjb25zdCBjaG9zZW5QbGFjZW1lbnQgPSBbZGlyZWN0aW9uXTtcblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgXCJ0b3BcIjpcbiAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RhcnRcIjpcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VuUGxhY2VtZW50LnB1c2goXCJsZWZ0XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgIGNob3NlblBsYWNlbWVudC5wdXNoKFwicmlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJsZWZ0XCI6XG4gICAgICAgIGNhc2UgXCJyaWdodFwiOlxuICAgICAgICAgICAgc3dpdGNoIChhbGlnbm1lbnQpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RhcnRcIjpcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VuUGxhY2VtZW50LnB1c2goXCJ0b3BcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VuUGxhY2VtZW50LnB1c2goXCJib3R0b21cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNob3NlblBsYWNlbWVudC5qb2luKFwiIFwiKSBhcyBQb3NpdGlvbmluZ1BsYWNlbWVudDtcbn1cblxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uaW5nU2VydmljZSB7XG4gICAgcHVibGljIHJlYWRvbmx5IGFuY2hvcjpFbGVtZW50UmVmO1xuICAgIHB1YmxpYyByZWFkb25seSBzdWJqZWN0OkVsZW1lbnRSZWY7XG5cbiAgICBwcml2YXRlIF9wb3BwZXI6UG9wcGVySW5zdGFuY2U7XG4gICAgcHJpdmF0ZSBfcG9wcGVyU3RhdGU6RGF0YTtcbiAgICBwcml2YXRlIF9wbGFjZW1lbnQ6UG9zaXRpb25pbmdQbGFjZW1lbnQ7XG5cbiAgICBwdWJsaWMgZ2V0IHBsYWNlbWVudCgpOlBvc2l0aW9uaW5nUGxhY2VtZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYWNlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHBsYWNlbWVudChwbGFjZW1lbnQ6UG9zaXRpb25pbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fcGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgICB0aGlzLl9wb3BwZXIub3B0aW9ucy5wbGFjZW1lbnQgPSBwbGFjZW1lbnRUb1BvcHBlcihwbGFjZW1lbnQpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgYWN0dWFsUGxhY2VtZW50KCk6UG9zaXRpb25pbmdQbGFjZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3BvcHBlclN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gUG9zaXRpb25pbmdQbGFjZW1lbnQuQXV0bztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb3BwZXJUb1BsYWNlbWVudCh0aGlzLl9wb3BwZXJTdGF0ZS5wbGFjZW1lbnQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdGUoKTpEYXRhIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BvcHBlclN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKGFuY2hvcjpFbGVtZW50UmVmLCBzdWJqZWN0OkVsZW1lbnRSZWYsIHBsYWNlbWVudDpQb3NpdGlvbmluZ1BsYWNlbWVudCwgYXJyb3dTZWxlY3Rvcj86c3RyaW5nKSB7XG4gICAgICAgIHRoaXMuYW5jaG9yID0gYW5jaG9yO1xuICAgICAgICB0aGlzLnN1YmplY3QgPSBzdWJqZWN0O1xuICAgICAgICB0aGlzLl9wbGFjZW1lbnQgPSBwbGFjZW1lbnQ7XG5cbiAgICAgICAgY29uc3QgbW9kaWZpZXJzOlBvcHBlck1vZGlmaWVycyA9IHtcbiAgICAgICAgICAgIGNvbXB1dGVTdHlsZToge1xuICAgICAgICAgICAgICAgIGdwdUFjY2VsZXJhdGlvbjogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICBlc2NhcGVXaXRoUmVmZXJlbmNlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiBkb2N1bWVudC5ib2R5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXJyb3c6IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBhcnJvd1NlbGVjdG9yXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCFhcnJvd1NlbGVjdG9yKSB7XG4gICAgICAgICAgICBkZWxldGUgbW9kaWZpZXJzLmFycm93O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcihcbiAgICAgICAgICAgIGFuY2hvci5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAgc3ViamVjdC5uYXRpdmVFbGVtZW50LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50VG9Qb3BwZXIocGxhY2VtZW50KSxcbiAgICAgICAgICAgICAgICBtb2RpZmllcnMsXG4gICAgICAgICAgICAgICAgb25DcmVhdGU6IGluaXRpYWwgPT4gdGhpcy5fcG9wcGVyU3RhdGUgPSBpbml0aWFsLFxuICAgICAgICAgICAgICAgIG9uVXBkYXRlOiB1cGRhdGUgPT4gdGhpcy5fcG9wcGVyU3RhdGUgPSB1cGRhdGVcbiAgICAgICAgICAgIH0pIGFzIFBvcHBlckluc3RhbmNlO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkIHtcbiAgICAgICAgdGhpcy5fcG9wcGVyLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZXN0cm95KCk6dm9pZCB7XG4gICAgICAgIHRoaXMuX3BvcHBlci5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19