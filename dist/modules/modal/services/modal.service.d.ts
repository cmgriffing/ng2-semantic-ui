import { ModalConfig } from "../classes/modal-config";
import { ActiveModal } from "../classes/active-modal";
import { SuiComponentFactory } from "../../../misc/util/services/component-factory.service";
export declare class SuiModalService {
    private _componentFactory;
    constructor(_componentFactory: SuiComponentFactory);
    open<T, U, V>(modal: ModalConfig<T, U, V>): ActiveModal<T, U, V>;
}
