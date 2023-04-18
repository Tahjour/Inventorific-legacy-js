// context/ItemsContext.js
import { createContext, useEffect, useState } from "react";

export const ItemsContext = createContext({
    isItemModalOpen: false,
    getItemBeforeEdit: () => { return {}; },
    getItem: (itemID) => { return {}; },
    getItems: () => { return []; },
    addItem: async (newItem) => { },
    deleteItem: async (itemToDelete) => { },
    saveItemAfterEdit: async (itemAfterEdit, itemBeforeEdit) => { },
    showItemModal: (itemBeforeEdit = null) => { },
    closeItemModal: () => { },
    searchTerm: "",
    searchItems: (newSearchTerm) => { },
    loginMode: "",
    setLoginMode: () => { },
});

export function ItemsContextProvider(props) {
    const [userItems, setUserItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [itemBeforeEdit, setItemBeforeEdit] = useState(null);
    const [isFirstLoadDone, setIsFirstLoadDone] = useState(false);
    const [loginMode, setLoginMode] = useState("");

    useEffect(() => {
        // Figure out how to add a loading component
        async function loadAllItems() {
            if (!isFirstLoadDone) {
                const response = await fetch("/api/load-items");
                const data = await response.json();
                console.log("data: ", data);
                if (data.allItems) {
                    setUserItems(data.allItems);
                    setIsFirstLoadDone(true);
                }
            }
        }
        loadAllItems();
    }, [isFirstLoadDone, userItems]);

    function showItemModalStateHandler(itemBeforeEdit = null) {
        setItemBeforeEdit(itemBeforeEdit);
        setIsItemModalOpen(true);
    }

    function closeItemModalStateHandler() {
        setIsItemModalOpen(false);
    }

    function getItemHandler(itemID) {
        return userItems.find(item => item.id === itemID);
    }

    function getItemsHandler() {
        if (searchTerm === "") {
            console.log("Returned user items");
            return userItems;
        }
        console.log("Returned filtered items");
        return filteredItems;
    }

    function getItemBeforeEditHandler() {
        return itemBeforeEdit;
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
        formData.append("newItemImageFilePathURL", newItem.imageURL);
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

    async function saveItemAfterEditHandler(itemBeforeEdit, itemAfterEdit) {
        setUserItems((prevItems) => {
            return prevItems.map((item) => (item.id === itemAfterEdit.id ? itemAfterEdit : item));
        });
        const formData = new FormData();

        //Add itemBeforeEdit properties to form data
        formData.append("itemBeforeEditID", itemBeforeEdit.id);
        formData.append("itemBeforeEditName", itemBeforeEdit.name);
        formData.append("itemBeforeEditPrice", itemBeforeEdit.price);
        formData.append("itemBeforeEditDescription", itemBeforeEdit.description);
        formData.append("itemBeforeEditImageURL", itemBeforeEdit.imageURL);
        formData.append("itemBeforeEditImageFile", itemBeforeEdit.imageFile);

        // Add item after edit properties to form data
        formData.append("itemAfterEditID", itemAfterEdit.id);
        formData.append("itemAfterEditName", itemAfterEdit.name);
        formData.append("itemAfterEditPrice", itemAfterEdit.price);
        formData.append("itemAfterEditDescription", itemAfterEdit.description);
        formData.append("itemAfterEditImageURL", itemAfterEdit.imageURL);
        formData.append("itemAfterEditImageFile", itemAfterEdit.imageFile);

        const response = await fetch("/api/edit-item", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.itemAfterEdit) {
            itemAfterEdit.imageURL = data.itemAfterEdit.imageURL;
            setUserItems((prevItems) => {
                return prevItems.map((item) => (item.id === itemAfterEdit.id ? itemAfterEdit : item));
            });
        }
    }

    async function deleteItemHandler(itemToDelete) {
        setUserItems((prevItems) => {
            return prevItems.filter(item => item.id !== itemToDelete.id);
        });
        const formData = new FormData();
        formData.append("itemToDeleteID", itemToDelete.id);
        formData.append("itemToDeleteName", itemToDelete.name);
        formData.append("itemToDeleteImageFilePathURL", itemToDelete.imageURL);
        await fetch("/api/delete-item", {
            method: "POST",
            body: formData,
        });
    }

    function searchItemsHandler(newSearchTerm) {
        setSearchTerm(newSearchTerm);
        const filteredItems = userItems.filter((item) =>
            item.name.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        setFilteredItems(filteredItems);
    }

    function setLoginModeHandler(newLoginMode) {
        setLoginMode(newLoginMode);
    }

    const context = {
        isItemModalOpen: isItemModalOpen,
        getItemBeforeEdit: getItemBeforeEditHandler,
        getItem: getItemHandler,
        getItems: getItemsHandler,
        addItem: addItemHandler,
        saveItemAfterEdit: saveItemAfterEditHandler,
        deleteItem: deleteItemHandler,
        showItemModal: showItemModalStateHandler,
        closeItemModal: closeItemModalStateHandler,
        searchTerm: searchTerm,
        searchItems: searchItemsHandler,
        loginMode: loginMode,
        setLoginMode: setLoginModeHandler,
    };


    return (
        <ItemsContext.Provider value={context}>
            {props.children}
        </ItemsContext.Provider>
    );
}