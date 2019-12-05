import { __decorate, __read, __extends, __assign, __param } from 'tslib';
import { EventEmitter, Input, Output, Component, Renderer2, ElementRef, ChangeDetectorRef, HostBinding, Directive, NgModule, ContentChildren, forwardRef, ViewChild, HostListener, ContentChild, ViewContainerRef, ɵɵdefineInjectable, Injectable, ReflectiveInjector, ApplicationRef, ComponentFactoryResolver, Injector, ɵɵinject, INJECTOR, TemplateRef, ViewChildren, Host } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, FormsModule, NG_VALIDATORS } from '@angular/forms';
import 'element-closest';
import * as $extend from 'extend';
import $extend__default, {  } from 'extend';
import Popper from 'popper.js';
import { format, parse } from 'date-fns';
import * as defaultLocale from 'date-fns/locale/en-US';
import { mobile, tablet } from 'bowser';
import * as isUAWebView from 'is-ua-webview';
import isUAWebView__default, {  } from 'is-ua-webview';

// Possible directions for a transition.
var TransitionDirection;
(function (TransitionDirection) {
    TransitionDirection[TransitionDirection["In"] = 0] = "In";
    TransitionDirection[TransitionDirection["Out"] = 1] = "Out";
    TransitionDirection[TransitionDirection["Either"] = 2] = "Either";
    TransitionDirection[TransitionDirection["Static"] = 3] = "Static";
})(TransitionDirection || (TransitionDirection = {}));
var Transition = /** @class */ (function () {
    function Transition(name, duration, direction, onComplete) {
        if (duration === void 0) { duration = 250; }
        if (direction === void 0) { direction = TransitionDirection.Either; }
        if (onComplete === void 0) { onComplete = function () { }; }
        this.type = name;
        // We set a minimum duration of 1ms, to give the appearance of an immediate transition
        // whilst allowing positioning calculations to happen without a visible flicker.
        this.duration = Math.max(duration, 1);
        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
    Object.defineProperty(Transition.prototype, "directionClass", {
        // Converts TransitionDirection to class name.
        get: function () {
            switch (this.direction) {
                case TransitionDirection.In: return "in";
                case TransitionDirection.Out: return "out";
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    return Transition;
}());

var TransitionController = /** @class */ (function () {
    function TransitionController(isInitiallyVisible, display) {
        if (isInitiallyVisible === void 0) { isInitiallyVisible = true; }
        if (display === void 0) { display = "block"; }
        // isInitiallyVisible sets whether the element starts out visible.
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;
        this._display = display;
        this._queue = [];
        this._isAnimating = false;
    }
    Object.defineProperty(TransitionController.prototype, "_isReady", {
        // Used to delay animations until we have an element to animate.
        get: function () {
            return (this._renderer != undefined &&
                this._element != undefined &&
                this._changeDetector != undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isAnimating", {
        get: function () {
            return this._isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "isHidden", {
        get: function () {
            return this._isHidden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "_queueFirst", {
        // Gets the first transition in the queue.
        get: function () {
            return this._queue[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TransitionController.prototype, "_queueLast", {
        // Gets the last transition in the queue.
        get: function () {
            return this._queue[this._queue.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    // Sets the _renderer to be used for animating.
    TransitionController.prototype.registerRenderer = function (renderer) {
        this._renderer = renderer;
        this.performTransition();
    };
    // Sets the element to perform the animations on.
    TransitionController.prototype.registerElement = function (element) {
        this._element = element;
        this.performTransition();
    };
    // Sets the change detector to detect changes when using ChangeDetectionStrategy.OnPush.
    TransitionController.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetector = changeDetector;
        this.performTransition();
    };
    TransitionController.prototype.animate = function (transition) {
        // Test if transition is one of the list that doesn't change the visible state.
        // Should these eventually become classes?
        var isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) !== -1;
        if (isDirectionless) {
            transition.direction = TransitionDirection.Static;
        }
        else if (transition.direction == undefined ||
            transition.direction === TransitionDirection.Either) {
            // Set the direction to the opposite of the current visible state automatically if not set, or set to either direction.
            transition.direction = this._isVisible
                ? TransitionDirection.Out
                : TransitionDirection.In;
            if (this._queueLast) {
                // If there is an transition in the queue already, set the direction to the opposite of the direction of that transition.
                if (this._queueLast.direction === TransitionDirection.In) {
                    transition.direction = TransitionDirection.Out;
                }
                else if (this._queueLast.direction === TransitionDirection.Out) {
                    transition.direction = TransitionDirection.In;
                }
            }
        }
        // Store the transition in the queue before attempting to perform it.
        this._queue.push(transition);
        this.performTransition();
    };
    TransitionController.prototype.performTransition = function () {
        var _this = this;
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            // Don't transition until we are ready, or if we are animating, or if there aren't any transitions in the queue.
            return;
        }
        this._isAnimating = true;
        var transition = this._queueFirst;
        // Set the Semantic UI classes for transitioning.
        transition.classes.forEach(function (c) {
            return _this._renderer.addClass(_this._element, c);
        });
        this._renderer.addClass(this._element, "animating");
        this._renderer.addClass(this._element, transition.directionClass);
        // Set the Semantic UI styles for transitioning.
        this._renderer.setStyle(this._element, "animationDuration", transition.duration + "ms");
        this._renderer.setStyle(this._element, "display", this._display);
        if (transition.direction === TransitionDirection.In) {
            // Unset hidden if we are transitioning in.
            this._isHidden = false;
        }
        // Wait the length of the animation before calling the complete callback.
        this._animationTimeout = window.setTimeout(function () { return _this.finishTransition(transition); }, transition.duration);
    };
    // Called when a transition has completed.
    TransitionController.prototype.finishTransition = function (transition) {
        var _this = this;
        // Unset the Semantic UI classes & styles for transitioning.
        transition.classes.forEach(function (c) {
            return _this._renderer.removeClass(_this._element, c);
        });
        this._renderer.removeClass(this._element, "animating");
        this._renderer.removeClass(this._element, transition.directionClass);
        this._renderer.removeStyle(this._element, "animationDuration");
        this._renderer.removeStyle(this._element, "display");
        if (transition.direction === TransitionDirection.In) {
            // If we have just animated in, we are now visible.
            this._isVisible = true;
        }
        else if (transition.direction === TransitionDirection.Out) {
            // If we have transitioned out, we should be invisible and hidden.
            this._isVisible = false;
            this._isHidden = true;
        }
        if (transition.onComplete) {
            // Call the user-defined transition callback.
            transition.onComplete();
        }
        // Delete the transition from the queue.
        this._queue.shift();
        this._isAnimating = false;
        this._changeDetector.markForCheck();
        // Immediately attempt to perform another transition.
        this.performTransition();
    };
    // Stops the current transition, leaves the rest of the queue intact.
    TransitionController.prototype.stop = function (transition) {
        if (transition === void 0) { transition = this._queueFirst; }
        if (!transition || !this._isAnimating) {
            return;
        }
        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    };
    // Stops the current transition, and empties the queue.
    TransitionController.prototype.stopAll = function () {
        this.clearQueue();
        this.stop();
    };
    // Empties the transition queue but carries on with the current transition.
    TransitionController.prototype.clearQueue = function () {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    };
    return TransitionController;
}());

var SuiMessage = /** @class */ (function () {
    function SuiMessage() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter();
        this.isDismissed = false;
        this.transitionController = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;
        this.class = "";
    }
    SuiMessage.prototype.dismiss = function () {
        var _this = this;
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
            _this.isDismissed = true;
            _this.onDismiss.emit(_this);
        }));
    };
    __decorate([
        Input()
    ], SuiMessage.prototype, "isDismissable", void 0);
    __decorate([
        Output("dismiss")
    ], SuiMessage.prototype, "onDismiss", void 0);
    __decorate([
        Input()
    ], SuiMessage.prototype, "transition", void 0);
    __decorate([
        Input()
    ], SuiMessage.prototype, "transitionDuration", void 0);
    __decorate([
        Input("class")
    ], SuiMessage.prototype, "class", void 0);
    SuiMessage = __decorate([
        Component({
            selector: "sui-message",
            template: "\n        <div\n            class=\"ui message {{ class }}\"\n            *ngIf=\"!isDismissed\"\n            [suiTransition]=\"transitionController\"\n        >\n            <i class=\"close icon\" *ngIf=\"isDismissable\" (click)=\"dismiss()\"></i>\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: ["\n            /* Fix for CSS Bug */\n            .ui.icon.visible.message {\n                display: flex !important;\n            }\n        "]
        })
    ], SuiMessage);
    return SuiMessage;
}());

var SuiTransition = /** @class */ (function () {
    function SuiTransition(_renderer, element, _changeDetector) {
        this._renderer = _renderer;
        this.element = element;
        this._changeDetector = _changeDetector;
        this.transitionClass = true;
    }
    Object.defineProperty(SuiTransition.prototype, "suiTransition", {
        set: function (tC) {
            // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
            this.setTransitionController(tC);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isVisible", {
        get: function () {
            if (this._controller) {
                return this._controller.isVisible;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTransition.prototype, "isHidden", {
        get: function () {
            if (this._controller) {
                return this._controller.isHidden;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    // Initialises the controller with the injected _renderer and elementRef.
    SuiTransition.prototype.setTransitionController = function (transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this.element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    };
    SuiTransition.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], SuiTransition.prototype, "suiTransition", null);
    __decorate([
        HostBinding("class.transition")
    ], SuiTransition.prototype, "transitionClass", void 0);
    __decorate([
        HostBinding("class.visible")
    ], SuiTransition.prototype, "isVisible", null);
    __decorate([
        HostBinding("class.hidden")
    ], SuiTransition.prototype, "isHidden", null);
    SuiTransition = __decorate([
        Directive({
            selector: "[suiTransition]",
            exportAs: "transition"
        })
    ], SuiTransition);
    return SuiTransition;
}());

var SuiTransitionModule = /** @class */ (function () {
    function SuiTransitionModule() {
    }
    SuiTransitionModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [SuiTransition],
            exports: [SuiTransition],
            providers: []
        })
    ], SuiTransitionModule);
    return SuiTransitionModule;
}());

var SuiMessageModule = /** @class */ (function () {
    function SuiMessageModule() {
    }
    SuiMessageModule = __decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule],
            declarations: [SuiMessage],
            exports: [SuiMessage]
        })
    ], SuiMessageModule);
    return SuiMessageModule;
}());

var SuiPagination = /** @class */ (function () {
    function SuiPagination() {
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
    Object.defineProperty(SuiPagination.prototype, "maxSize", {
        get: function () {
            return this._maxSize;
        },
        set: function (value) {
            this._maxSize = value != undefined ? Math.max(value, 1) : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPagination.prototype, "collectionSize", {
        get: function () {
            return this._collectionSize;
        },
        set: function (value) {
            this._collectionSize = Math.max(value, 0);
            this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPagination.prototype, "hasNavigationLinks", {
        get: function () {
            var maxSize = this._maxSize || this.pageCount;
            return this._hasNavigationLinks || maxSize < this.pageCount;
        },
        set: function (value) {
            this._hasNavigationLinks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPagination.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            this.setPage(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPagination.prototype, "pages", {
        get: function () {
            return this._pages;
        },
        enumerable: true,
        configurable: true
    });
    // Public methods
    SuiPagination.prototype.hasPrevious = function () {
        return this.page > 1;
    };
    SuiPagination.prototype.hasNext = function () {
        return this.page < this.pageCount;
    };
    SuiPagination.prototype.setPage = function (newPage) {
        var value = Number.isInteger(newPage)
            ? Math.min(Math.max(newPage, 1), this.pageCount)
            : 1;
        if (value !== this._page) {
            this._page = value;
            this.pageChange.emit(this._page);
        }
    };
    // Lifecycle hooks
    SuiPagination.prototype.ngOnChanges = function () {
        this.updatePages();
    };
    // Private methods
    SuiPagination.prototype.updatePages = function () {
        this.pageCount = Math.max(1, Math.ceil(this._collectionSize / this.pageSize));
        var _a = __read(this.applyPagination(), 2), start = _a[0], end = _a[1];
        this._pages = Array(end - start)
            .fill(start + 1)
            .map(function (s, i) { return s + i; });
    };
    SuiPagination.prototype.applyPagination = function () {
        var maxSize = this.maxSize != undefined
            ? Math.min(this.maxSize, this.pageCount)
            : this.pageCount;
        var page = Math.ceil(this.page / maxSize) - 1;
        var start = 0;
        var end = this.pageCount;
        if (this.canRotate) {
            var leftOffset = Math.floor(maxSize / 2);
            var rightOffset = maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;
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
    };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.pagination"),
        HostBinding("class.menu")
    ], SuiPagination.prototype, "paginationClasses", void 0);
    __decorate([
        Output()
    ], SuiPagination.prototype, "pageChange", void 0);
    __decorate([
        Input()
    ], SuiPagination.prototype, "maxSize", null);
    __decorate([
        Input()
    ], SuiPagination.prototype, "pageSize", void 0);
    __decorate([
        Input()
    ], SuiPagination.prototype, "collectionSize", null);
    __decorate([
        Input()
    ], SuiPagination.prototype, "hasNavigationLinks", null);
    __decorate([
        Input()
    ], SuiPagination.prototype, "hasBoundaryLinks", void 0);
    __decorate([
        Input()
    ], SuiPagination.prototype, "canRotate", void 0);
    __decorate([
        Input()
    ], SuiPagination.prototype, "hasEllipses", void 0);
    __decorate([
        Input()
    ], SuiPagination.prototype, "page", null);
    SuiPagination = __decorate([
        Component({
            selector: "sui-pagination",
            template: "\n        <a\n            *ngIf=\"hasBoundaryLinks\"\n            class=\"item\"\n            (click)=\"setPage(1)\"\n            [class.disabled]=\"page === 1\"\n        >\n            <span><i class=\"angle double left icon\"></i></span>\n        </a>\n        <a\n            *ngIf=\"hasNavigationLinks\"\n            class=\"item\"\n            (click)=\"setPage(page - 1)\"\n            [class.disabled]=\"!hasPrevious()\"\n        >\n            <span><i class=\"angle left icon\"></i></span>\n        </a>\n        <ng-container *ngIf=\"hasEllipses\">\n            <a class=\"item\" (click)=\"setPage(1)\" *ngIf=\"pages[0] !== 1\">\n                <span>1</span>\n            </a>\n            <a class=\"disabled item\" *ngIf=\"pages[0] > 2\">...</a>\n        </ng-container>\n        <a\n            *ngFor=\"let p of pages\"\n            class=\"item\"\n            [class.active]=\"p === page\"\n            (click)=\"setPage(p)\"\n        >\n            {{ p }}\n        </a>\n        <ng-container *ngIf=\"hasEllipses\">\n            <a\n                class=\"disabled item\"\n                *ngIf=\"pages[pages.length - 1] < pageCount - 1\"\n                >...</a\n            >\n            <a\n                class=\"item\"\n                (click)=\"setPage(pageCount)\"\n                *ngIf=\"pages[pages.length - 1] !== pageCount\"\n            >\n                <span>{{ pageCount }}</span>\n            </a>\n        </ng-container>\n        <a\n            *ngIf=\"hasNavigationLinks\"\n            class=\"item\"\n            (click)=\"setPage(page + 1)\"\n            [class.disabled]=\"!hasNext()\"\n        >\n            <span><i class=\"angle right icon\"></i></span>\n        </a>\n        <a\n            *ngIf=\"hasBoundaryLinks\"\n            class=\"item\"\n            (click)=\"setPage(pageCount)\"\n            [class.disabled]=\"page === pageCount\"\n        >\n            <span><i class=\"angle double right icon\"></i></span>\n        </a>\n    ",
            styles: ["\n            :host .item {\n                transition: none;\n            }\n        "]
        })
    ], SuiPagination);
    return SuiPagination;
}());

var SuiPaginationModule = /** @class */ (function () {
    function SuiPaginationModule() {
    }
    SuiPaginationModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [SuiPagination],
            declarations: [SuiPagination],
            providers: []
        })
    ], SuiPaginationModule);
    return SuiPaginationModule;
}());

var SuiCollapse = /** @class */ (function () {
    function SuiCollapse(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._pristine = true;
        // Collapse animation duration is 350ms by default.
        this.collapseDuration = 350;
        this.isExpanded = false;
        this.isCollapsing = false;
    }
    Object.defineProperty(SuiCollapse.prototype, "isCollapsed", {
        // Set when the collapse is closed, and not animating.
        get: function () {
            return !this.isExpanded && !this.isCollapsing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "suiCollapse", {
        get: function () {
            return this.isExpanded;
        },
        // Sets the state of the collapse, `true` is collapsed.
        set: function (value) {
            if (value) {
                this.hide();
            }
            else {
                this.show();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCollapse.prototype, "_animationDuration", {
        get: function () {
            return this._pristine ? 0 : this.collapseDuration;
        },
        enumerable: true,
        configurable: true
    });
    SuiCollapse.prototype.hide = function () {
        var _this = this;
        this.isCollapsing = true;
        this.isExpanded = false;
        // Forcibly hide the overflow so that content is not visible past the boundaries of its container.
        this._renderer.setStyle(this._element.nativeElement, "overflow", "hidden");
        // Animate the host element from its scroll height to 0.
        this.animate(this._element.nativeElement.scrollHeight, 0, false, function () {
            _this.isCollapsing = false;
        });
    };
    SuiCollapse.prototype.show = function () {
        var _this = this;
        this.isCollapsing = true;
        // Animate the host element from its offset height to its scroll height.
        this.animate(this._element.nativeElement.offsetHeight, this._element.nativeElement.scrollHeight, true, function () {
            // Remove the overflow override to enable user styling once again.
            _this._renderer.removeStyle(_this._element.nativeElement, "overflow");
            _this.isCollapsing = false;
            _this.isExpanded = true;
        });
    };
    SuiCollapse.prototype.animate = function (startHeight, endHeight, removeOnComplete, callback) {
        if (removeOnComplete === void 0) { removeOnComplete = false; }
        if (callback === void 0) { callback = function () { }; }
        var heightFrames = [
            {
                offset: 0,
                height: startHeight + "px"
            },
            {
                offset: 1,
                height: endHeight + "px"
            }
        ];
        if (removeOnComplete) {
            heightFrames.push({
                offset: 1,
                height: "auto"
            });
        }
        // Animate the collapse using the web animations API.
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this._element.nativeElement.animate(heightFrames, {
            delay: 0,
            // Disable animation on 1st collapse / expansion.
            duration: this._animationDuration,
            iterations: 1,
            easing: "ease",
            fill: "both"
        });
        if (this._pristine) {
            // Remove pristine flag when first hit.
            this._pristine = false;
        }
        setTimeout(function () { return callback(); }, this.collapseDuration);
    };
    SuiCollapse.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        HostBinding("class.expanded")
    ], SuiCollapse.prototype, "isExpanded", void 0);
    __decorate([
        HostBinding("class.collapsed")
    ], SuiCollapse.prototype, "isCollapsed", null);
    __decorate([
        HostBinding("class.collapsing")
    ], SuiCollapse.prototype, "isCollapsing", void 0);
    __decorate([
        Input()
    ], SuiCollapse.prototype, "suiCollapse", null);
    __decorate([
        Input()
    ], SuiCollapse.prototype, "collapseDuration", void 0);
    SuiCollapse = __decorate([
        Directive({
            selector: "[suiCollapse]"
        })
    ], SuiCollapse);
    return SuiCollapse;
}());

var SuiCollapseModule = /** @class */ (function () {
    function SuiCollapseModule() {
    }
    SuiCollapseModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiCollapse
            ],
            exports: [
                SuiCollapse
            ]
        })
    ], SuiCollapseModule);
    return SuiCollapseModule;
}());

var SuiAccordionPanel = /** @class */ (function () {
    function SuiAccordionPanel(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.isOpenChange = new EventEmitter(false);
    }
    Object.defineProperty(SuiAccordionPanel.prototype, "service", {
        set: function (service) {
            this._service = service;
            this._changeDetector.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        set: function (value) {
            // Convert to boolean (fixes false != undefined)
            var isOpen = !!value;
            if (isOpen !== this.isOpen) {
                // Only update if the value has changed.
                this._isOpen = isOpen;
                if (isOpen && this._service) {
                    // If we are opening this panel, we must close the other ones.
                    this._service.closeOtherPanels(this);
                }
                this.isOpenChange.emit(this.isOpen);
                // Cancel all current animations, and fade the contents. The direction is automatic.
                this.transitionController.stopAll();
                this.transitionController.animate(new Transition(this.transition, this.transitionDuration));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "transition", {
        get: function () {
            if (this._service) {
                return this._service.transition;
            }
            return "fade";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordionPanel.prototype, "transitionDuration", {
        get: function () {
            if (this._service) {
                // Return the service defined transition duration.
                return this._service.transitionDuration;
            }
            // Revert to instantaneous if the service is not yet loaded.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordionPanel.prototype.toggle = function () {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    };
    SuiAccordionPanel.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], SuiAccordionPanel.prototype, "isDisabled", void 0);
    __decorate([
        Input()
    ], SuiAccordionPanel.prototype, "isOpen", null);
    __decorate([
        Output()
    ], SuiAccordionPanel.prototype, "isOpenChange", void 0);
    SuiAccordionPanel = __decorate([
        Component({
            selector: "sui-accordion-panel",
            exportAs: "suiAccordionPanel",
            template: "\n        <!-- Title -->\n        <div class=\"title\" [class.active]=\"isOpen\" (click)=\"toggle()\">\n            <ng-content select=\"[title]\"></ng-content>\n        </div>\n        <!-- Content -->\n        <div [suiCollapse]=\"!isOpen\" [collapseDuration]=\"transitionDuration\">\n            <div\n                class=\"content\"\n                [class.active]=\"isOpen\"\n                [suiTransition]=\"transitionController\"\n            >\n                <ng-content select=\"[content]\"></ng-content>\n            </div>\n        </div>\n    ",
            styles: ["\n            /* Manual style as Semantic UI relies on > selector */\n            .content {\n                padding: 0.5em 0 1em;\n            }\n\n            /* Another > selector fix */\n            :host:first-child .title {\n                border-top: none;\n            }\n        "]
        })
    ], SuiAccordionPanel);
    return SuiAccordionPanel;
}());

var SuiAccordionService = /** @class */ (function () {
    function SuiAccordionService() {
        this.closeOthers = true;
        this.transition = "fade";
        this.transitionDuration = 350;
        this.panels = [];
    }
    SuiAccordionService.prototype.addPanel = function (panel) {
        panel.service = this;
        this.panels.push(panel);
    };
    SuiAccordionService.prototype.closeOtherPanels = function (panel) {
        if (!this.closeOthers) {
            return;
        }
        this.panels.forEach(function (p) {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    };
    return SuiAccordionService;
}());

var SuiAccordion = /** @class */ (function () {
    function SuiAccordion() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();
        this.accordionClasses = true;
    }
    Object.defineProperty(SuiAccordion.prototype, "closeOthers", {
        get: function () {
            return this._service.closeOthers;
        },
        set: function (value) {
            this._service.closeOthers = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transition", {
        set: function (transition) {
            this._service.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiAccordion.prototype, "transitionDuration", {
        set: function (duration) {
            this._service.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    SuiAccordion.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.updatePanels();
        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(function () { return _this.updatePanels(); });
    };
    SuiAccordion.prototype.updatePanels = function () {
        var _this = this;
        this._panels.forEach(function (p) { return _this._service.addPanel(p); });
    };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.accordion")
    ], SuiAccordion.prototype, "accordionClasses", void 0);
    __decorate([
        Input()
    ], SuiAccordion.prototype, "closeOthers", null);
    __decorate([
        Input()
    ], SuiAccordion.prototype, "transition", null);
    __decorate([
        Input()
    ], SuiAccordion.prototype, "transitionDuration", null);
    __decorate([
        ContentChildren(SuiAccordionPanel)
    ], SuiAccordion.prototype, "_panels", void 0);
    SuiAccordion = __decorate([
        Component({
            selector: "sui-accordion",
            template: "\n<ng-content></ng-content>\n",
            styles: ["\n/* Fix for general styling issues */\n:host {\n    display: block;\n}\n\n/* Fix for styled border issue */\n:host.styled sui-accordion-panel:first-child .title {\n    border-top: none\n}\n"]
        })
    ], SuiAccordion);
    return SuiAccordion;
}());

var SuiAccordionModule = /** @class */ (function () {
    function SuiAccordionModule() {
    }
    SuiAccordionModule = __decorate([
        NgModule({
            imports: [CommonModule, SuiCollapseModule, SuiTransitionModule],
            declarations: [SuiAccordion, SuiAccordionPanel],
            exports: [SuiAccordion, SuiAccordionPanel],
            providers: []
        })
    ], SuiAccordionModule);
    return SuiAccordionModule;
}());

var CustomValueAccessor = /** @class */ (function () {
    function CustomValueAccessor(_host) {
        this._host = _host;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    CustomValueAccessor.prototype.writeValue = function (value) {
        this._host.writeValue(value);
    };
    CustomValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CustomValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    return CustomValueAccessor;
}());
function customValueAccessorFactory(type) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(function () { return type; }),
        multi: true
    };
}

var SuiCheckbox = /** @class */ (function () {
    function SuiCheckbox() {
        this.isChecked = false;
        this.onCheckChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.checkboxClasses = true;
    }
    Object.defineProperty(SuiCheckbox.prototype, "checkedAttribute", {
        get: function () {
            return this.isChecked ? "" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCheckbox.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SuiCheckbox.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiCheckbox.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    };
    SuiCheckbox.prototype.onFocusOut = function () {
        this.onTouched.emit();
    };
    SuiCheckbox.prototype.toggle = function () {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
    };
    SuiCheckbox.prototype.writeValue = function (value) {
        this.isChecked = value;
    };
    SuiCheckbox.prototype.focusCheckbox = function () {
        this.checkboxElement.nativeElement.focus();
    };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.checkbox")
    ], SuiCheckbox.prototype, "checkboxClasses", void 0);
    __decorate([
        Input()
    ], SuiCheckbox.prototype, "name", void 0);
    __decorate([
        HostBinding("class.checked")
    ], SuiCheckbox.prototype, "isChecked", void 0);
    __decorate([
        Output("checkChange")
    ], SuiCheckbox.prototype, "onCheckChange", void 0);
    __decorate([
        Output("touched")
    ], SuiCheckbox.prototype, "onTouched", void 0);
    __decorate([
        Input()
    ], SuiCheckbox.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding("class.read-only"),
        Input()
    ], SuiCheckbox.prototype, "isReadonly", void 0);
    __decorate([
        ViewChild("checkbox", { static: true })
    ], SuiCheckbox.prototype, "checkboxElement", void 0);
    __decorate([
        HostListener("mousedown", ["$event"])
    ], SuiCheckbox.prototype, "onMouseDown", null);
    __decorate([
        HostListener("click")
    ], SuiCheckbox.prototype, "onClick", null);
    __decorate([
        HostListener("focusout")
    ], SuiCheckbox.prototype, "onFocusOut", null);
    SuiCheckbox = __decorate([
        Component({
            selector: "sui-checkbox",
            exportAs: "suiCheckbox",
            template: "\n        <input\n            class=\"hidden\"\n            type=\"checkbox\"\n            [attr.name]=\"name\"\n            [attr.checked]=\"checkedAttribute\"\n            [attr.disabled]=\"isDisabledAttribute\"\n            [(ngModel)]=\"isChecked\"\n            #checkbox\n        />\n        <label>\n            <ng-content></ng-content>\n        </label>\n    "
        })
    ], SuiCheckbox);
    return SuiCheckbox;
}());
var SuiCheckboxValueAccessor = /** @class */ (function (_super) {
    __extends(SuiCheckboxValueAccessor, _super);
    function SuiCheckboxValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiCheckboxValueAccessor_1 = SuiCheckboxValueAccessor;
    var SuiCheckboxValueAccessor_1;
    SuiCheckboxValueAccessor.ctorParameters = function () { return [
        { type: SuiCheckbox }
    ]; };
    SuiCheckboxValueAccessor = SuiCheckboxValueAccessor_1 = __decorate([
        Directive({
            selector: "sui-checkbox",
            host: {
                "(checkChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiCheckboxValueAccessor_1)]
        })
    ], SuiCheckboxValueAccessor);
    return SuiCheckboxValueAccessor;
}(CustomValueAccessor));

var SuiRadio = /** @class */ (function () {
    function SuiRadio() {
        this.radioClasses = true;
        this.isChecked = false;
        this.onCurrentValueChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.radioClasses = true;
    }
    Object.defineProperty(SuiRadio.prototype, "checkedAttribute", {
        get: function () {
            return this.isChecked ? "" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRadio.prototype, "isDisabledAttribute", {
        get: function () {
            return this.isDisabled ? "disabled" : undefined;
        },
        enumerable: true,
        configurable: true
    });
    SuiRadio.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiRadio.prototype.onClick = function () {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.onCurrentValueChange.emit(this.currentValue);
            this.update();
            this.focusRadio();
        }
    };
    SuiRadio.prototype.onFocusOut = function () {
        this.onTouched.emit();
    };
    SuiRadio.prototype.update = function () {
        this.isChecked = this.currentValue === this.value;
    };
    SuiRadio.prototype.writeValue = function (value) {
        this.currentValue = value;
        this.update();
    };
    SuiRadio.prototype.focusRadio = function () {
        this.radioElement.nativeElement.focus();
    };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.radio"),
        HostBinding("class.checkbox")
    ], SuiRadio.prototype, "radioClasses", void 0);
    __decorate([
        Input()
    ], SuiRadio.prototype, "name", void 0);
    __decorate([
        Input()
    ], SuiRadio.prototype, "value", void 0);
    __decorate([
        HostBinding("class.checked")
    ], SuiRadio.prototype, "isChecked", void 0);
    __decorate([
        Output("currentValueChange")
    ], SuiRadio.prototype, "onCurrentValueChange", void 0);
    __decorate([
        Output("touched")
    ], SuiRadio.prototype, "onTouched", void 0);
    __decorate([
        Input()
    ], SuiRadio.prototype, "isDisabled", void 0);
    __decorate([
        HostBinding("class.read-only"),
        Input()
    ], SuiRadio.prototype, "isReadonly", void 0);
    __decorate([
        ViewChild("radio", { static: true })
    ], SuiRadio.prototype, "radioElement", void 0);
    __decorate([
        HostListener("mousedown", ["$event"])
    ], SuiRadio.prototype, "onMouseDown", null);
    __decorate([
        HostListener("click")
    ], SuiRadio.prototype, "onClick", null);
    __decorate([
        HostListener("focusout")
    ], SuiRadio.prototype, "onFocusOut", null);
    SuiRadio = __decorate([
        Component({
            selector: "sui-radio-button",
            template: "\n        <input\n            class=\"hidden\"\n            type=\"checkbox\"\n            [attr.name]=\"name\"\n            [attr.checked]=\"checkedAttribute\"\n            [attr.disabled]=\"isDisabledAttribute\"\n            [ngModel]=\"isChecked\"\n            (ngModel)=\"currentValue = value\"\n            #radio\n        />\n        <label>\n            <ng-content></ng-content>\n        </label>\n    "
        })
    ], SuiRadio);
    return SuiRadio;
}());
var SuiRadioValueAccessor = /** @class */ (function (_super) {
    __extends(SuiRadioValueAccessor, _super);
    function SuiRadioValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiRadioValueAccessor_1 = SuiRadioValueAccessor;
    var SuiRadioValueAccessor_1;
    SuiRadioValueAccessor.ctorParameters = function () { return [
        { type: SuiRadio }
    ]; };
    SuiRadioValueAccessor = SuiRadioValueAccessor_1 = __decorate([
        Directive({
            selector: "sui-radio-button",
            host: {
                "(currentValueChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiRadioValueAccessor_1)]
        })
    ], SuiRadioValueAccessor);
    return SuiRadioValueAccessor;
}(CustomValueAccessor));

// Keyboard keycodes.
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["Left"] = 37] = "Left";
    KeyCode[KeyCode["Up"] = 38] = "Up";
    KeyCode[KeyCode["Right"] = 39] = "Right";
    KeyCode[KeyCode["Down"] = 40] = "Down";
    KeyCode[KeyCode["Escape"] = 27] = "Escape";
    KeyCode[KeyCode["Enter"] = 13] = "Enter";
    KeyCode[KeyCode["Space"] = 32] = "Space";
    KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
})(KeyCode || (KeyCode = {}));
var HandledEvent = /** @class */ (function () {
    function HandledEvent() {
    }
    return HandledEvent;
}());
var Util = {
    Array: {
        range: function (n, offset) {
            if (offset === void 0) { offset = 0; }
            return Array(n)
                .fill(0)
                .map(function (z, i) { return i + offset; });
        },
        group: function (items, groupLength) {
            var mutable = items.slice(0);
            var groups = [];
            while (mutable.length > 0) {
                groups.push(mutable.splice(0, groupLength));
            }
            return groups;
        },
        groupBy: function (items, field) {
            return items.reduce(function (groups, i) {
                var fieldValue = i[field].toString();
                groups[fieldValue] = groups[fieldValue] || [];
                groups[fieldValue].push(i);
                return groups;
            }, Object());
        },
        flatten: function (items) {
            return items.reduce(function (is, i) { return is.concat(i); }, []);
        }
    },
    String: {
        padLeft: function (str, length, padding) {
            var s = str;
            while (s.length < length) {
                s = padding + s;
            }
            return s;
        }
    },
    DOM: {
        parseBooleanAttribute: function (attributeValue) {
            var value = attributeValue;
            if (typeof attributeValue === "string") {
                value = true;
            }
            return value;
        }
    },
    Object: {
        readValue: function (object, path) {
            if (!path) {
                return object;
            }
            var recursed;
            for (var i = 0, p = path.split("."), len = p.length; i < len; i++) {
                recursed = object[p[i]];
            }
            return recursed;
        }
    },
    Math: {
        round: function (r, n) {
            return Math.round(r / n) * n;
        },
        roundUp: function (r, n) {
            return Math.ceil(r / n) * n;
        },
        roundDown: function (r, n) {
            return Math.floor(r / n) * n;
        },
        mod: function (r, n) {
            var rem = r % n;
            if (rem < 0) {
                return rem + n;
            }
            return rem;
        }
    }
};

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
    __decorate([
        ContentChildren(SuiRadioManager_1, { descendants: true })
    ], SuiRadioManager.prototype, "subManagers", void 0);
    __decorate([
        ContentChildren(SuiRadio, { descendants: true })
    ], SuiRadioManager.prototype, "renderedRadios", void 0);
    SuiRadioManager = SuiRadioManager_1 = __decorate([
        Directive({
            selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
        })
    ], SuiRadioManager);
    return SuiRadioManager;
}());

var SuiCheckboxModule = /** @class */ (function () {
    function SuiCheckboxModule() {
    }
    SuiCheckboxModule = __decorate([
        NgModule({
            imports: [CommonModule, FormsModule],
            declarations: [
                SuiCheckbox,
                SuiCheckboxValueAccessor,
                SuiRadio,
                SuiRadioValueAccessor,
                SuiRadioManager
            ],
            exports: [
                SuiCheckbox,
                SuiCheckboxValueAccessor,
                SuiRadio,
                SuiRadioValueAccessor,
                SuiRadioManager
            ]
        })
    ], SuiCheckboxModule);
    return SuiCheckboxModule;
}());

// Creates essentially a 'string' enum.
var DropdownAutoCloseType = {
    ItemClick: "itemClick",
    OutsideClick: "outsideClick",
    Disabled: "disabled"
};
var DropdownService = /** @class */ (function () {
    function DropdownService(autoCloseMode) {
        if (autoCloseMode === void 0) { autoCloseMode = DropdownAutoCloseType.ItemClick; }
        this.isOpen = false;
        this.isOpenChange = new EventEmitter();
        this.isDisabled = false;
        this.autoCloseMode = autoCloseMode;
        this.children = [];
    }
    Object.defineProperty(DropdownService.prototype, "isNested", {
        get: function () {
            return !!this.parent;
        },
        enumerable: true,
        configurable: true
    });
    DropdownService.prototype.setOpenState = function (isOpen, reflectInParent) {
        var _this = this;
        if (reflectInParent === void 0) { reflectInParent = false; }
        if (this.isOpen !== isOpen && !this.isDisabled) {
            // Only update the state if it has changed, and the dropdown isn't disabled.
            this.isOpen = !!isOpen;
            this.isAnimating = true;
            // We must delay the emitting to avoid the 'changed after checked' Angular errors.
            this.delay(function () { return _this.isOpenChange.emit(_this.isOpen); });
            if (!this.isOpen) {
                // Close the child dropdowns when this one closes.
                this.children.forEach(function (c) { return c.setOpenState(_this.isOpen); });
            }
            if (this.parent && reflectInParent) {
                // Open the parent dropdowns when this one opens.
                this.parent.setOpenState(this.isOpen, true);
            }
        }
        else if (this.isOpen !== isOpen && this.isDisabled) {
            // If the state has changed, but the dropdown is disabled, re-emit the original isOpen value.
            this.delay(function () { return _this.isOpenChange.emit(_this.isOpen); });
        }
    };
    DropdownService.prototype.setDisabledState = function (isDisabled) {
        if (this.isDisabled !== isDisabled) {
            if (!!isDisabled) {
                // Close the dropdown as it is now disabled
                this.setOpenState(false);
            }
            this.isDisabled = !!isDisabled;
        }
    };
    DropdownService.prototype.toggleOpenState = function () {
        this.setOpenState(!this.isOpen);
    };
    // Registers a dropdown service as a child of this service.
    DropdownService.prototype.registerChild = function (child) {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    };
    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    DropdownService.prototype.isChildRegistered = function (child) {
        return this === child || !!this.children
            .find(function (c) { return !!c.children
            .find(function (cChild) { return cChild.isChildRegistered(child); }); });
    };
    // Wipes any nested data, so all services can be cleanly reattached.
    DropdownService.prototype.clearChildren = function () {
        this.children.forEach(function (c) {
            c.parent = undefined;
        });
        this.children = [];
    };
    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    DropdownService.prototype.delay = function (callback) {
        setTimeout(function () { return callback(); });
    };
    return DropdownService;
}());

var SuiDropdownMenuItem = /** @class */ (function () {
    function SuiDropdownMenuItem(_renderer, element) {
        this._renderer = _renderer;
        this.element = element;
        this.isSelected = false;
        this.selectedClass = "selected";
    }
    Object.defineProperty(SuiDropdownMenuItem.prototype, "isDisabled", {
        get: function () {
            // We must use nativeElement as Angular doesn't have a way of reading class information.
            var element = this.element.nativeElement;
            return element.classList.contains("disabled");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenuItem.prototype, "isSelected", {
        get: function () {
            return this._isSelected;
        },
        set: function (value) {
            // Renderer is used to enable a dynamic class name.
            if (value) {
                this._renderer.addClass(this.element.nativeElement, this.selectedClass);
            }
            else {
                this._renderer.removeClass(this.element.nativeElement, this.selectedClass);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenuItem.prototype, "hasChildDropdown", {
        get: function () {
            return !!this.childDropdownMenu;
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdownMenuItem.prototype.performClick = function () {
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this.element.nativeElement.click();
    };
    SuiDropdownMenuItem.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        ContentChild(forwardRef(function () { return SuiDropdownMenu; }), { static: true })
    ], SuiDropdownMenuItem.prototype, "childDropdownMenu", void 0);
    SuiDropdownMenuItem = __decorate([
        Directive({
            // We must attach to every '.item' as Angular doesn't support > selectors.
            selector: ".item"
        })
    ], SuiDropdownMenuItem);
    return SuiDropdownMenuItem;
}());
var SuiDropdownMenu = /** @class */ (function (_super) {
    __extends(SuiDropdownMenu, _super);
    function SuiDropdownMenu(_renderer, element, _changeDetector) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        // Initialise transition functionality.
        _this._transitionController = new TransitionController(false);
        _this.setTransitionController(_this._transitionController);
        _this.menuTransition = "slide down";
        _this.menuTransitionDuration = 200;
        _this.menuAutoSelectFirst = false;
        _this.menuSelectedItemClass = "selected";
        _this._documentKeyDownListener = _renderer.listen("document", "keydown", function (e) { return _this.onDocumentKeyDown(e); });
        return _this;
    }
    Object.defineProperty(SuiDropdownMenu.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (value) {
            var _this = this;
            this._service = value;
            var previousIsOpen = this._service.isOpen;
            this._service.isOpenChange.subscribe(function (isOpen) {
                if (isOpen !== previousIsOpen) {
                    // Only run transitions if the open state has changed.
                    _this._transitionController.stopAll();
                    _this._transitionController.animate(new Transition(_this.menuTransition, _this.menuTransitionDuration, TransitionDirection.Either, function () { return (_this._service.isAnimating = false); }));
                }
                if (!isOpen) {
                    // Reset the item selections when a nested item is selected to avoid incosistent open states.
                    if (_this.selectedItems.length > 1) {
                        _this.resetSelection();
                    }
                }
                previousIsOpen = isOpen;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "items", {
        set: function (items) {
            this._itemsQueryOverride = items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "_itemsQuery", {
        get: function () {
            return this._itemsQueryOverride || this.itemsQueryInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdownMenu.prototype, "_items", {
        // Get the list of items, ignoring those that are disabled.
        get: function () {
            return this._itemsQuery.filter(function (i) { return !i.isDisabled; });
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdownMenu.prototype.onClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (this._service.autoCloseMode === DropdownAutoCloseType.ItemClick) {
                var target = e.target;
                if (this.element.nativeElement.contains(target.closest(".item")) &&
                    !/input|textarea/i.test(target.tagName)) {
                    // Once an item is selected, we can close the entire dropdown.
                    this._service.setOpenState(false, true);
                }
            }
        }
    };
    SuiDropdownMenu.prototype.onDocumentKeyDown = function (e) {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service.isOpen && !this._service.isNested) {
            // Stop document events like scrolling while open.
            var target = e.target;
            if (!/input/i.test(target.tagName) &&
                [
                    KeyCode.Escape,
                    KeyCode.Enter,
                    KeyCode.Up,
                    KeyCode.Down,
                    KeyCode.Left,
                    KeyCode.Right
                ].find(function (kC) { return kC === e.keyCode; })) {
                e.preventDefault();
            }
            // Gets the top selected item from the stack.
            var _a = __read(this.selectedItems.slice(-1), 1), selected = _a[0];
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            var selectedContainer = this;
            if (this.selectedItems.length >= 2) {
                var _b = __read(this.selectedItems.slice(-2), 1), selectedParent = _b[0];
                selectedContainer = selectedParent.childDropdownMenu;
            }
            switch (e.keyCode) {
                // Escape : close the entire dropdown.
                case KeyCode.Escape: {
                    this._service.setOpenState(false);
                    break;
                }
                // Down : select the next item below the current one, or the 1st if none selected.
                case KeyCode.Down:
                // Up : select the next item above the current one, or the 1st if none selected.
                case KeyCode.Up: {
                    this.selectedItems.pop();
                    this.selectedItems.push(selectedContainer.updateSelection(selected, e.keyCode));
                    // Prevent default regardless of whether we are in an input, to stop jumping to the start or end of the query string.
                    e.preventDefault();
                    break;
                }
                // Enter : if the item doesn't contain a nested dropdown, 'click' it. Otherwise, fall through to 'Right' action.
                case KeyCode.Enter: {
                    if (selected && !selected.hasChildDropdown) {
                        selected.performClick();
                        break;
                    }
                }
                // falls through
                // Right : if the selected item contains a nested dropdown, open the dropdown & select the 1st item.
                case KeyCode.Right: {
                    if (selected && selected.hasChildDropdown) {
                        selected.childDropdownMenu.service.setOpenState(true);
                        this.selectedItems.push(selected.childDropdownMenu.updateSelection(selected, e.keyCode));
                    }
                    break;
                }
                // Left : if the selected item is in a nested dropdown, close it and select the containing item.
                case KeyCode.Left: {
                    if (this.selectedItems.length >= 2) {
                        this.selectedItems.pop();
                        var _c = __read(this.selectedItems.slice(-1), 1), selectedParent = _c[0];
                        selectedParent.childDropdownMenu.service.setOpenState(false);
                        selectedParent.isSelected = true;
                    }
                    break;
                }
            }
        }
    };
    SuiDropdownMenu.prototype.resetSelection = function () {
        var _this = this;
        this.selectedItems = [];
        this._items.forEach(function (i) {
            i.selectedClass = _this.menuSelectedItemClass;
            i.isSelected = false;
        });
        if (this.menuAutoSelectFirst && this._items.length > 0) {
            // Autoselect 1st item if required & possible.
            this._items[0].isSelected = true;
            this.scrollToItem(this._items[0]);
            this.selectedItems.push(this._itemsQuery.first);
        }
    };
    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    SuiDropdownMenu.prototype.updateSelection = function (selectedItem, keyCode) {
        if (selectedItem) {
            // Remove the selected status on the previously selected item.
            selectedItem.isSelected = false;
        }
        var selectedIndex = this._items.findIndex(function (i) { return i === selectedItem; });
        var newSelection;
        switch (keyCode) {
            case KeyCode.Enter:
            case KeyCode.Right:
            case KeyCode.Down:
                selectedIndex += 1;
                break;
            case KeyCode.Up:
                if (selectedIndex === -1) {
                    // If none are selected, select the 1st item. Should this be `this.items.last - 1`?
                    selectedIndex = 0;
                    break;
                }
                selectedIndex -= 1;
                break;
        }
        // Select the item at the updated index. The || is to stop us selecting past the start or end of the item list.
        newSelection = this._items[selectedIndex] || selectedItem;
        if (newSelection) {
            // Set the selected status on the newly selected item.
            newSelection.isSelected = true;
            // Set the current scroll position to the location of the newly selected item.
            this.scrollToItem(newSelection);
        }
        return newSelection;
    };
    SuiDropdownMenu.prototype.scrollToItem = function (item) {
        var menu = this.element.nativeElement;
        var selectedRect = item.element.nativeElement.getBoundingClientRect();
        var menuRect = menu.getBoundingClientRect();
        var scrollAmount = 0;
        if (selectedRect.bottom > menuRect.bottom) {
            scrollAmount = selectedRect.bottom - menuRect.bottom;
        }
        if (selectedRect.top < menuRect.top) {
            scrollAmount = selectedRect.top - menuRect.top;
        }
        menu.scrollTop += Math.round(scrollAmount);
    };
    SuiDropdownMenu.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.onItemsChanged();
        this._itemsQuery.changes.subscribe(function () { return _this.onItemsChanged(); });
    };
    SuiDropdownMenu.prototype.onItemsChanged = function () {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this.resetSelection();
    };
    SuiDropdownMenu.prototype.ngOnDestroy = function () {
        this._documentKeyDownListener();
    };
    SuiDropdownMenu.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuTransition", void 0);
    __decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuTransitionDuration", void 0);
    __decorate([
        ContentChildren(SuiDropdownMenuItem)
    ], SuiDropdownMenu.prototype, "itemsQueryInternal", void 0);
    __decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuAutoSelectFirst", void 0);
    __decorate([
        Input()
    ], SuiDropdownMenu.prototype, "menuSelectedItemClass", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiDropdownMenu.prototype, "onClick", null);
    SuiDropdownMenu = __decorate([
        Directive({
            selector: "[suiDropdownMenu]"
        })
    ], SuiDropdownMenu);
    return SuiDropdownMenu;
}(SuiTransition));

var SuiSelectOption = /** @class */ (function (_super) {
    __extends(SuiSelectOption, _super);
    function SuiSelectOption(_renderer, element, _changeDetector) {
        var _this = 
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        _super.call(this, _renderer, element) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        _this.optionClasses = true;
        _this.isActive = false;
        _this.onSelected = new EventEmitter();
        // By default we make the default text an empty label, for the brief moment when it isn't displaying the correct one.
        _this.renderedText = "";
        _this.usesTemplate = false;
        return _this;
    }
    Object.defineProperty(SuiSelectOption.prototype, "formatter", {
        set: function (formatter) {
            if (!this.usesTemplate) {
                this.renderedText = formatter(this.value);
            }
            else {
                this.renderedText = "";
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectOption.prototype.markForCheck = function () {
        this._changeDetector.markForCheck();
    };
    SuiSelectOption.prototype.onClick = function (e) {
        var _this = this;
        e.eventHandled = true;
        setTimeout(function () { return _this.onSelected.emit(_this.value); });
    };
    SuiSelectOption.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        HostBinding("class.item")
    ], SuiSelectOption.prototype, "optionClasses", void 0);
    __decorate([
        Input()
    ], SuiSelectOption.prototype, "value", void 0);
    __decorate([
        Output()
    ], SuiSelectOption.prototype, "onSelected", void 0);
    __decorate([
        HostBinding("class.active")
    ], SuiSelectOption.prototype, "isActive", void 0);
    __decorate([
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    ], SuiSelectOption.prototype, "templateSibling", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiSelectOption.prototype, "onClick", null);
    SuiSelectOption = __decorate([
        Component({
            selector: "sui-select-option",
            template: "\n        <span #templateSibling></span>\n        <span [innerHTML]=\"renderedText\"></span>\n    "
        })
    ], SuiSelectOption);
    return SuiSelectOption;
}(SuiDropdownMenuItem));

var SuiSelectSearch = /** @class */ (function () {
    function SuiSelectSearch(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.onQueryUpdated = new EventEmitter();
        this.onQueryKeyDown = new EventEmitter();
        this.searchClass = true;
        this.autoComplete = "off";
    }
    Object.defineProperty(SuiSelectSearch.prototype, "query", {
        set: function (query) {
            this._renderer.setProperty(this._element.nativeElement, "value", query);
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectSearch.prototype.updateQuery = function (query) {
        this.onQueryUpdated.emit(query);
    };
    SuiSelectSearch.prototype.onKeyDown = function (e) {
        this.onQueryKeyDown.emit(e);
    };
    SuiSelectSearch.prototype.focus = function () {
        var _this = this;
        // Slightly delay to support in menu search.
        this._element.nativeElement.focus();
        setTimeout(function () { return _this._element.nativeElement.focus(); });
    };
    SuiSelectSearch.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        HostBinding("class.search")
    ], SuiSelectSearch.prototype, "searchClass", void 0);
    __decorate([
        HostBinding("attr.autocomplete")
    ], SuiSelectSearch.prototype, "autoComplete", void 0);
    __decorate([
        HostListener("input", ["$event.target.value"])
    ], SuiSelectSearch.prototype, "updateQuery", null);
    __decorate([
        HostListener("keydown", ["$event"])
    ], SuiSelectSearch.prototype, "onKeyDown", null);
    SuiSelectSearch = __decorate([
        Directive({
            selector: "input[suiSelectSearch]"
        })
    ], SuiSelectSearch);
    return SuiSelectSearch;
}());

var SearchService = /** @class */ (function () {
    function SearchService(allowEmptyQuery) {
        var _this = this;
        if (allowEmptyQuery === void 0) { allowEmptyQuery = false; }
        this._options = [];
        this.optionsFilter = function (os, q) {
            // Convert the query string to a RegExp.
            var regex = _this.toRegex(_this._query);
            if (regex instanceof RegExp) {
                // Only update the results if the query was valid regex.
                // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
                return (os
                    // Filter on the options with a string match on the field we are testing.
                    .filter(function (o) {
                    return Util.Object.readValue(o, _this._optionsField)
                        .toString()
                        .match(regex);
                }));
            }
            // Don't update since it wasn't a valid regex.
            return false;
        };
        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this.searchDelay = 0;
        this.reset();
    }
    Object.defineProperty(SearchService.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = options || [];
            // We cannot use both local & remote options simultaneously.
            this._optionsLookup = undefined;
            // Reset entire service with new options.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsLookup", {
        get: function () {
            return this._optionsLookup;
        },
        set: function (lookupFn) {
            this._optionsLookup = lookupFn;
            // As before, cannot use local & remote options simultaneously.
            this._options = [];
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "hasItemLookup", {
        get: function () {
            return !!this.optionsLookup && this.optionsLookup.length === 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "optionsField", {
        get: function () {
            return this._optionsField;
        },
        set: function (field) {
            this._optionsField = field;
            // We need to reset otherwise we would now be showing invalid search results.
            this.reset();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchService.prototype, "isSearching", {
        get: function () {
            return this._isSearching;
        },
        enumerable: true,
        configurable: true
    });
    // Updates the query after the specified search delay.
    SearchService.prototype.updateQueryDelayed = function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        this._query = query;
        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = window.setTimeout(function () {
            _this.updateQuery(query, callback);
        }, this.searchDelay);
    };
    // Updates the current search query.
    SearchService.prototype.updateQuery = function (query, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        this._query = query;
        if (this._query === "" && !this.allowEmptyQuery) {
            // Don't update if the new query is empty (and we don't allow empty queries).
            // Don't reset so that when animating closed we don't get a judder.
            return callback();
        }
        if (this._resultsCache.hasOwnProperty(this._query)) {
            // If the query is already cached, make use of it.
            this._results = this._resultsCache[this._query];
            return callback();
        }
        if (this._optionsLookup) {
            this._isSearching = true;
            // Call the options lookup without a this context.
            var queryLookup = this._optionsLookup.call(undefined, this._query);
            queryLookup
                .then(function (results) {
                _this._isSearching = false;
                _this.updateResults(results);
                return callback();
            })
                .catch(function (error) {
                // Unset 'loading' state, and throw the returned error without updating the results.
                _this._isSearching = false;
                return callback(error);
            });
            return;
        }
        var filtered = this.optionsFilter.call(undefined, this._options, this._query);
        if (filtered) {
            this.updateResults(filtered);
        }
        return callback();
    };
    // Updates & caches the new set of results.
    SearchService.prototype.updateResults = function (results) {
        this._resultsCache[this._query] = results;
        this._results = results;
    };
    // tslint:disable-next-line:promise-function-async
    SearchService.prototype.initialLookup = function (initial) {
        if (initial instanceof Array) {
            return this._optionsLookup(undefined, initial);
        }
        return this._optionsLookup(undefined, initial);
    };
    // Converts a query string to regex without throwing an error.
    SearchService.prototype.toRegex = function (query) {
        try {
            return new RegExp(query, "i");
        }
        catch (e) {
            return query;
        }
    };
    // Generates HTML for highlighted match text.
    SearchService.prototype.highlightMatches = function (text, query) {
        var regex = this.toRegex(query);
        if (regex instanceof RegExp) {
            return text.replace(regex, function (match) { return "<b>" + match + "</b>"; });
        }
        return text;
    };
    // Resets the search back to a pristine state.
    SearchService.prototype.reset = function () {
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
        this.updateQuery("");
    };
    return SearchService;
}());

// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
var SuiSelectBase = /** @class */ (function () {
    function SuiSelectBase(_element, _renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._renderer = _renderer;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService(true);
        this.isSearchable = false;
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        this._renderedSubscriptions = [];
        this.icon = "dropdown";
        this.transition = "slide down";
        this.transitionDuration = 200;
        this.onTouched = new EventEmitter();
        this._documentKeyDownListener = _renderer.listen("document", "keydown", function (e) { return _this.onDocumentKeyDown(e); });
        this.selectClasses = true;
    }
    Object.defineProperty(SuiSelectBase.prototype, "isActive", {
        get: function () {
            return this.dropdownService.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isVisible", {
        get: function () {
            return this._menu.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "searchClass", {
        get: function () {
            return this.isSearchable && !this.isSearchExternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isSearching", {
        get: function () {
            return this.searchService.isSearching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "searchInput", {
        get: function () {
            return this.manualSearch || this.internalSearch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "tabIndexBinding", {
        get: function () {
            if (this.isDisabled) {
                // If disabled, remove from tabindex.
                return -1;
            }
            if (this.dropdownService.isOpen && this.isSearchExternal) {
                // If open & in menu search, remove from tabindex (as input always autofocusses).
                return -1;
            }
            if (this.tabIndex != undefined) {
                // If custom tabindex, default to that.
                return this.tabIndex;
            }
            if (this.searchClass) {
                // If search input enabled, tab goes to input.
                return -1;
            }
            // Otherwise, return default of 0.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "isDisabled", {
        get: function () {
            return this.dropdownService.isDisabled;
        },
        set: function (value) {
            this.dropdownService.isDisabled = !!value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "options", {
        set: function (options) {
            if (options) {
                this.searchService.options = options;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionsFilter", {
        set: function (filter) {
            if (filter) {
                this.searchService.optionsFilter = filter;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionsLookup", {
        set: function (lookup) {
            if (lookup) {
                this.searchService.optionsLookup = lookup;
                this.optionsUpdateHook();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "filteredOptions", {
        get: function () {
            return this.searchService.results;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "availableOptions", {
        // Deprecated
        get: function () {
            return this.filteredOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "query", {
        get: function () {
            return this.isSearchable ? this.searchService.query : undefined;
        },
        set: function (query) {
            var _this = this;
            if (query != undefined) {
                this.queryUpdateHook();
                this.updateQuery(query);
                // Update the rendered text as query has changed.
                this._renderedOptions.forEach(function (ro) {
                    return _this.initialiseRenderedOption(ro);
                });
                if (this.searchInput) {
                    this.searchInput.query = query;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "labelField", {
        get: function () {
            return this.searchService.optionsField;
        },
        set: function (field) {
            this.searchService.optionsField = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "labelGetter", {
        get: function () {
            var _this = this;
            // Helper function to retrieve the label from an item.
            return function (obj) {
                var label = Util.Object.readValue(obj, _this.labelField);
                if (label != undefined) {
                    return label.toString();
                }
                return "";
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "valueGetter", {
        get: function () {
            var _this = this;
            // Helper function to retrieve the value from an item.
            return function (obj) { return Util.Object.readValue(obj, _this.valueField); };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "configuredFormatter", {
        get: function () {
            var _this = this;
            if (this._optionFormatter) {
                return function (o) {
                    return _this._optionFormatter(o, _this.isSearchable ? _this.query : undefined);
                };
            }
            else if (this.searchService.optionsLookup) {
                return function (o) { return _this.labelGetter(o); };
            }
            else {
                return function (o) {
                    return _this.searchService.highlightMatches(_this.labelGetter(o), _this.query || "");
                };
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "optionFormatter", {
        set: function (formatter) {
            this._optionFormatter = formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSelectBase.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    SuiSelectBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;
        if (this.manualSearch) {
            this.isSearchable = true;
            this.isSearchExternal = true;
        }
        if (this.searchInput) {
            this.searchInput.onQueryUpdated.subscribe(function (q) { return (_this.query = q); });
            this.searchInput.onQueryKeyDown.subscribe(function (e) {
                return _this.onQueryInputKeydown(e);
            });
        }
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(function () {
            return _this.onAvailableOptionsRendered();
        });
    };
    SuiSelectBase.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().select;
    };
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    SuiSelectBase.prototype.optionsUpdateHook = function () { };
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    SuiSelectBase.prototype.queryUpdateHook = function () { };
    SuiSelectBase.prototype.updateQuery = function (query) {
        var _this = this;
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, function () {
            return _this.dropdownService.setOpenState(true);
        });
    };
    SuiSelectBase.prototype.resetQuery = function (delayed) {
        if (delayed === void 0) { delayed = true; }
        // The search delay is set to the transition duration to ensure results
        // aren't rendered as the select closes as that causes a sudden flash.
        if (delayed) {
            this.searchService.searchDelay = this._menu.menuTransitionDuration;
            this.searchService.updateQueryDelayed("");
        }
        else {
            this.searchService.updateQuery("");
        }
        if (this.searchInput) {
            this.searchInput.query = "";
        }
    };
    SuiSelectBase.prototype.onAvailableOptionsRendered = function () {
        var _this = this;
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(function (rs) { return rs.unsubscribe(); });
        this._renderedSubscriptions = [];
        this._renderedOptions.forEach(function (ro) {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(function () { return _this.initialiseRenderedOption(ro); });
            _this._renderedSubscriptions.push(ro.onSelected.subscribe(function () { return _this.selectOption(ro.value); }));
        });
        // If no options have been provided, autogenerate them from the rendered ones.
        if (this.searchService.options.length === 0 &&
            !this.searchService.optionsLookup) {
            this.options = this._renderedOptions.map(function (ro) { return ro.value; });
        }
    };
    SuiSelectBase.prototype.initialiseRenderedOption = function (option) {
        option.usesTemplate = !!this.optionTemplate;
        option.formatter = this.configuredFormatter;
        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
        option.markForCheck();
    };
    SuiSelectBase.prototype.findOption = function (options, value) {
        var _this = this;
        // Tries to find an option in options array
        return options.find(function (o) { return value === _this.valueGetter(o); });
    };
    SuiSelectBase.prototype.onCaretClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (!this.dropdownService.isAnimating) {
                this.dropdownService.setOpenState(!this.dropdownService.isOpen);
                this.focus();
            }
        }
    };
    SuiSelectBase.prototype.onClick = function (e) {
        if (!e.eventHandled && !this.dropdownService.isAnimating) {
            e.eventHandled = true;
            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
            // Immediately focus the search input whenever clicking on the select.
            this.focus();
        }
    };
    SuiSelectBase.prototype.onFocusIn = function () {
        if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);
            this.focus();
        }
    };
    SuiSelectBase.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
            this.onTouched.emit();
        }
    };
    SuiSelectBase.prototype.onKeyPress = function (e) {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    };
    SuiSelectBase.prototype.onDocumentKeyDown = function (e) {
        if (this._element.nativeElement.contains(e.target) &&
            !this.dropdownService.isOpen &&
            e.keyCode === KeyCode.Down) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
            e.preventDefault();
        }
    };
    SuiSelectBase.prototype.onQueryInputKeydown = function (event) { };
    SuiSelectBase.prototype.focus = function () {
        if (this.isSearchable && this.searchInput) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this.searchInput.focus();
        }
        else {
            this._element.nativeElement.focus();
        }
    };
    // Helper that draws the provided template beside the provided ViewContainerRef.
    SuiSelectBase.prototype.drawTemplate = function (siblingRef, value) {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, {
            $implicit: value,
            query: this.query
        });
    };
    SuiSelectBase.prototype.ngOnDestroy = function () {
        this._renderedSubscriptions.forEach(function (s) { return s.unsubscribe(); });
        this._documentKeyDownListener();
    };
    __decorate([
        ViewChild(SuiDropdownMenu, { static: true })
    ], SuiSelectBase.prototype, "_menu", void 0);
    __decorate([
        ContentChildren(SuiSelectOption, { descendants: true })
    ], SuiSelectBase.prototype, "_renderedOptions", void 0);
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.dropdown")
    ], SuiSelectBase.prototype, "selectClasses", void 0);
    __decorate([
        HostBinding("class.active")
    ], SuiSelectBase.prototype, "isActive", null);
    __decorate([
        HostBinding("class.visible")
    ], SuiSelectBase.prototype, "isVisible", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "isSearchable", void 0);
    __decorate([
        HostBinding("class.search")
    ], SuiSelectBase.prototype, "searchClass", null);
    __decorate([
        HostBinding("class.loading")
    ], SuiSelectBase.prototype, "isSearching", null);
    __decorate([
        ViewChild(SuiSelectSearch, { static: true })
    ], SuiSelectBase.prototype, "internalSearch", void 0);
    __decorate([
        ContentChild(SuiSelectSearch, { static: true })
    ], SuiSelectBase.prototype, "manualSearch", void 0);
    __decorate([
        Input("tabindex")
    ], SuiSelectBase.prototype, "tabIndex", void 0);
    __decorate([
        HostBinding("attr.tabindex")
    ], SuiSelectBase.prototype, "tabIndexBinding", null);
    __decorate([
        HostBinding("class.disabled"),
        Input()
    ], SuiSelectBase.prototype, "isDisabled", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "options", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "optionsFilter", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "optionsLookup", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "labelField", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "valueField", void 0);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "optionTemplate", void 0);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "optionFormatter", null);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "icon", void 0);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "transition", void 0);
    __decorate([
        Input()
    ], SuiSelectBase.prototype, "transitionDuration", void 0);
    __decorate([
        Output("touched")
    ], SuiSelectBase.prototype, "onTouched", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiSelectBase.prototype, "onClick", null);
    __decorate([
        HostListener("focusin")
    ], SuiSelectBase.prototype, "onFocusIn", null);
    __decorate([
        HostListener("focusout", ["$event"])
    ], SuiSelectBase.prototype, "onFocusOut", null);
    __decorate([
        HostListener("keypress", ["$event"])
    ], SuiSelectBase.prototype, "onKeyPress", null);
    return SuiSelectBase;
}());

var enGB = {
    datepicker: {
        months: [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ],
        monthsShort: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        weekdays: [
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        weekdaysShort: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
        ],
        weekdaysNarrow: [
            "S", "M", "T", "W", "T", "F", "S"
        ],
        timesOfDay: [
            "a.m.", "p.m."
        ],
        timesOfDayUppercase: [
            "AM", "PM"
        ],
        timesOfDayLowercase: [
            "am", "pm"
        ],
        formats: {
            time: "h:mm A",
            datetime: "D MMMM YYYY h:mm A",
            date: "D MMMM YYYY",
            month: "MMMM YYYY",
            year: "YYYY"
        },
        firstDayOfWeek: 1
    },
    search: {
        placeholder: "Search...",
        noResults: {
            header: "No Results",
            message: "Your search returned no results."
        }
    },
    select: {
        noResultsMessage: "No results",
        single: {
            placeholder: "Select one"
        },
        multi: {
            placeholder: "Select...",
            maxSelectedMessage: "Max #{max} selections",
            selectedMessage: "#{count} selections"
        }
    }
};

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
function deepExtend(target, source) {
    // Rollup...
    var extend = $extend__default || $extend;
    return extend(true, target, source);
}
function lang(language) {
    return language.toLowerCase().replace("-", "");
}
var SuiLocalizationService = /** @class */ (function () {
    function SuiLocalizationService() {
        this.onLanguageUpdate = new EventEmitter();
        this._fallbackValues = enGB;
        this._values = {};
        this._language = "en-GB";
        this.load("en-GB", enGB);
    }
    Object.defineProperty(SuiLocalizationService.prototype, "language", {
        get: function () {
            return this._language;
        },
        enumerable: true,
        configurable: true
    });
    SuiLocalizationService.prototype.setLanguage = function (language) {
        if (lang(this._language) !== lang(language)) {
            this._language = language;
            this.onLanguageUpdate.emit();
        }
    };
    SuiLocalizationService.prototype.get = function (language) {
        if (language === void 0) { language = this.language; }
        var values = deepClone(this._fallbackValues);
        if (!this._values[lang(language)]) {
            throw new Error("Locale " + language + " is not loaded");
        }
        deepExtend(values, this._values[lang(language)]);
        return deepClone(values);
    };
    SuiLocalizationService.prototype.override = function (values, overrides) {
        return deepExtend(deepClone(values), overrides);
    };
    SuiLocalizationService.prototype.load = function (language, values) {
        this._values[lang(language)] = deepClone(values);
        this.onLanguageUpdate.emit();
    };
    SuiLocalizationService.prototype.patch = function (language, values) {
        deepExtend(this._values[lang(language)], values);
    };
    SuiLocalizationService.prototype.interpolate = function (value, variables) {
        return variables.reduce(function (s, _a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            return s.replace(new RegExp("#{" + k + "}", "g"), v);
        }, value);
    };
    SuiLocalizationService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SuiLocalizationService_Factory() { return new SuiLocalizationService(); }, token: SuiLocalizationService, providedIn: "root" });
    SuiLocalizationService = __decorate([
        Injectable({
            providedIn: "root"
        })
    ], SuiLocalizationService);
    return SuiLocalizationService;
}());

var SuiSelect = /** @class */ (function (_super) {
    __extends(SuiSelect, _super);
    function SuiSelect(element, _renderer, _localizationService) {
        var _this = _super.call(this, element, _renderer, _localizationService) || this;
        _this.element = element;
        _this._renderer = _renderer;
        _this._localizationService = _localizationService;
        _this.selectedOptionChange = new EventEmitter();
        return _this;
    }
    Object.defineProperty(SuiSelect.prototype, "placeholder", {
        get: function () {
            return this._placeholder || this.localeValues.single.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    SuiSelect.prototype.optionsUpdateHook = function () {
        if (!this._writtenOption && this.selectedOption) {
            // We need to check the option still exists.
            this.writeValue(this.valueGetter(this.selectedOption));
        }
        if (this._writtenOption && this.searchService.options.length > 0) {
            // If there was an value written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOption = this.findOption(this.searchService.options, this._writtenOption);
            if (this.selectedOption) {
                this._writtenOption = undefined;
                this.drawSelectedOption();
            }
        }
    };
    SuiSelect.prototype.queryUpdateHook = function () {
        // When the query is updated, we just abandon the current selection.
        this.selectedOption = undefined;
    };
    SuiSelect.prototype.selectOption = function (option) {
        // Choose and emit the selected option.
        this.selectedOption = option;
        this.selectedOptionChange.emit(this.valueGetter(option));
        this.dropdownService.setOpenState(false);
        this.resetQuery();
        this.drawSelectedOption();
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
    };
    SuiSelect.prototype.writeValue = function (value) {
        var _this = this;
        if (value != undefined) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel value to an option.
                this.selectedOption = this.findOption(this.searchService.options, value);
                this.drawSelectedOption();
            }
            if (this.selectedOption == undefined) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial value.
                    this.searchService.initialLookup(value).then(function (i) {
                        _this.selectedOption = i;
                        _this.drawSelectedOption();
                    });
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOption = value;
                }
            }
        }
        else {
            this.selectedOption = undefined;
            this.drawSelectedOption();
        }
    };
    SuiSelect.prototype.initialiseRenderedOption = function (option) {
        _super.prototype.initialiseRenderedOption.call(this, option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive = option.value === this.selectedOption;
    };
    SuiSelect.prototype.drawSelectedOption = function () {
        // Updates the active class on the newly selected option.
        if (this._renderedOptions) {
            this.onAvailableOptionsRendered();
        }
        if (this.selectedOption != undefined && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    };
    SuiSelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        ViewChild("optionTemplateSibling", {
            read: ViewContainerRef,
            static: true
        })
    ], SuiSelect.prototype, "_optionTemplateSibling", void 0);
    __decorate([
        Output()
    ], SuiSelect.prototype, "selectedOptionChange", void 0);
    __decorate([
        Input()
    ], SuiSelect.prototype, "placeholder", null);
    SuiSelect = __decorate([
        Component({
            selector: "sui-select",
            template: "\n        <!-- Query input -->\n        <input\n            suiSelectSearch\n            type=\"text\"\n            [hidden]=\"!isSearchable || isSearchExternal\"\n        />\n\n        <!-- Placeholder text -->\n        <div\n            *ngIf=\"selectedOption == undefined\"\n            class=\"default text\"\n            [class.filtered]=\"query\"\n        >\n            {{ placeholder }}\n        </div>\n        <!-- Selected item -->\n        <div\n            class=\"text\"\n            [class.filtered]=\"query || selectedOption == undefined\"\n        >\n            <span #optionTemplateSibling></span>\n            <span\n                *ngIf=\"!optionTemplate && selectedOption != undefined\"\n                [innerHTML]=\"configuredFormatter(selectedOption)\"\n            ></span>\n        </div>\n        <!-- Dropdown icon -->\n        <i class=\"{{ icon }} icon\" (click)=\"onCaretClick($event)\"></i>\n        <!-- Select dropdown menu -->\n        <div\n            class=\"menu\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            [menuAutoSelectFirst]=\"isSearchable\"\n        >\n            <ng-content></ng-content>\n            <div\n                *ngIf=\"isSearchable && availableOptions.length === 0\"\n                class=\"message\"\n            >\n                {{ localeValues.noResultsMessage }}\n            </div>\n        </div>\n    "
        })
    ], SuiSelect);
    return SuiSelect;
}(SuiSelectBase));
// Value accessor directive for the select to support ngModel.
var SuiSelectValueAccessor = /** @class */ (function (_super) {
    __extends(SuiSelectValueAccessor, _super);
    function SuiSelectValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiSelectValueAccessor_1 = SuiSelectValueAccessor;
    var SuiSelectValueAccessor_1;
    SuiSelectValueAccessor.ctorParameters = function () { return [
        { type: SuiSelect }
    ]; };
    SuiSelectValueAccessor = SuiSelectValueAccessor_1 = __decorate([
        Directive({
            selector: "sui-select",
            host: {
                "(selectedOptionChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiSelectValueAccessor_1)]
        })
    ], SuiSelectValueAccessor);
    return SuiSelectValueAccessor;
}(CustomValueAccessor));

var SuiMultiSelect = /** @class */ (function (_super) {
    __extends(SuiMultiSelect, _super);
    function SuiMultiSelect(element, _renderer, _localizationService) {
        var _this = _super.call(this, element, _renderer, _localizationService) || this;
        _this.element = element;
        _this._renderer = _renderer;
        _this._localizationService = _localizationService;
        _this.selectedOptions = [];
        _this.selectedOptionsChange = new EventEmitter();
        _this.hasLabels = true;
        _this.multiSelectClasses = true;
        return _this;
    }
    Object.defineProperty(SuiMultiSelect.prototype, "filteredOptions", {
        get: function () {
            var _this = this;
            if (this.maxSelectedReached) {
                // If we have reached the maximum number of selections, then empty the results completely.
                return [];
            }
            var searchResults = this.searchService.results;
            if (!this.hasLabels) {
                return searchResults;
            }
            else {
                // Returns the search results \ selected options.
                return searchResults.filter(function (r) { return _this.selectedOptions.find(function (o) { return r === o; }) == undefined; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "availableOptions", {
        get: function () {
            return this.filteredOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "hasLabels", {
        get: function () {
            return this._hasLabels;
        },
        set: function (hasLabels) {
            this._hasLabels = hasLabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "placeholder", {
        get: function () {
            return this._placeholder || this.localeValues.multi.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "maxSelectedReached", {
        get: function () {
            if (this.maxSelected == undefined) {
                // If there is no maximum then we can immediately return.
                return false;
            }
            return this.selectedOptions.length === this.maxSelected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "maxSelectedMessage", {
        get: function () {
            return this._localizationService.interpolate(this.localeValues.multi.maxSelectedMessage, [["max", this.maxSelected.toString()]]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiMultiSelect.prototype, "selectedMessage", {
        get: function () {
            return this._localizationService.interpolate(this.localeValues.multi.selectedMessage, [["count", this.selectedOptions.length.toString()]]);
        },
        enumerable: true,
        configurable: true
    });
    SuiMultiSelect.prototype.optionsUpdateHook = function () {
        var _this = this;
        if (!this._writtenOptions && this.selectedOptions.length > 0) {
            // We need to check the options still exist.
            this.writeValue(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        }
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions
                // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                .map(function (v) { return _this.findOption(_this.searchService.options, v); })
                .filter(function (v) { return v != undefined; });
            if (this.selectedOptions.length === this._writtenOptions.length) {
                this._writtenOptions = undefined;
            }
        }
    };
    SuiMultiSelect.prototype.initialiseRenderedOption = function (option) {
        _super.prototype.initialiseRenderedOption.call(this, option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive =
            !this.hasLabels &&
                this.selectedOptions.indexOf(option.value) !== -1;
    };
    SuiMultiSelect.prototype.selectOption = function (option) {
        var _this = this;
        if (this.selectedOptions.indexOf(option) !== -1) {
            this.deselectOption(option);
            return;
        }
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        this.resetQuery(false);
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    };
    SuiMultiSelect.prototype.writeValue = function (values) {
        var _this = this;
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values
                    // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                    .map(function (v) { return _this.findOption(_this.searchService.options, v); })
                    .filter(function (v) { return v != undefined; });
            }
            if (values.length > 0 && this.selectedOptions.length === 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    this.searchService
                        .initialLookup(values)
                        .then(function (items) { return (_this.selectedOptions = items); });
                }
                else {
                    // Otherwise, cache the written value for when options are set.
                    this._writtenOptions = values;
                }
            }
            if (values.length === 0) {
                this.selectedOptions = [];
            }
        }
        else {
            this.selectedOptions = [];
        }
    };
    SuiMultiSelect.prototype.deselectOption = function (option) {
        var _this = this;
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(function (so) { return so !== option; });
        this.selectedOptionsChange.emit(this.selectedOptions.map(function (o) { return _this.valueGetter(o); }));
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    };
    SuiMultiSelect.prototype.onQueryInputKeydown = function (event) {
        if (event.keyCode === KeyCode.Backspace &&
            this.query === "" &&
            this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    };
    SuiMultiSelect.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        Output()
    ], SuiMultiSelect.prototype, "selectedOptionsChange", void 0);
    __decorate([
        Input()
    ], SuiMultiSelect.prototype, "hasLabels", null);
    __decorate([
        Input()
    ], SuiMultiSelect.prototype, "placeholder", null);
    __decorate([
        Input()
    ], SuiMultiSelect.prototype, "maxSelected", void 0);
    __decorate([
        HostBinding("class.multiple")
    ], SuiMultiSelect.prototype, "multiSelectClasses", void 0);
    SuiMultiSelect = __decorate([
        Component({
            selector: "sui-multi-select",
            template: "\n        <!-- Dropdown icon -->\n        <i class=\"{{ icon }} icon\" (click)=\"onCaretClick($event)\"></i>\n\n        <ng-container *ngIf=\"hasLabels\">\n            <!-- Multi-select labels -->\n            <sui-multi-select-label\n                *ngFor=\"let selected of selectedOptions\"\n                [value]=\"selected\"\n                [query]=\"query\"\n                [formatter]=\"configuredFormatter\"\n                [template]=\"optionTemplate\"\n                (deselected)=\"deselectOption($event)\"\n            ></sui-multi-select-label>\n        </ng-container>\n\n        <!-- Query input -->\n        <input\n            suiSelectSearch\n            type=\"text\"\n            [hidden]=\"!isSearchable || isSearchExternal\"\n        />\n\n        <!-- Helper text -->\n        <div\n            class=\"text\"\n            [class.default]=\"hasLabels\"\n            [class.filtered]=\"!!query && !isSearchExternal\"\n        >\n            <!-- Placeholder text -->\n            <ng-container *ngIf=\"hasLabels; else selectedBlock\">{{\n                placeholder\n            }}</ng-container>\n\n            <!-- Summary shown when labels are hidden -->\n            <ng-template #selectedBlock> {{ selectedMessage }}</ng-template>\n        </div>\n\n        <!-- Select dropdown menu -->\n        <div\n            class=\"menu\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            [menuAutoSelectFirst]=\"true\"\n        >\n            <ng-content></ng-content>\n            <ng-container *ngIf=\"availableOptions.length == 0\">\n                <div *ngIf=\"!maxSelectedReached\" class=\"message\">\n                    {{ localeValues.noResultsMessage }}\n                </div>\n                <div *ngIf=\"maxSelectedReached\" class=\"message\">\n                    {{ maxSelectedMessage }}\n                </div>\n            </ng-container>\n        </div>\n    ",
            styles: ["\n            :host input.search {\n                width: 12em !important;\n            }\n        "]
        })
    ], SuiMultiSelect);
    return SuiMultiSelect;
}(SuiSelectBase));
// Value accessor directive for the select to support ngModel.
var SuiMultiSelectValueAccessor = /** @class */ (function (_super) {
    __extends(SuiMultiSelectValueAccessor, _super);
    function SuiMultiSelectValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiMultiSelectValueAccessor_1 = SuiMultiSelectValueAccessor;
    var SuiMultiSelectValueAccessor_1;
    SuiMultiSelectValueAccessor.ctorParameters = function () { return [
        { type: SuiMultiSelect }
    ]; };
    SuiMultiSelectValueAccessor = SuiMultiSelectValueAccessor_1 = __decorate([
        Directive({
            selector: "sui-multi-select",
            host: {
                "(selectedOptionsChange)": "onChange($event)",
                "(touched)": "onTouched()"
            },
            providers: [customValueAccessorFactory(SuiMultiSelectValueAccessor_1)]
        })
    ], SuiMultiSelectValueAccessor);
    return SuiMultiSelectValueAccessor;
}(CustomValueAccessor));

var SuiComponentFactory = /** @class */ (function () {
    function SuiComponentFactory(_applicationRef, _componentFactoryResolver, _injector) {
        this._applicationRef = _applicationRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
    }
    SuiComponentFactory.prototype.createComponent = function (type, providers) {
        if (providers === void 0) { providers = []; }
        // Resolve a factory for creating components of type `type`.
        var factory = this._componentFactoryResolver.resolveComponentFactory(type);
        // Resolve and create an injector with the specified providers.
        var injector = ReflectiveInjector.resolveAndCreate(providers, this._injector);
        // Create a component using the previously resolved factory & injector.
        var componentRef = factory.create(injector);
        return componentRef;
    };
    SuiComponentFactory.prototype.createView = function (viewContainer, template, context) {
        viewContainer.createEmbeddedView(template, context);
    };
    // Inserts the component into the specified view container.
    SuiComponentFactory.prototype.attachToView = function (componentRef, viewContainer) {
        viewContainer.insert(componentRef.hostView, 0);
    };
    // Inserts the component in the root application node.
    SuiComponentFactory.prototype.attachToApplication = function (componentRef) {
        this._applicationRef.attachView(componentRef.hostView);
    };
    // Detaches the component from the root application node.
    SuiComponentFactory.prototype.detachFromApplication = function (componentRef) {
        this._applicationRef.detachView(componentRef.hostView);
    };
    // Moves the component to the specified DOM element.
    SuiComponentFactory.prototype.moveToElement = function (componentRef, element) {
        element.appendChild(componentRef.location.nativeElement);
    };
    // Moves the component to the document body.
    SuiComponentFactory.prototype.moveToDocumentBody = function (componentRef) {
        this.moveToElement(componentRef, document.querySelector("body"));
    };
    SuiComponentFactory.prototype.detachFromDocument = function (componentRef) {
        var element = componentRef.location.nativeElement;
        // We can't use `element.remove()` due to lack of IE11 support.
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    };
    SuiComponentFactory.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    SuiComponentFactory.ngInjectableDef = ɵɵdefineInjectable({ factory: function SuiComponentFactory_Factory() { return new SuiComponentFactory(ɵɵinject(ApplicationRef), ɵɵinject(ComponentFactoryResolver), ɵɵinject(INJECTOR)); }, token: SuiComponentFactory, providedIn: "root" });
    SuiComponentFactory = __decorate([
        Injectable({
            providedIn: "root"
        })
    ], SuiComponentFactory);
    return SuiComponentFactory;
}());

// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef = TemplateRef;
var SuiMultiSelectLabel = /** @class */ (function (_super) {
    __extends(SuiMultiSelectLabel, _super);
    function SuiMultiSelectLabel(_renderer, element, _changeDetector, _componentFactory) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        _this._componentFactory = _componentFactory;
        // Initialise transition functionality.
        _this._transitionController = new TransitionController(false, "inline-block");
        _this.setTransitionController(_this._transitionController);
        _this.onDeselected = new EventEmitter();
        _this.labelClasses = true;
        _this._transitionController.animate(new Transition("scale", 100, TransitionDirection.In));
        return _this;
    }
    Object.defineProperty(SuiMultiSelectLabel.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (template) {
            this._template = template;
            if (this.template) {
                this._componentFactory.createView(this.templateSibling, this.template, {
                    $implicit: this.value,
                    query: this.query
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiMultiSelectLabel.prototype.deselectOption = function (e) {
        var _this = this;
        e.eventHandled = true;
        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.Out, function () {
            return _this.onDeselected.emit(_this.value);
        }));
    };
    SuiMultiSelectLabel.prototype.onClick = function (e) {
        e.eventHandled = true;
    };
    SuiMultiSelectLabel.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef },
        { type: SuiComponentFactory }
    ]; };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.label")
    ], SuiMultiSelectLabel.prototype, "labelClasses", void 0);
    __decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "value", void 0);
    __decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "query", void 0);
    __decorate([
        Output("deselected")
    ], SuiMultiSelectLabel.prototype, "onDeselected", void 0);
    __decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "formatter", void 0);
    __decorate([
        Input()
    ], SuiMultiSelectLabel.prototype, "template", null);
    __decorate([
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    ], SuiMultiSelectLabel.prototype, "templateSibling", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiMultiSelectLabel.prototype, "onClick", null);
    SuiMultiSelectLabel = __decorate([
        Component({
            selector: "sui-multi-select-label",
            template: "\n        <span #templateSibling></span>\n        <span *ngIf=\"!template\" [innerHTML]=\"formatter(value)\"></span>\n        <i class=\"delete icon\" (click)=\"deselectOption($event)\"></i>\n    "
        })
    ], SuiMultiSelectLabel);
    return SuiMultiSelectLabel;
}(SuiTransition));

var SuiDropdown = /** @class */ (function () {
    function SuiDropdown(_element) {
        this._element = _element;
    }
    SuiDropdown_1 = SuiDropdown;
    Object.defineProperty(SuiDropdown.prototype, "filteredChildren", {
        get: function () {
            var _this = this;
            // @ContentChildren includes the current element by default.
            return this.children.filter(function (c) { return c !== _this; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isOpenChange", {
        get: function () {
            return this.service.isOpenChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isActive", {
        get: function () {
            // This is to ensure nested dropdowns don't get made bold.
            return this.service.isOpen && !this.service.isNested;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isOpen", {
        get: function () {
            return this.service.isOpen;
        },
        set: function (value) {
            // If we are opening the dropdown, we want to always open its parents.
            this.service.setOpenState(value, !!value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "isDisabled", {
        get: function () {
            return this.service.isDisabled;
        },
        set: function (value) {
            this.service.setDisabledState(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "tabIndexBinding", {
        get: function () {
            if (this.isDisabled || this.service.isNested) {
                // If disabled, remove from tabindex.
                return undefined;
            }
            if (this.tabIndex != undefined) {
                // If custom tabindex, default to that.
                return this.tabIndex;
            }
            // Otherwise, return default of 0.
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDropdown.prototype, "autoClose", {
        get: function () {
            return this.service.autoCloseMode;
        },
        set: function (value) {
            this.service.autoCloseMode = value;
        },
        enumerable: true,
        configurable: true
    });
    SuiDropdown.prototype.ngOnInit = function () {
        var _this = this;
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(function () {
            if (_this.service.isOpen) {
                _this._element.nativeElement.focus();
            }
        });
    };
    SuiDropdown.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (!this.menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this.menu.service = this.service;
        this.childrenUpdated();
        this.children.changes.subscribe(function () { return _this.childrenUpdated(); });
    };
    SuiDropdown.prototype.childrenUpdated = function () {
        var _this = this;
        // Reregister child dropdowns each time the menu content changes.
        this.filteredChildren
            .map(function (c) { return c.service; })
            .forEach(function (s) { return _this.service.registerChild(s); });
    };
    SuiDropdown.prototype.onClick = function (e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            this.service.toggleOpenState();
        }
    };
    SuiDropdown.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.externallyClose();
        }
    };
    SuiDropdown.prototype.onKeypress = function (e) {
        // Block the keyboard event from being fired on parent dropdowns.
        if (!e.eventHandled) {
            if (e.keyCode === KeyCode.Enter) {
                e.eventHandled = true;
                this.service.setOpenState(true);
            }
        }
    };
    SuiDropdown.prototype.externallyClose = function () {
        if (this.service.autoCloseMode === DropdownAutoCloseType.ItemClick ||
            this.service.autoCloseMode === DropdownAutoCloseType.OutsideClick) {
            // No need to reflect in parent since they are also bound to document.
            this.service.setOpenState(false);
        }
    };
    var SuiDropdown_1;
    SuiDropdown.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        ContentChild(SuiDropdownMenu, { static: true })
    ], SuiDropdown.prototype, "menu", void 0);
    __decorate([
        ContentChildren(SuiDropdown_1, { descendants: true })
    ], SuiDropdown.prototype, "children", void 0);
    __decorate([
        Output()
    ], SuiDropdown.prototype, "isOpenChange", null);
    __decorate([
        HostBinding("class.active")
    ], SuiDropdown.prototype, "isActive", null);
    __decorate([
        Input()
    ], SuiDropdown.prototype, "isOpen", null);
    __decorate([
        HostBinding("class.disabled"),
        Input()
    ], SuiDropdown.prototype, "isDisabled", null);
    __decorate([
        Input("tabindex")
    ], SuiDropdown.prototype, "tabIndex", void 0);
    __decorate([
        HostBinding("attr.tabindex")
    ], SuiDropdown.prototype, "tabIndexBinding", null);
    __decorate([
        Input()
    ], SuiDropdown.prototype, "autoClose", null);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiDropdown.prototype, "onClick", null);
    __decorate([
        HostListener("focusout", ["$event"])
    ], SuiDropdown.prototype, "onFocusOut", null);
    __decorate([
        HostListener("keypress", ["$event"])
    ], SuiDropdown.prototype, "onKeypress", null);
    SuiDropdown = SuiDropdown_1 = __decorate([
        Directive({
            selector: "[suiDropdown]"
        })
    ], SuiDropdown);
    return SuiDropdown;
}());

var SuiDropdownModule = /** @class */ (function () {
    function SuiDropdownModule() {
    }
    SuiDropdownModule = __decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule],
            declarations: [SuiDropdown, SuiDropdownMenu, SuiDropdownMenuItem],
            exports: [SuiDropdown, SuiDropdownMenu, SuiDropdownMenuItem]
        })
    ], SuiDropdownModule);
    return SuiDropdownModule;
}());

var SuiUtilityModule = /** @class */ (function () {
    function SuiUtilityModule() {
    }
    SuiUtilityModule = __decorate([
        NgModule({
            imports: [CommonModule],
            providers: [
                SuiComponentFactory
            ]
        })
    ], SuiUtilityModule);
    return SuiUtilityModule;
}());

var SuiLocalizationModule = /** @class */ (function () {
    function SuiLocalizationModule() {
    }
    SuiLocalizationModule = __decorate([
        NgModule({
            imports: [CommonModule],
            providers: [SuiLocalizationService]
        })
    ], SuiLocalizationModule);
    return SuiLocalizationModule;
}());

var SuiSelectModule = /** @class */ (function () {
    function SuiSelectModule() {
    }
    SuiSelectModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SuiDropdownModule,
                SuiUtilityModule,
                SuiLocalizationModule
            ],
            declarations: [
                SuiSelect,
                SuiSelectOption,
                SuiSelectSearch,
                SuiSelectValueAccessor,
                SuiMultiSelect,
                SuiMultiSelectLabel,
                SuiMultiSelectValueAccessor
            ],
            exports: [
                SuiSelect,
                SuiSelectOption,
                SuiSelectSearch,
                SuiSelectValueAccessor,
                SuiMultiSelect,
                SuiMultiSelectValueAccessor
            ]
        })
    ], SuiSelectModule);
    return SuiSelectModule;
}());

var SuiTabHeader = /** @class */ (function () {
    function SuiTabHeader() {
        this._isActive = false;
        this.isActiveChange = new EventEmitter();
        this.isActiveExternalChange = new EventEmitter();
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
        this.isDisabled = false;
        this._headerClasses = true;
    }
    Object.defineProperty(SuiTabHeader.prototype, "isActive", {
        get: function () {
            return this._isActive;
        },
        set: function (active) {
            var _this = this;
            var isActive = active;
            // Only used by @Input(), runs whenever user input changes `isActive`.
            // Run in timeout because `isDisabled` can prohibit user from changing `isActive`.
            // so update is delayed to avoid 'changed after checked' error.
            setTimeout(function () {
                // Only allow change if tab header is not disabled.
                isActive = !_this.isDisabled ? active : false;
                _this.setActiveState(isActive);
                // Fire 'external change' event as user input has occured.
                _this.isActiveExternalChange.emit(isActive);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiTabHeader.prototype, "isDisabled", {
        get: function () {
            return this._isDisabled;
        },
        set: function (disabled) {
            // Only update if value provided is different to current one.
            if (this._isDisabled !== disabled) {
                this._isDisabled = disabled;
                // If now disabled, then tab header must be deactivated.
                if (this.isDisabled) {
                    this.isActive = false;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // Internally update active state.
    SuiTabHeader.prototype.setActiveState = function (active) {
        // If (cast) active value has changed:
        if (!!this._isActive !== active) {
            // Update to the new value.
            this._isActive = active;
            // Fire the appropriate activation event.
            if (active) {
                this.onActivate.emit();
            }
            else {
                this.onDeactivate.emit();
            }
        }
        // Regardless, emit a change to `isActive`, so [(isActive)] works correctly.
        this.isActiveChange.emit(active);
    };
    SuiTabHeader.prototype.onClick = function () {
        if (!this.isDisabled) {
            // Activate the tab when clicked, so long as it isn't disabled.
            this.isActive = true;
        }
    };
    __decorate([
        HostBinding("class.item")
    ], SuiTabHeader.prototype, "_headerClasses", void 0);
    __decorate([
        Input("suiTabHeader")
    ], SuiTabHeader.prototype, "id", void 0);
    __decorate([
        Output()
    ], SuiTabHeader.prototype, "isActiveChange", void 0);
    __decorate([
        Output("activate")
    ], SuiTabHeader.prototype, "onActivate", void 0);
    __decorate([
        Output("deactivate")
    ], SuiTabHeader.prototype, "onDeactivate", void 0);
    __decorate([
        HostBinding("class.active"),
        Input()
    ], SuiTabHeader.prototype, "isActive", null);
    __decorate([
        HostBinding("class.disabled"),
        Input()
    ], SuiTabHeader.prototype, "isDisabled", null);
    __decorate([
        HostListener("click")
    ], SuiTabHeader.prototype, "onClick", null);
    SuiTabHeader = __decorate([
        Directive({
            selector: "[suiTabHeader]"
        })
    ], SuiTabHeader);
    return SuiTabHeader;
}());

var SuiTabContent = /** @class */ (function () {
    function SuiTabContent() {
        this.isActive = false;
        this._contentClasses = true;
    }
    __decorate([
        HostBinding("class.tab")
    ], SuiTabContent.prototype, "_contentClasses", void 0);
    __decorate([
        Input("suiTabContent")
    ], SuiTabContent.prototype, "id", void 0);
    __decorate([
        HostBinding("class.active")
    ], SuiTabContent.prototype, "isActive", void 0);
    SuiTabContent = __decorate([
        Directive({
            selector: "[suiTabContent]"
        })
    ], SuiTabContent);
    return SuiTabContent;
}());

var Tab = /** @class */ (function () {
    function Tab(header, content) {
        var _this = this;
        this.id = header.id;
        this.header = header;
        this.content = content;
        // So that the header and content isActive properties are always in sync.
        this.header.isActiveChange
            .subscribe(function () { return _this.content.isActive = _this.isActive; });
    }
    Object.defineProperty(Tab.prototype, "isActive", {
        // Saves accessing .header.isActive every time.
        get: function () {
            return this.header.isActive;
        },
        set: function (active) {
            // Use `setActiveState` so as not to fire 'external changes' event.
            this.header.setActiveState(active);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "isDisabled", {
        // Saves accessing .header.isDisabled every time.
        get: function () {
            return this.header.isDisabled;
        },
        enumerable: true,
        configurable: true
    });
    return Tab;
}());

var SuiTabset = /** @class */ (function () {
    function SuiTabset() {
        this.tabs = [];
        this._barrierCount = 0;
    }
    Object.defineProperty(SuiTabset.prototype, "activeTab", {
        get: function () {
            return this._activeTab;
        },
        // When setting a tab as the currently active tab, it automatically gains
        // `isActive` status (saves littering `isActive = true` everywhere).
        set: function (tab) {
            this._activeTab = tab;
            tab.isActive = true;
        },
        enumerable: true,
        configurable: true
    });
    SuiTabset.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Fire `internalComponentsUpdated` when the query lists change.
        this._tabHeaders.changes.subscribe(function () { return _this.internalComponentsUpdated(); });
        this._tabContents.changes.subscribe(function () { return _this.internalComponentsUpdated(); });
        // Initially load the tabs.
        this.loadTabs();
    };
    // Fires whenever either the tab headers or tab contents query lists update.
    SuiTabset.prototype.internalComponentsUpdated = function () {
        // We are using a 'counting barrier of n = 2', i.e. the code within only runs after the method is called twice.
        // This is so that both the headers and contents query lists can update before we run code that matches the two up.
        this._barrierCount++;
        if (this._barrierCount === 2) {
            // Reset the barrier so it can be called again.
            this._barrierCount = 0;
            // Update the tabs.
            this.loadTabs();
        }
    };
    // Connects tab headers to tab contents, and creates a tab instance for each pairing.
    SuiTabset.prototype.loadTabs = function () {
        var _this = this;
        // Remove any tabs that no longer have an associated header.
        this.tabs = this.tabs.filter(function (t) { return !!_this._tabHeaders.find(function (tH) { return tH === t.header; }); });
        this._tabHeaders
            // Filter out the loaded headers with attached tab instances.
            .filter(function (tH) { return !_this.tabs.find(function (t) { return t.header === tH; }); })
            .forEach(function (tH) {
            var content = _this._tabContents.find(function (tC) { return tC.id === tH.id; });
            if (!content) {
                // Error if an associated tab content cannot be found for the given header.
                throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
            }
            // Create a new tab instance for this header & content combo.
            var tab = new Tab(tH, content);
            // Subscribe to any external changes in the tab header's active state. External changes are triggered by user input.
            tab.header.isActiveExternalChange.subscribe(function () { return _this.onHeaderActiveChanged(tab); });
            // Add the new instance to the list of tabs.
            _this.tabs.push(tab);
        });
        // Assign each tab an index (which denotes the order they physically appear in).
        this._tabHeaders
            .forEach(function (tH, i) {
            var tab = _this.tabs.find(function (t) { return t.header === tH; });
            if (tab) {
                tab.index = i;
            }
        });
        // Sort the tabs by their index.
        this.tabs.sort(function (a, b) { return a.index - b.index; });
        if (!this.activeTab) { // Check if there are no current existing active tabs.
            // If so, we must activate the first available tab.
            this.activateFirstTab();
        }
        else if (!this.tabs.find(function (t) { return t === _this.activeTab; })) { // O'wise check if current active tab has been deleted.
            // If so, we must find the closest.
            // Use `setTimeout` as this causes a 'changed after checked' error o'wise.
            setTimeout(function () { return _this.activateClosestTab(_this.activeTab); });
        }
        if (this.tabs.length === 0) {
            // Error if there aren't any tabs in the tabset.
            throw new Error("You cannot have no tabs!");
        }
    };
    // Fires whenever a tab header's active state is externally changed.
    SuiTabset.prototype.onHeaderActiveChanged = function (tab) {
        // If the tab has become activated, but was not previously the active tab:
        if (tab.isActive && this.activeTab !== tab) {
            // Deactivate all of the tabs.
            this.tabs.filter(function (t) { return t !== tab; }).forEach(function (t) { return t.isActive = false; });
            // Set the currently active tab to this one.
            this.activeTab = tab;
        }
        // If the tab has become deactivated, but was previously the active tab:
        if (!tab.isActive && this.activeTab === tab) {
            // Activate the closest tab to it.
            this.activateClosestTab(tab);
        }
    };
    // Activate the first tab in the set.
    SuiTabset.prototype.activateFirstTab = function () {
        this.activeTab = this.tabs[0];
    };
    // Activates the closest available tab to a given one.
    SuiTabset.prototype.activateClosestTab = function (tab) {
        var nextAvailable;
        // When the exited tab's index is higher than all available tabs,
        if (tab.index >= this.tabs.length) {
            // Activate the last tab.
            nextAvailable = this.tabs[this.tabs.length - 1];
        }
        // If that didn't work, try the following cases:
        if (!nextAvailable) {
            if (!this.tabs.find(function (t) { return t === tab; })) { // When the exited tab no longer exists,
                // Replace it with a tab at the same index.
                nextAvailable = this.tabs[tab.index];
            }
            else { // Or if the exited tab still exists,
                // Go to the tab immediately to the left.
                nextAvailable = this.tabs[Math.max(tab.index - 1, 0)];
            }
        }
        // However, if the chosen tab is disabled,
        if (nextAvailable.isDisabled) {
            // Activate the closest available tab to it.
            return this.activateClosestTab(nextAvailable);
        }
        this.activeTab = nextAvailable;
    };
    __decorate([
        ContentChildren(SuiTabHeader)
    ], SuiTabset.prototype, "_tabHeaders", void 0);
    __decorate([
        ContentChildren(SuiTabContent)
    ], SuiTabset.prototype, "_tabContents", void 0);
    SuiTabset = __decorate([
        Component({
            selector: "sui-tabset",
            template: "<ng-content></ng-content>"
        })
    ], SuiTabset);
    return SuiTabset;
}());

var SuiTabsModule = /** @class */ (function () {
    function SuiTabsModule() {
    }
    SuiTabsModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiTabset,
                SuiTabHeader,
                SuiTabContent
            ],
            exports: [
                SuiTabset,
                SuiTabHeader,
                SuiTabContent
            ]
        })
    ], SuiTabsModule);
    return SuiTabsModule;
}());

var SidebarTransition = {
    Overlay: "overlay",
    Push: "push",
    ScaleDown: "scale down",
    Uncover: "uncover",
    SlideAlong: "slide along",
    SlideOut: "slide out"
};
var SidebarDirection = {
    Left: "left",
    Right: "right",
    Top: "top",
    Bottom: "bottom"
};
var SidebarService = /** @class */ (function () {
    function SidebarService(isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        this.isVisible = isVisible;
        this.isAnimating = false;
        this.wasJustOpened = false;
        this.isVisibleChange = new EventEmitter();
        this.widthChange = new EventEmitter();
        this.heightChange = new EventEmitter();
        this.width = 260;
        this.height = 0;
        this.transition = SidebarTransition.Uncover;
    }
    Object.defineProperty(SidebarService.prototype, "width", {
        get: function () {
            if (this.direction === SidebarDirection.Left) {
                return this._width;
            }
            if (this.direction === SidebarDirection.Right) {
                return -this._width;
            }
            return 0;
        },
        set: function (width) {
            this._width = width;
            this.widthChange.emit();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarService.prototype, "height", {
        get: function () {
            if (this.direction === SidebarDirection.Top) {
                return this._height;
            }
            if (this.direction === SidebarDirection.Bottom) {
                return -this._height;
            }
            return 0;
        },
        set: function (height) {
            this._height = height;
            this.heightChange.emit();
        },
        enumerable: true,
        configurable: true
    });
    SidebarService.prototype.setVisibleState = function (isVisible) {
        var _this = this;
        if (this.isVisible !== isVisible) {
            this.isVisible = isVisible;
            this.isAnimating = true;
            this.wasJustOpened = true;
            this.isVisibleChange.emit(isVisible);
            setTimeout(function () { return _this.wasJustOpened = false; });
            clearTimeout(this._isAnimatingTimeout);
            this._isAnimatingTimeout = window.setTimeout(function () { return _this.isAnimating = false; }, 500);
        }
    };
    SidebarService.prototype.toggleVisibleState = function () {
        this.setVisibleState(!this.isVisible);
    };
    return SidebarService;
}());

var SuiSidebar = /** @class */ (function () {
    function SuiSidebar(_renderer, _element) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;
        setTimeout(function () { return _this.updateDimensions(); });
        this.service.isVisibleChange.subscribe(function () { return _this.updateDimensions(); });
        this.sidebarClasses = true;
    }
    Object.defineProperty(SuiSidebar.prototype, "transition", {
        get: function () {
            return this.service.transition;
        },
        set: function (transition) {
            var _this = this;
            this.service.transition
                .split(" ")
                .forEach(function (c) { return _this.setClass(c, false); });
            this.service.transition = transition;
            this.service.transition.split(" ").forEach(function (c) { return _this.setClass(c, true); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "direction", {
        get: function () {
            return this.service.direction;
        },
        set: function (direction) {
            this.setClass(this.service.direction, false);
            this.service.direction = direction;
            this.setClass(this.service.direction, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isVisible", {
        get: function () {
            return this.service.isVisible;
        },
        set: function (isVisible) {
            this.service.setVisibleState(isVisible);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isVisibleChange", {
        get: function () {
            return this.service.isVisibleChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebar.prototype, "isAnimating", {
        get: function () {
            return this.service.isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    SuiSidebar.prototype.updateDimensions = function () {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    };
    SuiSidebar.prototype.setClass = function (className, isAdd) {
        if (isAdd === void 0) { isAdd = true; }
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    };
    SuiSidebar.prototype.open = function () {
        this.service.setVisibleState(true);
    };
    SuiSidebar.prototype.close = function () {
        this.service.setVisibleState(false);
    };
    SuiSidebar.prototype.toggle = function () {
        this.service.toggleVisibleState();
    };
    SuiSidebar.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.sidebar"),
        HostBinding("class.menu")
    ], SuiSidebar.prototype, "sidebarClasses", void 0);
    __decorate([
        Input()
    ], SuiSidebar.prototype, "transition", null);
    __decorate([
        Input()
    ], SuiSidebar.prototype, "direction", null);
    __decorate([
        HostBinding("class.visible"),
        Input()
    ], SuiSidebar.prototype, "isVisible", null);
    __decorate([
        Output()
    ], SuiSidebar.prototype, "isVisibleChange", null);
    __decorate([
        HostBinding("class.animating")
    ], SuiSidebar.prototype, "isAnimating", null);
    SuiSidebar = __decorate([
        Component({
            selector: "sui-sidebar",
            template: "\n        <ng-content></ng-content>\n    "
        })
    ], SuiSidebar);
    return SuiSidebar;
}());

var SuiSidebarSibling = /** @class */ (function () {
    function SuiSidebarSibling(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.isDimmedWhenVisible = false;
        this.siblingClasses = true;
    }
    Object.defineProperty(SuiSidebarSibling.prototype, "service", {
        get: function () {
            return this._service;
        },
        set: function (service) {
            var _this = this;
            this._service = service;
            setTimeout(function () { return _this.updateTransform(); });
            this._service.isVisibleChange.subscribe(function () { return _this.updateTransform(); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isVisible", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSidebarSibling.prototype, "isDimmed", {
        get: function () {
            if (!this.service) {
                return false;
            }
            return this.service.isVisible && this.isDimmedWhenVisible;
        },
        enumerable: true,
        configurable: true
    });
    SuiSidebarSibling.prototype.updateTransform = function () {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");
        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {
            var translate = "translate3d(" + this.service.width + "px, " + this.service.height + "px, 0)";
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    };
    SuiSidebarSibling.prototype.onClick = function (event) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    };
    SuiSidebarSibling.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], SuiSidebarSibling.prototype, "isDimmedWhenVisible", void 0);
    __decorate([
        HostBinding("class.visible")
    ], SuiSidebarSibling.prototype, "isVisible", null);
    __decorate([
        HostBinding("class.dimmed")
    ], SuiSidebarSibling.prototype, "isDimmed", null);
    __decorate([
        HostBinding("class.pusher")
    ], SuiSidebarSibling.prototype, "siblingClasses", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiSidebarSibling.prototype, "onClick", null);
    SuiSidebarSibling = __decorate([
        Component({
            selector: "sui-sidebar-sibling",
            template: "\n        <ng-content></ng-content>\n    ",
            styles: ["\n            :host {\n                display: block;\n            }\n        "]
        })
    ], SuiSidebarSibling);
    return SuiSidebarSibling;
}());

var SuiSidebarContainer = /** @class */ (function () {
    function SuiSidebarContainer() {
        this.containerClasses = true;
    }
    SuiSidebarContainer.prototype.ngAfterContentInit = function () {
        if (!this.sidebar) {
            throw new Error("You must include a <sui-sidebar> element within the container.");
        }
        this.service = this.sidebar.service;
        if (!this.sibling) {
            throw new Error("You must include a <sui-sidebar-sibling> element within the container.");
        }
        this.sibling.service = this.service;
    };
    __decorate([
        HostBinding("class.pushable")
    ], SuiSidebarContainer.prototype, "containerClasses", void 0);
    __decorate([
        ContentChild(SuiSidebar, { static: true })
    ], SuiSidebarContainer.prototype, "sidebar", void 0);
    __decorate([
        ContentChild(SuiSidebarSibling, { static: true })
    ], SuiSidebarContainer.prototype, "sibling", void 0);
    SuiSidebarContainer = __decorate([
        Component({
            selector: "sui-sidebar-container",
            template: "\n        <ng-content></ng-content>\n    ",
            styles: ["\n            :host {\n                display: block;\n            }\n        "]
        })
    ], SuiSidebarContainer);
    return SuiSidebarContainer;
}());

var SuiSidebarModule = /** @class */ (function () {
    function SuiSidebarModule() {
    }
    SuiSidebarModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiSidebar,
                SuiSidebarContainer,
                SuiSidebarSibling
            ],
            exports: [
                SuiSidebar,
                SuiSidebarContainer,
                SuiSidebarSibling
            ]
        })
    ], SuiSidebarModule);
    return SuiSidebarModule;
}());

var SuiSearch = /** @class */ (function () {
    function SuiSearch(_element, _renderer, _localizationService) {
        var _this = this;
        this._element = _element;
        this._renderer = _renderer;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService();
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        this.searchClasses = true;
        this.hasIcon = true;
        this.retainSelectedResult = true;
        this.searchDelay = 200;
        this.maxResults = 7;
        this.onResultSelected = new EventEmitter();
        this.transition = "scale";
        this.transitionDuration = 200;
        this._documentClickListener = _renderer.listen("document", "click", function (e) { return _this.onDocumentClick(e); });
    }
    Object.defineProperty(SuiSearch.prototype, "isActive", {
        get: function () {
            return this.dropdownService.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "placeholder", {
        // Gets & sets the placeholder text displayed inside the text input.
        get: function () {
            return this._placeholder || this.localeValues.placeholder;
        },
        set: function (placeholder) {
            this._placeholder = placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "query", {
        get: function () {
            return this.searchService.query;
        },
        set: function (query) {
            var _this = this;
            this.selectedResult = undefined;
            // Initialise a delayed search.
            this.searchService.updateQueryDelayed(query, function () {
                // Set the results open state depending on whether a query has been entered.
                return _this.dropdownService.setOpenState(_this.searchService.query.length > 0);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "options", {
        set: function (options) {
            if (options) {
                this.searchService.options = options;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsFilter", {
        set: function (filter) {
            if (filter) {
                this.searchService.optionsFilter = filter;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsLookup", {
        set: function (lookupFn) {
            this.searchService.optionsLookup = lookupFn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "optionsField", {
        set: function (field) {
            this.searchService.optionsField = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "resultFormatter", {
        get: function () {
            var _this = this;
            if (this._resultFormatter) {
                return this._resultFormatter;
            }
            else if (this.searchService.optionsLookup) {
                return function (r) { return _this.readValue(r); };
            }
            else {
                return function (r, q) {
                    return _this.searchService.highlightMatches(_this.readValue(r), q);
                };
            }
        },
        set: function (formatter) {
            this._resultFormatter = formatter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "searchDelay", {
        set: function (delay) {
            this.searchService.searchDelay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "isSearching", {
        get: function () {
            return this.searchService.isSearching;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiSearch.prototype, "results", {
        get: function () {
            return this.searchService.results.slice(0, this.maxResults);
        },
        enumerable: true,
        configurable: true
    });
    SuiSearch.prototype.ngAfterViewInit = function () {
        this._menu.service = this.dropdownService;
    };
    SuiSearch.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().search;
    };
    // Selects a result.
    SuiSearch.prototype.select = function (result) {
        this.onResultSelected.emit(result);
        this.dropdownService.setOpenState(false);
        if (this.retainSelectedResult) {
            this.selectedResult = result;
            this.searchService.updateQuery(this.readValue(result));
        }
        else {
            this.searchService.updateQuery("");
        }
    };
    SuiSearch.prototype.onClick = function (e) {
        this.open();
    };
    SuiSearch.prototype.onFocusIn = function () {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    };
    SuiSearch.prototype.open = function () {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    };
    SuiSearch.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
        }
    };
    SuiSearch.prototype.onDocumentClick = function (e) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    };
    // Reads the specified field from an item.
    SuiSearch.prototype.readValue = function (object) {
        return Util.Object.readValue(object, this.searchService.optionsField);
    };
    SuiSearch.prototype.ngOnDestroy = function () {
        this._documentClickListener();
    };
    SuiSearch.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        ViewChild(SuiDropdownMenu, { static: true })
    ], SuiSearch.prototype, "_menu", void 0);
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.search")
    ], SuiSearch.prototype, "searchClasses", void 0);
    __decorate([
        HostBinding("class.active")
    ], SuiSearch.prototype, "isActive", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "hasIcon", void 0);
    __decorate([
        Input()
    ], SuiSearch.prototype, "placeholder", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "options", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "optionsFilter", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "optionsLookup", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "optionsField", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "resultFormatter", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "resultTemplate", void 0);
    __decorate([
        Input()
    ], SuiSearch.prototype, "retainSelectedResult", void 0);
    __decorate([
        Input()
    ], SuiSearch.prototype, "searchDelay", null);
    __decorate([
        HostBinding("class.loading")
    ], SuiSearch.prototype, "isSearching", null);
    __decorate([
        Input()
    ], SuiSearch.prototype, "maxResults", void 0);
    __decorate([
        Output("resultSelected")
    ], SuiSearch.prototype, "onResultSelected", void 0);
    __decorate([
        Input()
    ], SuiSearch.prototype, "transition", void 0);
    __decorate([
        Input()
    ], SuiSearch.prototype, "transitionDuration", void 0);
    __decorate([
        HostListener("focusin")
    ], SuiSearch.prototype, "onFocusIn", null);
    __decorate([
        HostListener("focusout", ["$event"])
    ], SuiSearch.prototype, "onFocusOut", null);
    SuiSearch = __decorate([
        Component({
            selector: "sui-search",
            template: "\n        <div class=\"ui input\" [class.icon]=\"hasIcon\" (click)=\"onClick($event)\">\n            <input\n                class=\"prompt\"\n                type=\"text\"\n                [attr.placeholder]=\"placeholder\"\n                autocomplete=\"off\"\n                [(ngModel)]=\"query\"\n            />\n            <i *ngIf=\"hasIcon\" class=\"search icon\"></i>\n        </div>\n        <div\n            class=\"results\"\n            suiDropdownMenu\n            [menuTransition]=\"transition\"\n            [menuTransitionDuration]=\"transitionDuration\"\n            menuSelectedItemClass=\"active\"\n        >\n            <sui-search-result\n                *ngFor=\"let r of results\"\n                class=\"item\"\n                [value]=\"r\"\n                [query]=\"query\"\n                [formatter]=\"resultFormatter\"\n                [template]=\"resultTemplate\"\n                (click)=\"select(r)\"\n            ></sui-search-result>\n\n            <div *ngIf=\"results.length == 0\" class=\"message empty\">\n                <div class=\"header\">{{ localeValues.noResults.header }}</div>\n                <div class=\"description\">\n                    {{ localeValues.noResults.message }}\n                </div>\n            </div>\n        </div>\n    ",
            styles: ["\n            /* Ensures results div has margin. */\n            :host {\n                display: inline-block;\n            }\n\n            /* Fixes positioning when results are pushed above the search. */\n            .results {\n                margin-bottom: 0.5em;\n            }\n        "]
        })
    ], SuiSearch);
    return SuiSearch;
}());

// See https://github.com/Microsoft/TypeScript/issues/13449.
var templateRef$1 = TemplateRef;
var SuiSearchResult = /** @class */ (function () {
    function SuiSearchResult(componentFactory) {
        this.componentFactory = componentFactory;
        this.optionClasses = true;
        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = function (value) { return ""; };
    }
    Object.defineProperty(SuiSearchResult.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (template) {
            this._template = template;
            if (this.template) {
                this.componentFactory.createView(this.templateSibling, this.template, {
                    $implicit: this.value,
                    query: this.query
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiSearchResult.ctorParameters = function () { return [
        { type: SuiComponentFactory }
    ]; };
    __decorate([
        HostBinding("class.result")
    ], SuiSearchResult.prototype, "optionClasses", void 0);
    __decorate([
        Input()
    ], SuiSearchResult.prototype, "value", void 0);
    __decorate([
        Input()
    ], SuiSearchResult.prototype, "query", void 0);
    __decorate([
        Input()
    ], SuiSearchResult.prototype, "formatter", void 0);
    __decorate([
        Input()
    ], SuiSearchResult.prototype, "template", null);
    __decorate([
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    ], SuiSearchResult.prototype, "templateSibling", void 0);
    SuiSearchResult = __decorate([
        Component({
            selector: "sui-search-result",
            template: "\n        <span #templateSibling></span>\n        <span *ngIf=\"!template\" [innerHTML]=\"formatter(value, query)\"></span>\n    "
        })
    ], SuiSearchResult);
    return SuiSearchResult;
}());

var SuiSearchModule = /** @class */ (function () {
    function SuiSearchModule() {
    }
    SuiSearchModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SuiDropdownModule,
                SuiLocalizationModule,
                SuiUtilityModule
            ],
            declarations: [SuiSearch, SuiSearchResult],
            exports: [SuiSearch]
        })
    ], SuiSearchModule);
    return SuiSearchModule;
}());

var SuiRating = /** @class */ (function () {
    function SuiRating() {
        this.hoveredIndex = -1;
        this.value = 0;
        this.valueChange = new EventEmitter();
        this.maximum = 5;
        this.isReadonly = false;
        this.ratingClasses = true;
    }
    Object.defineProperty(SuiRating.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            this._maximum = +value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiRating.prototype, "icons", {
        get: function () {
            // tslint:disable-next-line:prefer-literal
            return new Array(this.maximum);
        },
        enumerable: true,
        configurable: true
    });
    SuiRating.prototype.onClick = function (i) {
        if (!this.isReadonly) {
            this.value = i + 1;
            this.valueChange.emit(this.value);
        }
    };
    SuiRating.prototype.onMouseover = function (i) {
        this.hoveredIndex = i;
    };
    SuiRating.prototype.onMouseout = function () {
        this.hoveredIndex = -1;
    };
    SuiRating.prototype.writeValue = function (value) {
        this.value = value;
    };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.rating")
    ], SuiRating.prototype, "ratingClasses", void 0);
    __decorate([
        Output()
    ], SuiRating.prototype, "valueChange", void 0);
    __decorate([
        Input()
    ], SuiRating.prototype, "maximum", null);
    __decorate([
        HostBinding("class.read-only"),
        Input()
    ], SuiRating.prototype, "isReadonly", void 0);
    __decorate([
        HostListener("mouseout")
    ], SuiRating.prototype, "onMouseout", null);
    SuiRating = __decorate([
        Component({
            selector: "sui-rating",
            template: "\n        <i\n            class=\"icon\"\n            *ngFor=\"let icon of icons; let i = index\"\n            (mouseover)=\"onMouseover(i)\"\n            (click)=\"onClick(i)\"\n            [class.selected]=\"hoveredIndex >= i && !isReadonly\"\n            [class.active]=\"value > i\"\n        >\n        </i>\n    ",
            styles: ["\n            :host.read-only .icon {\n                cursor: auto;\n            }\n        "]
        })
    ], SuiRating);
    return SuiRating;
}());
var SuiRatingValueAccessor = /** @class */ (function (_super) {
    __extends(SuiRatingValueAccessor, _super);
    function SuiRatingValueAccessor(host) {
        return _super.call(this, host) || this;
    }
    SuiRatingValueAccessor_1 = SuiRatingValueAccessor;
    var SuiRatingValueAccessor_1;
    SuiRatingValueAccessor.ctorParameters = function () { return [
        { type: SuiRating }
    ]; };
    SuiRatingValueAccessor = SuiRatingValueAccessor_1 = __decorate([
        Directive({
            selector: "sui-rating",
            host: { "(valueChange)": "onChange($event)" },
            providers: [customValueAccessorFactory(SuiRatingValueAccessor_1)]
        })
    ], SuiRatingValueAccessor);
    return SuiRatingValueAccessor;
}(CustomValueAccessor));

var SuiRatingModule = /** @class */ (function () {
    function SuiRatingModule() {
    }
    SuiRatingModule = __decorate([
        NgModule({
            imports: [
                FormsModule,
                CommonModule
            ],
            declarations: [
                SuiRating,
                SuiRatingValueAccessor
            ],
            exports: [
                SuiRating,
                SuiRatingValueAccessor
            ]
        })
    ], SuiRatingModule);
    return SuiRatingModule;
}());

var SuiProgress = /** @class */ (function () {
    function SuiProgress() {
        this.popupClasses = true;
        this.value = 0;
        this.maximum = 100;
        this.precision = 0;
        this._overrideSuccess = false;
        this.autoSuccess = true;
        this.showProgress = true;
        this.popupClasses = true;
    }
    Object.defineProperty(SuiProgress.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._value = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "maximum", {
        get: function () {
            return this._maximum;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._maximum = converted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "precision", {
        get: function () {
            return this._precision;
        },
        set: function (value) {
            // Convert value from string to number where necessary.
            var converted = +value;
            if (Number.isNaN(converted)) {
                return;
            }
            this._precision = Math.min(Math.max(converted, 0), 20);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "reachedMaximum", {
        get: function () {
            return (this._overrideSuccess ||
                (this.value >= this.maximum && this.autoSuccess));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "percentage", {
        get: function () {
            var boundedValue = Math.min(Math.max(this.value, 0), this.maximum);
            var percentage = (boundedValue / this.maximum) * 100;
            return percentage.toFixed(this.precision);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiProgress.prototype, "classValue", {
        set: function (classes) {
            if (classes.includes("attached") || classes.includes("tiny")) {
                this.showProgress = false;
            }
            if (classes.includes("success")) {
                this._overrideSuccess = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.progress")
    ], SuiProgress.prototype, "popupClasses", void 0);
    __decorate([
        Input()
    ], SuiProgress.prototype, "autoSuccess", void 0);
    __decorate([
        Input()
    ], SuiProgress.prototype, "showProgress", void 0);
    __decorate([
        Input()
    ], SuiProgress.prototype, "value", null);
    __decorate([
        Input()
    ], SuiProgress.prototype, "maximum", null);
    __decorate([
        Input()
    ], SuiProgress.prototype, "precision", null);
    __decorate([
        HostBinding("class.success")
    ], SuiProgress.prototype, "reachedMaximum", null);
    __decorate([
        HostBinding("attr.data-percent")
    ], SuiProgress.prototype, "percentage", null);
    __decorate([
        Input("class")
    ], SuiProgress.prototype, "classValue", null);
    SuiProgress = __decorate([
        Component({
            selector: "sui-progress",
            template: "\n        <div class=\"bar\" [style.width.%]=\"percentage\">\n            <div class=\"progress\" *ngIf=\"showProgress\">{{ percentage }}%</div>\n        </div>\n        <div class=\"label\">\n            <ng-content></ng-content>\n        </div>\n    ",
            styles: ["\n            .bar {\n                transition-duration: 300ms !important;\n                z-index: 1;\n            }\n        "]
        })
    ], SuiProgress);
    return SuiProgress;
}());

var SuiProgressModule = /** @class */ (function () {
    function SuiProgressModule() {
    }
    SuiProgressModule = __decorate([
        NgModule({
            imports: [
                CommonModule
            ],
            declarations: [
                SuiProgress
            ],
            exports: [
                SuiProgress
            ]
        })
    ], SuiProgressModule);
    return SuiProgressModule;
}());

var PositioningPlacement = {
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
    var _a = __read(placement.split(" "), 2), direction = _a[0], alignment = _a[1];
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
    var _a = __read(popper.split("-"), 2), direction = _a[0], alignment = _a[1];
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

var PopupTrigger = {
    Hover: "hover",
    Click: "click",
    OutsideClick: "outsideClick",
    Focus: "focus",
    Manual: "manual"
};
var PopupConfig = /** @class */ (function () {
    function PopupConfig(defaults) {
        if (defaults === void 0) { defaults = {}; }
        this.placement = PositioningPlacement.TopLeft;
        this.trigger = PopupTrigger.Hover;
        this.isInverted = false;
        this.delay = 0;
        this.isBasic = false;
        this.transition = "scale";
        this.transitionDuration = 200;
        Object.assign(this, defaults);
    }
    return PopupConfig;
}());

var SuiPopupConfig = /** @class */ (function (_super) {
    __extends(SuiPopupConfig, _super);
    function SuiPopupConfig() {
        // We use an empty constructor to ensure Angular DI works correctly.
        return _super.call(this) || this;
    }
    SuiPopupConfig.ngInjectableDef = ɵɵdefineInjectable({ factory: function SuiPopupConfig_Factory() { return new SuiPopupConfig(); }, token: SuiPopupConfig, providedIn: "root" });
    SuiPopupConfig = __decorate([
        Injectable({
            providedIn: "root"
        })
    ], SuiPopupConfig);
    return SuiPopupConfig;
}(PopupConfig));

var SuiPopup = /** @class */ (function () {
    function SuiPopup(elementRef) {
        this.elementRef = elementRef;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.tabindex = 0;
    }
    Object.defineProperty(SuiPopup.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopup.prototype, "anchor", {
        set: function (anchor) {
            // Whenever the anchor is set (which is when the popup is created), recreate the positioning service with the appropriate options.
            this.positioningService = new PositioningService(anchor, this.container.element, this.config.placement, ".dynamic.arrow");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopup.prototype, "direction", {
        // Returns the direction (`top`, `left`, `right`, `bottom`) of the current placement.
        get: function () {
            if (this.positioningService) {
                return this.positioningService.actualPlacement.split(" ").shift();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopup.prototype, "alignment", {
        // Returns the alignment (`top`, `left`, `right`, `bottom`) of the current placement.
        get: function () {
            if (this.positioningService) {
                return this.positioningService.actualPlacement.split(" ").pop();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopup.prototype, "dynamicClasses", {
        get: function () {
            var classes = {};
            if (this.direction) {
                classes[this.direction] = true;
            }
            if (this.alignment) {
                classes[this.alignment] = true;
            }
            if (this.config.isInverted) {
                classes.inverted = true;
            }
            if (this.config.isBasic) {
                classes.basic = true;
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    SuiPopup.prototype.open = function () {
        var _this = this;
        // Only attempt to open if currently closed.
        if (!this.isOpen) {
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Cancel all other transitions, and initiate the opening transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In, function () {
                // Focus any element with [autofocus] attribute.
                var autoFocus = _this.elementRef.nativeElement.querySelector("[autofocus]");
                if (autoFocus) {
                    // Autofocus after the browser has had time to process other event handlers.
                    setTimeout(function () { return autoFocus.focus(); }, 10);
                    // Try to focus again when the modal has opened so that autofocus works in IE11.
                    setTimeout(function () { return autoFocus.focus(); }, _this.config.transitionDuration);
                }
            }));
            // Refresh the popup position after a brief delay to allow for browser processing time.
            this.positioningService.placement = this.config.placement;
            setTimeout(function () { return _this.positioningService.update(); });
            // Finally, set the popup to be open.
            this._isOpen = true;
            this.onOpen.emit();
        }
    };
    SuiPopup.prototype.toggle = function () {
        if (!this.isOpen) {
            return this.open();
        }
        return this.close();
    };
    SuiPopup.prototype.close = function () {
        var _this = this;
        // Only attempt to close if currently open.
        if (this.isOpen) {
            // Cancel all other transitions, and initiate the closing transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.Out));
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Start the closing timer, that fires the `onClose` event after the transition duration number of milliseconds.
            this.closingTimeout = window.setTimeout(function () { return _this.onClose.emit(); }, this.config.transitionDuration);
            // Finally, set the popup to be closed.
            this._isOpen = false;
        }
    };
    SuiPopup.prototype.onClick = function (event) {
        // Makes sense here, as the popup shouldn't be attached to any DOM element.
        event.stopPropagation();
    };
    SuiPopup.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        ViewChild("container", { read: ViewContainerRef, static: true })
    ], SuiPopup.prototype, "container", void 0);
    __decorate([
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    ], SuiPopup.prototype, "templateSibling", void 0);
    __decorate([
        HostBinding("attr.tabindex")
    ], SuiPopup.prototype, "tabindex", void 0);
    __decorate([
        HostListener("click", ["$event"])
    ], SuiPopup.prototype, "onClick", null);
    SuiPopup = __decorate([
        Component({
            selector: "sui-popup",
            template: "\n        <div\n            class=\"ui popup\"\n            [ngClass]=\"dynamicClasses\"\n            [suiTransition]=\"transitionController\"\n            [attr.direction]=\"direction\"\n            #container\n        >\n            <ng-container\n                *ngIf=\"!config.template && (!!config.header || !!config.text)\"\n            >\n                <div class=\"header\" *ngIf=\"config.header\">\n                    {{ config.header }}\n                </div>\n                <div class=\"content\">{{ config.text }}</div>\n            </ng-container>\n            <div #templateSibling></div>\n\n            <sui-popup-arrow\n                *ngIf=\"!config.isBasic\"\n                [placement]=\"positioningService.actualPlacement\"\n                [inverted]=\"config.isInverted\"\n            ></sui-popup-arrow>\n        </div>\n    ",
            styles: ["\n            .ui.popup {\n                /* Autofit popup to the contents. */\n                right: auto;\n            }\n\n            .ui.animating.popup {\n                /* When the popup is animating, it may not initially be in the correct position.\n       This fires a mouse event, causing the anchor's mouseleave to fire - making the popup flicker.\n       Setting pointer-events to none while animating fixes this bug. */\n                pointer-events: none;\n            }\n\n            .ui.popup::before {\n                /* Hide the Semantic UI CSS arrow. */\n                display: none;\n            }\n\n            /* Offset popup by 0.75em above and below when placed 'vertically'. */\n            .ui.popup[direction=\"top\"],\n            .ui.popup[direction=\"bottom\"] {\n                margin-top: 0.75em;\n                margin-bottom: 0.75em;\n            }\n\n            /* Offset popup by 0.75em either side when placed 'horizontally'. */\n            .ui.popup[direction=\"left\"],\n            .ui.popup[direction=\"right\"] {\n                margin-left: 0.75em;\n                margin-right: 0.75em;\n            }\n        "]
        })
    ], SuiPopup);
    return SuiPopup;
}());

var SuiPopupController = /** @class */ (function () {
    function SuiPopupController(_renderer, _element, _componentFactory, _config) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        this._config = _config;
        // Generate a new SuiPopup component and attach it to the application view.
        this._componentRef = this._componentFactory.createComponent(SuiPopup);
        // Configure popup with provided config.
        this.popup.config = _config;
        // When the popup is closed (onClose fires on animation complete),
        this.popup.onClose.subscribe(function () { return _this.cleanup(); });
        this._documentListener = _renderer.listen("document", "click", function (e) { return _this.onDocumentClick(e); });
    }
    Object.defineProperty(SuiPopupController.prototype, "popup", {
        // Returns generated popup instance.
        get: function () {
            // Use non-null assertion as we only access this when a popup exists.
            return this._componentRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    SuiPopupController.prototype.configure = function (config) {
        if (config) {
            Object.assign(this.popup.config, config);
        }
    };
    SuiPopupController.prototype.openDelayed = function () {
        var _this = this;
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);
        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(function () { return _this.open(); }, this.popup.config.delay);
    };
    SuiPopupController.prototype.open = function () {
        // Attach the generated component to the current application.
        this._componentFactory.attachToApplication(this._componentRef);
        // Move the generated element to the body to avoid any positioning issues.
        this._componentFactory.moveToDocumentBody(this._componentRef);
        // Attach a reference to the anchor element. We do it here because IE11 loves to complain.
        this.popup.anchor = this._element;
        // Start popup open transition.
        this.popup.open();
        // Call lifecyle hook
        var lifecycle = this.popupOnOpen;
        if (lifecycle) {
            lifecycle.call(this);
        }
    };
    SuiPopupController.prototype.close = function () {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);
        if (this._componentRef) {
            // Start popup close transition.
            this.popup.close();
        }
        // Call lifecyle hook
        var lifecycle = this.popupOnClose;
        if (lifecycle) {
            lifecycle.call(this);
        }
    };
    SuiPopupController.prototype.toggleDelayed = function () {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.openDelayed();
        }
        // O'wise, close it.
        return this.close();
    };
    SuiPopupController.prototype.toggle = function () {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.open();
        }
        // O'wise, close it.
        return this.close();
    };
    SuiPopupController.prototype.onMouseEnter = function () {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.openDelayed();
        }
    };
    SuiPopupController.prototype.onMouseLeave = function () {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.close();
        }
    };
    SuiPopupController.prototype.onClick = function () {
        if (this.popup.config.trigger === PopupTrigger.Click ||
            this.popup.config.trigger === PopupTrigger.OutsideClick) {
            // Repeated clicks require a toggle, rather than just opening the popup each time.
            this.toggleDelayed();
        }
        else if (this.popup.config.trigger === PopupTrigger.Focus &&
            (!this._componentRef || (this._componentRef && !this.popup.isOpen))) {
            // Repeated clicks with a focus trigger requires an open (as focus isn't ever lost on repeated click).
            this.openDelayed();
        }
    };
    SuiPopupController.prototype.onDocumentClick = function (e) {
        // If the popup trigger is outside click,
        if (this._componentRef &&
            this.popup.config.trigger === PopupTrigger.OutsideClick) {
            var target = e.target;
            // Close the popup if the click is outside of the popup element.
            if (!this._element.nativeElement.contains(target)) {
                this.close();
            }
        }
    };
    SuiPopupController.prototype.onFocusIn = function () {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.openDelayed();
        }
    };
    SuiPopupController.prototype.onFocusOut = function (e) {
        if (!this._element.nativeElement.contains(e.relatedTarget) &&
            !this.popup.elementRef.nativeElement.contains(e.relatedTarget) &&
            this.popup.config.trigger === PopupTrigger.Focus) {
            this.close();
        }
    };
    SuiPopupController.prototype.cleanup = function () {
        clearTimeout(this._openingTimeout);
        if (this._componentRef.instance &&
            this._componentRef.instance.positioningService) {
            this._componentRef.instance.positioningService.destroy();
        }
        this._componentFactory.detachFromApplication(this._componentRef);
    };
    SuiPopupController.prototype.ngOnDestroy = function () {
        this.cleanup();
        this._documentListener();
    };
    __decorate([
        HostListener("mouseenter")
    ], SuiPopupController.prototype, "onMouseEnter", null);
    __decorate([
        HostListener("mouseleave")
    ], SuiPopupController.prototype, "onMouseLeave", null);
    __decorate([
        HostListener("click")
    ], SuiPopupController.prototype, "onClick", null);
    __decorate([
        HostListener("focusin")
    ], SuiPopupController.prototype, "onFocusIn", null);
    __decorate([
        HostListener("focusout", ["$event"])
    ], SuiPopupController.prototype, "onFocusOut", null);
    return SuiPopupController;
}());

var templateRef$2 = TemplateRef;
var TemplatePopupConfig = /** @class */ (function (_super) {
    __extends(TemplatePopupConfig, _super);
    function TemplatePopupConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TemplatePopupConfig;
}(PopupConfig));
var SuiPopupTemplateController = /** @class */ (function (_super) {
    __extends(SuiPopupTemplateController, _super);
    function SuiPopupTemplateController(_renderer, element, _componentFactory, _config) {
        var _this = _super.call(this, _renderer, element, _componentFactory, _config) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._config = _config;
        return _this;
    }
    SuiPopupTemplateController.prototype.configure = function (config) {
        _super.prototype.configure.call(this, config);
        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    };
    SuiPopupTemplateController.prototype.open = function () {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();
            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }
        _super.prototype.open.call(this);
    };
    return SuiPopupTemplateController;
}(SuiPopupController));

var templateRef$3 = TemplateRef;
var SuiPopupDirective = /** @class */ (function (_super) {
    __extends(SuiPopupDirective, _super);
    function SuiPopupDirective(_renderer, element, _componentFactory, _popupDefaults) {
        var _this = _super.call(this, _renderer, element, _componentFactory, new PopupConfig(_popupDefaults)) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._popupDefaults = _popupDefaults;
        return _this;
    }
    Object.defineProperty(SuiPopupDirective.prototype, "popupHeader", {
        set: function (header) {
            this.popup.config.header = header;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupText", {
        set: function (text) {
            this.popup.config.text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupInverted", {
        set: function (inverted) {
            this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(inverted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupBasic", {
        set: function (basic) {
            this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(basic);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTransition", {
        set: function (transition) {
            this.popup.config.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTransitionDuration", {
        set: function (duration) {
            this.popup.config.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupPlacement", {
        set: function (placement) {
            this.popup.config.placement = placement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupDelay", {
        set: function (delay) {
            this.popup.config.delay = delay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTrigger", {
        get: function () {
            return this.popup.config.trigger;
        },
        set: function (trigger) {
            this.popup.config.trigger = trigger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTemplate", {
        set: function (template) {
            this.template = template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupTemplateContext", {
        set: function (context) {
            this.context = context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupDirective.prototype, "popupConfig", {
        set: function (config) {
            this.configure(config);
        },
        enumerable: true,
        configurable: true
    });
    SuiPopupDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory },
        { type: SuiPopupConfig }
    ]; };
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupHeader", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupText", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupInverted", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupBasic", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTransition", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTransitionDuration", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupPlacement", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupDelay", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTrigger", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTemplate", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupTemplateContext", null);
    __decorate([
        Input()
    ], SuiPopupDirective.prototype, "popupConfig", null);
    SuiPopupDirective = __decorate([
        Directive({
            selector: "[suiPopup]",
            exportAs: "suiPopup"
        })
    ], SuiPopupDirective);
    return SuiPopupDirective;
}(SuiPopupTemplateController));

var SuiPopupArrow = /** @class */ (function () {
    function SuiPopupArrow() {
    }
    Object.defineProperty(SuiPopupArrow.prototype, "direction", {
        get: function () {
            if (this.placement) {
                return this.placement.split(" ").shift();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiPopupArrow.prototype, "alignment", {
        get: function () {
            if (this.placement) {
                var alignment = this.placement.split(" ").pop();
                if (alignment === this.direction) {
                    return "center";
                }
                return alignment;
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], SuiPopupArrow.prototype, "placement", void 0);
    __decorate([
        HostBinding("class.inverted"),
        Input()
    ], SuiPopupArrow.prototype, "inverted", void 0);
    SuiPopupArrow = __decorate([
        Component({
            selector: "sui-popup-arrow",
            template: "\n        <div\n            class=\"dynamic arrow\"\n            [attr.direction]=\"direction\"\n            *ngIf=\"alignment == 'center'\"\n        ></div>\n        <div\n            class=\"static arrow\"\n            [attr.direction]=\"direction\"\n            [attr.alignment]=\"alignment\"\n            *ngIf=\"alignment != 'center'\"\n        ></div>\n    ",
            styles: ["\n            .arrow {\n                position: absolute;\n                width: 0.71428571em;\n                height: 0.71428571em;\n                background: #ffffff;\n                -webkit-transform: rotate(45deg);\n                -ms-transform: rotate(45deg);\n                transform: rotate(45deg);\n                z-index: 2;\n            }\n\n            :host.inverted .arrow {\n                background: #1b1c1d;\n            }\n\n            .arrow[direction=\"top\"] {\n                bottom: -0.30714286em;\n                box-shadow: 1px 1px 0 0 #bababc;\n            }\n\n            .arrow[direction=\"left\"] {\n                right: -0.30714286em;\n                box-shadow: 1px -1px 1px 0 #bababc;\n            }\n\n            .arrow[direction=\"bottom\"] {\n                top: -0.30714286em;\n                box-shadow: -1px -1px 0 0 #bababc;\n            }\n\n            .arrow[direction=\"right\"] {\n                left: -0.30714286em;\n                box-shadow: -1px 1px 1px 0 #bababc;\n            }\n\n            .static.arrow[direction=\"bottom\"][alignment=\"left\"],\n            .static.arrow[direction=\"top\"][alignment=\"left\"] {\n                left: 1em;\n                right: auto;\n            }\n\n            .static.arrow[direction=\"left\"][alignment=\"top\"],\n            .static.arrow[direction=\"right\"][alignment=\"top\"] {\n                top: 1em;\n                bottom: auto;\n            }\n\n            .static.arrow[direction=\"bottom\"][alignment=\"right\"],\n            .static.arrow[direction=\"top\"][alignment=\"right\"] {\n                left: auto;\n                right: 1em;\n            }\n\n            .static.arrow[direction=\"left\"][alignment=\"bottom\"],\n            .static.arrow[direction=\"right\"][alignment=\"bottom\"] {\n                top: auto;\n                bottom: 1em;\n            }\n        "]
        })
    ], SuiPopupArrow);
    return SuiPopupArrow;
}());

var SuiPopupModule = /** @class */ (function () {
    function SuiPopupModule() {
    }
    SuiPopupModule = __decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule, SuiUtilityModule],
            declarations: [SuiPopupDirective, SuiPopupArrow, SuiPopup],
            exports: [SuiPopupDirective, SuiPopup],
            providers: [SuiPopupConfig],
            entryComponents: [SuiPopup]
        })
    ], SuiPopupModule);
    return SuiPopupModule;
}());

var ModalSize = {
    Mini: "mini",
    Tiny: "tiny",
    Small: "small",
    Normal: "normal",
    Large: "large"
};
// Stores a basic set of configuration options for a modal.
var ModalConfig = /** @class */ (function () {
    function ModalConfig(context, isClosable) {
        if (context === void 0) { context = undefined; }
        if (isClosable === void 0) { isClosable = true; }
        // Initialise with default values.
        this.isClosable = isClosable;
        this.context = context;
        this.size = ModalSize.Normal;
        this.isFullScreen = false;
        this.isBasic = false;
        this.isInverted = false;
        this.mustScroll = false;
        this.transition = "scale";
        this.transitionDuration = 500;
    }
    return ModalConfig;
}());
// Used when creating a modal from a `TemplateRef`.
var TemplateModalConfig = /** @class */ (function (_super) {
    __extends(TemplateModalConfig, _super);
    function TemplateModalConfig(template, context, isClosable) {
        if (context === void 0) { context = undefined; }
        if (isClosable === void 0) { isClosable = true; }
        var _this = _super.call(this, context, isClosable) || this;
        _this.template = template;
        return _this;
    }
    return TemplateModalConfig;
}(ModalConfig));
// Used when creating a modal from an existing component.
var ComponentModalConfig = /** @class */ (function (_super) {
    __extends(ComponentModalConfig, _super);
    function ComponentModalConfig(component, context, isClosable) {
        if (context === void 0) { context = undefined; }
        if (isClosable === void 0) { isClosable = true; }
        var _this = _super.call(this, context, isClosable) || this;
        _this.component = component;
        return _this;
    }
    return ComponentModalConfig;
}(ModalConfig));

// Used to pass ability to control a modal to a component.
var ModalControls = /** @class */ (function () {
    function ModalControls(approve, deny) {
        this.approve = approve;
        this.deny = deny;
    }
    // Use method here rather than arrow variables to make intellisense show they're methods.
    ModalControls.prototype.approve = function (result) { };
    ModalControls.prototype.deny = function (result) { };
    return ModalControls;
}());
// Injected into custom modal components, to allow control of the modal, and access to a context object.
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal(controls, context) {
        var _this = 
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        _super.call(this, controls.approve, controls.deny) || this;
        _this.context = context;
        return _this;
    }
    return Modal;
}(ModalControls));

var SuiModal = /** @class */ (function () {
    function SuiModal(_renderer, _element, _componentFactory) {
        var _this = this;
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        var config = new ModalConfig();
        this.loadConfig(config);
        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter();
        this.onDeny = new EventEmitter();
        this.onDismiss = new EventEmitter();
        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls(function (res) { return _this.dismiss(function () { return _this.onApprove.emit(res); }); }, function (res) { return _this.dismiss(function () { return _this.onDeny.emit(res); }); });
        // Internal variable initialisation.
        this.dimBackground = false;
        this._isClosing = false;
        this.transitionController = new TransitionController(false);
    }
    Object.defineProperty(SuiModal.prototype, "approve", {
        get: function () {
            return this.controls.approve;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "deny", {
        get: function () {
            return this.controls.deny;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isFullScreen", {
        // Value to deny with when closing via `isClosable`.
        get: function () {
            return this._isFullScreen;
        },
        set: function (fullScreen) {
            this._isFullScreen = Util.DOM.parseBooleanAttribute(fullScreen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "mustScroll", {
        get: function () {
            return this._mustScroll;
        },
        set: function (mustScroll) {
            this._mustScroll = mustScroll;
            // 'Cache' value in _mustAlwaysScroll so that if `true`, _mustScroll isn't ever auto-updated.
            this._mustAlwaysScroll = mustScroll;
            this.updateScroll();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "isInverted", {
        get: function () {
            return this._isInverted;
        },
        set: function (inverted) {
            this._isInverted = Util.DOM.parseBooleanAttribute(inverted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiModal.prototype, "dynamicClasses", {
        get: function () {
            var classes = {};
            if (this.size) {
                classes[this.size] = true;
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    SuiModal.prototype.ngOnInit = function () {
        var _this = this;
        // Transition the modal to be visible.
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(function () { return (_this.dimBackground = true); });
    };
    SuiModal.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Move the modal to the document body to ensure correct scrolling.
        this._originalContainer = this._element.nativeElement.parentNode;
        document
            .querySelector("body")
            .appendChild(this._element.nativeElement);
        // Remove the #templateSibling element from the DOM to fix bottom border styles.
        var templateElement = this.templateSibling.element
            .nativeElement;
        if (templateElement.parentNode) {
            templateElement.parentNode.removeChild(templateElement);
        }
        // Update margin offset to center modal correctly on-screen.
        var element = this.modalElement.nativeElement;
        setTimeout(function () {
            _this._renderer.setStyle(element, "margin-top", "-" + element.clientHeight / 2 + "px");
            _this.updateScroll();
        });
        // Focus any element with [autofocus] attribute.
        var autoFocus = element.querySelector("[autofocus]");
        if (autoFocus) {
            // Autofocus after the browser has had time to process other event handlers.
            setTimeout(function () { return autoFocus.focus(); }, 10);
            // Try to focus again when the modal has opened so that autofocus works in IE11.
            setTimeout(function () { return autoFocus.focus(); }, this.transitionDuration);
        }
    };
    // Updates the modal with the specified configuration.
    SuiModal.prototype.loadConfig = function (config) {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;
        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;
        this.isInverted = config.isInverted;
        this.mustScroll = config.mustScroll;
        this.transition = config.transition;
        this.transitionDuration = config.transitionDuration;
    };
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    SuiModal.prototype.dismiss = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;
            // Transition the modal to be invisible.
            this.dimBackground = false;
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, function () {
                // When done, move the modal back to its original location, emit a dismiss event, and fire the callback.
                if (_this._originalContainer) {
                    _this._originalContainer.appendChild(_this._element.nativeElement);
                }
                _this.onDismiss.emit();
                callback();
            }));
        }
    };
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    SuiModal.prototype.close = function () {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    };
    // Decides whether the modal needs to reposition to allow scrolling.
    SuiModal.prototype.updateScroll = function () {
        // Semantic UI modal margin is 3.5rem, which is relative to the global font size, so for compatibility:
        var fontSize = parseFloat(window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("font-size"));
        var margin = fontSize * 3.5;
        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this.modalElement) {
            var element = this.modalElement.nativeElement;
            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll =
                window.innerHeight < element.clientHeight + margin * 2;
        }
    };
    SuiModal.prototype.onClick = function (e) {
        // Makes sense here, as the modal shouldn't be attached to any DOM element.
        e.stopPropagation();
    };
    // Document listener is fine here because nobody will enough modals open.
    SuiModal.prototype.onDocumentKeyUp = function (e) {
        if (e.keyCode === KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    };
    SuiModal.prototype.onDocumentResize = function () {
        this.updateScroll();
    };
    SuiModal.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory }
    ]; };
    __decorate([
        Input()
    ], SuiModal.prototype, "isClosable", void 0);
    __decorate([
        Input()
    ], SuiModal.prototype, "closeResult", void 0);
    __decorate([
        Output("approved")
    ], SuiModal.prototype, "onApprove", void 0);
    __decorate([
        Output("denied")
    ], SuiModal.prototype, "onDeny", void 0);
    __decorate([
        Output("dismissed")
    ], SuiModal.prototype, "onDismiss", void 0);
    __decorate([
        ViewChild("modal", { static: true })
    ], SuiModal.prototype, "modalElement", void 0);
    __decorate([
        Input()
    ], SuiModal.prototype, "size", void 0);
    __decorate([
        Input()
    ], SuiModal.prototype, "isFullScreen", null);
    __decorate([
        Input()
    ], SuiModal.prototype, "isBasic", void 0);
    __decorate([
        Input()
    ], SuiModal.prototype, "mustScroll", null);
    __decorate([
        Input()
    ], SuiModal.prototype, "isInverted", null);
    __decorate([
        Input()
    ], SuiModal.prototype, "transition", void 0);
    __decorate([
        Input()
    ], SuiModal.prototype, "transitionDuration", void 0);
    __decorate([
        ViewChild("templateSibling", { read: ViewContainerRef, static: true })
    ], SuiModal.prototype, "templateSibling", void 0);
    __decorate([
        HostListener("document:keyup", ["$event"])
    ], SuiModal.prototype, "onDocumentKeyUp", null);
    __decorate([
        HostListener("window:resize")
    ], SuiModal.prototype, "onDocumentResize", null);
    SuiModal = __decorate([
        Component({
            selector: "sui-modal",
            template: "\n        <!-- Page dimmer for modal background. -->\n        <sui-dimmer\n            class=\"page\"\n            [class.inverted]=\"isInverted\"\n            [(isDimmed)]=\"dimBackground\"\n            [isClickable]=\"false\"\n            [transitionDuration]=\"transitionDuration\"\n            [wrapContent]=\"false\"\n            (click)=\"close()\"\n        >\n            <!-- Modal component, with transition component attached -->\n            <div\n                class=\"ui modal\"\n                [suiTransition]=\"transitionController\"\n                [class.active]=\"transitionController?.isVisible\"\n                [class.fullscreen]=\"isFullScreen\"\n                [class.basic]=\"isBasic\"\n                [class.scroll]=\"mustScroll\"\n                [class.inverted]=\"isInverted\"\n                [ngClass]=\"dynamicClasses\"\n                (click)=\"onClick($event)\"\n                #modal\n            >\n                <!-- Configurable close icon -->\n                <i class=\"close icon\" *ngIf=\"isClosable\" (click)=\"close()\"></i>\n                <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->\n                <ng-content></ng-content>\n                <!-- @ViewChild reference so we can insert elements beside this div. -->\n                <div #templateSibling></div>\n            </div>\n        </sui-dimmer>\n    ",
            styles: ["\n            .ui.dimmer {\n                overflow-y: auto;\n            }\n\n            /* avoid .scrolling as Semantic UI adds unwanted styles. */\n            .scroll {\n                position: absolute !important;\n                margin-top: 3.5rem !important;\n                margin-bottom: 3.5rem !important;\n                top: 0;\n            }\n        "]
        })
    ], SuiModal);
    return SuiModal;
}());

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
var ActiveModal = /** @class */ (function () {
    function ActiveModal(instance, componentRef) {
        var _this = this;
        this._config = instance;
        this._componentRef = componentRef;
        // Automatically destroy the modal component when it has been dismissed.
        this.component.onDismiss.subscribe(function () { return _this._componentRef.destroy(); });
    }
    Object.defineProperty(ActiveModal.prototype, "component", {
        // Shorthand for direct access to the `SuiModal` instance.
        get: function () {
            return this._componentRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    // Registers a callback for when `onApprove` is fired.
    ActiveModal.prototype.onApprove = function (callback) {
        this.component.onApprove.subscribe(function (res) { return callback(res); });
        return this;
    };
    // Registers a callback for when `onDeny` is fired.
    ActiveModal.prototype.onDeny = function (callback) {
        this.component.onDeny.subscribe(function (res) { return callback(res); });
        return this;
    };
    // Fires the approve event of the modal manually.
    ActiveModal.prototype.approve = function (result) {
        this.component.approve(result);
    };
    // Fires the deny event of the modal manually.
    ActiveModal.prototype.deny = function (result) {
        this.component.deny(result);
    };
    // Removes the modal component instantly, without transitions or firing any events.
    ActiveModal.prototype.destroy = function () {
        this._componentRef.destroy();
    };
    return ActiveModal;
}());

var SuiModalService = /** @class */ (function () {
    function SuiModalService(_componentFactory) {
        this._componentFactory = _componentFactory;
    }
    SuiModalService.prototype.open = function (modal) {
        // Generate the modal component to be shown.
        var componentRef = this._componentFactory.createComponent(SuiModal);
        // Shorthand for the created modal component instance.
        var modalComponent = componentRef.instance;
        if (modal instanceof TemplateModalConfig) {
            // Inject the template into the view.
            this._componentFactory.createView(modalComponent.templateSibling, modal.template, {
                // `let-context`
                $implicit: modal.context,
                // `let-modal="modal"`
                modal: componentRef.instance.controls
            });
        }
        else if (modal instanceof ComponentModalConfig) {
            // Generate the component to be used as the modal content,
            // injecting an instance of `Modal` to be used in the component constructor.
            var contentComponentRef = this._componentFactory.createComponent(modal.component, [
                {
                    provide: Modal,
                    useValue: new Modal(modalComponent.controls, modal.context)
                }
            ]);
            // Insert the new component into the content of the modal.
            this._componentFactory.attachToView(contentComponentRef, modalComponent.templateSibling);
            // Shorthand for access to the content component's DOM element.
            var contentElement = contentComponentRef.location
                .nativeElement;
            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes() &&
                contentElement.parentElement &&
                contentElement.firstChild) {
                contentElement.parentElement.appendChild(contentElement.removeChild(contentElement.firstChild));
            }
            // Remove the generated component's 'empty shell' from the DOM.
            this._componentFactory.detachFromDocument(contentComponentRef);
        }
        // Attach the new modal component to the application.
        // The component will move itself to the document body for correctl styling.
        this._componentFactory.attachToApplication(componentRef);
        // Initialise the generated modal with the provided config.
        modalComponent.loadConfig(modal);
        // Return an instance of an `ActiveModal`, so the user can control the new modal.
        return new ActiveModal(modal, componentRef);
    };
    SuiModalService.ctorParameters = function () { return [
        { type: SuiComponentFactory }
    ]; };
    SuiModalService.ngInjectableDef = ɵɵdefineInjectable({ factory: function SuiModalService_Factory() { return new SuiModalService(ɵɵinject(SuiComponentFactory)); }, token: SuiModalService, providedIn: "root" });
    SuiModalService = __decorate([
        Injectable({
            providedIn: "root"
        })
    ], SuiModalService);
    return SuiModalService;
}());

var SuiDimmer = /** @class */ (function (_super) {
    __extends(SuiDimmer, _super);
    function SuiDimmer(_renderer, element, _changeDetector) {
        var _this = _super.call(this, _renderer, element, _changeDetector) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._changeDetector = _changeDetector;
        _this._isDimmed = false;
        _this.isDimmedChange = new EventEmitter();
        _this.isClickable = true;
        _this.wrapContent = true;
        _this.dimmerClasses = true;
        return _this;
    }
    Object.defineProperty(SuiDimmer.prototype, "isDimmed", {
        get: function () {
            return this._isDimmed;
        },
        set: function (value) {
            var isDimmed = !!value;
            if (!this._transitionController) {
                // Initialise transition functionality when first setting dimmed, to ensure initial state doesn't transition.
                this._transitionController = new TransitionController(isDimmed, "block");
                this.setTransitionController(this._transitionController);
                this._isDimmed = isDimmed;
            }
            else if (this._isDimmed !== isDimmed) {
                this._isDimmed = isDimmed;
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition("fade", this.transitionDuration, isDimmed ? TransitionDirection.In : TransitionDirection.Out));
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDimmer.prototype.onClick = function () {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    };
    SuiDimmer.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.dimmer")
    ], SuiDimmer.prototype, "dimmerClasses", void 0);
    __decorate([
        HostBinding("class.active"),
        Input()
    ], SuiDimmer.prototype, "isDimmed", null);
    __decorate([
        Output()
    ], SuiDimmer.prototype, "isDimmedChange", void 0);
    __decorate([
        Input()
    ], SuiDimmer.prototype, "isClickable", void 0);
    __decorate([
        Input()
    ], SuiDimmer.prototype, "transition", void 0);
    __decorate([
        Input()
    ], SuiDimmer.prototype, "transitionDuration", void 0);
    __decorate([
        Input()
    ], SuiDimmer.prototype, "wrapContent", void 0);
    __decorate([
        HostListener("click")
    ], SuiDimmer.prototype, "onClick", null);
    SuiDimmer = __decorate([
        Component({
            selector: "sui-dimmer",
            template: "\n        <div [class.content]=\"wrapContent\">\n            <div [class.center]=\"wrapContent\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    ",
            styles: ["\n            :host.dimmer {\n                transition: none;\n            }\n        "]
        })
    ], SuiDimmer);
    return SuiDimmer;
}(SuiTransition));

var SuiDimmerModule = /** @class */ (function () {
    function SuiDimmerModule() {
    }
    SuiDimmerModule = __decorate([
        NgModule({
            imports: [CommonModule, SuiTransitionModule],
            declarations: [SuiDimmer],
            exports: [SuiDimmer]
        })
    ], SuiDimmerModule);
    return SuiDimmerModule;
}());

var SuiModalModule = /** @class */ (function () {
    function SuiModalModule() {
    }
    SuiModalModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                SuiDimmerModule,
                SuiTransitionModule,
                SuiUtilityModule
            ],
            declarations: [SuiModal],
            exports: [SuiModal],
            providers: [SuiModalService],
            entryComponents: [SuiModal]
        })
    ], SuiModalModule);
    return SuiModalModule;
}());

var SuiCalendarViewTitle = /** @class */ (function () {
    function SuiCalendarViewTitle() {
        this.onZoomOut = new EventEmitter();
    }
    __decorate([
        Input()
    ], SuiCalendarViewTitle.prototype, "ranges", void 0);
    __decorate([
        Output("zoomOut")
    ], SuiCalendarViewTitle.prototype, "onZoomOut", void 0);
    SuiCalendarViewTitle = __decorate([
        Component({
            selector: "sui-calendar-view-title",
            template: "\n<span class=\"title link\" (click)=\"onZoomOut.emit()\">\n    <ng-content></ng-content>\n</span>\n<span class=\"prev link\" [class.disabled]=\"!ranges?.canMovePrevious\" (click)=\"ranges?.movePrevious()\">\n    <i class=\"chevron left icon\"></i>\n</span>\n<span class=\"next link\" [class.disabled]=\"!ranges?.canMoveNext\" (click)=\"ranges?.moveNext()\">\n    <i class=\"chevron right icon\"></i>\n</span>\n",
            styles: ["\n.title.link {\n    display: inline-block;\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n"]
        })
    ], SuiCalendarViewTitle);
    return SuiCalendarViewTitle;
}());

var CalendarItem = /** @class */ (function () {
    function CalendarItem(date) {
        this.date = date;
    }
    return CalendarItem;
}());
var SuiCalendarItem = /** @class */ (function () {
    function SuiCalendarItem(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.hasFocus = false;
        this.onFocussed = new EventEmitter();
    }
    Object.defineProperty(SuiCalendarItem.prototype, "isSelectable", {
        get: function () {
            return this.item.isSelectable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isActive", {
        get: function () {
            return this.item.isActive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarItem.prototype, "isToday", {
        get: function () {
            return this.item.isToday;
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarItem.prototype.onMouseMove = function () {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    };
    SuiCalendarItem.prototype.onMouseLeave = function () {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    };
    SuiCalendarItem.prototype.detectChanges = function () {
        this._changeDetector.detectChanges();
    };
    SuiCalendarItem.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input("calendarItem")
    ], SuiCalendarItem.prototype, "item", void 0);
    __decorate([
        HostBinding("class.disabled")
    ], SuiCalendarItem.prototype, "isSelectable", null);
    __decorate([
        HostBinding("class.active")
    ], SuiCalendarItem.prototype, "isActive", null);
    __decorate([
        HostBinding("class.today")
    ], SuiCalendarItem.prototype, "isToday", null);
    __decorate([
        HostBinding("class.focus")
    ], SuiCalendarItem.prototype, "hasFocus", void 0);
    __decorate([
        HostListener("mousemove")
    ], SuiCalendarItem.prototype, "onMouseMove", null);
    __decorate([
        HostListener("mouseleave")
    ], SuiCalendarItem.prototype, "onMouseLeave", null);
    SuiCalendarItem = __decorate([
        Directive({
            selector: "[calendarItem]"
        })
    ], SuiCalendarItem);
    return SuiCalendarItem;
}());

var CalendarViewType;
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
    __decorate([
        ViewChildren(SuiCalendarItem)
    ], CalendarView.prototype, "_renderedItems", void 0);
    __decorate([
        Input()
    ], CalendarView.prototype, "service", null);
    return CalendarView;
}());

var DatePrecision;
(function (DatePrecision) {
    DatePrecision[DatePrecision["Decade"] = 0] = "Decade";
    DatePrecision[DatePrecision["Year"] = 1] = "Year";
    DatePrecision[DatePrecision["Month"] = 2] = "Month";
    DatePrecision[DatePrecision["Date"] = 3] = "Date";
    DatePrecision[DatePrecision["Hour"] = 4] = "Hour";
    DatePrecision[DatePrecision["Minute"] = 5] = "Minute";
})(DatePrecision || (DatePrecision = {}));
var DateUtil = {
    startOf: function (precision, date, resetAll) {
        if (resetAll === void 0) { resetAll = false; }
        switch (precision) {
            case DatePrecision.Decade:
                var start = Math.floor(date.getFullYear() / 10) * 10 + 1;
                date.setFullYear(start);
                if (!resetAll) {
                    break;
                }
            // falls through
            case DatePrecision.Year:
                date.setMonth(0);
                if (!resetAll) {
                    break;
                }
            // falls through
            case DatePrecision.Month:
                date.setDate(1);
                if (!resetAll) {
                    break;
                }
            // falls through
            case DatePrecision.Date:
                date.setHours(0);
                if (!resetAll) {
                    break;
                }
            // falls through
            case DatePrecision.Hour:
                date.setMinutes(0);
                if (!resetAll) {
                    break;
                }
            // falls through
            case DatePrecision.Minute:
                date.setSeconds(0, 0);
        }
        return date;
    },
    endOf: function (precision, date) {
        switch (precision) {
            case DatePrecision.Year:
                date.setMonth(12, 0);
            // falls through
            case DatePrecision.Month:
                date.setMonth(date.getMonth() + 1, 0);
            // falls through
            case DatePrecision.Date:
                date.setHours(23, 59, 59, 999);
                break;
            case DatePrecision.Hour:
                date.setMinutes(59, 59, 999);
                break;
            case DatePrecision.Minute:
                date.setSeconds(59, 999);
                break;
        }
        return date;
    },
    equal: function (precision, a, b) {
        var equal = true;
        switch (precision) {
            case DatePrecision.Minute:
                equal = equal && a.getMinutes() === b.getMinutes();
            // falls through
            case DatePrecision.Hour:
                equal = equal && a.getHours() === b.getHours();
            // falls through
            case DatePrecision.Date:
                equal = equal && a.getDate() === b.getDate();
            // falls through
            case DatePrecision.Month:
                equal = equal && a.getMonth() === b.getMonth();
            // falls through
            case DatePrecision.Year:
                equal = equal && a.getFullYear() === b.getFullYear();
        }
        return equal;
    },
    next: function (precision, date) {
        return DateUtil.add(precision, date, 1);
    },
    add: function (precision, date, i) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        switch (precision) {
            case DatePrecision.Decade:
                date.setFullYear(year + i * 10);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Year:
                date.setFullYear(year + i);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Month:
                date.setMonth(month + i);
                if (date.getMonth() !== Util.Math.mod(month + i, 12)) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Date:
                date.setDate(day + i);
                break;
            case DatePrecision.Hour:
                date.setHours(date.getHours() + i);
                break;
            case DatePrecision.Minute:
                date.setMinutes(date.getMinutes() + i);
                break;
        }
        return date;
    },
    previous: function (precision, date) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        switch (precision) {
            case DatePrecision.Decade:
                date.setFullYear(year - 10);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Year:
                date.setFullYear(year - 1);
                if (date.getMonth() !== month) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Month:
                date.setMonth(month - 1);
                if (date.getMonth() !== Util.Math.mod(month - 1, 12)) {
                    date.setDate(0);
                }
                break;
            case DatePrecision.Date:
                date.setDate(day - 1);
                break;
            case DatePrecision.Hour:
                var hours = date.getHours();
                date.setHours(hours - 1);
                if (date.getHours() !== Util.Math.mod(hours - 1, 24)) {
                    date.setHours(hours - 2);
                }
                break;
            case DatePrecision.Minute:
                var minutes = date.getMinutes();
                date.setMinutes(minutes - 1);
        }
        return date;
    },
    clone: function (date) {
        return new Date(date.getTime());
    }
};

var DateComparer = /** @class */ (function () {
    function DateComparer(precision, isSmallest) {
        this._precision = precision;
        this._isSmallest = isSmallest;
    }
    DateComparer.prototype.equal = function (a, b) {
        if (this._precision === DatePrecision.Minute) {
            return (!!b &&
                DateUtil.equal(DatePrecision.Hour, b, a) &&
                Util.Math.roundDown(b.getMinutes(), 5) ===
                    Util.Math.roundDown(a.getMinutes(), 5));
        }
        return !!b && DateUtil.equal(this._precision, a, b);
    };
    DateComparer.prototype.lessThan = function (a, b) {
        if (this._isSmallest) {
            return !b || b >= a;
        }
        return !b || DateUtil.endOf(this._precision, DateUtil.clone(b)) >= a;
    };
    DateComparer.prototype.greaterThan = function (a, b) {
        if (this._isSmallest) {
            return !b || b <= a;
        }
        return !b || DateUtil.startOf(this._precision, DateUtil.clone(b)) <= a;
    };
    DateComparer.prototype.between = function (date, left, right) {
        return this.greaterThan(date, left) && this.lessThan(date, right);
    };
    return DateComparer;
}());

var CalendarRange = /** @class */ (function () {
    function CalendarRange(start, dates, items, grouped, comparer) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
        this._comparer = comparer;
    }
    Object.defineProperty(CalendarRange.prototype, "inRange", {
        get: function () {
            return this.items.filter(function (i) { return !i.isOutsideRange; });
        },
        enumerable: true,
        configurable: true
    });
    CalendarRange.prototype.find = function (item) {
        var _this = this;
        return this.items.find(function (i) { return _this._comparer.equal(i.date, item.date); });
    };
    CalendarRange.prototype.findIndex = function (item) {
        var _this = this;
        if (!item) {
            return -1;
        }
        return this.items.findIndex(function (i) {
            return _this._comparer.equal(i.date, item.date);
        });
    };
    CalendarRange.prototype.containsDate = function (date) {
        var _this = this;
        return !!this.inRange.find(function (i) { return _this._comparer.equal(i.date, date); });
    };
    return CalendarRange;
}());
var CalendarRangeService = /** @class */ (function () {
    function CalendarRangeService(interval, rows, columns) {
        this.interval = interval;
        this.marginal = interval + 1;
        this.rows = rows;
        this.columns = columns;
    }
    Object.defineProperty(CalendarRangeService.prototype, "dateComparer", {
        get: function () {
            return new DateComparer(this.marginal, this.service.inFinalView);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "length", {
        get: function () {
            return this.rows * this.columns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "canMoveNext", {
        get: function () {
            var firstItem = this.next.inRange[0];
            if (firstItem && this.service.maxDate) {
                return firstItem.date <= this.service.maxDate;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarRangeService.prototype, "canMovePrevious", {
        get: function () {
            var lastItem = this.previous.inRange.slice(-1).pop();
            if (lastItem && this.service.minDate) {
                return lastItem.date >= this.service.minDate;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    CalendarRangeService.prototype.loadService = function (service) {
        this.service = service;
        this.refresh();
    };
    CalendarRangeService.prototype.refresh = function () {
        this.current = this.calcRange(this.service.currentDate);
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.move = function (forwards) {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    };
    CalendarRangeService.prototype.moveNext = function () {
        DateUtil.next(this.interval, this.service.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.movePrevious = function () {
        DateUtil.previous(this.interval, this.service.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    };
    CalendarRangeService.prototype.calc = function (forwards) {
        if (forwards) {
            return this.next;
        }
        return this.previous;
    };
    CalendarRangeService.prototype.calcRange = function (startDate) {
        var start = this.calcStart(startDate);
        if (this.service.inFinalView) {
            DateUtil.startOf(this.marginal, start, true);
        }
        var dates = this.calcDates(start);
        var items = this.calcItems(dates, startDate);
        return new CalendarRange(start, dates, items, Util.Array.group(items, this.columns), this.dateComparer);
    };
    CalendarRangeService.prototype.calcStart = function (date) {
        return DateUtil.startOf(this.interval, DateUtil.clone(date));
    };
    CalendarRangeService.prototype.calcDates = function (rangeStart) {
        var _this = this;
        return Util.Array.range(this.length).map(function (i) {
            return DateUtil.add(_this.marginal, DateUtil.clone(rangeStart), i);
        });
    };
    CalendarRangeService.prototype.calcItems = function (dateRange, baseDate) {
        var _this = this;
        return dateRange.map(function (date) {
            var item = new CalendarItem(date);
            item.isDisabled = !_this.dateComparer.between(item.date, _this.service.minDate, _this.service.maxDate);
            item.isActive = _this.dateComparer.equal(item.date, _this.service.selectedDate);
            item.isToday = _this.dateComparer.equal(item.date, new Date());
            item.isSelectable = item.isDisabled;
            _this.configureItem(item, baseDate);
            return item;
        });
    };
    return CalendarRangeService;
}());

var CalendarRangeYearService = /** @class */ (function (_super) {
    __extends(CalendarRangeYearService, _super);
    function CalendarRangeYearService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeYearService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, "0");
        item.isOutsideRange =
            item.date.getFullYear() >=
                this.calcStart(baseDate).getFullYear() + 10;
    };
    return CalendarRangeYearService;
}(CalendarRangeService));
var SuiCalendarYearView = /** @class */ (function (_super) {
    __extends(SuiCalendarYearView, _super);
    function SuiCalendarYearView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarYearView.prototype, "decadeStart", {
        get: function () {
            return DateUtil.startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate)).getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarYearView.prototype.pad = function (year) {
        return Util.String.padLeft(year.toString(), 4, "0");
    };
    SuiCalendarYearView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarYearView = __decorate([
        Component({
            selector: "sui-calendar-year-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column year\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"3\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarYearView);
    return SuiCalendarYearView;
}(CalendarView));

function buildLocalizeFn(values, defaultType, indexCallback) {
    return function (dirtyIndex, _a) {
        var type = (_a === void 0 ? { type: defaultType } : _a).type;
        var index = indexCallback ? indexCallback(dirtyIndex) : dirtyIndex;
        /* There might be a better way to fix this error:
        ----
        src/modules/datepicker/helpers/date-fns.ts:43:23 - error TS2538: Type 'undefined' cannot be used as an index type.

        43         return values[type][index];
        ----
            However, this '|| 1' coercion "works"
        */
        return values[type || -1][index];
    };
}
function buildLocalizeArrayFn(values, defaultType) {
    return function (_a) {
        var type = (_a === void 0 ? { type: defaultType } : _a).type;
        return values[type || -1];
    };
}
function buildMatchFn(patterns, defaultType) {
    return function (dirtyString, _a) {
        var type = (_a === void 0 ? { type: defaultType } : _a).type;
        return dirtyString.match("^(" + patterns[type || -1].join("|") + ")");
    };
}
function buildParseFn(patterns, defaultType) {
    return function (_a, _b) {
        var _c = __read(_a, 2), result = _c[1];
        var type = (_b === void 0 ? { type: defaultType } : _b).type;
        return (patterns[type || -1] || patterns[defaultType])
            .map(function (p) { return new RegExp("^" + p); })
            .findIndex(function (pattern) { return pattern.test(result); });
    };
}
var DateFnsParser = /** @class */ (function () {
    function DateFnsParser(locale) {
        this._weekStartsOn = locale.firstDayOfWeek;
        var weekdayValues = {
            long: locale.weekdays,
            short: locale.weekdaysShort,
            narrow: locale.weekdaysNarrow
        };
        var monthValues = {
            long: locale.months,
            short: locale.monthsShort
        };
        var timeOfDayValues = {
            long: locale.timesOfDay,
            uppercase: locale.timesOfDayUppercase,
            lowercase: locale.timesOfDayLowercase
        };
        var timeOfDayMatchValues = {
            long: locale.timesOfDay,
            short: locale.timesOfDayUppercase.concat(locale.timesOfDayLowercase)
        };
        this._locale = defaultLocale;
        this._locale.localize = __assign({}, this._locale.localize, {
            weekday: buildLocalizeFn(weekdayValues, "long"),
            weekdays: buildLocalizeArrayFn(weekdayValues, "long"),
            month: buildLocalizeFn(monthValues, "long"),
            months: buildLocalizeArrayFn(monthValues, "long"),
            timeOfDay: buildLocalizeFn(timeOfDayValues, "long", function (hours) {
                return hours / 12 >= 1 ? 1 : 0;
            }),
            timesOfDay: buildLocalizeArrayFn(timeOfDayValues, "long")
        });
        this._locale.match = __assign({}, this._locale.match, {
            weekdays: buildMatchFn(weekdayValues, "long"),
            weekday: buildParseFn(weekdayValues, "long"),
            months: buildMatchFn(monthValues, "long"),
            month: buildParseFn(monthValues, "long"),
            timesOfDay: buildMatchFn(timeOfDayMatchValues, "long"),
            timeOfDay: buildParseFn(timeOfDayMatchValues, "long")
        });
    }
    Object.defineProperty(DateFnsParser.prototype, "_config", {
        get: function () {
            return {
                weekStartsOn: this._weekStartsOn,
                locale: this._locale
            };
        },
        enumerable: true,
        configurable: true
    });
    DateFnsParser.prototype.format = function (d, f) {
        return format(d, f, this._config);
    };
    DateFnsParser.prototype.parse = function (dS, f, bD) {
        return parse(dS, f, bD, this._config);
    };
    return DateFnsParser;
}());

var DateParser = /** @class */ (function () {
    function DateParser(format, locale) {
        this._format = format;
        this._parser = new DateFnsParser(locale);
    }
    DateParser.prototype.format = function (date) {
        return this._parser.format(date, this._format);
    };
    DateParser.prototype.parse = function (dateString, baseDate) {
        if (baseDate === void 0) { baseDate = new Date(); }
        return this._parser.parse(dateString, this._format, baseDate);
    };
    return DateParser;
}());
var InternalDateParser = /** @class */ (function (_super) {
    __extends(InternalDateParser, _super);
    function InternalDateParser(mode, locale) {
        var _this = this;
        var internalFormats = {
            time: "HH:mm",
            datetime: "YYYY-MM-DDTHH:mm",
            date: "YYYY-MM-DD",
            month: "YYYY-MM",
            year: "YYYY"
        };
        _this = _super.call(this, internalFormats[mode], locale) || this;
        return _this;
    }
    return InternalDateParser;
}(DateParser));

var CalendarRangeMonthService = /** @class */ (function (_super) {
    __extends(CalendarRangeMonthService, _super);
    function CalendarRangeMonthService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeMonthService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    };
    return CalendarRangeMonthService;
}(CalendarRangeService));
var SuiCalendarMonthView = /** @class */ (function (_super) {
    __extends(SuiCalendarMonthView, _super);
    function SuiCalendarMonthView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarMonthView.prototype, "year", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarMonthView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarMonthView = __decorate([
        Component({
            selector: "sui-calendar-month-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column month\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"3\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ year }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarMonthView);
    return SuiCalendarMonthView;
}(CalendarView));

var CalendarRangeDateService = /** @class */ (function (_super) {
    __extends(CalendarRangeDateService, _super);
    function CalendarRangeDateService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeDateService.prototype.calcStart = function (start) {
        var monthStart = DateUtil.startOf(DatePrecision.Month, DateUtil.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    };
    CalendarRangeDateService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = item.date.getDate().toString();
        item.isOutsideRange = item.date.getMonth() !== baseDate.getMonth();
        item.isSelectable = item.isDisabled;
    };
    return CalendarRangeDateService;
}(CalendarRangeService));
var SuiCalendarDateView = /** @class */ (function (_super) {
    __extends(SuiCalendarDateView, _super);
    function SuiCalendarDateView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Date, new CalendarRangeDateService(DatePrecision.Month, 6, 7)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarDateView.prototype, "days", {
        get: function () {
            var _this = this;
            var days = this.service.localeValues.weekdaysNarrow;
            return days.map(function (d, i) {
                return days[(i + _this.service.firstDayOfWeek) % days.length];
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiCalendarDateView.prototype, "date", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.month, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarDateView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarDateView = __decorate([
        Component({
            selector: "sui-calendar-date-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table seven column day\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"7\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n                <tr>\n                    <th *ngFor=\"let day of days\">{{ day }}</th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarDateView);
    return SuiCalendarDateView;
}(CalendarView));

var CalendarMode;
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

var CalendarMappings = /** @class */ (function () {
    function CalendarMappings() {
    }
    return CalendarMappings;
}());
var DateMappings = /** @class */ (function (_super) {
    __extends(DateMappings, _super);
    function DateMappings() {
        var _this = _super.call(this) || this;
        _this.initialView = CalendarViewType.Date;
        _this.finalView = CalendarViewType.Date;
        _this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Date]
        ]);
        _this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month]
        ]);
        return _this;
    }
    return DateMappings;
}(CalendarMappings));
var TimeMappings = /** @class */ (function (_super) {
    __extends(TimeMappings, _super);
    function TimeMappings() {
        var _this = _super.call(this) || this;
        _this.initialView = CalendarViewType.Hour;
        _this.finalView = CalendarViewType.Minute;
        _this.changed = new Map([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);
        _this.zoom = new Map([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Hour]
        ]);
        return _this;
    }
    return TimeMappings;
}(CalendarMappings));
var DatetimeMappings = /** @class */ (function (_super) {
    __extends(DatetimeMappings, _super);
    function DatetimeMappings() {
        var _this = _super.call(this) || this;
        _this.initialView = CalendarViewType.Date;
        _this.finalView = CalendarViewType.Minute;
        _this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Hour],
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);
        _this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month],
            [CalendarViewType.Hour, CalendarViewType.Date],
            [CalendarViewType.Minute, CalendarViewType.Hour]
        ]);
        return _this;
    }
    return DatetimeMappings;
}(CalendarMappings));
var MonthMappings = /** @class */ (function (_super) {
    __extends(MonthMappings, _super);
    function MonthMappings() {
        var _this = _super.call(this) || this;
        _this.initialView = CalendarViewType.Month;
        _this.finalView = CalendarViewType.Month;
        _this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Month]
        ]);
        _this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Year]
        ]);
        return _this;
    }
    return MonthMappings;
}(CalendarMappings));
var YearMappings = /** @class */ (function (_super) {
    __extends(YearMappings, _super);
    function YearMappings() {
        var _this = _super.call(this) || this;
        _this.initialView = CalendarViewType.Year;
        _this.finalView = CalendarViewType.Year;
        _this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);
        _this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);
        return _this;
    }
    return YearMappings;
}(CalendarMappings));

var CalendarConfig = /** @class */ (function () {
    function CalendarConfig(mode, precision, mappings, fallback) {
        this.mode = mode;
        this.precision = precision;
        this.mappings = mappings;
        this.fallback = fallback;
    }
    CalendarConfig.prototype.updateBounds = function (providedDate) {
        this.dateMinBound = DateUtil.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    };
    return CalendarConfig;
}());
var DateConfigBase = /** @class */ (function (_super) {
    __extends(DateConfigBase, _super);
    function DateConfigBase(precision, mappings, fallback) {
        return _super.call(this, CalendarMode.DateOnly, precision, mappings, fallback) || this;
    }
    return DateConfigBase;
}(CalendarConfig));
var YearConfig = /** @class */ (function (_super) {
    __extends(YearConfig, _super);
    function YearConfig() {
        return _super.call(this, DatePrecision.Year, new YearMappings(), "number") || this;
    }
    return YearConfig;
}(DateConfigBase));
var MonthConfig = /** @class */ (function (_super) {
    __extends(MonthConfig, _super);
    function MonthConfig() {
        return _super.call(this, DatePrecision.Month, new MonthMappings(), "month") || this;
    }
    return MonthConfig;
}(DateConfigBase));
var DateConfig = /** @class */ (function (_super) {
    __extends(DateConfig, _super);
    function DateConfig() {
        return _super.call(this, DatePrecision.Date, new DateMappings(), "date") || this;
    }
    return DateConfig;
}(DateConfigBase));
var DatetimeConfig = /** @class */ (function (_super) {
    __extends(DatetimeConfig, _super);
    function DatetimeConfig() {
        return _super.call(this, CalendarMode.Both, DatePrecision.Minute, new DatetimeMappings(), "datetime-local") || this;
    }
    return DatetimeConfig;
}(CalendarConfig));
var TimeConfig = /** @class */ (function (_super) {
    __extends(TimeConfig, _super);
    function TimeConfig() {
        return _super.call(this, CalendarMode.TimeOnly, DatePrecision.Minute, new TimeMappings(), "time") || this;
    }
    TimeConfig.prototype.updateBounds = function (providedDate) {
        this.dateMaxBound = DateUtil.endOf(DatePrecision.Date, DateUtil.clone(providedDate));
        this.dateMinBound = DateUtil.previous(DatePrecision.Date, DateUtil.clone(this.dateMaxBound));
    };
    return TimeConfig;
}(CalendarConfig));

var DatepickerMode = {
    Year: "year",
    Month: "month",
    Date: "date",
    Datetime: "datetime",
    Time: "time"
};
var SuiDatepicker = /** @class */ (function () {
    function SuiDatepicker(_localizationService) {
        this._localizationService = _localizationService;
        this.service = new CalendarService(new DatetimeConfig(), _localizationService.get().datepicker);
        this.calendarClasses = true;
    }
    SuiDatepicker.prototype.onMouseDown = function (e) {
        e.preventDefault();
    };
    SuiDatepicker.ctorParameters = function () { return [
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        HostBinding("class.ui"),
        HostBinding("class.active"),
        HostBinding("class.calendar")
    ], SuiDatepicker.prototype, "calendarClasses", void 0);
    __decorate([
        HostListener("mousedown", ["$event"])
    ], SuiDatepicker.prototype, "onMouseDown", null);
    SuiDatepicker = __decorate([
        Component({
            selector: "sui-datepicker",
            template: "\n        <ng-container [ngSwitch]=\"service.currentView\">\n            <sui-calendar-year-view\n                [service]=\"service\"\n                *ngSwitchCase=\"0\"\n            ></sui-calendar-year-view>\n            <sui-calendar-month-view\n                [service]=\"service\"\n                *ngSwitchCase=\"1\"\n            ></sui-calendar-month-view>\n            <sui-calendar-date-view\n                [service]=\"service\"\n                *ngSwitchCase=\"2\"\n            ></sui-calendar-date-view>\n            <sui-calendar-hour-view\n                [service]=\"service\"\n                *ngSwitchCase=\"3\"\n            ></sui-calendar-hour-view>\n            <sui-calendar-minute-view\n                [service]=\"service\"\n                *ngSwitchCase=\"4\"\n            ></sui-calendar-minute-view>\n        </ng-container>\n    ",
            styles: ["\n            :host {\n                user-select: none;\n            }\n        "]
        })
    ], SuiDatepicker);
    return SuiDatepicker;
}());

var CalendarRangeHourService = /** @class */ (function (_super) {
    __extends(CalendarRangeHourService, _super);
    function CalendarRangeHourService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeHourService.prototype.configureItem = function (item, baseDate) {
        // Set minutes and seconds to 0
        var customFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    };
    return CalendarRangeHourService;
}(CalendarRangeService));
var SuiCalendarHourView = /** @class */ (function (_super) {
    __extends(SuiCalendarHourView, _super);
    function SuiCalendarHourView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarHourView.prototype, "date", {
        get: function () {
            return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarHourView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarHourView = __decorate([
        Component({
            selector: "sui-calendar-hour-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table four column hour\"\n        >\n            <thead *ngIf=\"service.config.mode != 1\">\n                <tr>\n                    <th colspan=\"4\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarHourView);
    return SuiCalendarHourView;
}(CalendarView));

var CalendarRangeMinuteService = /** @class */ (function (_super) {
    __extends(CalendarRangeMinuteService, _super);
    function CalendarRangeMinuteService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarRangeMinuteService.prototype.calcStart = function (start) {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    };
    CalendarRangeMinuteService.prototype.calcDates = function (start) {
        return Util.Array.range(this.length).map(function (i) {
            return DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5);
        });
    };
    CalendarRangeMinuteService.prototype.configureItem = function (item, baseDate) {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    };
    return CalendarRangeMinuteService;
}(CalendarRangeService));
var SuiCalendarMinuteView = /** @class */ (function (_super) {
    __extends(SuiCalendarMinuteView, _super);
    function SuiCalendarMinuteView(_renderer) {
        var _this = _super.call(this, _renderer, CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3)) || this;
        _this._renderer = _renderer;
        return _this;
    }
    Object.defineProperty(SuiCalendarMinuteView.prototype, "date", {
        get: function () {
            if (this.service.config.mode !== CalendarMode.TimeOnly) {
                // Set minutes and seconds to 0
                var dateTimeFormat = this.service.localeValues.formats.datetime.replace(/[ms]/g, "0");
                return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
            }
            else {
                // Set minutes and seconds to 0
                var timeFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
                return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiCalendarMinuteView.ctorParameters = function () { return [
        { type: Renderer2 }
    ]; };
    SuiCalendarMinuteView = __decorate([
        Component({
            selector: "sui-calendar-minute-view",
            template: "\n        <table\n            class=\"ui celled center aligned unstackable table three column minute\"\n        >\n            <thead>\n                <tr>\n                    <th colspan=\"4\">\n                        <sui-calendar-view-title\n                            [ranges]=\"ranges\"\n                            (zoomOut)=\"zoomOut()\"\n                        >\n                            {{ date }}\n                        </sui-calendar-view-title>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n                <tr *ngFor=\"let group of ranges.current.groupedItems\">\n                    <td\n                        class=\"link\"\n                        *ngFor=\"let item of group\"\n                        [calendarItem]=\"item\"\n                        (click)=\"setDate(item)\"\n                    >\n                        {{ item.humanReadable }}\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    "
        })
    ], SuiCalendarMinuteView);
    return SuiCalendarMinuteView;
}(CalendarView));

var CustomValidator = /** @class */ (function () {
    function CustomValidator(_host) {
        this._host = _host;
        this.onValidatorChange = function () { };
    }
    CustomValidator.prototype.validate = function (c) {
        return this._host.validate(c);
    };
    CustomValidator.prototype.registerOnValidatorChange = function (fn) {
        this.onValidatorChange = fn;
    };
    return CustomValidator;
}());
function customValidatorFactory(type) {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(function () { return type; }),
        multi: true
    };
}

var SuiPopupComponentController = /** @class */ (function (_super) {
    __extends(SuiPopupComponentController, _super);
    function SuiPopupComponentController(_renderer, element, _componentFactory, _component, _config) {
        var _this = _super.call(this, _renderer, element, _componentFactory, _config) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._component = _component;
        _this._config = _config;
        return _this;
    }
    Object.defineProperty(SuiPopupComponentController.prototype, "componentInstance", {
        get: function () {
            if (this._contentComponentRef) {
                return this._contentComponentRef.instance;
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiPopupComponentController.prototype.open = function () {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(this._component);
            this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
        }
        _super.prototype.open.call(this);
    };
    SuiPopupComponentController.prototype.cleanup = function () {
        _super.prototype.cleanup.call(this);
        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
            this._contentComponentRef = undefined;
        }
    };
    return SuiPopupComponentController;
}(SuiPopupController));

var SuiDatepickerDirective = /** @class */ (function (_super) {
    __extends(SuiDatepickerDirective, _super);
    function SuiDatepickerDirective(_renderer, element, _componentFactory, _localizationService) {
        var _this = _super.call(this, _renderer, element, _componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        })) || this;
        _this._renderer = _renderer;
        _this.element = element;
        _this._componentFactory = _componentFactory;
        _this._localizationService = _localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        _this._renderer.addClass(_this.popup.elementRef.nativeElement, "ui");
        _this._renderer.addClass(_this.popup.elementRef.nativeElement, "calendar");
        _this.onLocaleUpdate();
        _this._localizationService.onLanguageUpdate.subscribe(function () {
            return _this.onLocaleUpdate();
        });
        _this.onSelectedDateChange = new EventEmitter();
        _this.onValidatorChange = new EventEmitter();
        _this.mode = DatepickerMode.Datetime;
        return _this;
    }
    SuiDatepickerDirective_1 = SuiDatepickerDirective;
    Object.defineProperty(SuiDatepickerDirective.prototype, "selectedDate", {
        get: function () {
            return this._selectedDate;
        },
        set: function (date) {
            this._selectedDate = date;
            this.onSelectedDateChange.emit(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "mode", {
        get: function () {
            return this._mode;
        },
        set: function (mode) {
            this._mode = mode || DatepickerMode.Datetime;
            switch (this._mode) {
                case DatepickerMode.Year:
                    this.config = new YearConfig();
                    break;
                case DatepickerMode.Month:
                    this.config = new MonthConfig();
                    break;
                case DatepickerMode.Date:
                default:
                    this.config = new DateConfig();
                    break;
                case DatepickerMode.Datetime:
                    this.config = new DatetimeConfig();
                    break;
                case DatepickerMode.Time:
                    this.config = new TimeConfig();
                    break;
            }
            this.writeValue(this.selectedDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "localeValues", {
        get: function () {
            return this._localizationService.override(this._localeValues, this.localeOverrides);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "placement", {
        set: function (placement) {
            this.popup.config.placement = placement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "transition", {
        set: function (transition) {
            this.popup.config.transition = transition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerDirective.prototype, "transitionDuration", {
        set: function (duration) {
            this.popup.config.transitionDuration = duration;
        },
        enumerable: true,
        configurable: true
    });
    SuiDatepickerDirective.prototype.popupOnOpen = function () {
        var _this = this;
        if (this.componentInstance) {
            this.componentInstance.service.config = this.config;
            this.componentInstance.service.localeValues = this.localeValues;
            this.componentInstance.service.currentDate =
                this.initialDate || new Date();
            this.componentInstance.service.selectedDate = this.selectedDate;
            this.componentInstance.service.maxDate = this.maxDate;
            this.componentInstance.service.minDate = this.minDate;
            if (this.firstDayOfWeek != undefined) {
                this.componentInstance.service.firstDayOfWeek = this.firstDayOfWeek;
            }
            this.componentInstance.service.reset();
            this.componentInstance.service.onDateChange.subscribe(function (d) {
                _this.selectedDate = d;
                _this.close();
            });
        }
    };
    SuiDatepickerDirective.prototype.ngOnChanges = function (_a) {
        var maxDate = _a.maxDate, minDate = _a.minDate, mode = _a.mode;
        if (maxDate || minDate || mode) {
            this.onValidatorChange.emit();
        }
    };
    SuiDatepickerDirective.prototype.onLocaleUpdate = function () {
        this._localeValues = this._localizationService.get().datepicker;
    };
    SuiDatepickerDirective.prototype.validate = function (c) {
        var value = c.value;
        if (value != undefined) {
            // We post process the min & max date because sometimes this puts the date outside of the allowed range.
            if (this.minDate && value < this.minDate) {
                return {
                    suiMinDate: { required: this.minDate, actual: value }
                };
            }
            if (this.maxDate && value > this.maxDate) {
                return {
                    suiMaxDate: { required: this.maxDate, actual: value }
                };
            }
        }
        // Angular expects null
        // tslint:disable-next-line:no-null-keyword
        return null;
    };
    SuiDatepickerDirective.prototype.writeValue = function (value) {
        this.selectedDate = value;
        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = value;
        }
    };
    SuiDatepickerDirective.prototype.onKeyDown = function (e) {
        if (e.keyCode === KeyCode.Escape) {
            this.close();
        }
    };
    SuiDatepickerDirective.prototype.setRendererValue = function (element, value) {
        this._renderer.setProperty(element.nativeElement, "value", value || "");
    };
    var SuiDatepickerDirective_1;
    SuiDatepickerDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: SuiComponentFactory },
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        Input("pickerMode")
    ], SuiDatepickerDirective.prototype, "mode", null);
    __decorate([
        Input("pickerInitialDate")
    ], SuiDatepickerDirective.prototype, "initialDate", void 0);
    __decorate([
        Input("pickerMaxDate")
    ], SuiDatepickerDirective.prototype, "maxDate", void 0);
    __decorate([
        Input("pickerMinDate")
    ], SuiDatepickerDirective.prototype, "minDate", void 0);
    __decorate([
        Input("pickerFirstDayOfWeek")
    ], SuiDatepickerDirective.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Input("pickerLocaleOverrides")
    ], SuiDatepickerDirective.prototype, "localeOverrides", void 0);
    __decorate([
        Input("pickerPlacement")
    ], SuiDatepickerDirective.prototype, "placement", null);
    __decorate([
        Input("pickerTransition")
    ], SuiDatepickerDirective.prototype, "transition", null);
    __decorate([
        Input("pickerTransitionDuration")
    ], SuiDatepickerDirective.prototype, "transitionDuration", null);
    __decorate([
        Output("pickerSelectedDateChange")
    ], SuiDatepickerDirective.prototype, "onSelectedDateChange", void 0);
    __decorate([
        Output("pickerValidatorChange")
    ], SuiDatepickerDirective.prototype, "onValidatorChange", void 0);
    __decorate([
        HostListener("keydown", ["$event"])
    ], SuiDatepickerDirective.prototype, "onKeyDown", null);
    SuiDatepickerDirective = SuiDatepickerDirective_1 = __decorate([
        Directive({
            selector: "[suiDatepicker]",
            providers: [customValidatorFactory(SuiDatepickerDirective_1)]
        })
    ], SuiDatepickerDirective);
    return SuiDatepickerDirective;
}(SuiPopupComponentController));
var SuiDatepickerDirectiveValueAccessor = /** @class */ (function (_super) {
    __extends(SuiDatepickerDirectiveValueAccessor, _super);
    function SuiDatepickerDirectiveValueAccessor(host) {
        var _this = _super.call(this, host) || this;
        _this.host = host;
        return _this;
    }
    SuiDatepickerDirectiveValueAccessor_1 = SuiDatepickerDirectiveValueAccessor;
    var SuiDatepickerDirectiveValueAccessor_1;
    SuiDatepickerDirectiveValueAccessor.ctorParameters = function () { return [
        { type: SuiDatepickerDirective }
    ]; };
    SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = __decorate([
        Directive({
            selector: "[suiDatepicker]",
            host: { "(pickerSelectedDateChange)": "onChange($event)" },
            providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor_1)]
        })
    ], SuiDatepickerDirectiveValueAccessor);
    return SuiDatepickerDirectiveValueAccessor;
}(CustomValueAccessor));
var SuiDatepickerDirectiveValidator = /** @class */ (function (_super) {
    __extends(SuiDatepickerDirectiveValidator, _super);
    function SuiDatepickerDirectiveValidator(host) {
        var _this = _super.call(this, host) || this;
        _this.host = host;
        return _this;
    }
    SuiDatepickerDirectiveValidator_1 = SuiDatepickerDirectiveValidator;
    var SuiDatepickerDirectiveValidator_1;
    SuiDatepickerDirectiveValidator.ctorParameters = function () { return [
        { type: SuiDatepickerDirective }
    ]; };
    SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = __decorate([
        Directive({
            selector: "[suiDatepicker]",
            host: { "(pickerValidatorChange)": "onValidatorChange()" },
            providers: [customValidatorFactory(SuiDatepickerDirectiveValidator_1)]
        })
    ], SuiDatepickerDirectiveValidator);
    return SuiDatepickerDirectiveValidator;
}(CustomValidator));

var isWebView = isUAWebView__default || isUAWebView;
var SuiDatepickerInputDirective = /** @class */ (function () {
    function SuiDatepickerInputDirective(datepicker, valueAccessor, element, _localizationService) {
        var _this = this;
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this._localizationService = _localizationService;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
        _localizationService.onLanguageUpdate.subscribe(function () {
            return _this.updateValue(_this.selectedDateString);
        });
    }
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "useNativeOnMobile", {
        get: function () {
            return this._useNativeOnMobile;
        },
        set: function (fallback) {
            this._useNativeOnMobile = fallback;
            var isOnMobile = mobile || tablet || isWebView(navigator.userAgent);
            this.fallbackActive = this.useNativeOnMobile && isOnMobile;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "fallbackActive", {
        get: function () {
            return this._fallbackActive;
        },
        set: function (active) {
            this._fallbackActive = active;
            // If the fallback is active, then the trigger must be manual so the datepicker never opens.
            this.datepicker.popup.config.trigger = this.fallbackActive
                ? PopupTrigger.Manual
                : PopupTrigger.Focus;
            // Update the input value (this will insert the `T` as required).
            this.updateValue(this.selectedDateString);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "parser", {
        get: function () {
            if (this.fallbackActive) {
                return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
            }
            return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "selectedDateString", {
        get: function () {
            if (this.datepicker.selectedDate) {
                return this.parser.format(this.datepicker.selectedDate);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "type", {
        get: function () {
            if (this.fallbackActive) {
                return this.datepicker.config.fallback;
            }
            return "text";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "max", {
        get: function () {
            if (this.fallbackActive && this.datepicker.maxDate) {
                // Since HTML doesn't use a date object max is somewhat tricky.
                // Our Datepicker will always choose the 1st date on the provided precision,
                // meaning anything below the maxDate will work, hence endOf.
                var max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
                return this.parser.format(max);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuiDatepickerInputDirective.prototype, "min", {
        get: function () {
            if (this.fallbackActive && this.datepicker.minDate) {
                // Since HTML doesn't use a date object min is somewhat tricky.
                // We use 1 minute before the next date at the configured precision since
                // our Datepicker picks the first available date at that precision.
                var min = DateUtil.clone(this.datepicker.minDate);
                return this.parser.format(min);
            }
        },
        enumerable: true,
        configurable: true
    });
    SuiDatepickerInputDirective.prototype.updateValue = function (value) {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (!this._lastUpdateTyped) {
            this.datepicker.setRendererValue(this.element.nativeElement, value);
        }
        this._lastUpdateTyped = false;
    };
    SuiDatepickerInputDirective.prototype.typeValue = function (value) {
        this._lastUpdateTyped = true;
        this._currentInputValue = value;
        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }
        var parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    };
    SuiDatepickerInputDirective.prototype.onFocusOut = function () {
        this.valueAccessor.onTouched();
    };
    SuiDatepickerInputDirective.ctorParameters = function () { return [
        { type: SuiDatepickerDirective, decorators: [{ type: Host }] },
        { type: SuiDatepickerDirectiveValueAccessor, decorators: [{ type: Host }] },
        { type: ElementRef },
        { type: SuiLocalizationService }
    ]; };
    __decorate([
        Input("pickerUseNativeOnMobile")
    ], SuiDatepickerInputDirective.prototype, "useNativeOnMobile", null);
    __decorate([
        HostBinding("attr.type")
    ], SuiDatepickerInputDirective.prototype, "type", null);
    __decorate([
        HostBinding("attr.max")
    ], SuiDatepickerInputDirective.prototype, "max", null);
    __decorate([
        HostBinding("attr.min")
    ], SuiDatepickerInputDirective.prototype, "min", null);
    __decorate([
        HostListener("input", ["$event.target.value"])
    ], SuiDatepickerInputDirective.prototype, "typeValue", null);
    __decorate([
        HostListener("focusout")
    ], SuiDatepickerInputDirective.prototype, "onFocusOut", null);
    SuiDatepickerInputDirective = __decorate([
        Directive({
            selector: "input[suiDatepicker]"
        }),
        __param(0, Host()),
        __param(1, Host())
    ], SuiDatepickerInputDirective);
    return SuiDatepickerInputDirective;
}());

var SuiDatepickerModule = /** @class */ (function () {
    function SuiDatepickerModule() {
    }
    SuiDatepickerModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                SuiPopupModule,
                SuiLocalizationModule,
                SuiUtilityModule
            ],
            declarations: [
                SuiCalendarItem,
                SuiCalendarViewTitle,
                SuiCalendarYearView,
                SuiCalendarMonthView,
                SuiCalendarDateView,
                SuiCalendarHourView,
                SuiCalendarMinuteView,
                SuiDatepicker,
                SuiDatepickerDirective,
                SuiDatepickerDirectiveValueAccessor,
                SuiDatepickerDirectiveValidator,
                SuiDatepickerInputDirective
            ],
            exports: [
                SuiDatepickerDirective,
                SuiDatepickerDirectiveValueAccessor,
                SuiDatepickerDirectiveValidator,
                SuiDatepickerInputDirective
            ],
            entryComponents: [SuiDatepicker]
        })
    ], SuiDatepickerModule);
    return SuiDatepickerModule;
}());

var SuiModule = /** @class */ (function () {
    function SuiModule() {
    }
    SuiModule = __decorate([
        NgModule({
            exports: [
                // Collections
                SuiMessageModule,
                SuiPaginationModule,
                // Modules
                SuiAccordionModule,
                SuiCheckboxModule,
                SuiCollapseModule,
                SuiDatepickerModule,
                SuiDimmerModule,
                SuiDropdownModule,
                SuiModalModule,
                SuiPopupModule,
                SuiProgressModule,
                SuiRatingModule,
                SuiSearchModule,
                SuiSelectModule,
                SuiSidebarModule,
                SuiTabsModule,
                SuiTransitionModule,
                // Behaviors
                SuiLocalizationModule,
                // Misc
                SuiUtilityModule
            ]
        })
    ], SuiModule);
    return SuiModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { SuiModule, SuiMessageModule as ɵa, SuiTransitionModule as ɵb, PopupConfig as ɵba, SuiPopupConfig as ɵbb, SuiPopupArrow as ɵbc, SuiPopup as ɵbd, SuiLocalizationModule as ɵbe, SuiLocalizationService as ɵbf, SuiCalendarItem as ɵbg, SuiCalendarViewTitle as ɵbh, SuiCalendarYearView as ɵbi, CalendarView as ɵbj, CalendarRangeService as ɵbk, DatePrecision as ɵbl, SuiCalendarMonthView as ɵbm, SuiCalendarDateView as ɵbn, SuiCalendarHourView as ɵbo, SuiCalendarMinuteView as ɵbp, SuiDatepicker as ɵbq, SuiDatepickerDirective as ɵbr, SuiDatepickerDirectiveValueAccessor as ɵbs, SuiDatepickerDirectiveValidator as ɵbt, SuiPopupComponentController as ɵbu, CustomValidator as ɵbv, customValidatorFactory as ɵbw, SuiDatepickerInputDirective as ɵbx, SuiDimmerModule as ɵby, SuiDimmer as ɵbz, SuiTransition as ɵc, SuiDropdownModule as ɵca, SuiDropdown as ɵcb, SuiDropdownMenuItem as ɵcc, SuiDropdownMenu as ɵcd, SuiModalModule as ɵce, SuiModal as ɵcf, SuiModalService as ɵcg, SuiProgressModule as ɵch, SuiProgress as ɵci, SuiRatingModule as ɵcj, SuiRating as ɵck, SuiRatingValueAccessor as ɵcl, SuiSearchModule as ɵcm, SuiSearch as ɵcn, SuiSearchResult as ɵco, SuiSelectModule as ɵcp, SuiSelect as ɵcq, SuiSelectValueAccessor as ɵcr, SuiSelectBase as ɵcs, SuiSelectOption as ɵct, SuiSelectSearch as ɵcu, SuiMultiSelect as ɵcv, SuiMultiSelectValueAccessor as ɵcw, SuiMultiSelectLabel as ɵcx, SuiSidebarModule as ɵcy, SuiSidebar as ɵcz, SuiMessage as ɵd, SuiSidebarContainer as ɵda, SuiSidebarSibling as ɵdb, SuiTabsModule as ɵdc, SuiTabset as ɵdd, SuiTabHeader as ɵde, SuiTabContent as ɵdf, SuiPaginationModule as ɵe, SuiPagination as ɵf, SuiAccordionModule as ɵg, SuiCollapseModule as ɵh, SuiCollapse as ɵi, SuiAccordion as ɵj, SuiAccordionPanel as ɵk, SuiCheckboxModule as ɵl, SuiCheckbox as ɵm, SuiCheckboxValueAccessor as ɵn, CustomValueAccessor as ɵo, customValueAccessorFactory as ɵp, SuiRadio as ɵq, SuiRadioValueAccessor as ɵr, SuiRadioManager as ɵs, SuiDatepickerModule as ɵt, SuiPopupModule as ɵu, SuiUtilityModule as ɵv, SuiComponentFactory as ɵw, SuiPopupDirective as ɵx, SuiPopupTemplateController as ɵy, SuiPopupController as ɵz };
//# sourceMappingURL=ng2-semantic-ui.js.map
