import { Renderer2, ElementRef, AfterContentInit, QueryList, ChangeDetectorRef, OnDestroy } from "@angular/core";
import { DropdownService } from "../services/dropdown.service";
import "element-closest";
import { SuiTransition } from "../../../modules/transition/directives/transition";
import { HandledEvent, KeyCode } from "../../../misc/util/helpers/util";
export declare class SuiDropdownMenuItem {
    protected _renderer: Renderer2;
    element: ElementRef;
    readonly isDisabled: boolean;
    private _isSelected;
    isSelected: boolean;
    selectedClass: string;
    childDropdownMenu: SuiDropdownMenu;
    readonly hasChildDropdown: boolean;
    constructor(_renderer: Renderer2, element: ElementRef);
    performClick(): void;
}
export declare class SuiDropdownMenu extends SuiTransition implements AfterContentInit, OnDestroy {
    protected _renderer: Renderer2;
    element: ElementRef;
    protected _changeDetector: ChangeDetectorRef;
    private _service;
    private _transitionController;
    menuTransition: string;
    menuTransitionDuration: number;
    service: DropdownService;
    itemsQueryInternal: QueryList<SuiDropdownMenuItem>;
    private _itemsQueryOverride;
    items: QueryList<SuiDropdownMenuItem>;
    private readonly _itemsQuery;
    private readonly _items;
    selectedItems: SuiDropdownMenuItem[];
    menuAutoSelectFirst: boolean;
    menuSelectedItemClass: string;
    private _documentKeyDownListener;
    constructor(_renderer: Renderer2, element: ElementRef, _changeDetector: ChangeDetectorRef);
    onClick(e: HandledEvent & MouseEvent): void;
    onDocumentKeyDown(e: KeyboardEvent): void;
    resetSelection(): void;
    updateSelection(selectedItem: SuiDropdownMenuItem, keyCode: KeyCode): SuiDropdownMenuItem;
    scrollToItem(item: SuiDropdownMenuItem): void;
    ngAfterContentInit(): void;
    private onItemsChanged;
    ngOnDestroy(): void;
}
