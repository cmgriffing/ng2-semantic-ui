import { __decorate, __param } from 'tslib';
import { Renderer2, ElementRef, ChangeDetectorRef, Input, HostBinding, Directive, NgModule, EventEmitter, Output, Component, ContentChildren, forwardRef, ReflectiveInjector, ApplicationRef, ComponentFactoryResolver, Injector, Injectable, ViewChild, HostListener, ViewChildren, ViewContainerRef, TemplateRef, Host, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import Popper from 'popper.js';
import { format, parse } from 'date-fns';
import * as defaultLocale from 'date-fns/locale/en-US';
import * as $extend from 'extend';
import $extend__default, {  } from 'extend';
import { mobile, tablet } from 'bowser';
import * as isUAWebView from 'is-ua-webview';
import isUAWebView__default, {  } from 'is-ua-webview';
import 'element-closest';

// Possible directions for a transition.
var TransitionDirection;
(function (TransitionDirection) {
    TransitionDirection[TransitionDirection["In"] = 0] = "In";
    TransitionDirection[TransitionDirection["Out"] = 1] = "Out";
    TransitionDirection[TransitionDirection["Either"] = 2] = "Either";
    TransitionDirection[TransitionDirection["Static"] = 3] = "Static";
})(TransitionDirection || (TransitionDirection = {}));
class Transition {
    // Converts TransitionDirection to class name.
    get directionClass() {
        switch (this.direction) {
            case TransitionDirection.In: return "in";
            case TransitionDirection.Out: return "out";
        }
        return "";
    }
    constructor(name, duration = 250, direction = TransitionDirection.Either, onComplete = () => { }) {
        this.type = name;
        // We set a minimum duration of 1ms, to give the appearance of an immediate transition
        // whilst allowing positioning calculations to happen without a visible flicker.
        this.duration = Math.max(duration, 1);
        this.direction = direction;
        this.classes = this.type.split(" ");
        this.onComplete = onComplete;
    }
}

class TransitionController {
    // Used to delay animations until we have an element to animate.
    get _isReady() {
        return this._renderer != undefined && this._element != undefined && this._changeDetector != undefined;
    }
    get isAnimating() {
        return this._isAnimating;
    }
    get isVisible() {
        return this._isVisible;
    }
    get isHidden() {
        return this._isHidden;
    }
    // Gets the first transition in the queue.
    get _queueFirst() {
        return this._queue[0];
    }
    // Gets the last transition in the queue.
    get _queueLast() {
        return this._queue[this._queue.length - 1];
    }
    constructor(isInitiallyVisible = true, display = "block") {
        // isInitiallyVisible sets whether the element starts out visible.
        this._isVisible = isInitiallyVisible;
        this._isHidden = !this._isVisible;
        this._display = display;
        this._queue = [];
        this._isAnimating = false;
    }
    // Sets the renderer to be used for animating.
    registerRenderer(renderer) {
        this._renderer = renderer;
        this.performTransition();
    }
    // Sets the element to perform the animations on.
    registerElement(element) {
        this._element = element;
        this.performTransition();
    }
    // Sets the change detector to detect changes when using ChangeDetectionStrategy.OnPush.
    registerChangeDetector(changeDetector) {
        this._changeDetector = changeDetector;
        this.performTransition();
    }
    animate(transition) {
        // Test if transition is one of the list that doesn't change the visible state.
        // Should these eventually become classes?
        const isDirectionless = ["jiggle", "flash", "shake", "pulse", "tada", "bounce"].indexOf(transition.type) !== -1;
        if (isDirectionless) {
            transition.direction = TransitionDirection.Static;
        }
        else if (transition.direction == undefined || transition.direction === TransitionDirection.Either) {
            // Set the direction to the opposite of the current visible state automatically if not set, or set to either direction.
            transition.direction = this._isVisible ? TransitionDirection.Out : TransitionDirection.In;
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
    }
    performTransition() {
        if (!this._isReady || this._isAnimating || !this._queueFirst) {
            // Don't transition until we are ready, or if we are animating, or if there aren't any transitions in the queue.
            return;
        }
        this._isAnimating = true;
        const transition = this._queueFirst;
        // Set the Semantic UI classes for transitioning.
        transition.classes.forEach(c => this._renderer.addClass(this._element, c));
        this._renderer.addClass(this._element, `animating`);
        this._renderer.addClass(this._element, transition.directionClass);
        // Set the Semantic UI styles for transitioning.
        this._renderer.setStyle(this._element, `animationDuration`, `${transition.duration}ms`);
        this._renderer.setStyle(this._element, `display`, this._display);
        if (transition.direction === TransitionDirection.In) {
            // Unset hidden if we are transitioning in.
            this._isHidden = false;
        }
        // Wait the length of the animation before calling the complete callback.
        this._animationTimeout = window.setTimeout(() => this.finishTransition(transition), transition.duration);
    }
    // Called when a transition has completed.
    finishTransition(transition) {
        // Unset the Semantic UI classes & styles for transitioning.
        transition.classes.forEach(c => this._renderer.removeClass(this._element, c));
        this._renderer.removeClass(this._element, `animating`);
        this._renderer.removeClass(this._element, transition.directionClass);
        this._renderer.removeStyle(this._element, `animationDuration`);
        this._renderer.removeStyle(this._element, `display`);
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
    }
    // Stops the current transition, leaves the rest of the queue intact.
    stop(transition = this._queueFirst) {
        if (!transition || !this._isAnimating) {
            return;
        }
        clearTimeout(this._animationTimeout);
        this.finishTransition(transition);
    }
    // Stops the current transition, and empties the queue.
    stopAll() {
        this.clearQueue();
        this.stop();
    }
    // Empties the transition queue but carries on with the current transition.
    clearQueue() {
        if (this.isAnimating) {
            this._queue = [this._queueFirst];
            return;
        }
        this._queue = [];
    }
}

let SuiTransition = class SuiTransition {
    constructor(_renderer, _element, _changeDetector) {
        this._renderer = _renderer;
        this._element = _element;
        this._changeDetector = _changeDetector;
        this.transitionClass = true;
    }
    set suiTransition(tC) {
        // Set the transition controller (e.g. '<div [suiTransition]="transitionController"></div>').
        this.setTransitionController(tC);
    }
    get isVisible() {
        if (this._controller) {
            return this._controller.isVisible;
        }
        return false;
    }
    get isHidden() {
        if (this._controller) {
            return this._controller.isHidden;
        }
        return false;
    }
    // Initialises the controller with the injected renderer and elementRef.
    setTransitionController(transitionController) {
        this._controller = transitionController;
        this._controller.registerRenderer(this._renderer);
        this._controller.registerElement(this._element.nativeElement);
        this._controller.registerChangeDetector(this._changeDetector);
    }
};
SuiTransition.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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

let SuiTransitionModule = class SuiTransitionModule {
};
SuiTransitionModule = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [
            SuiTransition
        ],
        exports: [
            SuiTransition
        ],
        providers: []
    })
], SuiTransitionModule);

let SuiMessage = class SuiMessage {
    constructor() {
        this.isDismissable = true;
        this.onDismiss = new EventEmitter();
        this.isDismissed = false;
        this.transitionController = new TransitionController();
        this.transition = "fade";
        this.transitionDuration = 300;
        this.class = "";
    }
    dismiss() {
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
            this.isDismissed = true;
            this.onDismiss.emit(this);
        }));
    }
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
        template: `
<div class="ui message {{ class }}" *ngIf="!isDismissed" [suiTransition]="transitionController">
    <i class="close icon" *ngIf="isDismissable" (click)="dismiss()"></i>
    <ng-content></ng-content>
</div>
`,
        styles: [`
/* Fix for CSS Bug */
.ui.icon.visible.message {
    display: flex !important;
}
`]
    })
], SuiMessage);

let SuiMessageModule = class SuiMessageModule {
};
SuiMessageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiTransitionModule
        ],
        declarations: [
            SuiMessage
        ],
        exports: [
            SuiMessage
        ]
    })
], SuiMessageModule);

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

let SuiPaginationModule = class SuiPaginationModule {
};
SuiPaginationModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [SuiPagination],
        declarations: [SuiPagination],
        providers: []
    })
], SuiPaginationModule);

let SuiAccordionPanel = class SuiAccordionPanel {
    constructor(_changeDetector) {
        this._changeDetector = _changeDetector;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.isOpenChange = new EventEmitter(false);
    }
    set service(service) {
        this._service = service;
        this._changeDetector.detectChanges();
    }
    get isOpen() {
        return this._isOpen;
    }
    set isOpen(value) {
        // Convert to boolean (fixes false != undefined)
        const isOpen = !!value;
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
    }
    get transition() {
        if (this._service) {
            return this._service.transition;
        }
        return "fade";
    }
    get transitionDuration() {
        if (this._service) {
            // Return the service defined transition duration.
            return this._service.transitionDuration;
        }
        // Revert to instantaneous if the service is not yet loaded.
        return 0;
    }
    toggle() {
        if (!this.isDisabled) {
            this.isOpen = !this.isOpen;
        }
    }
};
SuiAccordionPanel.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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
        template: `
<!-- Title -->
<div class="title" [class.active]="isOpen" (click)="toggle()" >
    <ng-content select="[title]"></ng-content>
</div>
<!-- Content -->
<div [suiCollapse]="!isOpen" [collapseDuration]="transitionDuration">
    <div class="content" [class.active]="isOpen" [suiTransition]="transitionController">
        <ng-content select="[content]"></ng-content>
    </div>
</div>
`,
        styles: [`
/* Manual style as Semantic UI relies on > selector */
.content {
    padding: .5em 0 1em;
}

/* Another > selector fix */
:host:first-child .title {
    border-top: none;
}
`]
    })
], SuiAccordionPanel);

class SuiAccordionService {
    constructor() {
        this.closeOthers = true;
        this.transition = "fade";
        this.transitionDuration = 350;
        this.panels = [];
    }
    addPanel(panel) {
        panel.service = this;
        this.panels.push(panel);
    }
    closeOtherPanels(panel) {
        if (!this.closeOthers) {
            return;
        }
        this.panels.forEach(p => {
            if (p !== panel) {
                p.isOpen = false;
            }
        });
    }
}

let SuiAccordion = class SuiAccordion {
    constructor() {
        // Accordion service is unique to each set of panels.
        this._service = new SuiAccordionService();
        this.accordionClasses = true;
    }
    get closeOthers() {
        return this._service.closeOthers;
    }
    set closeOthers(value) {
        this._service.closeOthers = value;
    }
    set transition(transition) {
        this._service.transition = transition;
    }
    set transitionDuration(duration) {
        this._service.transitionDuration = duration;
    }
    ngAfterContentInit() {
        this.updatePanels();
        // Reconnect panels after they have updated.
        this._panels.changes.subscribe(() => this.updatePanels());
    }
    updatePanels() {
        this._panels.forEach(p => this._service.addPanel(p));
    }
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
        template: `
<ng-content></ng-content>
`,
        styles: [`
/* Fix for general styling issues */
:host {
    display: block;
}

/* Fix for styled border issue */
:host.styled sui-accordion-panel:first-child .title {
    border-top: none
}
`]
    })
], SuiAccordion);

let SuiCollapse = class SuiCollapse {
    constructor(_element, _renderer) {
        this._element = _element;
        this._renderer = _renderer;
        this._pristine = true;
        // Collapse animation duration is 350ms by default.
        this.collapseDuration = 350;
        this.isExpanded = false;
        this.isCollapsing = false;
    }
    // Set when the collapse is closed, and not animating.
    get isCollapsed() {
        return !this.isExpanded && !this.isCollapsing;
    }
    get suiCollapse() {
        return this.isExpanded;
    }
    // Sets the state of the collapse, `true` is collapsed.
    set suiCollapse(value) {
        if (value) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    get _animationDuration() {
        return this._pristine ? 0 : this.collapseDuration;
    }
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        // Forcibly hide the overflow so that content is not visible past the boundaries of its container.
        this._renderer.setStyle(this._element.nativeElement, "overflow", "hidden");
        // Animate the host element from its scroll height to 0.
        this.animate(this._element.nativeElement.scrollHeight, 0, false, () => {
            this.isCollapsing = false;
        });
    }
    show() {
        this.isCollapsing = true;
        // Animate the host element from its offset height to its scroll height.
        this.animate(this._element.nativeElement.offsetHeight, this._element.nativeElement.scrollHeight, true, () => {
            // Remove the overflow override to enable user styling once again.
            this._renderer.removeStyle(this._element.nativeElement, "overflow");
            this.isCollapsing = false;
            this.isExpanded = true;
        });
    }
    animate(startHeight, endHeight, removeOnComplete = false, callback = () => { }) {
        const heightFrames = [
            {
                offset: 0,
                height: `${startHeight}px`
            },
            {
                offset: 1,
                height: `${endHeight}px`
            }
        ];
        if (removeOnComplete) {
            heightFrames.push({
                offset: 1,
                height: `auto`
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
        setTimeout(() => callback(), this.collapseDuration);
    }
};
SuiCollapse.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
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

let SuiCollapseModule = class SuiCollapseModule {
};
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

let SuiAccordionModule = class SuiAccordionModule {
};
SuiAccordionModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiCollapseModule,
            SuiTransitionModule
        ],
        declarations: [
            SuiAccordion,
            SuiAccordionPanel
        ],
        exports: [
            SuiAccordion,
            SuiAccordionPanel
        ],
        providers: []
    })
], SuiAccordionModule);

class CustomValidator {
    constructor(_host) {
        this._host = _host;
        this.onValidatorChange = () => { };
    }
    validate(c) {
        return this._host.validate(c);
    }
    registerOnValidatorChange(fn) {
        this.onValidatorChange = fn;
    }
}
function customValidatorFactory(type) {
    return {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

class CustomValueAccessor {
    constructor(_host) {
        this._host = _host;
        this.onChange = () => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        this._host.writeValue(value);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
function customValueAccessorFactory(type) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => type),
        multi: true
    };
}

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
class HandledEvent {
}
const Util = {
    Array: {
        range(n, offset = 0) {
            return Array(n)
                .fill(0)
                .map((z, i) => i + offset);
        },
        group(items, groupLength) {
            const mutable = items.slice(0);
            const groups = [];
            while (mutable.length > 0) {
                groups.push(mutable.splice(0, groupLength));
            }
            return groups;
        },
        groupBy(items, field) {
            return items.reduce((groups, i) => {
                const fieldValue = i[field].toString();
                groups[fieldValue] = groups[fieldValue] || [];
                groups[fieldValue].push(i);
                return groups;
            }, Object());
        },
        flatten(items) {
            return items.reduce((is, i) => is.concat(i), []);
        }
    },
    String: {
        padLeft(str, length, padding) {
            let s = str;
            while (s.length < length) {
                s = padding + s;
            }
            return s;
        }
    },
    DOM: {
        parseBooleanAttribute(attributeValue) {
            let value = attributeValue;
            if (typeof attributeValue === "string") {
                value = true;
            }
            return value;
        }
    },
    Object: {
        readValue(object, path) {
            if (!path) {
                return object;
            }
            let recursed;
            for (let i = 0, p = path.split("."), len = p.length; i < len; i++) {
                recursed = object[p[i]];
            }
            return recursed;
        }
    },
    Math: {
        round(r, n) {
            return Math.round(r / n) * n;
        },
        roundUp(r, n) {
            return Math.ceil(r / n) * n;
        },
        roundDown(r, n) {
            return Math.floor(r / n) * n;
        },
        mod(r, n) {
            const rem = r % n;
            if (rem < 0) {
                return rem + n;
            }
            return rem;
        }
    }
};

var DatePrecision;
(function (DatePrecision) {
    DatePrecision[DatePrecision["Decade"] = 0] = "Decade";
    DatePrecision[DatePrecision["Year"] = 1] = "Year";
    DatePrecision[DatePrecision["Month"] = 2] = "Month";
    DatePrecision[DatePrecision["Date"] = 3] = "Date";
    DatePrecision[DatePrecision["Hour"] = 4] = "Hour";
    DatePrecision[DatePrecision["Minute"] = 5] = "Minute";
})(DatePrecision || (DatePrecision = {}));
const DateUtil = {
    startOf(precision, date, resetAll = false) {
        switch (precision) {
            case DatePrecision.Decade:
                const start = Math.floor(date.getFullYear() / 10) * 10 + 1;
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
    endOf(precision, date) {
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
    equal(precision, a, b) {
        let equal = true;
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
    next(precision, date) {
        return DateUtil.add(precision, date, 1);
    },
    add(precision, date, i) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
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
    previous(precision, date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
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
                const hours = date.getHours();
                date.setHours(hours - 1);
                if (date.getHours() !== Util.Math.mod(hours - 1, 24)) {
                    date.setHours(hours - 2);
                }
                break;
            case DatePrecision.Minute:
                const minutes = date.getMinutes();
                date.setMinutes(minutes - 1);
        }
        return date;
    },
    clone(date) {
        return new Date(date.getTime());
    }
};

let SuiComponentFactory = class SuiComponentFactory {
    constructor(_applicationRef, _componentFactoryResolver, _injector) {
        this._applicationRef = _applicationRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
    }
    createComponent(type, providers = []) {
        // Resolve a factory for creating components of type `type`.
        const factory = this._componentFactoryResolver.resolveComponentFactory(type);
        // Resolve and create an injector with the specified providers.
        const injector = ReflectiveInjector.resolveAndCreate(providers, this._injector);
        // Create a component using the previously resolved factory & injector.
        const componentRef = factory.create(injector);
        return componentRef;
    }
    createView(viewContainer, template, context) {
        viewContainer.createEmbeddedView(template, context);
    }
    // Inserts the component into the specified view container.
    attachToView(componentRef, viewContainer) {
        viewContainer.insert(componentRef.hostView, 0);
    }
    // Inserts the component in the root application node.
    attachToApplication(componentRef) {
        this._applicationRef.attachView(componentRef.hostView);
    }
    // Detaches the component from the root application node.
    detachFromApplication(componentRef) {
        this._applicationRef.detachView(componentRef.hostView);
    }
    // Moves the component to the specified DOM element.
    moveToElement(componentRef, element) {
        element.appendChild(componentRef.location.nativeElement);
    }
    // Moves the component to the document body.
    moveToDocumentBody(componentRef) {
        this.moveToElement(componentRef, document.querySelector("body"));
    }
    detachFromDocument(componentRef) {
        const element = componentRef.location.nativeElement;
        // We can't use `element.remove()` due to lack of IE11 support.
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
};
SuiComponentFactory.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
SuiComponentFactory = __decorate([
    Injectable()
], SuiComponentFactory);

const PositioningPlacement = {
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
    const [direction, alignment] = placement.split(" ");
    // Direction alone covers case of just `top`, `left`, `bottom`, `right`.
    const chosenPlacement = [direction];
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
    const [direction, alignment] = popper.split("-");
    const chosenPlacement = [direction];
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
class PositioningService {
    get placement() {
        return this._placement;
    }
    set placement(placement) {
        this._placement = placement;
        this._popper.options.placement = placementToPopper(placement);
        this.update();
    }
    get actualPlacement() {
        if (!this._popperState) {
            return PositioningPlacement.Auto;
        }
        return popperToPlacement(this._popperState.placement);
    }
    get state() {
        return this._popperState;
    }
    constructor(anchor, subject, placement, arrowSelector) {
        this.anchor = anchor;
        this.subject = subject;
        this._placement = placement;
        const modifiers = {
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
            modifiers,
            onCreate: initial => this._popperState = initial,
            onUpdate: update => this._popperState = update
        });
    }
    update() {
        this._popper.update();
    }
    destroy() {
        this._popper.destroy();
    }
}

let SuiUtilityModule = class SuiUtilityModule {
};
SuiUtilityModule = __decorate([
    NgModule({
        imports: [CommonModule],
        providers: [
            SuiComponentFactory
        ]
    })
], SuiUtilityModule);

var SuiCheckboxValueAccessor_1;
let SuiCheckbox = class SuiCheckbox {
    constructor() {
        this.isChecked = false;
        this.onCheckChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.checkboxClasses = true;
    }
    get checkedAttribute() {
        return this.isChecked ? "" : undefined;
    }
    get isDisabledAttribute() {
        return this.isDisabled ? "disabled" : undefined;
    }
    onMouseDown(e) {
        e.preventDefault();
    }
    onClick() {
        if (!this.isDisabled && !this.isReadonly) {
            this.toggle();
            this.focusCheckbox();
        }
    }
    onFocusOut() {
        this.onTouched.emit();
    }
    toggle() {
        this.isChecked = !this.isChecked;
        this.onCheckChange.emit(this.isChecked);
    }
    writeValue(value) {
        this.isChecked = value;
    }
    focusCheckbox() {
        this._checkboxElement.nativeElement.focus();
    }
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
], SuiCheckbox.prototype, "_checkboxElement", void 0);
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
        template: `
        <input
            class="hidden"
            type="checkbox"
            [attr.name]="name"
            [attr.checked]="checkedAttribute"
            [attr.disabled]="isDisabledAttribute"
            [(ngModel)]="isChecked"
            #checkbox
        />
        <label>
            <ng-content></ng-content>
        </label>
    `
    })
], SuiCheckbox);
let SuiCheckboxValueAccessor = SuiCheckboxValueAccessor_1 = class SuiCheckboxValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiCheckboxValueAccessor.ctorParameters = () => [
    { type: SuiCheckbox }
];
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

