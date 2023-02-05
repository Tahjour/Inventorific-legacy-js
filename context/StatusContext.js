import { createContext, useState } from "react";

export const StatusContext = createContext({
    isItemModalOpen: false,
    itemToEdit: null,
    showItemModal: (itemToEdit = null) => { },
    closeItemModal: () => { },
});

export function StatusContextProvider(props) {
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    function showItemModalStateHandler(itemToEdit = null) {
        setItemToEdit(itemToEdit);
        setIsItemModalOpen(true);
    }
    function closeItemModalStateHandler() {
        setIsItemModalOpen(false);
    }

    const context = {
        isItemModalOpen: isItemModalOpen,
        itemToEdit: itemToEdit,
        showItemModal: showItemModalStateHandler,
        closeItemModal: closeItemModalStateHandler,
    };

    return (
        <StatusContext.Provider value={context}>
            {props.children}
        </StatusContext.Provider>
    );
}