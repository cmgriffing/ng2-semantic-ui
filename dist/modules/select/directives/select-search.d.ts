import { EventEmitter, Renderer2, ElementRef } from "@angular/core";
export declare class SuiSelectSearch {
    private _renderer;
    private _element;
    searchClass: boolean;
    autoComplete: string;
    query: string;
    onQueryUpdated: EventEmitter<string>;
    onQueryKeyDown: EventEmitter<KeyboardEvent>;
    constructor(_renderer: Renderer2, _element: ElementRef);
    updateQuery(query: string): void;
    onKeyDown(e: KeyboardEvent): void;
    focus(): void;
}