var SuiRadioValueAccessor_1;
let SuiRadio = class SuiRadio {
    constructor() {
        this.radioClasses = true;
        this.isChecked = false;
        this.onCurrentValueChange = new EventEmitter();
        this.onTouched = new EventEmitter();
        this.isDisabled = false;
        this.isReadonly = false;
        this.radioClasses = true;
    }
    get checkedAttribute() {
        return this.isChecked ? "" : undefined;
    }
    get isDisabledAttribute() {
        return this.isDisabled ? "disabled" : undefined;
    }
    onMouseDown(e) {
        e.preventDefault();
    }
    onClick() {
        if (!this.isDisabled && !this.isReadonly) {
            this.currentValue = this.value;
            this.onCurrentValueChange.emit(this.currentValue);
            this.update();
            this.focusRadio();
        }
    }
    onFocusOut() {
        this.onTouched.emit();
    }
    update() {
        this.isChecked = this.currentValue === this.value;
    }
    writeValue(value) {
        this.currentValue = value;
        this.update();
    }
    focusRadio() {
        this._radioElement.nativeElement.focus();
    }
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
], SuiRadio.prototype, "_radioElement", void 0);
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
        template: `
        <input
            class="hidden"
            type="checkbox"
            [attr.name]="name"
            [attr.checked]="checkedAttribute"
            [attr.disabled]="isDisabledAttribute"
            [ngModel]="isChecked"
            (ngModel)="currentValue = value"
            #radio
        />
        <label>
            <ng-content></ng-content>
        </label>
    `
    })
], SuiRadio);
let SuiRadioValueAccessor = SuiRadioValueAccessor_1 = class SuiRadioValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiRadioValueAccessor.ctorParameters = () => [
    { type: SuiRadio }
];
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

var SuiRadioManager_1;
let SuiRadioManager = SuiRadioManager_1 = class SuiRadioManager {
    constructor(element) {
        this.element = element;
        this.isNested = false;
        this._radioSubs = [];
    }
    ngAfterContentInit() {
        this.updateNesting();
        this._subManagers.changes.subscribe(() => this.updateNesting());
        this.updateRadios();
        this._renderedRadios.changes.subscribe(() => this.updateRadios());
    }
    updateNesting() {
        this._subManagers
            .filter(m => m !== this)
            .forEach(m => m.isNested = true);
    }
    updateRadios() {
        this._radioSubs.forEach(s => s.unsubscribe());
        this._radioSubs = [];
        const groups = Util.Array.groupBy(this._renderedRadios.toArray(), "name");
        Object
            .keys(groups)
            .map(k => groups[k])
            .forEach(g => g
            .forEach(r => this._radioSubs
            .push(r.onCurrentValueChange
            .subscribe((v) => {
            if (!this.isNested) {
                g.forEach(radio => radio.writeValue(v));
            }
        }))));
    }
};
SuiRadioManager.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    ContentChildren(SuiRadioManager_1, { descendants: true })
], SuiRadioManager.prototype, "_subManagers", void 0);
__decorate([
    ContentChildren(SuiRadio, { descendants: true })
], SuiRadioManager.prototype, "_renderedRadios", void 0);
SuiRadioManager = SuiRadioManager_1 = __decorate([
    Directive({
        selector: "form:not([ngForm]):not([[ngForm]]),ngForm,[ngForm]"
    })
], SuiRadioManager);

let SuiCheckboxModule = class SuiCheckboxModule {
};
SuiCheckboxModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule
        ],
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

var CalendarMode;
(function (CalendarMode) {
    CalendarMode[CalendarMode["DateOnly"] = 0] = "DateOnly";
    CalendarMode[CalendarMode["TimeOnly"] = 1] = "TimeOnly";
    CalendarMode[CalendarMode["Both"] = 2] = "Both";
})(CalendarMode || (CalendarMode = {}));
class CalendarService {
    constructor(config, localeValues) {
        this.localeValues = localeValues;
        this.onManualUpdate = () => { };
        this.config = config;
        this.currentDate = new Date();
        this.firstDayOfWeek = this.localeValues.firstDayOfWeek;
        this.onDateChange = new EventEmitter();
        this.reset();
    }
    get config() {
        return this._config;
    }
    set config(config) {
        this._config = config;
        config.updateBounds(this._selectedDate || this.currentDate);
    }
    get inFinalView() {
        return this.currentView === this.config.mappings.finalView;
    }
    get selectedDate() {
        return this._selectedDate;
    }
    set selectedDate(date) {
        if (date) {
            this._selectedDate = DateUtil.clone(date);
            this.currentDate = DateUtil.clone(date);
        }
        else {
            this._selectedDate = undefined;
        }
        this.config.updateBounds(this._selectedDate || this.currentDate);
        this.onManualUpdate();
    }
    get minDate() {
        if (this._minDate && this.config.dateMinBound) {
            return this._minDate > this.config.dateMinBound ? this._minDate : this.config.dateMinBound;
        }
        return this._minDate || this.config.dateMinBound;
    }
    set minDate(min) {
        this._minDate = min;
    }
    get maxDate() {
        if (this._maxDate && this.config.dateMaxBound) {
            return this._maxDate < this.config.dateMaxBound ? this._maxDate : this.config.dateMaxBound;
        }
        return this._maxDate || this.config.dateMaxBound;
    }
    set maxDate(max) {
        this._maxDate = max;
    }
    get firstDayOfWeek() {
        return this._firstDayOfWeek;
    }
    set firstDayOfWeek(firstDayOfWeek) {
        if (firstDayOfWeek != undefined) {
            this._firstDayOfWeek = Math.max(0, Math.min(6, firstDayOfWeek));
        }
    }
    reset() {
        this.currentView = this.config.mappings.finalView;
        if (!this._selectedDate) {
            let current = this.currentDate.getTime();
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
    }
    changeDate(date, fromView) {
        this.currentDate = date;
        if (fromView === this.config.mappings.finalView) {
            this.selectedDate = date;
            return this.onDateChange.emit(date);
        }
        this.updateView(this.config.mappings.changed, fromView);
    }
    zoomOut(fromView) {
        this.updateView(this.config.mappings.zoom, fromView);
    }
    updateView(mappings, fromView) {
        const mapping = mappings.get(fromView);
        if (mapping == undefined) {
            throw new Error("Unknown view type.");
        }
        this.currentView = mapping;
    }
}

class CalendarItem {
    constructor(date) {
        this.date = date;
    }
}
let SuiCalendarItem = class SuiCalendarItem {
    constructor(changeDetector) {
        this.changeDetector = changeDetector;
        this.hasFocus = false;
        this.onFocussed = new EventEmitter();
    }
    get isSelectable() {
        return this.item.isSelectable;
    }
    get isActive() {
        return this.item.isActive;
    }
    get isToday() {
        return this.item.isToday;
    }
    onMouseMove() {
        if (!this.hasFocus) {
            this.hasFocus = true;
            this.onFocussed.emit(this.hasFocus);
        }
    }
    onMouseLeave() {
        this.hasFocus = false;
        this.onFocussed.emit(this.hasFocus);
    }
};
SuiCalendarItem.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
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

var CalendarViewType;
(function (CalendarViewType) {
    CalendarViewType[CalendarViewType["Year"] = 0] = "Year";
    CalendarViewType[CalendarViewType["Month"] = 1] = "Month";
    CalendarViewType[CalendarViewType["Date"] = 2] = "Date";
    CalendarViewType[CalendarViewType["Hour"] = 3] = "Hour";
    CalendarViewType[CalendarViewType["Minute"] = 4] = "Minute";
})(CalendarViewType || (CalendarViewType = {}));
class CalendarView {
    constructor(renderer, viewType, ranges) {
        this._type = viewType;
        this.ranges = ranges;
        this._documentKeyDownListener = renderer.listen("document", "keydown", (e) => this.onDocumentKeyDown(e));
    }
    set service(service) {
        this._service = service;
        this.ranges.loadService(service);
        this.service.onManualUpdate = () => {
            this.ranges.refresh();
            delete this._highlightedItem;
            this.autoHighlight();
        };
    }
    get service() {
        return this._service;
    }
    get currentDate() {
        return this.service.currentDate;
    }
    get selectedDate() {
        return this.service.selectedDate;
    }
    // Template Methods
    setDate(item) {
        this.service.changeDate(item.date, this._type);
    }
    zoomOut() {
        this.service.zoomOut(this._type);
    }
    // Keyboard Control
    ngAfterViewInit() {
        this._renderedItems.changes.subscribe(() => this.onRenderedItemsChanged());
        this.onRenderedItemsChanged();
    }
    onRenderedItemsChanged() {
        this._renderedItems.forEach(i => i.onFocussed.subscribe((hasFocus) => {
            if (hasFocus) {
                this.highlightItem(i.item);
            }
        }));
        this.autoHighlight();
        this.highlightItem(this._highlightedItem);
    }
    autoHighlight() {
        let date = this.selectedDate && this.ranges.current.containsDate(this.selectedDate) ? this.selectedDate : this.currentDate;
        if (this._highlightedItem && this.ranges.current.containsDate(this._highlightedItem.date)) {
            date = this._highlightedItem.date;
        }
        const initiallyHighlighted = this.ranges.current.items.find(i => this.ranges.dateComparer.equal(i.date, date));
        if (initiallyHighlighted && !initiallyHighlighted.isDisabled) {
            this._highlightedItem = initiallyHighlighted;
        }
    }
    highlightItem(item) {
        if (item) {
            this._renderedItems.forEach(i => i.hasFocus = false);
            const rendered = this._renderedItems.find(ri => ri.item === item);
            if (rendered && !rendered.hasFocus) {
                rendered.hasFocus = true;
                rendered.changeDetector.detectChanges();
            }
            this._highlightedItem = item;
        }
    }
    onDocumentKeyDown(e) {
        if (this._highlightedItem && e.keyCode === KeyCode.Enter) {
            this.setDate(this._highlightedItem);
            return;
        }
        if (!this._highlightedItem) {
            this.autoHighlight();
        }
        const index = this.ranges.current.findIndex(this._highlightedItem);
        let isMovingForward = true;
        let delta = 0;
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
        let nextItem = this.ranges.current.items[index + delta];
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
            let adjustedIndex = this.ranges.current.findIndex(this._highlightedItem);
            const nextItems = this.ranges.calc(isMovingForward).inRange;
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
    }
    ngOnDestroy() {
        this._documentKeyDownListener();
    }
}
__decorate([
    ViewChildren(SuiCalendarItem)
], CalendarView.prototype, "_renderedItems", void 0);
__decorate([
    Input()
], CalendarView.prototype, "service", null);

class CalendarMappings {
}
class DateMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Date;
        this.finalView = CalendarViewType.Date;
        this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Date]
        ]);
        this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month]
        ]);
    }
}
class TimeMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Hour;
        this.finalView = CalendarViewType.Minute;
        this.changed = new Map([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);
        this.zoom = new Map([
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Hour]
        ]);
    }
}
class DatetimeMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Date;
        this.finalView = CalendarViewType.Minute;
        this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Date],
            [CalendarViewType.Date, CalendarViewType.Hour],
            [CalendarViewType.Hour, CalendarViewType.Minute],
            [CalendarViewType.Minute, CalendarViewType.Minute]
        ]);
        this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Date],
            [CalendarViewType.Month, CalendarViewType.Year],
            [CalendarViewType.Date, CalendarViewType.Month],
            [CalendarViewType.Hour, CalendarViewType.Date],
            [CalendarViewType.Minute, CalendarViewType.Hour]
        ]);
    }
}
class MonthMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Month;
        this.finalView = CalendarViewType.Month;
        this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Month]
        ]);
        this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Month],
            [CalendarViewType.Month, CalendarViewType.Year]
        ]);
    }
}
class YearMappings extends CalendarMappings {
    constructor() {
        super();
        this.initialView = CalendarViewType.Year;
        this.finalView = CalendarViewType.Year;
        this.changed = new Map([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);
        this.zoom = new Map([
            [CalendarViewType.Year, CalendarViewType.Year]
        ]);
    }
}

class CalendarConfig {
    constructor(mode, precision, mappings, fallback) {
        this.mode = mode;
        this.precision = precision;
        this.mappings = mappings;
        this.fallback = fallback;
    }
    updateBounds(providedDate) {
        this.dateMinBound = DateUtil.startOf(DatePrecision.Year, new Date(), true);
        this.dateMinBound.setFullYear(0);
    }
}
class DateConfigBase extends CalendarConfig {
    constructor(precision, mappings, fallback) {
        super(CalendarMode.DateOnly, precision, mappings, fallback);
    }
}
class YearConfig extends DateConfigBase {
    constructor() {
        super(DatePrecision.Year, new YearMappings(), "number");
    }
}
class MonthConfig extends DateConfigBase {
    constructor() {
        super(DatePrecision.Month, new MonthMappings(), "month");
    }
}
class DateConfig extends DateConfigBase {
    constructor() {
        super(DatePrecision.Date, new DateMappings(), "date");
    }
}
class DatetimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.Both, DatePrecision.Minute, new DatetimeMappings(), "datetime-local");
    }
}
class TimeConfig extends CalendarConfig {
    constructor() {
        super(CalendarMode.TimeOnly, DatePrecision.Minute, new TimeMappings(), "time");
    }
    updateBounds(providedDate) {
        this.dateMaxBound = DateUtil.endOf(DatePrecision.Date, DateUtil.clone(providedDate));
        this.dateMinBound = DateUtil.previous(DatePrecision.Date, DateUtil.clone(this.dateMaxBound));
    }
}

class DateComparer {
    constructor(precision, isSmallest) {
        this._precision = precision;
        this._isSmallest = isSmallest;
    }
    equal(a, b) {
        if (this._precision === DatePrecision.Minute) {
            return !!b &&
                DateUtil.equal(DatePrecision.Hour, b, a) &&
                Util.Math.roundDown(b.getMinutes(), 5) === Util.Math.roundDown(a.getMinutes(), 5);
        }
        return !!b && DateUtil.equal(this._precision, a, b);
    }
    lessThan(a, b) {
        if (this._isSmallest) {
            return !b || (b >= a);
        }
        return !b || (DateUtil.endOf(this._precision, DateUtil.clone(b)) >= a);
    }
    greaterThan(a, b) {
        if (this._isSmallest) {
            return !b || (b <= a);
        }
        return !b || (DateUtil.startOf(this._precision, DateUtil.clone(b)) <= a);
    }
    between(date, left, right) {
        return this.greaterThan(date, left) && this.lessThan(date, right);
    }
}

