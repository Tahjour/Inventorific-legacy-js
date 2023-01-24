import { createContext, useState } from "react";

export const StatusContext = createContext({
    isAddItemModalOpen: false,
    toggleAddItemModalState: () => { },
    showAddItemModal: () => { },
    closeAddItemModal: () => { }
});

export function StatusContextProvider(props) {
    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

    function toggleAddItemModalStateHandler() {
        setIsAddItemModalOpen(!isAddItemModalOpen);
    }

    function showAddItemModalStateHandler() {
        setIsAddItemModalOpen(true);
    }
    function closeAddItemModalStateHandler() {
        setIsAddItemModalOpen(false);
    }

    const context = {
        isAddItemModalOpen: isAddItemModalOpen,
        toggleAddItemModalState: toggleAddItemModalStateHandler,
        showAddItemModal: showAddItemModalStateHandler,
        closeAddItemModal: closeAddItemModalStateHandler
    };

    return (
        <StatusContext.Provider value={context}>
            {props.children}
        </StatusContext.Provider>
    );
}