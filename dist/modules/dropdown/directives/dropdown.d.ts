import { EventEmitter, AfterContentInit, ElementRef, QueryList, OnInit } from "@angular/core";
import { DropdownService, DropdownAutoCloseType } from "../services/dropdown.service";
import { SuiDropdownMenu } from "./dropdown-menu";
import { HandledEvent } from "../../../misc/util/helpers/util";
export declare class SuiDropdown implements AfterContentInit, OnInit {
    private _element;
    service: DropdownService;
    menu: SuiDropdownMenu;
    children: QueryList<SuiDropdown>;
    readonly filteredChildren: SuiDropdown[];
    readonly isOpenChange: EventEmitter<boolean>;
    readonly isActive: boolean;
    isOpen: boolean;
    isDisabled: boolean;
    tabIndex?: number;
    readonly tabIndexBinding: number | undefined;
    autoClose: DropdownAutoCloseType;
    constructor(_element: ElementRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private childrenUpdated;
    onClick(e: HandledEvent): void;
    private onFocusOut;
    onKeypress(e: HandledEvent & KeyboardEvent): void;
    private externallyClose;
}