function buildLocalizeFn(values, defaultType, indexCallback) {
    return (dirtyIndex, { type } = { type: defaultType }) => {
        const index = indexCallback ? indexCallback(dirtyIndex) : dirtyIndex;
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
    return ({ type } = { type: defaultType }) => values[type || -1];
}
function buildMatchFn(patterns, defaultType) {
    return (dirtyString, { type } = { type: defaultType }) => dirtyString.match(`^(${patterns[type || -1].join("|")})`);
}
function buildParseFn(patterns, defaultType) {
    return ([, result], { type } = { type: defaultType }) => (patterns[type || -1] || patterns[defaultType])
        .map((p) => new RegExp(`^${p}`))
        .findIndex((pattern) => pattern.test(result));
}
class DateFnsParser {
    get _config() {
        return {
            weekStartsOn: this._weekStartsOn,
            locale: this._locale
        };
    }
    constructor(locale) {
        this._weekStartsOn = locale.firstDayOfWeek;
        const weekdayValues = {
            long: locale.weekdays,
            short: locale.weekdaysShort,
            narrow: locale.weekdaysNarrow
        };
        const monthValues = {
            long: locale.months,
            short: locale.monthsShort
        };
        const timeOfDayValues = {
            long: locale.timesOfDay,
            uppercase: locale.timesOfDayUppercase,
            lowercase: locale.timesOfDayLowercase
        };
        const timeOfDayMatchValues = {
            long: locale.timesOfDay,
            short: locale.timesOfDayUppercase.concat(locale.timesOfDayLowercase)
        };
        this._locale = defaultLocale;
        this._locale.localize = Object.assign({}, this._locale.localize, {
            weekday: buildLocalizeFn(weekdayValues, "long"),
            weekdays: buildLocalizeArrayFn(weekdayValues, "long"),
            month: buildLocalizeFn(monthValues, "long"),
            months: buildLocalizeArrayFn(monthValues, "long"),
            timeOfDay: buildLocalizeFn(timeOfDayValues, "long", (hours) => {
                return hours / 12 >= 1 ? 1 : 0;
            }),
            timesOfDay: buildLocalizeArrayFn(timeOfDayValues, "long")
        });
        this._locale.match = Object.assign({}, this._locale.match, {
            weekdays: buildMatchFn(weekdayValues, "long"),
            weekday: buildParseFn(weekdayValues, "long"),
            months: buildMatchFn(monthValues, "long"),
            month: buildParseFn(monthValues, "long"),
            timesOfDay: buildMatchFn(timeOfDayMatchValues, "long"),
            timeOfDay: buildParseFn(timeOfDayMatchValues, "long")
        });
    }
    format(d, f) {
        return format(d, f, this._config);
    }
    parse(dS, f, bD) {
        return parse(dS, f, bD, this._config);
    }
}

class DateParser {
    constructor(format, locale) {
        this._format = format;
        this._parser = new DateFnsParser(locale);
    }
    format(date) {
        return this._parser.format(date, this._format);
    }
    parse(dateString, baseDate = new Date()) {
        return this._parser.parse(dateString, this._format, baseDate);
    }
}
class InternalDateParser extends DateParser {
    constructor(mode, locale) {
        const internalFormats = {
            time: "HH:mm",
            datetime: "YYYY-MM-DDTHH:mm",
            date: "YYYY-MM-DD",
            month: "YYYY-MM",
            year: "YYYY"
        };
        super(internalFormats[mode], locale);
    }
}

let SuiCalendarViewTitle = class SuiCalendarViewTitle {
    constructor() {
        this.onZoomOut = new EventEmitter();
    }
};
__decorate([
    Input()
], SuiCalendarViewTitle.prototype, "ranges", void 0);
__decorate([
    Output("zoomOut")
], SuiCalendarViewTitle.prototype, "onZoomOut", void 0);
SuiCalendarViewTitle = __decorate([
    Component({
        selector: "sui-calendar-view-title",
        template: `
<span class="title link" (click)="onZoomOut.emit()">
    <ng-content></ng-content>
</span>
<span class="prev link" [class.disabled]="!ranges?.canMovePrevious" (click)="ranges?.movePrevious()">
    <i class="chevron left icon"></i>
</span>
<span class="next link" [class.disabled]="!ranges?.canMoveNext" (click)="ranges?.moveNext()">
    <i class="chevron right icon"></i>
</span>
`,
        styles: [`
.title.link {
    display: inline-block;
    margin-left: 2rem;
    margin-right: 2rem;
}
`]
    })
], SuiCalendarViewTitle);

const enGB = {
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
    const extend = $extend__default || $extend;
    return extend(true, target, source);
}
function lang(language) {
    return language.toLowerCase().replace("-", "");
}
let SuiLocalizationService = class SuiLocalizationService {
    constructor() {
        this.onLanguageUpdate = new EventEmitter();
        this._fallbackValues = enGB;
        this._values = {};
        this._language = "en-GB";
        this.load("en-GB", enGB);
    }
    get language() {
        return this._language;
    }
    setLanguage(language) {
        if (lang(this._language) !== lang(language)) {
            this._language = language;
            this.onLanguageUpdate.emit();
        }
    }
    get(language = this.language) {
        const values = deepClone(this._fallbackValues);
        if (!this._values[lang(language)]) {
            throw new Error(`Locale ${language} is not loaded`);
        }
        deepExtend(values, this._values[lang(language)]);
        return deepClone(values);
    }
    override(values, overrides) {
        return deepExtend(deepClone(values), overrides);
    }
    load(language, values) {
        this._values[lang(language)] = deepClone(values);
        this.onLanguageUpdate.emit();
    }
    patch(language, values) {
        deepExtend(this._values[lang(language)], values);
    }
    interpolate(value, variables) {
        return variables.reduce((s, [k, v]) => s.replace(new RegExp(`#{${k}}`, "g"), v), value);
    }
};
SuiLocalizationService = __decorate([
    Injectable()
], SuiLocalizationService);

let SuiLocalizationModule = class SuiLocalizationModule {
};
SuiLocalizationModule = __decorate([
    NgModule({
        imports: [CommonModule],
        providers: [SuiLocalizationService]
    })
], SuiLocalizationModule);

const DatepickerMode = {
    Year: "year",
    Month: "month",
    Date: "date",
    Datetime: "datetime",
    Time: "time"
};
let SuiDatepicker = class SuiDatepicker {
    constructor(localizationService) {
        this.service = new CalendarService(new DatetimeConfig(), localizationService.get().datepicker);
        this.calendarClasses = true;
    }
    onMouseDown(e) {
        e.preventDefault();
    }
};
SuiDatepicker.ctorParameters = () => [
    { type: SuiLocalizationService }
];
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
        template: `
        <ng-container [ngSwitch]="service.currentView">
            <sui-calendar-year-view
                [service]="service"
                *ngSwitchCase="0"
            ></sui-calendar-year-view>
            <sui-calendar-month-view
                [service]="service"
                *ngSwitchCase="1"
            ></sui-calendar-month-view>
            <sui-calendar-date-view
                [service]="service"
                *ngSwitchCase="2"
            ></sui-calendar-date-view>
            <sui-calendar-hour-view
                [service]="service"
                *ngSwitchCase="3"
            ></sui-calendar-hour-view>
            <sui-calendar-minute-view
                [service]="service"
                *ngSwitchCase="4"
            ></sui-calendar-minute-view>
        </ng-container>
    `,
        styles: [`
            :host {
                user-select: none;
            }
        `]
    })
], SuiDatepicker);

const PopupTrigger = {
    Hover: "hover",
    Click: "click",
    OutsideClick: "outsideClick",
    Focus: "focus",
    Manual: "manual"
};
class PopupConfig {
    constructor(defaults = {}) {
        this.placement = PositioningPlacement.TopLeft;
        this.trigger = PopupTrigger.Hover;
        this.isInverted = false;
        this.delay = 0;
        this.isBasic = false;
        this.transition = "scale";
        this.transitionDuration = 200;
        Object.assign(this, defaults);
    }
}

let SuiPopup = class SuiPopup {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.transitionController = new TransitionController(false);
        this._isOpen = false;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.tabindex = 0;
    }
    get isOpen() {
        return this._isOpen;
    }
    set anchor(anchor) {
        // Whenever the anchor is set (which is when the popup is created), recreate the positioning service with the appropriate options.
        this.positioningService = new PositioningService(anchor, this._container.element, this.config.placement, ".dynamic.arrow");
    }
    // Returns the direction (`top`, `left`, `right`, `bottom`) of the current placement.
    get direction() {
        if (this.positioningService) {
            return this.positioningService.actualPlacement.split(" ").shift();
        }
    }
    // Returns the alignment (`top`, `left`, `right`, `bottom`) of the current placement.
    get alignment() {
        if (this.positioningService) {
            return this.positioningService.actualPlacement.split(" ").pop();
        }
    }
    get dynamicClasses() {
        const classes = {};
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
    }
    open() {
        // Only attempt to open if currently closed.
        if (!this.isOpen) {
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Cancel all other transitions, and initiate the opening transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.In, () => {
                // Focus any element with [autofocus] attribute.
                const autoFocus = this.elementRef.nativeElement.querySelector("[autofocus]");
                if (autoFocus) {
                    // Autofocus after the browser has had time to process other event handlers.
                    setTimeout(() => autoFocus.focus(), 10);
                    // Try to focus again when the modal has opened so that autofocus works in IE11.
                    setTimeout(() => autoFocus.focus(), this.config.transitionDuration);
                }
            }));
            // Refresh the popup position after a brief delay to allow for browser processing time.
            this.positioningService.placement = this.config.placement;
            setTimeout(() => this.positioningService.update());
            // Finally, set the popup to be open.
            this._isOpen = true;
            this.onOpen.emit();
        }
    }
    toggle() {
        if (!this.isOpen) {
            return this.open();
        }
        return this.close();
    }
    close() {
        // Only attempt to close if currently open.
        if (this.isOpen) {
            // Cancel all other transitions, and initiate the closing transition.
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.config.transition, this.config.transitionDuration, TransitionDirection.Out));
            // Cancel the closing timer.
            clearTimeout(this.closingTimeout);
            // Start the closing timer, that fires the `onClose` event after the transition duration number of milliseconds.
            this.closingTimeout = window.setTimeout(() => this.onClose.emit(), this.config.transitionDuration);
            // Finally, set the popup to be closed.
            this._isOpen = false;
        }
    }
    onClick(event) {
        // Makes sense here, as the popup shouldn't be attached to any DOM element.
        event.stopPropagation();
    }
};
SuiPopup.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    ViewChild("container", { static: true, read: ViewContainerRef })
], SuiPopup.prototype, "_container", void 0);
__decorate([
    ViewChild("templateSibling", { static: false, read: ViewContainerRef })
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
        template: `
        <div
            class="ui popup"
            [ngClass]="dynamicClasses"
            [suiTransition]="transitionController"
            [attr.direction]="direction"
            #container
        >
            <ng-container
                *ngIf="!config.template && (!!config.header || !!config.text)"
            >
                <div class="header" *ngIf="config.header">
                    {{ config.header }}
                </div>
                <div class="content">{{ config.text }}</div>
            </ng-container>
            <div #templateSibling></div>

            <sui-popup-arrow
                *ngIf="!config.isBasic"
                [placement]="positioningService.actualPlacement"
                [inverted]="config.isInverted"
            ></sui-popup-arrow>
        </div>
    `,
        styles: [`
            .ui.popup {
                /* Autofit popup to the contents. */
                right: auto;
            }

            .ui.animating.popup {
                /* When the popup is animating, it may not initially be in the correct position.
       This fires a mouse event, causing the anchor's mouseleave to fire - making the popup flicker.
       Setting pointer-events to none while animating fixes this bug. */
                pointer-events: none;
            }

            .ui.popup::before {
                /* Hide the Semantic UI CSS arrow. */
                display: none;
            }

            /* Offset popup by 0.75em above and below when placed 'vertically'. */
            .ui.popup[direction="top"],
            .ui.popup[direction="bottom"] {
                margin-top: 0.75em;
                margin-bottom: 0.75em;
            }

            /* Offset popup by 0.75em either side when placed 'horizontally'. */
            .ui.popup[direction="left"],
            .ui.popup[direction="right"] {
                margin-left: 0.75em;
                margin-right: 0.75em;
            }
        `]
    })
], SuiPopup);

class SuiPopupController {
    constructor(renderer, _element, _componentFactory, config) {
        this._element = _element;
        this._componentFactory = _componentFactory;
        // Generate a new SuiPopup component and attach it to the application view.
        this._componentRef = this._componentFactory.createComponent(SuiPopup);
        // Configure popup with provided config.
        this.popup.config = config;
        // When the popup is closed (onClose fires on animation complete),
        this.popup.onClose.subscribe(() => this.cleanup());
        this._documentListener = renderer.listen("document", "click", (e) => this.onDocumentClick(e));
    }
    // Returns generated popup instance.
    get popup() {
        // Use non-null assertion as we only access this when a popup exists.
        return this._componentRef.instance;
    }
    configure(config) {
        if (config) {
            Object.assign(this.popup.config, config);
        }
    }
    openDelayed() {
        // Cancel the opening timer.
        clearTimeout(this._openingTimeout);
        // Start the popup opening after the specified delay interval.
        this._openingTimeout = window.setTimeout(() => this.open(), this.popup.config.delay);
    }
    open() {
        // Attach the generated component to the current application.
        this._componentFactory.attachToApplication(this._componentRef);
        // Move the generated element to the body to avoid any positioning issues.
        this._componentFactory.moveToDocumentBody(this._componentRef);
        // Attach a reference to the anchor element. We do it here because IE11 loves to complain.
        this.popup.anchor = this._element;
        // Start popup open transition.
        this.popup.open();
        // Call lifecyle hook
        const lifecycle = this.popupOnOpen;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }
    close() {
        // Cancel the opening timer to stop the popup opening after close has been called.
        clearTimeout(this._openingTimeout);
        if (this._componentRef) {
            // Start popup close transition.
            this.popup.close();
        }
        // Call lifecyle hook
        const lifecycle = this.popupOnClose;
        if (lifecycle) {
            lifecycle.call(this);
        }
    }
    toggleDelayed() {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.openDelayed();
        }
        // O'wise, close it.
        return this.close();
    }
    toggle() {
        // If the popup hasn't been created, or it has but it isn't currently open, open the popup.
        if (!this._componentRef || (this._componentRef && !this.popup.isOpen)) {
            return this.open();
        }
        // O'wise, close it.
        return this.close();
    }
    onMouseEnter() {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.openDelayed();
        }
    }
    onMouseLeave() {
        if (this.popup.config.trigger === PopupTrigger.Hover) {
            this.close();
        }
    }
    onClick() {
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
    }
    onDocumentClick(e) {
        // If the popup trigger is outside click,
        if (this._componentRef &&
            this.popup.config.trigger === PopupTrigger.OutsideClick) {
            const target = e.target;
            // Close the popup if the click is outside of the popup element.
            if (!this._element.nativeElement.contains(target)) {
                this.close();
            }
        }
    }
    onFocusIn() {
        if (this.popup.config.trigger === PopupTrigger.Focus) {
            this.openDelayed();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget) &&
            !this.popup.elementRef.nativeElement.contains(e.relatedTarget) &&
            this.popup.config.trigger === PopupTrigger.Focus) {
            this.close();
        }
    }
    cleanup() {
        clearTimeout(this._openingTimeout);
        if (this._componentRef.instance &&
            this._componentRef.instance.positioningService) {
            this._componentRef.instance.positioningService.destroy();
        }
        this._componentFactory.detachFromApplication(this._componentRef);
    }
    ngOnDestroy() {
        this.cleanup();
        this._documentListener();
    }
}
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

class SuiPopupComponentController extends SuiPopupController {
    constructor(renderer, element, componentFactory, _component, config) {
        super(renderer, element, componentFactory, config);
        this._component = _component;
    }
    get componentInstance() {
        if (this._contentComponentRef) {
            return this._contentComponentRef.instance;
        }
    }
    open() {
        if (!this._contentComponentRef) {
            this._contentComponentRef = this._componentFactory.createComponent(this._component);
            this._componentFactory.attachToView(this._contentComponentRef, this.popup.templateSibling);
        }
        super.open();
    }
    cleanup() {
        super.cleanup();
        if (this._contentComponentRef) {
            this._contentComponentRef.destroy();
            this._contentComponentRef = undefined;
        }
    }
}

const templateRef = TemplateRef;
class TemplatePopupConfig extends PopupConfig {
}
class SuiPopupTemplateController extends SuiPopupController {
    constructor(renderer, element, componentFactory, config) {
        super(renderer, element, componentFactory, config);
    }
    configure(config) {
        super.configure(config);
        if (config) {
            this.template = config.template;
            this.context = config.context;
        }
    }
    open() {
        // If there is a template, inject it into the view.
        if (this.template) {
            this.popup.templateSibling.clear();
            this._componentFactory.createView(this.popup.templateSibling, this.template, {
                $implicit: this.popup,
                context: this.context
            });
        }
        super.open();
    }
}

let SuiPopupArrow = class SuiPopupArrow {
    get direction() {
        if (this.placement) {
            return this.placement.split(" ").shift();
        }
    }
    get alignment() {
        if (this.placement) {
            const alignment = this.placement.split(" ").pop();
            if (alignment === this.direction) {
                return "center";
            }
            return alignment;
        }
    }
};
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
        template: `
<div class="dynamic arrow" [attr.direction]="direction" *ngIf="alignment == 'center'"></div>
<div class="static arrow" [attr.direction]="direction" [attr.alignment]="alignment" *ngIf="alignment != 'center'"></div>
`,
        styles: [`
.arrow {
    position: absolute;
    width: 0.71428571em;
    height: 0.71428571em;
    background: #ffffff;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 2;
}

:host.inverted .arrow {
    background: #1b1c1d;
}

.arrow[direction="top"] {
    bottom: -0.30714286em;
    box-shadow: 1px 1px 0 0 #bababc;
}

.arrow[direction="left"] {
    right: -0.30714286em;
    box-shadow: 1px -1px 1px 0 #bababc;
}

.arrow[direction="bottom"] {
    top: -0.30714286em;
    box-shadow: -1px -1px 0 0 #bababc;
}

.arrow[direction="right"] {
    left: -0.30714286em;
    box-shadow: -1px 1px 1px 0 #bababc;
}

.static.arrow[direction="bottom"][alignment="left"],
.static.arrow[direction="top"][alignment="left"] {
    left: 1em;
    right: auto;
}

.static.arrow[direction="left"][alignment="top"],
.static.arrow[direction="right"][alignment="top"] {
    top: 1em;
    bottom: auto;
}

.static.arrow[direction="bottom"][alignment="right"],
.static.arrow[direction="top"][alignment="right"] {
    left: auto;
    right: 1em;
}

.static.arrow[direction="left"][alignment="bottom"],
.static.arrow[direction="right"][alignment="bottom"] {
    top: auto;
    bottom: 1em;
}
`]
    })
], SuiPopupArrow);

