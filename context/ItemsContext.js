import { createContext, useState } from "react";

export const ItemsContext = createContext({
    isItemModalOpen: false,
    getItemToEdit: () => { return {}; },
    getItems: () => { return []; },
    addItem: async (newItem) => { },
    deleteItem: (itemToDelete) => { },
    saveEditedItem: (editedItem, itemBeforeEdit) => { },
    showItemModal: (itemToEdit = null) => { },
    closeItemModal: () => { },
});

export function ItemsContextProvider(props) {
    const [userItems, setUserItems] = useState([]);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

    function showItemModalStateHandler(itemToEdit = null) {
        setItemToEdit(itemToEdit);
        setIsItemModalOpen(true);
    }
    function closeItemModalStateHandler() {
        setIsItemModalOpen(false);
    }
    function getItemsHandler() {
        return userItems;
    }
    function getItemToEditHandler() {
        return itemToEdit;
    }

    async function addItemHandler(newItem) {
        setUserItems((prevItems) => {
            return [...prevItems, newItem];
        });

        const formData = new FormData();

        formData.append("newItemID", newItem.id);
        formData.append("newItemName", newItem.name);
        formData.append("newItemPrice", newItem.price);
        formData.append("newItemDescription", newItem.description);
        formData.append("newItemImageFile", newItem.imageFile);

        const response = await fetch("/api/add-item", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.newItem) {
            newItem.imageURL = data.newItem.imageURL;
            setUserItems((prevItems) => {
                return prevItems.map((item) => (item.id === newItem.id ? newItem : item));
            });
        }
    }

    async function saveEditedItemHandler(editedItem, itemBeforeEdit) {
        setUserItems((prevItems) => {
            return prevItems.map((item) => (item.id === editedItem.id ? editedItem : item));
        });
        const formData = new FormData();

        //Add itemBeforeEdit properties to form data
        formData.append("itemBeforeEditID", itemBeforeEdit.id);
        formData.append("itemBeforeEditName", itemBeforeEdit.name);
        formData.append("itemBeforeEditPrice", itemBeforeEdit.price);
        formData.append("itemBeforeEditDescription", itemBeforeEdit.description);
        formData.append("itemBeforeEditImageFile", itemBeforeEdit.imageFile);

        // Add item after edit properties to form data
        formData.append("editedItemID", editedItem.id);
        formData.append("editedItemName", editedItem.name);
        formData.append("editedItemPrice", editedItem.price);
        formData.append("editedItemDescription", editedItem.description);
        formData.append("editedItemImageFile", editedItem.imageFile);

        const response = await fetch("/api/edit-item", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.editedItem) {
            editedItem.imageURL = data.editedItem.imageURL;
            setUserItems((prevItems) => {
                return prevItems.map((item) => (item.id === editedItem.id ? editedItem : item));
            });
        }
    }

    function deleteItemHandler(itemToDelete) {
        setUserItems((prevItems) => {
            return prevItems.filter(item => item.id !== itemToDelete.id);
        });
    }

    const context = {
        isItemModalOpen: isItemModalOpen,
        getItemToEdit: getItemToEditHandler,
        getItems: getItemsHandler,
        addItem: addItemHandler,
        saveEditedItem: saveEditedItemHandler,
        deleteItem: deleteItemHandler,
        showItemModal: showItemModalStateHandler,
        closeItemModal: closeItemModalStateHandler,
    };

    return (
        <ItemsContext.Provider value={context}>
            {props.children}
        </ItemsContext.Provider>
    );
}