let SuiPopupConfig = class SuiPopupConfig extends PopupConfig {
    constructor() {
        // We use an empty constructor to ensure Angular DI works correctly.
        super();
    }
};
SuiPopupConfig = __decorate([
    Injectable()
], SuiPopupConfig);

const templateRef$1 = TemplateRef;
let SuiPopupDirective = class SuiPopupDirective extends SuiPopupTemplateController {
    constructor(renderer, element, componentFactory, popupDefaults) {
        super(renderer, element, componentFactory, new PopupConfig(popupDefaults));
    }
    set popupHeader(header) {
        this.popup.config.header = header;
    }
    set popupText(text) {
        this.popup.config.text = text;
    }
    set popupInverted(inverted) {
        this.popup.config.isInverted = Util.DOM.parseBooleanAttribute(inverted);
    }
    set popupBasic(basic) {
        this.popup.config.isBasic = Util.DOM.parseBooleanAttribute(basic);
    }
    set popupTransition(transition) {
        this.popup.config.transition = transition;
    }
    set popupTransitionDuration(duration) {
        this.popup.config.transitionDuration = duration;
    }
    set popupPlacement(placement) {
        this.popup.config.placement = placement;
    }
    set popupDelay(delay) {
        this.popup.config.delay = delay;
    }
    get popupTrigger() {
        return this.popup.config.trigger;
    }
    set popupTrigger(trigger) {
        this.popup.config.trigger = trigger;
    }
    set popupTemplate(template) {
        this.template = template;
    }
    set popupTemplateContext(context) {
        this.context = context;
    }
    set popupConfig(config) {
        this.configure(config);
    }
};
SuiPopupDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: SuiComponentFactory },
    { type: SuiPopupConfig }
];
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

let SuiPopupModule = class SuiPopupModule {
};
SuiPopupModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiTransitionModule,
            SuiUtilityModule
        ],
        declarations: [
            SuiPopupDirective,
            SuiPopupArrow,
            SuiPopup
        ],
        exports: [
            SuiPopupDirective,
            SuiPopup
        ],
        providers: [
            SuiPopupConfig
        ],
        entryComponents: [
            SuiPopup
        ]
    })
], SuiPopupModule);

var SuiDatepickerDirective_1, SuiDatepickerDirectiveValueAccessor_1, SuiDatepickerDirectiveValidator_1;
let SuiDatepickerDirective = SuiDatepickerDirective_1 = class SuiDatepickerDirective extends SuiPopupComponentController {
    constructor(renderer, element, componentFactory, localizationService) {
        super(renderer, element, componentFactory, SuiDatepicker, new PopupConfig({
            trigger: PopupTrigger.Focus,
            placement: PositioningPlacement.BottomLeft,
            transition: "scale",
            transitionDuration: 200
        }));
        this.renderer = renderer;
        this.localizationService = localizationService;
        // This ensures the popup is drawn correctly (i.e. no border).
        this.renderer.addClass(this.popup.elementRef.nativeElement, "ui");
        this.renderer.addClass(this.popup.elementRef.nativeElement, "calendar");
        this.onLocaleUpdate();
        this.localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this.onSelectedDateChange = new EventEmitter();
        this.onValidatorChange = new EventEmitter();
        this.mode = DatepickerMode.Datetime;
    }
    get selectedDate() {
        return this._selectedDate;
    }
    set selectedDate(date) {
        this._selectedDate = date;
        this.onSelectedDateChange.emit(date);
    }
    get mode() {
        return this._mode;
    }
    set mode(mode) {
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
    }
    get localeValues() {
        return this.localizationService.override(this._localeValues, this.localeOverrides);
    }
    set placement(placement) {
        this.popup.config.placement = placement;
    }
    set transition(transition) {
        this.popup.config.transition = transition;
    }
    set transitionDuration(duration) {
        this.popup.config.transitionDuration = duration;
    }
    popupOnOpen() {
        if (this.componentInstance) {
            this.componentInstance.service.config = this.config;
            this.componentInstance.service.localeValues = this.localeValues;
            this.componentInstance.service.currentDate = this.initialDate || new Date();
            this.componentInstance.service.selectedDate = this.selectedDate;
            this.componentInstance.service.maxDate = this.maxDate;
            this.componentInstance.service.minDate = this.minDate;
            if (this.firstDayOfWeek != undefined) {
                this.componentInstance.service.firstDayOfWeek = this.firstDayOfWeek;
            }
            this.componentInstance.service.reset();
            this.componentInstance.service.onDateChange.subscribe((d) => {
                this.selectedDate = d;
                this.close();
            });
        }
    }
    ngOnChanges({ maxDate, minDate, mode }) {
        if (maxDate || minDate || mode) {
            this.onValidatorChange.emit();
        }
    }
    onLocaleUpdate() {
        this._localeValues = this.localizationService.get().datepicker;
    }
    validate(c) {
        const value = c.value;
        if (value != undefined) {
            // We post process the min & max date because sometimes this puts the date outside of the allowed range.
            if (this.minDate && value < this.minDate) {
                return { suiMinDate: { required: this.minDate, actual: value } };
            }
            if (this.maxDate && value > this.maxDate) {
                return { suiMaxDate: { required: this.maxDate, actual: value } };
            }
        }
        // Angular expects null
        // tslint:disable-next-line:no-null-keyword
        return null;
    }
    writeValue(value) {
        this.selectedDate = value;
        if (this.componentInstance) {
            this.componentInstance.service.selectedDate = value;
        }
    }
    onKeyDown(e) {
        if (e.keyCode === KeyCode.Escape) {
            this.close();
        }
    }
};
SuiDatepickerDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: SuiComponentFactory },
    { type: SuiLocalizationService }
];
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
let SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = class SuiDatepickerDirectiveValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
        this.host = host;
    }
};
SuiDatepickerDirectiveValueAccessor.ctorParameters = () => [
    { type: SuiDatepickerDirective }
];
SuiDatepickerDirectiveValueAccessor = SuiDatepickerDirectiveValueAccessor_1 = __decorate([
    Directive({
        selector: "[suiDatepicker]",
        host: { "(pickerSelectedDateChange)": "onChange($event)" },
        providers: [customValueAccessorFactory(SuiDatepickerDirectiveValueAccessor_1)]
    })
], SuiDatepickerDirectiveValueAccessor);
let SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = class SuiDatepickerDirectiveValidator extends CustomValidator {
    constructor(host) {
        super(host);
        this.host = host;
    }
};
SuiDatepickerDirectiveValidator.ctorParameters = () => [
    { type: SuiDatepickerDirective }
];
SuiDatepickerDirectiveValidator = SuiDatepickerDirectiveValidator_1 = __decorate([
    Directive({
        selector: "[suiDatepicker]",
        host: { "(pickerValidatorChange)": "onValidatorChange()" },
        providers: [customValidatorFactory(SuiDatepickerDirectiveValidator_1)]
    })
], SuiDatepickerDirectiveValidator);

const isWebView = isUAWebView__default || isUAWebView;
let SuiDatepickerInputDirective = class SuiDatepickerInputDirective {
    constructor(datepicker, valueAccessor, element, localizationService) {
        this.datepicker = datepicker;
        this.valueAccessor = valueAccessor;
        this.element = element;
        this.useNativeOnMobile = true;
        this.fallbackActive = false;
        // Whenever the datepicker value updates, update the input text alongside it.
        this.datepicker.onSelectedDateChange.subscribe(() => this.updateValue(this.selectedDateString));
        localizationService.onLanguageUpdate.subscribe(() => this.updateValue(this.selectedDateString));
    }
    get useNativeOnMobile() {
        return this._useNativeOnMobile;
    }
    set useNativeOnMobile(fallback) {
        this._useNativeOnMobile = fallback;
        const isOnMobile = mobile || tablet || isWebView(navigator.userAgent);
        this.fallbackActive = this.useNativeOnMobile && isOnMobile;
    }
    get fallbackActive() {
        return this._fallbackActive;
    }
    set fallbackActive(active) {
        this._fallbackActive = active;
        // If the fallback is active, then the trigger must be manual so the datepicker never opens.
        this.datepicker.popup.config.trigger = this.fallbackActive ? PopupTrigger.Manual : PopupTrigger.Focus;
        // Update the input value (this will insert the `T` as required).
        this.updateValue(this.selectedDateString);
    }
    get parser() {
        if (this.fallbackActive) {
            return new InternalDateParser(this.datepicker.mode, this.datepicker.localeValues);
        }
        return new DateParser(this.datepicker.localeValues.formats[this.datepicker.mode], this.datepicker.localeValues);
    }
    get selectedDateString() {
        if (this.datepicker.selectedDate) {
            return this.parser.format(this.datepicker.selectedDate);
        }
    }
    get type() {
        if (this.fallbackActive) {
            return this.datepicker.config.fallback;
        }
        return "text";
    }
    get max() {
        if (this.fallbackActive && this.datepicker.maxDate) {
            // Since HTML doesn't use a date object max is somewhat tricky.
            // Our Datepicker will always choose the 1st date on the provided precision,
            // meaning anything below the maxDate will work, hence endOf.
            const max = DateUtil.endOf(this.datepicker.config.precision, DateUtil.clone(this.datepicker.maxDate));
            return this.parser.format(max);
        }
    }
    get min() {
        if (this.fallbackActive && this.datepicker.minDate) {
            // Since HTML doesn't use a date object min is somewhat tricky.
            // We use 1 minute before the next date at the configured precision since
            // our Datepicker picks the first available date at that precision.
            const min = DateUtil.clone(this.datepicker.minDate);
            return this.parser.format(min);
        }
    }
    updateValue(value) {
        // Only update the current value if it is different to what it's being updated to.
        // This is so that the editing position isn't changed when manually typing the date.
        if (!this._lastUpdateTyped) {
            this.datepicker.renderer.setProperty(this.element.nativeElement, "value", value || "");
        }
        this._lastUpdateTyped = false;
    }
    typeValue(value) {
        this._lastUpdateTyped = true;
        this._currentInputValue = value;
        if (!value) {
            // Delete the selected date if no date was entered manually.
            return this.datepicker.writeValue(undefined);
        }
        const parsed = this.parser.parse(value, this.datepicker.selectedDate);
        if (!isNaN(parsed.getTime()) && value === this.parser.format(parsed)) {
            return this.datepicker.writeValue(parsed);
        }
        return this.datepicker.writeValue(undefined);
    }
    onFocusOut() {
        this.valueAccessor.onTouched();
    }
};
SuiDatepickerInputDirective.ctorParameters = () => [
    { type: SuiDatepickerDirective, decorators: [{ type: Host }] },
    { type: SuiDatepickerDirectiveValueAccessor, decorators: [{ type: Host }] },
    { type: ElementRef },
    { type: SuiLocalizationService }
];
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

class CalendarRange {
    get inRange() {
        return this.items.filter(i => !i.isOutsideRange);
    }
    constructor(start, dates, items, grouped, comparer) {
        this.start = start;
        this.dates = dates;
        this.items = items;
        this.groupedItems = grouped;
        this._comparer = comparer;
    }
    find(item) {
        return this.items.find(i => this._comparer.equal(i.date, item.date));
    }
    findIndex(item) {
        if (!item) {
            return -1;
        }
        return this.items.findIndex(i => this._comparer.equal(i.date, item.date));
    }
    containsDate(date) {
        return !!this.inRange.find(i => this._comparer.equal(i.date, date));
    }
}
class CalendarRangeService {
    get dateComparer() {
        return new DateComparer(this.marginal, this.service.inFinalView);
    }
    get length() {
        return this.rows * this.columns;
    }
    get canMoveNext() {
        const firstItem = this.next.inRange[0];
        if (firstItem && this.service.maxDate) {
            return firstItem.date <= this.service.maxDate;
        }
        return true;
    }
    get canMovePrevious() {
        const lastItem = this.previous.inRange.slice(-1).pop();
        if (lastItem && this.service.minDate) {
            return lastItem.date >= this.service.minDate;
        }
        return true;
    }
    constructor(interval, rows, columns) {
        this.interval = interval;
        this.marginal = interval + 1;
        this.rows = rows;
        this.columns = columns;
    }
    loadService(service) {
        this.service = service;
        this.refresh();
    }
    refresh() {
        this.current = this.calcRange(this.service.currentDate);
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    }
    move(forwards) {
        if (forwards) {
            return this.moveNext();
        }
        return this.movePrevious();
    }
    moveNext() {
        DateUtil.next(this.interval, this.service.currentDate);
        this.previous = this.current;
        this.current = this.next;
        this.next = this.calcRange(DateUtil.next(this.interval, DateUtil.clone(this.service.currentDate)));
    }
    movePrevious() {
        DateUtil.previous(this.interval, this.service.currentDate);
        this.next = this.current;
        this.current = this.previous;
        this.previous = this.calcRange(DateUtil.previous(this.interval, DateUtil.clone(this.service.currentDate)));
    }
    calc(forwards) {
        if (forwards) {
            return this.next;
        }
        return this.previous;
    }
    calcRange(startDate) {
        const start = this.calcStart(startDate);
        if (this.service.inFinalView) {
            DateUtil.startOf(this.marginal, start, true);
        }
        const dates = this.calcDates(start);
        const items = this.calcItems(dates, startDate);
        return new CalendarRange(start, dates, items, Util.Array.group(items, this.columns), this.dateComparer);
    }
    calcStart(date) {
        return DateUtil.startOf(this.interval, DateUtil.clone(date));
    }
    calcDates(rangeStart) {
        return Util.Array
            .range(this.length)
            .map(i => DateUtil.add(this.marginal, DateUtil.clone(rangeStart), i));
    }
    calcItems(dateRange, baseDate) {
        return dateRange.map(date => {
            const item = new CalendarItem(date);
            item.isDisabled = !this.dateComparer.between(item.date, this.service.minDate, this.service.maxDate);
            item.isActive = this.dateComparer.equal(item.date, this.service.selectedDate);
            item.isToday = this.dateComparer.equal(item.date, new Date());
            item.isSelectable = item.isDisabled;
            this.configureItem(item, baseDate);
            return item;
        });
    }
}

class CalendarRangeDateService extends CalendarRangeService {
    calcStart(start) {
        const monthStart = DateUtil.startOf(DatePrecision.Month, DateUtil.clone(start));
        monthStart.setDate((1 - monthStart.getDay() + this.service.firstDayOfWeek - 7) % 7);
        return monthStart;
    }
    configureItem(item, baseDate) {
        item.humanReadable = item.date.getDate().toString();
        item.isOutsideRange = item.date.getMonth() !== baseDate.getMonth();
        item.isSelectable = item.isDisabled;
    }
}
let SuiCalendarDateView = class SuiCalendarDateView extends CalendarView {
    constructor(renderer) {
        super(renderer, CalendarViewType.Date, new CalendarRangeDateService(DatePrecision.Month, 6, 7));
    }
    get days() {
        const days = this.service.localeValues.weekdaysNarrow;
        return days.map((d, i) => days[(i + this.service.firstDayOfWeek) % days.length]);
    }
    get date() {
        return new DateParser(this.service.localeValues.formats.month, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarDateView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarDateView = __decorate([
    Component({
        selector: "sui-calendar-date-view",
        template: `
<table class="ui celled center aligned unstackable table seven column day">
<thead>
    <tr>
        <th colspan="7">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ date }}
            </sui-calendar-view-title>
        </th>
    </tr>
    <tr>
        <th *ngFor="let day of days">{{ day }}</th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
    })
], SuiCalendarDateView);

class CalendarRangeHourService extends CalendarRangeService {
    configureItem(item, baseDate) {
        // Set minutes and seconds to 0
        const customFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
        item.humanReadable = new DateParser(customFormat, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}
let SuiCalendarHourView = class SuiCalendarHourView extends CalendarView {
    constructor(renderer) {
        super(renderer, CalendarViewType.Hour, new CalendarRangeHourService(DatePrecision.Date, 6, 4));
    }
    get date() {
        return new DateParser(this.service.localeValues.formats.date, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarHourView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarHourView = __decorate([
    Component({
        selector: "sui-calendar-hour-view",
        template: `
<table class="ui celled center aligned unstackable table four column hour">
<thead *ngIf="service.config.mode != 1">
    <tr>
        <th colspan="4">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ date }}
            </sui-calendar-view-title>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
    })
], SuiCalendarHourView);

class CalendarRangeMinuteService extends CalendarRangeService {
    calcStart(start) {
        return DateUtil.startOf(DatePrecision.Hour, DateUtil.clone(start), true);
    }
    calcDates(start) {
        return Util.Array
            .range(this.length)
            .map(i => DateUtil.add(DatePrecision.Minute, DateUtil.clone(start), i * 5));
    }
    configureItem(item, baseDate) {
        item.humanReadable = new DateParser(this.service.localeValues.formats.time, this.service.localeValues).format(item.date);
        item.isOutsideRange = false;
    }
}
let SuiCalendarMinuteView = class SuiCalendarMinuteView extends CalendarView {
    constructor(renderer) {
        super(renderer, CalendarViewType.Minute, new CalendarRangeMinuteService(DatePrecision.Hour, 4, 3));
    }
    get date() {
        if (this.service.config.mode !== CalendarMode.TimeOnly) {
            // Set minutes and seconds to 0
            const dateTimeFormat = this.service.localeValues.formats.datetime.replace(/[ms]/g, "0");
            return new DateParser(dateTimeFormat, this.service.localeValues).format(this.currentDate);
        }
        else {
            // Set minutes and seconds to 0
            const timeFormat = this.service.localeValues.formats.time.replace(/[ms]/g, "0");
            return new DateParser(timeFormat, this.service.localeValues).format(this.currentDate);
        }
    }
};
SuiCalendarMinuteView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarMinuteView = __decorate([
    Component({
        selector: "sui-calendar-minute-view",
        template: `
<table class="ui celled center aligned unstackable table three column minute">
<thead>
    <tr>
        <th colspan="4">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ date }}
            </sui-calendar-view-title>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
    })
], SuiCalendarMinuteView);

class CalendarRangeMonthService extends CalendarRangeService {
    configureItem(item, baseDate) {
        item.humanReadable = this.service.localeValues.monthsShort[item.date.getMonth()];
        item.isOutsideRange = false;
    }
}
let SuiCalendarMonthView = class SuiCalendarMonthView extends CalendarView {
    constructor(renderer) {
        super(renderer, CalendarViewType.Month, new CalendarRangeMonthService(DatePrecision.Year, 4, 3));
    }
    get year() {
        return new DateParser(this.service.localeValues.formats.year, this.service.localeValues).format(this.currentDate);
    }
};
SuiCalendarMonthView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarMonthView = __decorate([
    Component({
        selector: "sui-calendar-month-view",
        template: `
<table class="ui celled center aligned unstackable table three column month">
<thead>
    <tr>
        <th colspan="3">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ year }}
            </sui-calendar-view-title>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
    })
], SuiCalendarMonthView);

class CalendarRangeYearService extends CalendarRangeService {
    configureItem(item, baseDate) {
        item.humanReadable = Util.String.padLeft(item.date.getFullYear().toString(), 4, "0");
        item.isOutsideRange = item.date.getFullYear() >= this.calcStart(baseDate).getFullYear() + 10;
    }
}
let SuiCalendarYearView = class SuiCalendarYearView extends CalendarView {
    constructor(renderer) {
        super(renderer, CalendarViewType.Year, new CalendarRangeYearService(DatePrecision.Decade, 4, 3));
    }
    get decadeStart() {
        return DateUtil
            .startOf(DatePrecision.Decade, DateUtil.clone(this.service.currentDate))
            .getFullYear();
    }
    pad(year) {
        return Util.String.padLeft(year.toString(), 4, "0");
    }
};
SuiCalendarYearView.ctorParameters = () => [
    { type: Renderer2 }
];
SuiCalendarYearView = __decorate([
    Component({
        selector: "sui-calendar-year-view",
        template: `
<table class="ui celled center aligned unstackable table three column year">
<thead>
    <tr>
        <th colspan="3">
            <sui-calendar-view-title [ranges]="ranges" (zoomOut)="zoomOut()">
                {{ pad(decadeStart) }} - {{ pad(decadeStart + 10) }}
            </sui-calendar-view-title>
        </th>
    </tr>
</thead>
<tbody>
    <tr *ngFor="let group of ranges.current.groupedItems">
        <td class="link"
            *ngFor="let item of group"
            [calendarItem]="item"
            (click)="setDate(item)">{{ item.humanReadable }}
        </td>
    </tr>
</tbody>
</table>
`
    })
], SuiCalendarYearView);

let SuiDatepickerModule = class SuiDatepickerModule {
};
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
        entryComponents: [
            SuiDatepicker
        ]
    })
], SuiDatepickerModule);

let SuiDimmer = class SuiDimmer extends SuiTransition {
    constructor(renderer, element, changeDetector) {
        super(renderer, element, changeDetector);
        this._isDimmed = false;
        this.isDimmedChange = new EventEmitter();
        this.isClickable = true;
        this.wrapContent = true;
        this.dimmerClasses = true;
    }
    get isDimmed() {
        return this._isDimmed;
    }
    set isDimmed(value) {
        const isDimmed = !!value;
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
    }
    onClick() {
        if (this.isClickable) {
            this.isDimmed = false;
            this.isDimmedChange.emit(this.isDimmed);
        }
    }
};
SuiDimmer.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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
        template: `
        <div [class.content]="wrapContent">
            <div [class.center]="wrapContent">
                <ng-content></ng-content>
            </div>
        </div>
    `,
        styles: [`
            :host.dimmer {
                transition: none;
            }
        `]
    })
], SuiDimmer);

let SuiDimmerModule = class SuiDimmerModule {
};
SuiDimmerModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiTransitionModule
        ],
        declarations: [
            SuiDimmer
        ],
        exports: [
            SuiDimmer
        ]
    })
], SuiDimmerModule);

// Creates essentially a 'string' enum.
const DropdownAutoCloseType = {
    ItemClick: "itemClick",
    OutsideClick: "outsideClick",
    Disabled: "disabled"
};
class DropdownService {
    get isNested() {
        return !!this.parent;
    }
    constructor(autoCloseMode = DropdownAutoCloseType.ItemClick) {
        this.isOpen = false;
        this.isOpenChange = new EventEmitter();
        this.isDisabled = false;
        this.autoCloseMode = autoCloseMode;
        this.children = [];
    }
    setOpenState(isOpen, reflectInParent = false) {
        if (this.isOpen !== isOpen && !this.isDisabled) {
            // Only update the state if it has changed, and the dropdown isn't disabled.
            this.isOpen = !!isOpen;
            this.isAnimating = true;
            // We must delay the emitting to avoid the 'changed after checked' Angular errors.
            this.delay(() => this.isOpenChange.emit(this.isOpen));
            if (!this.isOpen) {
                // Close the child dropdowns when this one closes.
                this.children.forEach(c => c.setOpenState(this.isOpen));
            }
            if (this.parent && reflectInParent) {
                // Open the parent dropdowns when this one opens.
                this.parent.setOpenState(this.isOpen, true);
            }
        }
        else if (this.isOpen !== isOpen && this.isDisabled) {
            // If the state has changed, but the dropdown is disabled, re-emit the original isOpen value.
            this.delay(() => this.isOpenChange.emit(this.isOpen));
        }
    }
    setDisabledState(isDisabled) {
        if (this.isDisabled !== isDisabled) {
            if (!!isDisabled) {
                // Close the dropdown as it is now disabled
                this.setOpenState(false);
            }
            this.isDisabled = !!isDisabled;
        }
    }
    toggleOpenState() {
        this.setOpenState(!this.isOpen);
    }
    // Registers a dropdown service as a child of this service.
    registerChild(child) {
        if (!this.isChildRegistered(child)) {
            this.children.push(child);
            child.parent = this;
        }
    }
    // Recursive method to check if the provided dropdown is already registered as a child, or is a descendant of a child.
    isChildRegistered(child) {
        return this === child || !!this.children
            .find(c => !!c.children
            .find(cChild => cChild.isChildRegistered(child)));
    }
    // Wipes any nested data, so all services can be cleanly reattached.
    clearChildren() {
        this.children.forEach(c => {
            c.parent = undefined;
        });
        this.children = [];
    }
    // Method for delaying an event into the next tick, to avoid Angular "changed after checked" error.
    delay(callback) {
        setTimeout(() => callback());
    }
}

let SuiDropdownMenuItem = class SuiDropdownMenuItem {
    constructor(_renderer, element) {
        this._renderer = _renderer;
        this.element = element;
        this.isSelected = false;
        this.selectedClass = "selected";
    }
    get isDisabled() {
        // We must use nativeElement as Angular doesn't have a way of reading class information.
        const element = this.element.nativeElement;
        return element.classList.contains("disabled");
    }
    get isSelected() {
        return this._isSelected;
    }
    set isSelected(value) {
        // Renderer is used to enable a dynamic class name.
        if (value) {
            this._renderer.addClass(this.element.nativeElement, this.selectedClass);
        }
        else {
            this._renderer.removeClass(this.element.nativeElement, this.selectedClass);
        }
    }
    get hasChildDropdown() {
        return !!this.childDropdownMenu;
    }
    performClick() {
        // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
        this.element.nativeElement.click();
    }
};
SuiDropdownMenuItem.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
__decorate([
    ContentChild(forwardRef(() => SuiDropdownMenu), { static: true })
], SuiDropdownMenuItem.prototype, "childDropdownMenu", void 0);
SuiDropdownMenuItem = __decorate([
    Directive({
        // We must attach to every '.item' as Angular doesn't support > selectors.
        selector: ".item"
    })
], SuiDropdownMenuItem);
let SuiDropdownMenu = class SuiDropdownMenu extends SuiTransition {
    constructor(renderer, element, changeDetector) {
        super(renderer, element, changeDetector);
        this.element = element;
        // Initialise transition functionality.
        this._transitionController = new TransitionController(false);
        this.setTransitionController(this._transitionController);
        this.menuTransition = "slide down";
        this.menuTransitionDuration = 200;
        this.menuAutoSelectFirst = false;
        this.menuSelectedItemClass = "selected";
        this._documentKeyDownListener = renderer.listen("document", "keydown", (e) => this.onDocumentKeyDown(e));
    }
    get service() {
        return this._service;
    }
    set service(value) {
        this._service = value;
        let previousIsOpen = this._service.isOpen;
        this._service.isOpenChange.subscribe((isOpen) => {
            if (isOpen !== previousIsOpen) {
                // Only run transitions if the open state has changed.
                this._transitionController.stopAll();
                this._transitionController.animate(new Transition(this.menuTransition, this.menuTransitionDuration, TransitionDirection.Either, () => (this._service.isAnimating = false)));
            }
            if (!isOpen) {
                // Reset the item selections when a nested item is selected to avoid incosistent open states.
                if (this.selectedItems.length > 1) {
                    this.resetSelection();
                }
            }
            previousIsOpen = isOpen;
        });
    }
    set items(items) {
        this._itemsQueryOverride = items;
    }
    get _itemsQuery() {
        return this._itemsQueryOverride || this._itemsQueryInternal;
    }
    // Get the list of items, ignoring those that are disabled.
    get _items() {
        return this._itemsQuery.filter(i => !i.isDisabled);
    }
    onClick(e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (this._service.autoCloseMode === DropdownAutoCloseType.ItemClick) {
                const target = e.target;
                if (this.element.nativeElement.contains(target.closest(".item")) &&
                    !/input|textarea/i.test(target.tagName)) {
                    // Once an item is selected, we can close the entire dropdown.
                    this._service.setOpenState(false, true);
                }
            }
        }
    }
    onDocumentKeyDown(e) {
        // Only the root dropdown (i.e. not nested dropdowns) is responsible for keeping track of the currently selected item.
        if (this._service.isOpen && !this._service.isNested) {
            // Stop document events like scrolling while open.
            const target = e.target;
            if (!/input/i.test(target.tagName) &&
                [
                    KeyCode.Escape,
                    KeyCode.Enter,
                    KeyCode.Up,
                    KeyCode.Down,
                    KeyCode.Left,
                    KeyCode.Right
                ].find(kC => kC === e.keyCode)) {
                e.preventDefault();
            }
            // Gets the top selected item from the stack.
            const [selected] = this.selectedItems.slice(-1);
            // Keeping track of the menu containing the currently selected element allows us to easily determine its siblings.
            let selectedContainer = this;
            if (this.selectedItems.length >= 2) {
                const [selectedParent] = this.selectedItems.slice(-2);
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
                        const [selectedParent] = this.selectedItems.slice(-1);
                        selectedParent.childDropdownMenu.service.setOpenState(false);
                        selectedParent.isSelected = true;
                    }
                    break;
                }
            }
        }
    }
    resetSelection() {
        this.selectedItems = [];
        this._items.forEach(i => {
            i.selectedClass = this.menuSelectedItemClass;
            i.isSelected = false;
        });
        if (this.menuAutoSelectFirst && this._items.length > 0) {
            // Autoselect 1st item if required & possible.
            this._items[0].isSelected = true;
            this.scrollToItem(this._items[0]);
            this.selectedItems.push(this._itemsQuery.first);
        }
    }
    // Determines the item to next be selected, based on the keyboard input & the currently selected item.
    updateSelection(selectedItem, keyCode) {
        if (selectedItem) {
            // Remove the selected status on the previously selected item.
            selectedItem.isSelected = false;
        }
        let selectedIndex = this._items.findIndex(i => i === selectedItem);
        let newSelection;
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
    }
    scrollToItem(item) {
        const menu = this.element.nativeElement;
        const selectedRect = item.element.nativeElement.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();
        let scrollAmount = 0;
        if (selectedRect.bottom > menuRect.bottom) {
            scrollAmount = selectedRect.bottom - menuRect.bottom;
        }
        if (selectedRect.top < menuRect.top) {
            scrollAmount = selectedRect.top - menuRect.top;
        }
        menu.scrollTop += Math.round(scrollAmount);
    }
    ngAfterContentInit() {
        this.onItemsChanged();
        this._itemsQuery.changes.subscribe(() => this.onItemsChanged());
    }
    onItemsChanged() {
        // We use `_items` rather than `items` in case one or more have become disabled.
        this.resetSelection();
    }
    ngOnDestroy() {
        this._documentKeyDownListener();
    }
};
SuiDropdownMenu.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], SuiDropdownMenu.prototype, "menuTransition", void 0);
__decorate([
    Input()
], SuiDropdownMenu.prototype, "menuTransitionDuration", void 0);
__decorate([
    ContentChildren(SuiDropdownMenuItem)
], SuiDropdownMenu.prototype, "_itemsQueryInternal", void 0);
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

var SuiDropdown_1;
let SuiDropdown = SuiDropdown_1 = class SuiDropdown {
    constructor(_element) {
        this._element = _element;
        this.service = new DropdownService();
        this.service.isOpenChange.subscribe(() => {
            if (this.service.isOpen) {
                this._element.nativeElement.focus();
            }
        });
    }
    get children() {
        // @ContentChildren includes the current element by default.
        return this._children.filter(c => c !== this);
    }
    get isOpenChange() {
        return this.service.isOpenChange;
    }
    get isActive() {
        // This is to ensure nested dropdowns don't get made bold.
        return this.service.isOpen && !this.service.isNested;
    }
    get isOpen() {
        return this.service.isOpen;
    }
    set isOpen(value) {
        // If we are opening the dropdown, we want to always open its parents.
        this.service.setOpenState(value, !!value);
    }
    get isDisabled() {
        return this.service.isDisabled;
    }
    set isDisabled(value) {
        this.service.setDisabledState(value);
    }
    get tabIndex() {
        if (this.isDisabled || this.service.isNested) {
            // If disabled, remove from tabindex.
            return undefined;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        // Otherwise, return default of 0.
        return 0;
    }
    get autoClose() {
        return this.service.autoCloseMode;
    }
    set autoClose(value) {
        this.service.autoCloseMode = value;
    }
    ngAfterContentInit() {
        if (!this._menu) {
            throw new Error("You must set [suiDropdownMenu] on the menu element.");
        }
        this._menu.service = this.service;
        this.childrenUpdated();
        this._children.changes.subscribe(() => this.childrenUpdated());
    }
    childrenUpdated() {
        // Reregister child dropdowns each time the menu content changes.
        this.children
            .map(c => c.service)
            .forEach(s => this.service.registerChild(s));
    }
    onClick(e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            this.service.toggleOpenState();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.externallyClose();
        }
    }
    onKeypress(e) {
        // Block the keyboard event from being fired on parent dropdowns.
        if (!e.eventHandled) {
            if (e.keyCode === KeyCode.Enter) {
                e.eventHandled = true;
                this.service.setOpenState(true);
            }
        }
    }
    externallyClose() {
        if (this.service.autoCloseMode === DropdownAutoCloseType.ItemClick ||
            this.service.autoCloseMode === DropdownAutoCloseType.OutsideClick) {
            // No need to reflect in parent since they are also bound to document.
            this.service.setOpenState(false);
        }
    }
};
SuiDropdown.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    ContentChild(SuiDropdownMenu, { static: true })
], SuiDropdown.prototype, "_menu", void 0);
__decorate([
    ContentChildren(SuiDropdown_1, { descendants: true })
], SuiDropdown.prototype, "_children", void 0);
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
], SuiDropdown.prototype, "_tabIndex", void 0);
__decorate([
    HostBinding("attr.tabindex")
], SuiDropdown.prototype, "tabIndex", null);
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

let SuiDropdownModule = class SuiDropdownModule {
};
SuiDropdownModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiTransitionModule
        ],
        declarations: [
            SuiDropdown,
            SuiDropdownMenu,
            SuiDropdownMenuItem
        ],
        exports: [
            SuiDropdown,
            SuiDropdownMenu,
            SuiDropdownMenuItem
        ]
    })
], SuiDropdownModule);

// Helper class to support method chaining when calling `SuiModalService.open(...)`.
class ActiveModal {
    constructor(instance, componentRef) {
        this._config = instance;
        this._componentRef = componentRef;
        // Automatically destroy the modal component when it has been dismissed.
        this.component.onDismiss.subscribe(() => this._componentRef.destroy());
    }
    // Shorthand for direct access to the `SuiModal` instance.
    get component() {
        return this._componentRef.instance;
    }
    // Registers a callback for when `onApprove` is fired.
    onApprove(callback) {
        this.component.onApprove.subscribe((res) => callback(res));
        return this;
    }
    // Registers a callback for when `onDeny` is fired.
    onDeny(callback) {
        this.component.onDeny.subscribe((res) => callback(res));
        return this;
    }
    // Fires the approve event of the modal manually.
    approve(result) {
        this.component.approve(result);
    }
    // Fires the deny event of the modal manually.
    deny(result) {
        this.component.deny(result);
    }
    // Removes the modal component instantly, without transitions or firing any events.
    destroy() {
        this._componentRef.destroy();
    }
}

const ModalSize = {
    Mini: "mini",
    Tiny: "tiny",
    Small: "small",
    Normal: "normal",
    Large: "large"
};
// Stores a basic set of configuration options for a modal.
class ModalConfig {
    constructor(context = undefined, isClosable = true) {
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
}
// Used when creating a modal from a `TemplateRef`.
class TemplateModalConfig extends ModalConfig {
    constructor(template, context = undefined, isClosable = true) {
        super(context, isClosable);
        this.template = template;
    }
}
// Used when creating a modal from an existing component.
class ComponentModalConfig extends ModalConfig {
    constructor(component, context = undefined, isClosable = true) {
        super(context, isClosable);
        this.component = component;
    }
}

// Used to pass ability to control a modal to a component.
class ModalControls {
    constructor(approve, deny) {
        this.approve = approve;
        this.deny = deny;
    }
    // Use method here rather than arrow variables to make intellisense show they're methods.
    approve(result) { }
    deny(result) { }
}
// Injected into custom modal components, to allow control of the modal, and access to a context object.
class Modal extends ModalControls {
    constructor(controls, context) {
        // Instances of `ModalControls` are only created in the `SuiModal` constructor,
        // so we take an initialised instance rather than remaking one each time.
        super(controls.approve, controls.deny);
        this.context = context;
    }
}

// Shorthand for a modal template. Sets up ability to write: `<ng-template let-context let-modal="modal">...</ng-template>`
// We use an abstract class as ModalTemplate tends to be used within decorated properties, which means it needs to exist!
class ModalTemplate extends TemplateRef {
}

let SuiModal = class SuiModal {
    constructor(_renderer, _element, _componentFactory) {
        this._renderer = _renderer;
        this._element = _element;
        this._componentFactory = _componentFactory;
        // Initialise with default configuration from `ModalConfig` (to avoid writing defaults twice).
        const config = new ModalConfig();
        this.loadConfig(config);
        // Event emitters for each of the possible modal outcomes.
        this.onApprove = new EventEmitter();
        this.onDeny = new EventEmitter();
        this.onDismiss = new EventEmitter();
        // Initialise controls with actions for the `approve` and `deny` cases.
        this.controls = new ModalControls(res => this.dismiss(() => this.onApprove.emit(res)), res => this.dismiss(() => this.onDeny.emit(res)));
        // Internal variable initialisation.
        this.dimBackground = false;
        this._isClosing = false;
        this.transitionController = new TransitionController(false);
    }
    get approve() {
        return this.controls.approve;
    }
    get deny() {
        return this.controls.deny;
    }
    // Value to deny with when closing via `isClosable`.
    get isFullScreen() {
        return this._isFullScreen;
    }
    set isFullScreen(fullScreen) {
        this._isFullScreen = Util.DOM.parseBooleanAttribute(fullScreen);
    }
    get mustScroll() {
        return this._mustScroll;
    }
    set mustScroll(mustScroll) {
        this._mustScroll = mustScroll;
        // 'Cache' value in _mustAlwaysScroll so that if `true`, _mustScroll isn't ever auto-updated.
        this._mustAlwaysScroll = mustScroll;
        this.updateScroll();
    }
    get isInverted() {
        return this._isInverted;
    }
    set isInverted(inverted) {
        this._isInverted = Util.DOM.parseBooleanAttribute(inverted);
    }
    get dynamicClasses() {
        const classes = {};
        if (this.size) {
            classes[this.size] = true;
        }
        return classes;
    }
    ngOnInit() {
        // Transition the modal to be visible.
        this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.In));
        setTimeout(() => (this.dimBackground = true));
    }
    ngAfterViewInit() {
        // Move the modal to the document body to ensure correct scrolling.
        this._originalContainer = this._element.nativeElement.parentNode;
        document
            .querySelector("body")
            .appendChild(this._element.nativeElement);
        // Remove the #templateSibling element from the DOM to fix bottom border styles.
        const templateElement = this.templateSibling.element
            .nativeElement;
        if (templateElement.parentNode) {
            templateElement.parentNode.removeChild(templateElement);
        }
        // Update margin offset to center modal correctly on-screen.
        const element = this._modalElement.nativeElement;
        setTimeout(() => {
            this._renderer.setStyle(element, "margin-top", `-${element.clientHeight / 2}px`);
            this.updateScroll();
        });
        // Focus any element with [autofocus] attribute.
        const autoFocus = element.querySelector("[autofocus]");
        if (autoFocus) {
            // Autofocus after the browser has had time to process other event handlers.
            setTimeout(() => autoFocus.focus(), 10);
            // Try to focus again when the modal has opened so that autofocus works in IE11.
            setTimeout(() => autoFocus.focus(), this.transitionDuration);
        }
    }
    // Updates the modal with the specified configuration.
    loadConfig(config) {
        this.isClosable = config.isClosable;
        this.closeResult = config.closeResult;
        this.size = config.size;
        this.isFullScreen = config.isFullScreen;
        this.isBasic = config.isBasic;
        this.isInverted = config.isInverted;
        this.mustScroll = config.mustScroll;
        this.transition = config.transition;
        this.transitionDuration = config.transitionDuration;
    }
    // Dismisses the modal with a transition, firing the callback after the modal has finished transitioning.
    dismiss(callback = () => { }) {
        // If we aren't currently closing,
        if (!this._isClosing) {
            this._isClosing = true;
            // Transition the modal to be invisible.
            this.dimBackground = false;
            this.transitionController.stopAll();
            this.transitionController.animate(new Transition(this.transition, this.transitionDuration, TransitionDirection.Out, () => {
                // When done, move the modal back to its original location, emit a dismiss event, and fire the callback.
                if (this._originalContainer) {
                    this._originalContainer.appendChild(this._element.nativeElement);
                }
                this.onDismiss.emit();
                callback();
            }));
        }
    }
    // Closes the modal with a 'deny' outcome, using the specified default reason.
    close() {
        if (this.isClosable) {
            // If we are allowed to close, fire the deny result with the default value.
            this.deny(this.closeResult);
        }
    }
    // Decides whether the modal needs to reposition to allow scrolling.
    updateScroll() {
        // Semantic UI modal margin is 3.5rem, which is relative to the global font size, so for compatibility:
        const fontSize = parseFloat(window
            .getComputedStyle(document.documentElement)
            .getPropertyValue("font-size"));
        const margin = fontSize * 3.5;
        // _mustAlwaysScroll works by stopping _mustScroll from being automatically updated, so it stays `true`.
        if (!this._mustAlwaysScroll && this._modalElement) {
            const element = this._modalElement.nativeElement;
            // The modal must scroll if the window height is smaller than the modal height + both margins.
            this._mustScroll =
                window.innerHeight < element.clientHeight + margin * 2;
        }
    }
    onClick(e) {
        // Makes sense here, as the modal shouldn't be attached to any DOM element.
        e.stopPropagation();
    }
    // Document listener is fine here because nobody will enough modals open.
    onDocumentKeyUp(e) {
        if (e.keyCode === KeyCode.Escape) {
            // Close automatically covers case of `!isClosable`, so check not needed.
            this.close();
        }
    }
    onDocumentResize() {
        this.updateScroll();
    }
};
SuiModal.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: SuiComponentFactory }
];
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
], SuiModal.prototype, "_modalElement", void 0);
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
    ViewChild("templateSibling", { static: false, read: ViewContainerRef })
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
        template: `
        <!-- Page dimmer for modal background. -->
        <sui-dimmer
            class="page"
            [class.inverted]="isInverted"
            [(isDimmed)]="dimBackground"
            [isClickable]="false"
            [transitionDuration]="transitionDuration"
            [wrapContent]="false"
            (click)="close()"
        >
            <!-- Modal component, with transition component attached -->
            <div
                class="ui modal"
                [suiTransition]="transitionController"
                [class.active]="transitionController?.isVisible"
                [class.fullscreen]="isFullScreen"
                [class.basic]="isBasic"
                [class.scroll]="mustScroll"
                [class.inverted]="isInverted"
                [ngClass]="dynamicClasses"
                (click)="onClick($event)"
                #modal
            >
                <!-- Configurable close icon -->
                <i class="close icon" *ngIf="isClosable" (click)="close()"></i>
                <!-- <ng-content> so that <sui-modal> can be used as a normal component. -->
                <ng-content></ng-content>
                <!-- @ViewChild reference so we can insert elements beside this div. -->
                <div #templateSibling></div>
            </div>
        </sui-dimmer>
    `,
        styles: [`
            .ui.dimmer {
                overflow-y: auto;
            }

            /* avoid .scrolling as Semantic UI adds unwanted styles. */
            .scroll {
                position: absolute !important;
                margin-top: 3.5rem !important;
                margin-bottom: 3.5rem !important;
                top: 0;
            }
        `]
    })
], SuiModal);

let SuiModalService = class SuiModalService {
    constructor(_componentFactory) {
        this._componentFactory = _componentFactory;
    }
    open(modal) {
        // Generate the modal component to be shown.
        const componentRef = this._componentFactory.createComponent(SuiModal);
        // Shorthand for the created modal component instance.
        const modalComponent = componentRef.instance;
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
            const contentComponentRef = this._componentFactory.createComponent(modal.component, [
                {
                    provide: Modal,
                    useValue: new Modal(modalComponent.controls, modal.context)
                }
            ]);
            // Insert the new component into the content of the modal.
            this._componentFactory.attachToView(contentComponentRef, modalComponent.templateSibling);
            // Shorthand for access to the content component's DOM element.
            const contentElement = contentComponentRef.location.nativeElement;
            // Move all of the DOM elements inside the component to the main modal element.
            // This is done so that CSS classes apply correctly. It does stop any custom styles from working however,
            // so other ways may have to be investigated.
            while (contentElement.hasChildNodes() && contentElement.parentElement && contentElement.firstChild) {
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
    }
};
SuiModalService.ctorParameters = () => [
    { type: SuiComponentFactory }
];
SuiModalService = __decorate([
    Injectable()
], SuiModalService);

let SuiModalModule = class SuiModalModule {
};
SuiModalModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            SuiDimmerModule,
            SuiTransitionModule,
            SuiUtilityModule
        ],
        declarations: [
            SuiModal
        ],
        exports: [
            SuiModal
        ],
        providers: [
            SuiModalService
        ],
        entryComponents: [
            SuiModal
        ]
    })
], SuiModalModule);

let SuiProgress = class SuiProgress {
    constructor() {
        this.popupClasses = true;
        this.value = 0;
        this.maximum = 100;
        this.precision = 0;
        this._overrideSuccess = false;
        this.autoSuccess = true;
        this.showProgress = true;
        this.popupClasses = true;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        // Convert value from string to number where necessary.
        const converted = +value;
        if (Number.isNaN(converted)) {
            return;
        }
        this._value = converted;
    }
    get maximum() {
        return this._maximum;
    }
    set maximum(value) {
        // Convert value from string to number where necessary.
        const converted = +value;
        if (Number.isNaN(converted)) {
            return;
        }
        this._maximum = converted;
    }
    get precision() {
        return this._precision;
    }
    set precision(value) {
        // Convert value from string to number where necessary.
        const converted = +value;
        if (Number.isNaN(converted)) {
            return;
        }
        this._precision = Math.min(Math.max(converted, 0), 20);
    }
    get reachedMaximum() {
        return (this._overrideSuccess ||
            (this.value >= this.maximum && this.autoSuccess));
    }
    get percentage() {
        const boundedValue = Math.min(Math.max(this.value, 0), this.maximum);
        const percentage = (boundedValue / this.maximum) * 100;
        return percentage.toFixed(this.precision);
    }
    set classValue(classes) {
        if (classes.includes("attached") || classes.includes("tiny")) {
            this.showProgress = false;
        }
        if (classes.includes("success")) {
            this._overrideSuccess = true;
        }
    }
};
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
        template: `
        <div class="bar" [style.width.%]="percentage">
            <div class="progress" *ngIf="showProgress">{{ percentage }}%</div>
        </div>
        <div class="label">
            <ng-content></ng-content>
        </div>
    `,
        styles: [`
            .bar {
                transition-duration: 300ms !important;
                z-index: 1;
            }
        `]
    })
], SuiProgress);

let SuiProgressModule = class SuiProgressModule {
};
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

var SuiRatingValueAccessor_1;
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
let SuiRatingValueAccessor = SuiRatingValueAccessor_1 = class SuiRatingValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiRatingValueAccessor.ctorParameters = () => [
    { type: SuiRating }
];
SuiRatingValueAccessor = SuiRatingValueAccessor_1 = __decorate([
    Directive({
        selector: "sui-rating",
        host: { "(valueChange)": "onChange($event)" },
        providers: [customValueAccessorFactory(SuiRatingValueAccessor_1)]
    })
], SuiRatingValueAccessor);

let SuiRatingModule = class SuiRatingModule {
};
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

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef$2 = TemplateRef;
let SuiSearchResult = class SuiSearchResult {
    constructor(componentFactory) {
        this.componentFactory = componentFactory;
        this.optionClasses = true;
        // By default we make this function return an empty string, for the brief moment when it isn't displaying the correct label.
        this.formatter = value => "";
    }
    get template() {
        return this._template;
    }
    set template(template) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }
};
SuiSearchResult.ctorParameters = () => [
    { type: SuiComponentFactory }
];
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
    ViewChild("templateSibling", { static: true, read: ViewContainerRef })
], SuiSearchResult.prototype, "templateSibling", void 0);
SuiSearchResult = __decorate([
    Component({
        selector: "sui-search-result",
        template: `
        <span #templateSibling></span>
        <span *ngIf="!template" [innerHTML]="formatter(value, query)"></span>
    `
    })
], SuiSearchResult);

class SearchService {
    constructor(allowEmptyQuery = false) {
        this._options = [];
        this.optionsFilter = (os, q) => {
            // Convert the query string to a RegExp.
            const regex = this.toRegex(this._query);
            if (regex instanceof RegExp) {
                // Only update the results if the query was valid regex.
                // This avoids the results suddenly becoming empty if an invalid regex string is inputted.
                return (os
                    // Filter on the options with a string match on the field we are testing.
                    .filter(o => Util.Object.readValue(o, this._optionsField)
                    .toString()
                    .match(regex)));
            }
            // Don't update since it wasn't a valid regex.
            return false;
        };
        // Set default values and reset.
        this.allowEmptyQuery = allowEmptyQuery;
        this.searchDelay = 0;
        this.reset();
    }
    get options() {
        return this._options;
    }
    set options(options) {
        this._options = options || [];
        // We cannot use both local & remote options simultaneously.
        this._optionsLookup = undefined;
        // Reset entire service with new options.
        this.reset();
    }
    get optionsLookup() {
        return this._optionsLookup;
    }
    set optionsLookup(lookupFn) {
        this._optionsLookup = lookupFn;
        // As before, cannot use local & remote options simultaneously.
        this._options = [];
        this.reset();
    }
    get hasItemLookup() {
        return !!this.optionsLookup && this.optionsLookup.length === 2;
    }
    get optionsField() {
        return this._optionsField;
    }
    set optionsField(field) {
        this._optionsField = field;
        // We need to reset otherwise we would now be showing invalid search results.
        this.reset();
    }
    get results() {
        return this._results;
    }
    get query() {
        return this._query;
    }
    get isSearching() {
        return this._isSearching;
    }
    // Updates the query after the specified search delay.
    updateQueryDelayed(query, callback = () => { }) {
        this._query = query;
        clearTimeout(this._searchDelayTimeout);
        this._searchDelayTimeout = window.setTimeout(() => {
            this.updateQuery(query, callback);
        }, this.searchDelay);
    }
    // Updates the current search query.
    updateQuery(query, callback = () => { }) {
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
            const queryLookup = this._optionsLookup.call(undefined, this._query);
            queryLookup
                .then(results => {
                this._isSearching = false;
                this.updateResults(results);
                return callback();
            })
                .catch(error => {
                // Unset 'loading' state, and throw the returned error without updating the results.
                this._isSearching = false;
                return callback(error);
            });
            return;
        }
        const filtered = this.optionsFilter.call(undefined, this._options, this._query);
        if (filtered) {
            this.updateResults(filtered);
        }
        return callback();
    }
    // Updates & caches the new set of results.
    updateResults(results) {
        this._resultsCache[this._query] = results;
        this._results = results;
    }
    // tslint:disable-next-line:promise-function-async
    initialLookup(initial) {
        if (initial instanceof Array) {
            return this._optionsLookup(undefined, initial);
        }
        return this._optionsLookup(undefined, initial);
    }
    // Converts a query string to regex without throwing an error.
    toRegex(query) {
        try {
            return new RegExp(query, "i");
        }
        catch (e) {
            return query;
        }
    }
    // Generates HTML for highlighted match text.
    highlightMatches(text, query) {
        const regex = this.toRegex(query);
        if (regex instanceof RegExp) {
            return text.replace(regex, match => `<b>${match}</b>`);
        }
        return text;
    }
    // Resets the search back to a pristine state.
    reset() {
        this._results = [];
        this._resultsCache = {};
        this._isSearching = false;
        this.updateQuery("");
    }
}

let SuiSearch = class SuiSearch {
    constructor(_element, renderer, _localizationService) {
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        this.searchService = new SearchService();
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this.searchClasses = true;
        this.hasIcon = true;
        this.retainSelectedResult = true;
        this.searchDelay = 200;
        this.maxResults = 7;
        this.onResultSelected = new EventEmitter();
        this.transition = "scale";
        this.transitionDuration = 200;
        this._documentClickListener = renderer.listen("document", "click", (e) => this.onDocumentClick(e));
    }
    get isActive() {
        return this.dropdownService.isOpen;
    }
    // Gets & sets the placeholder text displayed inside the text input.
    get placeholder() {
        return this._placeholder || this.localeValues.placeholder;
    }
    set placeholder(placeholder) {
        this._placeholder = placeholder;
    }
    get localeValues() {
        return this._localizationService.override(this._localeValues, this.localeOverrides);
    }
    get query() {
        return this.searchService.query;
    }
    set query(query) {
        this.selectedResult = undefined;
        // Initialise a delayed search.
        this.searchService.updateQueryDelayed(query, () => 
        // Set the results open state depending on whether a query has been entered.
        this.dropdownService.setOpenState(this.searchService.query.length > 0));
    }
    set options(options) {
        if (options) {
            this.searchService.options = options;
        }
    }
    set optionsFilter(filter) {
        if (filter) {
            this.searchService.optionsFilter = filter;
        }
    }
    set optionsLookup(lookupFn) {
        this.searchService.optionsLookup = lookupFn;
    }
    set optionsField(field) {
        this.searchService.optionsField = field;
    }
    get resultFormatter() {
        if (this._resultFormatter) {
            return this._resultFormatter;
        }
        else if (this.searchService.optionsLookup) {
            return r => this.readValue(r);
        }
        else {
            return (r, q) => this.searchService.highlightMatches(this.readValue(r), q);
        }
    }
    set resultFormatter(formatter) {
        this._resultFormatter = formatter;
    }
    set searchDelay(delay) {
        this.searchService.searchDelay = delay;
    }
    get isSearching() {
        return this.searchService.isSearching;
    }
    get results() {
        return this.searchService.results.slice(0, this.maxResults);
    }
    ngAfterViewInit() {
        this._menu.service = this.dropdownService;
    }
    onLocaleUpdate() {
        this._localeValues = this._localizationService.get().search;
    }
    // Selects a result.
    select(result) {
        this.onResultSelected.emit(result);
        this.dropdownService.setOpenState(false);
        if (this.retainSelectedResult) {
            this.selectedResult = result;
            this.searchService.updateQuery(this.readValue(result));
        }
        else {
            this.searchService.updateQuery("");
        }
    }
    onClick(e) {
        this.open();
    }
    onFocusIn() {
        if (!this.dropdownService.isAnimating) {
            this.open();
        }
    }
    open() {
        if (this.searchService.query.length > 0) {
            // Only open on click when there is a query entered.
            this.dropdownService.setOpenState(true);
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
        }
    }
    onDocumentClick(e) {
        if (!this._element.nativeElement.contains(e.target)) {
            this.dropdownService.setOpenState(false);
        }
    }
    // Reads the specified field from an item.
    readValue(object) {
        return Util.Object.readValue(object, this.searchService.optionsField);
    }
    ngOnDestroy() {
        this._documentClickListener();
    }
};
SuiSearch.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SuiLocalizationService }
];
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
        template: `
        <div class="ui input" [class.icon]="hasIcon" (click)="onClick($event)">
            <input
                class="prompt"
                type="text"
                [attr.placeholder]="placeholder"
                autocomplete="off"
                [(ngModel)]="query"
            />
            <i *ngIf="hasIcon" class="search icon"></i>
        </div>
        <div
            class="results"
            suiDropdownMenu
            [menuTransition]="transition"
            [menuTransitionDuration]="transitionDuration"
            menuSelectedItemClass="active"
        >
            <sui-search-result
                *ngFor="let r of results"
                class="item"
                [value]="r"
                [query]="query"
                [formatter]="resultFormatter"
                [template]="resultTemplate"
                (click)="select(r)"
            ></sui-search-result>

            <div *ngIf="results.length == 0" class="message empty">
                <div class="header">{{ localeValues.noResults.header }}</div>
                <div class="description">
                    {{ localeValues.noResults.message }}
                </div>
            </div>
        </div>
    `,
        styles: [`
            /* Ensures results div has margin. */
            :host {
                display: inline-block;
            }

            /* Fixes positioning when results are pushed above the search. */
            .results {
                margin-bottom: 0.5em;
            }
        `]
    })
], SuiSearch);

let SuiSearchModule = class SuiSearchModule {
};
SuiSearchModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            SuiDropdownModule,
            SuiLocalizationModule,
            SuiUtilityModule
        ],
        declarations: [
            SuiSearch,
            SuiSearchResult
        ],
        exports: [
            SuiSearch
        ]
    })
], SuiSearchModule);

let SuiSelectOption = class SuiSelectOption extends SuiDropdownMenuItem {
    constructor(renderer, element, changeDetector) {
        // We inherit SuiDropdownMenuItem to automatically gain all keyboard navigation functionality.
        // This is not done via adding the .item class because it isn't supported by Angular.
        super(renderer, element);
        this.changeDetector = changeDetector;
        this.optionClasses = true;
        this.isActive = false;
        this.onSelected = new EventEmitter();
        // By default we make the default text an empty label, for the brief moment when it isn't displaying the correct one.
        this.renderedText = "";
        this.usesTemplate = false;
    }
    set formatter(formatter) {
        if (!this.usesTemplate) {
            this.renderedText = formatter(this.value);
        }
        else {
            this.renderedText = "";
        }
    }
    onClick(e) {
        e.eventHandled = true;
        setTimeout(() => this.onSelected.emit(this.value));
    }
};
SuiSelectOption.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef }
];
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
    ViewChild("templateSibling", { static: true, read: ViewContainerRef })
], SuiSelectOption.prototype, "templateSibling", void 0);
__decorate([
    HostListener("click", ["$event"])
], SuiSelectOption.prototype, "onClick", null);
SuiSelectOption = __decorate([
    Component({
        selector: "sui-select-option",
        template: `
        <span #templateSibling></span>
        <span [innerHTML]="renderedText"></span>
    `
    })
], SuiSelectOption);

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

// We use generic type T to specify the type of the options we are working with,
// and U to specify the type of the property of the option used as the value.
class SuiSelectBase {
    constructor(_element, renderer, _localizationService) {
        this._element = _element;
        this._localizationService = _localizationService;
        this.dropdownService = new DropdownService();
        // We do want an empty query to return all results.
        this.searchService = new SearchService(true);
        this.isSearchable = false;
        this.onLocaleUpdate();
        this._localizationService.onLanguageUpdate.subscribe(() => this.onLocaleUpdate());
        this._renderedSubscriptions = [];
        this.icon = "dropdown";
        this.transition = "slide down";
        this.transitionDuration = 200;
        this.onTouched = new EventEmitter();
        this._documentKeyDownListener = renderer.listen("document", "keydown", (e) => this.onDocumentKeyDown(e));
        this.selectClasses = true;
    }
    get isActive() {
        return this.dropdownService.isOpen;
    }
    get isVisible() {
        return this._menu.isVisible;
    }
    get searchClass() {
        return this.isSearchable && !this.isSearchExternal;
    }
    get isSearching() {
        return this.searchService.isSearching;
    }
    get searchInput() {
        return this._manualSearch || this._internalSearch;
    }
    get tabIndex() {
        if (this.isDisabled) {
            // If disabled, remove from tabindex.
            return -1;
        }
        if (this.dropdownService.isOpen && this.isSearchExternal) {
            // If open & in menu search, remove from tabindex (as input always autofocusses).
            return -1;
        }
        if (this._tabIndex != undefined) {
            // If custom tabindex, default to that.
            return this._tabIndex;
        }
        if (this.searchClass) {
            // If search input enabled, tab goes to input.
            return -1;
        }
        // Otherwise, return default of 0.
        return 0;
    }
    get isDisabled() {
        return this.dropdownService.isDisabled;
    }
    set isDisabled(value) {
        this.dropdownService.isDisabled = !!value;
    }
    set options(options) {
        if (options) {
            this.searchService.options = options;
            this.optionsUpdateHook();
        }
    }
    set optionsFilter(filter) {
        if (filter) {
            this.searchService.optionsFilter = filter;
            this.optionsUpdateHook();
        }
    }
    set optionsLookup(lookup) {
        if (lookup) {
            this.searchService.optionsLookup = lookup;
            this.optionsUpdateHook();
        }
    }
    get filteredOptions() {
        return this.searchService.results;
    }
    // Deprecated
    get availableOptions() {
        return this.filteredOptions;
    }
    get query() {
        return this.isSearchable ? this.searchService.query : undefined;
    }
    set query(query) {
        if (query != undefined) {
            this.queryUpdateHook();
            this.updateQuery(query);
            // Update the rendered text as query has changed.
            this._renderedOptions.forEach(ro => this.initialiseRenderedOption(ro));
            if (this.searchInput) {
                this.searchInput.query = query;
            }
        }
    }
    get labelField() {
        return this.searchService.optionsField;
    }
    set labelField(field) {
        this.searchService.optionsField = field;
    }
    get labelGetter() {
        // Helper function to retrieve the label from an item.
        return (obj) => {
            const label = Util.Object.readValue(obj, this.labelField);
            if (label != undefined) {
                return label.toString();
            }
            return "";
        };
    }
    get valueGetter() {
        // Helper function to retrieve the value from an item.
        return (obj) => Util.Object.readValue(obj, this.valueField);
    }
    get configuredFormatter() {
        if (this._optionFormatter) {
            return o => this._optionFormatter(o, this.isSearchable ? this.query : undefined);
        }
        else if (this.searchService.optionsLookup) {
            return o => this.labelGetter(o);
        }
        else {
            return o => this.searchService.highlightMatches(this.labelGetter(o), this.query || "");
        }
    }
    set optionFormatter(formatter) {
        this._optionFormatter = formatter;
    }
    get localeValues() {
        return this._localizationService.override(this._localeValues, this.localeOverrides);
    }
    ngAfterContentInit() {
        this._menu.service = this.dropdownService;
        // We manually specify the menu items to the menu because the @ContentChildren doesn't pick up our dynamically rendered items.
        this._menu.items = this._renderedOptions;
        if (this._manualSearch) {
            this.isSearchable = true;
            this.isSearchExternal = true;
        }
        if (this.searchInput) {
            this.searchInput.onQueryUpdated.subscribe((q) => (this.query = q));
            this.searchInput.onQueryKeyDown.subscribe((e) => this.onQueryInputKeydown(e));
        }
        // We must call this immediately as changes doesn't fire when you subscribe.
        this.onAvailableOptionsRendered();
        this._renderedOptions.changes.subscribe(() => this.onAvailableOptionsRendered());
    }
    onLocaleUpdate() {
        this._localeValues = this._localizationService.get().select;
    }
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    optionsUpdateHook() { }
    // Hook is here since Typescript doesn't yet support overriding getters & setters while still calling the superclass.
    queryUpdateHook() { }
    updateQuery(query) {
        // Update the query then open the dropdown, as after keyboard input it should always be open.
        this.searchService.updateQuery(query, () => this.dropdownService.setOpenState(true));
    }
    resetQuery(delayed = true) {
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
    }
    onAvailableOptionsRendered() {
        // Unsubscribe from all previous subscriptions to avoid memory leaks on large selects.
        this._renderedSubscriptions.forEach(rs => rs.unsubscribe());
        this._renderedSubscriptions = [];
        this._renderedOptions.forEach(ro => {
            // Slightly delay initialisation to avoid change after checked errors. TODO - look into avoiding this!
            setTimeout(() => this.initialiseRenderedOption(ro));
            this._renderedSubscriptions.push(ro.onSelected.subscribe(() => this.selectOption(ro.value)));
        });
        // If no options have been provided, autogenerate them from the rendered ones.
        if (this.searchService.options.length === 0 &&
            !this.searchService.optionsLookup) {
            this.options = this._renderedOptions.map(ro => ro.value);
        }
    }
    initialiseRenderedOption(option) {
        option.usesTemplate = !!this.optionTemplate;
        option.formatter = this.configuredFormatter;
        if (option.usesTemplate) {
            this.drawTemplate(option.templateSibling, option.value);
        }
        option.changeDetector.markForCheck();
    }
    findOption(options, value) {
        // Tries to find an option in options array
        return options.find(o => value === this.valueGetter(o));
    }
    onCaretClick(e) {
        if (!e.eventHandled) {
            e.eventHandled = true;
            if (!this.dropdownService.isAnimating) {
                this.dropdownService.setOpenState(!this.dropdownService.isOpen);
                this.focus();
            }
        }
    }
    onClick(e) {
        if (!e.eventHandled && !this.dropdownService.isAnimating) {
            e.eventHandled = true;
            // If the dropdown is searchable, clicking should keep it open, otherwise we toggle the open state.
            this.dropdownService.setOpenState(this.isSearchable ? true : !this.dropdownService.isOpen);
            // Immediately focus the search input whenever clicking on the select.
            this.focus();
        }
    }
    onFocusIn() {
        if (!this.dropdownService.isOpen && !this.dropdownService.isAnimating) {
            this.dropdownService.setOpenState(true);
            this.focus();
        }
    }
    onFocusOut(e) {
        if (!this._element.nativeElement.contains(e.relatedTarget)) {
            this.dropdownService.setOpenState(false);
            this.onTouched.emit();
        }
    }
    onKeyPress(e) {
        if (e.keyCode === KeyCode.Enter) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
        }
    }
    onDocumentKeyDown(e) {
        if (this._element.nativeElement.contains(e.target) &&
            !this.dropdownService.isOpen &&
            e.keyCode === KeyCode.Down) {
            // Enables support for focussing and opening with the keyboard alone.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this._element.nativeElement.click();
            e.preventDefault();
        }
    }
    onQueryInputKeydown(event) { }
    focus() {
        if (this.isSearchable && this.searchInput) {
            // Focusses the search input only when searchable.
            // Using directly because Renderer2 doesn't have invokeElementMethod method anymore.
            this.searchInput.focus();
        }
        else {
            this._element.nativeElement.focus();
        }
    }
    // Helper that draws the provided template beside the provided ViewContainerRef.
    drawTemplate(siblingRef, value) {
        siblingRef.clear();
        // Use of `$implicit` means use of <ng-template let-option> syntax is supported.
        siblingRef.createEmbeddedView(this.optionTemplate, {
            $implicit: value,
            query: this.query
        });
    }
    ngOnDestroy() {
        this._renderedSubscriptions.forEach(s => s.unsubscribe());
        this._documentKeyDownListener();
    }
}
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
], SuiSelectBase.prototype, "_internalSearch", void 0);
__decorate([
    ContentChild(SuiSelectSearch, { static: true })
], SuiSelectBase.prototype, "_manualSearch", void 0);
__decorate([
    Input("tabindex")
], SuiSelectBase.prototype, "_tabIndex", void 0);
__decorate([
    HostBinding("attr.tabindex")
], SuiSelectBase.prototype, "tabIndex", null);
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

// See https://github.com/Microsoft/TypeScript/issues/13449.
const templateRef$3 = TemplateRef;
let SuiMultiSelectLabel = class SuiMultiSelectLabel extends SuiTransition {
    constructor(renderer, element, changeDetector, componentFactory) {
        super(renderer, element, changeDetector);
        this.componentFactory = componentFactory;
        // Initialise transition functionality.
        this._transitionController = new TransitionController(false, "inline-block");
        this.setTransitionController(this._transitionController);
        this.onDeselected = new EventEmitter();
        this.labelClasses = true;
        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.In));
    }
    get template() {
        return this._template;
    }
    set template(template) {
        this._template = template;
        if (this.template) {
            this.componentFactory.createView(this.templateSibling, this.template, {
                $implicit: this.value,
                query: this.query
            });
        }
    }
    deselectOption(e) {
        e.eventHandled = true;
        this._transitionController.animate(new Transition("scale", 100, TransitionDirection.Out, () => this.onDeselected.emit(this.value)));
    }
    onClick(e) {
        e.eventHandled = true;
    }
};
SuiMultiSelectLabel.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: SuiComponentFactory }
];
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
    ViewChild("templateSibling", { static: true, read: ViewContainerRef })
], SuiMultiSelectLabel.prototype, "templateSibling", void 0);
__decorate([
    HostListener("click", ["$event"])
], SuiMultiSelectLabel.prototype, "onClick", null);
SuiMultiSelectLabel = __decorate([
    Component({
        selector: "sui-multi-select-label",
        template: `
        <span #templateSibling></span>
        <span *ngIf="!template" [innerHTML]="formatter(value)"></span>
        <i class="delete icon" (click)="deselectOption($event)"></i>
    `
    })
], SuiMultiSelectLabel);

var SuiMultiSelectValueAccessor_1;
let SuiMultiSelect = class SuiMultiSelect extends SuiSelectBase {
    constructor(element, renderer, localizationService) {
        super(element, renderer, localizationService);
        this.selectedOptions = [];
        this.selectedOptionsChange = new EventEmitter();
        this.hasLabels = true;
        this.multiSelectClasses = true;
    }
    get filteredOptions() {
        if (this.maxSelectedReached) {
            // If we have reached the maximum number of selections, then empty the results completely.
            return [];
        }
        const searchResults = this.searchService.results;
        if (!this.hasLabels) {
            return searchResults;
        }
        else {
            // Returns the search results \ selected options.
            return searchResults.filter(r => this.selectedOptions.find(o => r === o) == undefined);
        }
    }
    get availableOptions() {
        return this.filteredOptions;
    }
    get hasLabels() {
        return this._hasLabels;
    }
    set hasLabels(hasLabels) {
        this._hasLabels = hasLabels;
    }
    get placeholder() {
        return this._placeholder || this.localeValues.multi.placeholder;
    }
    set placeholder(placeholder) {
        this._placeholder = placeholder;
    }
    get maxSelectedReached() {
        if (this.maxSelected == undefined) {
            // If there is no maximum then we can immediately return.
            return false;
        }
        return this.selectedOptions.length === this.maxSelected;
    }
    get maxSelectedMessage() {
        return this._localizationService.interpolate(this.localeValues.multi.maxSelectedMessage, [["max", this.maxSelected.toString()]]);
    }
    get selectedMessage() {
        return this._localizationService.interpolate(this.localeValues.multi.selectedMessage, [["count", this.selectedOptions.length.toString()]]);
    }
    optionsUpdateHook() {
        if (!this._writtenOptions && this.selectedOptions.length > 0) {
            // We need to check the options still exist.
            this.writeValue(this.selectedOptions.map(o => this.valueGetter(o)));
        }
        if (this._writtenOptions && this.searchService.options.length > 0) {
            // If there were values written by ngModel before the options had been loaded, this runs to fix it.
            this.selectedOptions = this._writtenOptions
                // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                .map(v => this.findOption(this.searchService.options, v))
                .filter(v => v != undefined);
            if (this.selectedOptions.length === this._writtenOptions.length) {
                this._writtenOptions = undefined;
            }
        }
    }
    initialiseRenderedOption(option) {
        super.initialiseRenderedOption(option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive =
            !this.hasLabels &&
                this.selectedOptions.indexOf(option.value) !== -1;
    }
    selectOption(option) {
        if (this.selectedOptions.indexOf(option) !== -1) {
            this.deselectOption(option);
            return;
        }
        this.selectedOptions.push(option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));
        this.resetQuery(false);
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    }
    writeValue(values) {
        if (values instanceof Array) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel values to options.
                this.selectedOptions = values
                    // non-null assertion added here because Typescript doesn't recognise the non-null filter.
                    .map(v => this.findOption(this.searchService.options, v))
                    .filter(v => v != undefined);
            }
            if (values.length > 0 && this.selectedOptions.length === 0) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial values.
                    this.searchService
                        .initialLookup(values)
                        .then(items => (this.selectedOptions = items));
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
    }
    deselectOption(option) {
        // Update selected options to the previously selected options \ {option}.
        this.selectedOptions = this.selectedOptions.filter(so => so !== option);
        this.selectedOptionsChange.emit(this.selectedOptions.map(o => this.valueGetter(o)));
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
        if (!this.hasLabels) {
            this.onAvailableOptionsRendered();
        }
    }
    onQueryInputKeydown(event) {
        if (event.keyCode === KeyCode.Backspace &&
            this.query === "" &&
            this.selectedOptions.length > 0) {
            // Deselect the rightmost option when the user presses backspace in the search input.
            this.deselectOption(this.selectedOptions[this.selectedOptions.length - 1]);
        }
    }
};
SuiMultiSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SuiLocalizationService }
];
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
        template: `
        <!-- Dropdown icon -->
        <i class="{{ icon }} icon" (click)="onCaretClick($event)"></i>

        <ng-container *ngIf="hasLabels">
            <!-- Multi-select labels -->
            <sui-multi-select-label
                *ngFor="let selected of selectedOptions"
                [value]="selected"
                [query]="query"
                [formatter]="configuredFormatter"
                [template]="optionTemplate"
                (deselected)="deselectOption($event)"
            ></sui-multi-select-label>
        </ng-container>

        <!-- Query input -->
        <input
            suiSelectSearch
            type="text"
            [hidden]="!isSearchable || isSearchExternal"
        />

        <!-- Helper text -->
        <div
            class="text"
            [class.default]="hasLabels"
            [class.filtered]="!!query && !isSearchExternal"
        >
            <!-- Placeholder text -->
            <ng-container *ngIf="hasLabels; else selectedBlock">{{
                placeholder
            }}</ng-container>

            <!-- Summary shown when labels are hidden -->
            <ng-template #selectedBlock> {{ selectedMessage }}</ng-template>
        </div>

        <!-- Select dropdown menu -->
        <div
            class="menu"
            suiDropdownMenu
            [menuTransition]="transition"
            [menuTransitionDuration]="transitionDuration"
            [menuAutoSelectFirst]="true"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="availableOptions.length == 0">
                <div *ngIf="!maxSelectedReached" class="message">
                    {{ localeValues.noResultsMessage }}
                </div>
                <div *ngIf="maxSelectedReached" class="message">
                    {{ maxSelectedMessage }}
                </div>
            </ng-container>
        </div>
    `,
        styles: [`
            :host input.search {
                width: 12em !important;
            }
        `]
    })
], SuiMultiSelect);
// Value accessor directive for the select to support ngModel.
let SuiMultiSelectValueAccessor = SuiMultiSelectValueAccessor_1 = class SuiMultiSelectValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiMultiSelectValueAccessor.ctorParameters = () => [
    { type: SuiMultiSelect }
];
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

var SuiSelectValueAccessor_1;
let SuiSelect = class SuiSelect extends SuiSelectBase {
    constructor(element, renderer, localizationService) {
        super(element, renderer, localizationService);
        this.selectedOptionChange = new EventEmitter();
    }
    get placeholder() {
        return this._placeholder || this.localeValues.single.placeholder;
    }
    set placeholder(placeholder) {
        this._placeholder = placeholder;
    }
    optionsUpdateHook() {
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
    }
    queryUpdateHook() {
        // When the query is updated, we just abandon the current selection.
        this.selectedOption = undefined;
    }
    selectOption(option) {
        // Choose and emit the selected option.
        this.selectedOption = option;
        this.selectedOptionChange.emit(this.valueGetter(option));
        this.dropdownService.setOpenState(false);
        this.resetQuery();
        this.drawSelectedOption();
        // Automatically refocus the search input for better keyboard accessibility.
        this.focus();
    }
    writeValue(value) {
        if (value != undefined) {
            if (this.searchService.options.length > 0) {
                // If the options have already been loaded, we can immediately match the ngModel value to an option.
                this.selectedOption = this.findOption(this.searchService.options, value);
                this.drawSelectedOption();
            }
            if (this.selectedOption == undefined) {
                if (this.valueField && this.searchService.hasItemLookup) {
                    // If the search service has a selected lookup function, make use of that to load the initial value.
                    this.searchService.initialLookup(value).then(i => {
                        this.selectedOption = i;
                        this.drawSelectedOption();
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
    }
    initialiseRenderedOption(option) {
        super.initialiseRenderedOption(option);
        // Boldens the item so it appears selected in the dropdown.
        option.isActive = option.value === this.selectedOption;
    }
    drawSelectedOption() {
        // Updates the active class on the newly selected option.
        if (this._renderedOptions) {
            this.onAvailableOptionsRendered();
        }
        if (this.selectedOption != undefined && this.optionTemplate) {
            this.drawTemplate(this._optionTemplateSibling, this.selectedOption);
        }
    }
};
SuiSelect.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: SuiLocalizationService }
];
__decorate([
    ViewChild("optionTemplateSibling", {
        static: true,
        read: ViewContainerRef
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
        template: `
        <!-- Query input -->
        <input
            suiSelectSearch
            type="text"
            [hidden]="!isSearchable || isSearchExternal"
        />

        <!-- Placeholder text -->
        <div
            *ngIf="selectedOption == undefined"
            class="default text"
            [class.filtered]="query"
        >
            {{ placeholder }}
        </div>
        <!-- Selected item -->
        <div
            class="text"
            [class.filtered]="query || selectedOption == undefined"
        >
            <span #optionTemplateSibling></span>
            <span
                *ngIf="!optionTemplate && selectedOption != undefined"
                [innerHTML]="configuredFormatter(selectedOption)"
            ></span>
        </div>
        <!-- Dropdown icon -->
        <i class="{{ icon }} icon" (click)="onCaretClick($event)"></i>
        <!-- Select dropdown menu -->
        <div
            class="menu"
            suiDropdownMenu
            [menuTransition]="transition"
            [menuTransitionDuration]="transitionDuration"
            [menuAutoSelectFirst]="isSearchable"
        >
            <ng-content></ng-content>
            <div
                *ngIf="isSearchable && availableOptions.length === 0"
                class="message"
            >
                {{ localeValues.noResultsMessage }}
            </div>
        </div>
    `
    })
], SuiSelect);
// Value accessor directive for the select to support ngModel.
let SuiSelectValueAccessor = SuiSelectValueAccessor_1 = class SuiSelectValueAccessor extends CustomValueAccessor {
    constructor(host) {
        super(host);
    }
};
SuiSelectValueAccessor.ctorParameters = () => [
    { type: SuiSelect }
];
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

let SuiSelectModule = class SuiSelectModule {
};
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

const SidebarTransition = {
    Overlay: "overlay",
    Push: "push",
    ScaleDown: "scale down",
    Uncover: "uncover",
    SlideAlong: "slide along",
    SlideOut: "slide out"
};
const SidebarDirection = {
    Left: "left",
    Right: "right",
    Top: "top",
    Bottom: "bottom"
};
class SidebarService {
    get width() {
        if (this.direction === SidebarDirection.Left) {
            return this._width;
        }
        if (this.direction === SidebarDirection.Right) {
            return -this._width;
        }
        return 0;
    }
    set width(width) {
        this._width = width;
        this.widthChange.emit();
    }
    get height() {
        if (this.direction === SidebarDirection.Top) {
            return this._height;
        }
        if (this.direction === SidebarDirection.Bottom) {
            return -this._height;
        }
        return 0;
    }
    set height(height) {
        this._height = height;
        this.heightChange.emit();
    }
    constructor(isVisible = false) {
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
    setVisibleState(isVisible) {
        if (this.isVisible !== isVisible) {
            this.isVisible = isVisible;
            this.isAnimating = true;
            this.wasJustOpened = true;
            this.isVisibleChange.emit(isVisible);
            setTimeout(() => this.wasJustOpened = false);
            clearTimeout(this._isAnimatingTimeout);
            this._isAnimatingTimeout = window.setTimeout(() => this.isAnimating = false, 500);
        }
    }
    toggleVisibleState() {
        this.setVisibleState(!this.isVisible);
    }
}

let SuiSidebar = class SuiSidebar {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.service = new SidebarService();
        // We set the default here as well to force the classes to update.
        this.transition = SidebarTransition.Uncover;
        this.direction = SidebarDirection.Left;
        setTimeout(() => this.updateDimensions());
        this.service.isVisibleChange.subscribe(() => this.updateDimensions());
        this.sidebarClasses = true;
    }
    get transition() {
        return this.service.transition;
    }
    set transition(transition) {
        this.service.transition
            .split(" ")
            .forEach(c => this.setClass(c, false));
        this.service.transition = transition;
        this.service.transition.split(" ").forEach(c => this.setClass(c, true));
    }
    get direction() {
        return this.service.direction;
    }
    set direction(direction) {
        this.setClass(this.service.direction, false);
        this.service.direction = direction;
        this.setClass(this.service.direction, true);
    }
    get isVisible() {
        return this.service.isVisible;
    }
    set isVisible(isVisible) {
        this.service.setVisibleState(isVisible);
    }
    get isVisibleChange() {
        return this.service.isVisibleChange;
    }
    get isAnimating() {
        return this.service.isAnimating;
    }
    updateDimensions() {
        this.service.width = this._element.nativeElement.offsetWidth;
        this.service.height = this._element.nativeElement.offsetHeight;
    }
    setClass(className, isAdd = true) {
        if (isAdd) {
            this._renderer.addClass(this._element.nativeElement, className);
        }
        else {
            this._renderer.removeClass(this._element.nativeElement, className);
        }
    }
    open() {
        this.service.setVisibleState(true);
    }
    close() {
        this.service.setVisibleState(false);
    }
    toggle() {
        this.service.toggleVisibleState();
    }
};
SuiSidebar.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
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
        template: `
        <ng-content></ng-content>
    `
    })
], SuiSidebar);

let SuiSidebarSibling = class SuiSidebarSibling {
    constructor(_renderer, _element) {
        this._renderer = _renderer;
        this._element = _element;
        this.isDimmedWhenVisible = false;
        this.siblingClasses = true;
    }
    get service() {
        return this._service;
    }
    set service(service) {
        this._service = service;
        setTimeout(() => this.updateTransform());
        this._service.isVisibleChange.subscribe(() => this.updateTransform());
    }
    get isVisible() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible;
    }
    get isDimmed() {
        if (!this.service) {
            return false;
        }
        return this.service.isVisible && this.isDimmedWhenVisible;
    }
    updateTransform() {
        this._renderer.removeStyle(this._element.nativeElement, "transform");
        this._renderer.removeStyle(this._element.nativeElement, "-webkit-transform");
        if (this.service.isVisible &&
            this.service.transition !== SidebarTransition.Overlay &&
            this.service.transition !== SidebarTransition.ScaleDown) {
            const translate = `translate3d(${this.service.width}px, ${this.service.height}px, 0)`;
            this._renderer.setStyle(this._element.nativeElement, "transform", translate);
            this._renderer.setStyle(this._element.nativeElement, "-webkit-transform", translate);
        }
    }
    onClick(event) {
        if (this.service.isVisible && !this.service.wasJustOpened) {
            this.service.setVisibleState(false);
        }
    }
};
SuiSidebarSibling.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef }
];
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
        template: `
        <ng-content></ng-content>
    `,
        styles: [`
            :host {
                display: block;
            }
        `]
    })
], SuiSidebarSibling);

let SuiSidebarContainer = class SuiSidebarContainer {
    constructor() {
        this.containerClasses = true;
    }
    ngAfterContentInit() {
        if (!this.sidebar) {
            throw new Error("You must include a <sui-sidebar> element within the container.");
        }
        this.service = this.sidebar.service;
        if (!this.sibling) {
            throw new Error("You must include a <sui-sidebar-sibling> element within the container.");
        }
        this.sibling.service = this.service;
    }
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
        template: `
        <ng-content></ng-content>
    `,
        styles: [`
            :host {
                display: block;
            }
        `]
    })
], SuiSidebarContainer);

let SuiSidebarModule = class SuiSidebarModule {
};
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

class Tab {
    constructor(header, content) {
        this.id = header.id;
        this.header = header;
        this.content = content;
        // So that the header and content isActive properties are always in sync.
        this.header.isActiveChange
            .subscribe(() => this.content.isActive = this.isActive);
    }
    // Saves accessing .header.isActive every time.
    get isActive() {
        return this.header.isActive;
    }
    set isActive(active) {
        // Use `setActiveState` so as not to fire 'external changes' event.
        this.header.setActiveState(active);
    }
    // Saves accessing .header.isDisabled every time.
    get isDisabled() {
        return this.header.isDisabled;
    }
}

let SuiTabHeader = class SuiTabHeader {
    constructor() {
        this._isActive = false;
        this.isActiveChange = new EventEmitter();
        this.isActiveExternalChange = new EventEmitter();
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
        this.isDisabled = false;
        this._headerClasses = true;
    }
    get isActive() {
        return this._isActive;
    }
    set isActive(active) {
        let isActive = active;
        // Only used by @Input(), runs whenever user input changes `isActive`.
        // Run in timeout because `isDisabled` can prohibit user from changing `isActive`.
        // so update is delayed to avoid 'changed after checked' error.
        setTimeout(() => {
            // Only allow change if tab header is not disabled.
            isActive = !this.isDisabled ? active : false;
            this.setActiveState(isActive);
            // Fire 'external change' event as user input has occured.
            this.isActiveExternalChange.emit(isActive);
        });
    }
    get isDisabled() {
        return this._isDisabled;
    }
    set isDisabled(disabled) {
        // Only update if value provided is different to current one.
        if (this._isDisabled !== disabled) {
            this._isDisabled = disabled;
            // If now disabled, then tab header must be deactivated.
            if (this.isDisabled) {
                this.isActive = false;
            }
        }
    }
    // Internally update active state.
    setActiveState(active) {
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
    }
    onClick() {
        if (!this.isDisabled) {
            // Activate the tab when clicked, so long as it isn't disabled.
            this.isActive = true;
        }
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

let SuiTabContent = class SuiTabContent {
    constructor() {
        this.isActive = false;
        this._contentClasses = true;
    }
};
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

let SuiTabset = class SuiTabset {
    constructor() {
        this.tabs = [];
        this._barrierCount = 0;
    }
    get activeTab() {
        return this._activeTab;
    }
    // When setting a tab as the currently active tab, it automatically gains
    // `isActive` status (saves littering `isActive = true` everywhere).
    set activeTab(tab) {
        this._activeTab = tab;
        tab.isActive = true;
    }
    ngAfterContentInit() {
        // Fire `internalComponentsUpdated` when the query lists change.
        this._tabHeaders.changes.subscribe(() => this.internalComponentsUpdated());
        this._tabContents.changes.subscribe(() => this.internalComponentsUpdated());
        // Initially load the tabs.
        this.loadTabs();
    }
    // Fires whenever either the tab headers or tab contents query lists update.
    internalComponentsUpdated() {
        // We are using a 'counting barrier of n = 2', i.e. the code within only runs after the method is called twice.
        // This is so that both the headers and contents query lists can update before we run code that matches the two up.
        this._barrierCount++;
        if (this._barrierCount === 2) {
            // Reset the barrier so it can be called again.
            this._barrierCount = 0;
            // Update the tabs.
            this.loadTabs();
        }
    }
    // Connects tab headers to tab contents, and creates a tab instance for each pairing.
    loadTabs() {
        // Remove any tabs that no longer have an associated header.
        this.tabs = this.tabs.filter(t => !!this._tabHeaders.find(tH => tH === t.header));
        this._tabHeaders
            // Filter out the loaded headers with attached tab instances.
            .filter(tH => !this.tabs.find(t => t.header === tH))
            .forEach(tH => {
            const content = this._tabContents.find(tC => tC.id === tH.id);
            if (!content) {
                // Error if an associated tab content cannot be found for the given header.
                throw new Error("A [suiTabHeader] must have a related [suiTabContent].");
            }
            // Create a new tab instance for this header & content combo.
            const tab = new Tab(tH, content);
            // Subscribe to any external changes in the tab header's active state. External changes are triggered by user input.
            tab.header.isActiveExternalChange.subscribe(() => this.onHeaderActiveChanged(tab));
            // Add the new instance to the list of tabs.
            this.tabs.push(tab);
        });
        // Assign each tab an index (which denotes the order they physically appear in).
        this._tabHeaders
            .forEach((tH, i) => {
            const tab = this.tabs.find(t => t.header === tH);
            if (tab) {
                tab.index = i;
            }
        });
        // Sort the tabs by their index.
        this.tabs.sort((a, b) => a.index - b.index);
        if (!this.activeTab) { // Check if there are no current existing active tabs.
            // If so, we must activate the first available tab.
            this.activateFirstTab();
        }
        else if (!this.tabs.find(t => t === this.activeTab)) { // O'wise check if current active tab has been deleted.
            // If so, we must find the closest.
            // Use `setTimeout` as this causes a 'changed after checked' error o'wise.
            setTimeout(() => this.activateClosestTab(this.activeTab));
        }
        if (this.tabs.length === 0) {
            // Error if there aren't any tabs in the tabset.
            throw new Error("You cannot have no tabs!");
        }
    }
    // Fires whenever a tab header's active state is externally changed.
    onHeaderActiveChanged(tab) {
        // If the tab has become activated, but was not previously the active tab:
        if (tab.isActive && this.activeTab !== tab) {
            // Deactivate all of the tabs.
            this.tabs.filter(t => t !== tab).forEach(t => t.isActive = false);
            // Set the currently active tab to this one.
            this.activeTab = tab;
        }
        // If the tab has become deactivated, but was previously the active tab:
        if (!tab.isActive && this.activeTab === tab) {
            // Activate the closest tab to it.
            this.activateClosestTab(tab);
        }
    }
    // Activate the first tab in the set.
    activateFirstTab() {
        this.activeTab = this.tabs[0];
    }
    // Activates the closest available tab to a given one.
    activateClosestTab(tab) {
        let nextAvailable;
        // When the exited tab's index is higher than all available tabs,
        if (tab.index >= this.tabs.length) {
            // Activate the last tab.
            nextAvailable = this.tabs[this.tabs.length - 1];
        }
        // If that didn't work, try the following cases:
        if (!nextAvailable) {
            if (!this.tabs.find(t => t === tab)) { // When the exited tab no longer exists,
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
    }
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
        template: `<ng-content></ng-content>`
    })
], SuiTabset);

let SuiTabsModule = class SuiTabsModule {
};
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

let SuiModule = class SuiModule {
};
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

/**
 * Generated bundle index. Do not edit.
 */

export { SuiModule, SuiMessageModule as ɵa, SuiPaginationModule as ɵb, SuiAccordionModule as ɵc, SuiCheckboxModule as ɵd, SuiCollapseModule as ɵe, SuiDatepickerModule as ɵf, SuiDimmerModule as ɵg, SuiDropdownModule as ɵh, SuiModalModule as ɵi, SuiPopupModule as ɵj, SuiProgressModule as ɵk, SuiRatingModule as ɵl, SuiSearchModule as ɵm, SuiSelectModule as ɵn, SuiSidebarModule as ɵo, SuiTabsModule as ɵp, SuiTransitionModule as ɵq, SuiLocalizationModule as ɵr, SuiUtilityModule as ɵs };
//# sourceMappingURL=ng2-semantic-ui.js.map
