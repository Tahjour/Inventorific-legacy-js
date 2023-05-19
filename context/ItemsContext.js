// context/ItemsContext.js
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const ItemsContext = createContext({
    notification: null,
    didServerItemsLoad: false,
    initialServerLoadTry: false,
    isItemModalOpen: false,
    isDeleteModalOpen: false,
    setInitialServerLoadTry: () => { },
    setDidServerItemsLoad: () => { },
    showNotification: () => { },
    hideNotification: () => { },
    getItemBeforeEdit: () => { return {}; },
    getItemToDelete: () => { return {}; },
    getUser: () => { return {}; },
    getItem: (itemID) => { return {}; },
    getItems: () => { return []; },
    addItem: async (newItem) => { },
    deleteItem: async (itemToDelete) => { },
    saveItemAfterEdit: async (itemAfterEdit, itemBeforeEdit) => { },
    showItemModal: (itemBeforeEdit = null) => { },
    closeItemModal: () => { },
    showDeleteModal: (itemToDelete = null, userToDelete = null) => { },
    closeDeleteModal: () => { },
    searchTerm: "",
    searchItems: (newSearchTerm) => { },
});

export function ItemsContextProvider(props) {
    const { data: sesson } = useSession();
    const [user, setUser] = useState({});
    const [userItems, setUserItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemBeforeEdit, setItemBeforeEdit] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [didServerItemsLoad, setDidServerItemsLoad] = useState(false);
    const [initialServerLoadTry, setInitialServerLoadTry] = useState(false);
    const [loginMode, setLoginMode] = useState("");
    const [activeNotification, setActiveNotification] = useState(null);

    useEffect(() => {
        // Figure out how to add a loading component
        async function loadAllItems() {
            if (!initialServerLoadTry) {
                const response = await fetch("/api/load-user");
                const data = await response.json();
                console.log("data: ", data);
                if (data.user) {
                    setUser(data.user);
                    setUserItems(data.user.items);
                    setDidServerItemsLoad(true);
                }
                setInitialServerLoadTry(true);
            }
        }
        loadAllItems();
        if (activeNotification && activeNotification.status === "success") {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 1000);
            return () => {
                clearTimeout(timer);
            };
        }
        if (activeNotification && activeNotification.status === "error") {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 5000);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [initialServerLoadTry, didServerItemsLoad, userItems, activeNotification]);

    function setInitialServerLoadTryHandler(hasLoaded) {
        setInitialServerLoadTry(hasLoaded);
    }

    function setDidServerItemsLoadHandler(hasLoaded) {
        setDidServerItemsLoad(hasLoaded);
    }

    function showNotificationHandler(notification) {
        setActiveNotification(notification);
    }

    function hideNotificationHandler() {
        setActiveNotification(null);
    }

    function showItemModalStateHandler(itemBeforeEdit = null) {
        setItemBeforeEdit(itemBeforeEdit);
        setIsItemModalOpen(true);
    }

    function closeItemModalStateHandler() {
        setIsItemModalOpen(false);
    }

    function showDeleteModalStateHandler(itemToDelete = null) {
        setItemToDelete(itemToDelete);
        setIsDeleteModalOpen(true);
    }

    function closeDeleteModalStateHandler() {
        setIsDeleteModalOpen(false);
    }

    function getUserHandler() {
        return user;
    }

    function getItemHandler(itemID) {
        return userItems.find(item => item.id === itemID);
    }

    function getItemsHandler() {
        if (searchTerm === "") {
            // console.log("Returned user items");
            return userItems;
        }
        // console.log("Returned filtered items");
        return filteredItems;
    }

    function getItemBeforeEditHandler() {
        return itemBeforeEdit;
    }

    function getItemToDeleteHandler() {
        return itemToDelete;
    }

    async function addItemHandler(newItem) {
        setUserItems((prevItems) => {
            return [...prevItems, newItem];
        });

        if (!sesson) {
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
            return;
        }

        const formData = new FormData();

        formData.append("newItemID", newItem.id);
        formData.append("newItemName", newItem.name);
        formData.append("newItemPrice", newItem.price);
        formData.append("newItemAmount", newItem.amount);
        formData.append("newItemDescription", newItem.description);
        formData.append("newItemCreatedDate", newItem.createdDate);
        formData.append("newItemCreatedTime", newItem.createdTime);
        formData.append("newItemModifiedDate", newItem.modifiedDate);
        formData.append("newItemModifiedTime", newItem.modifiedTime);
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
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
        } else {
            showNotificationHandler({
                status: "error",
                message: "There was an issue adding the item",
            });
        }
    }

    async function saveItemAfterEditHandler(itemBeforeEdit, itemAfterEdit) {
        setUserItems((prevItems) => {
            return prevItems.map((item) => (item.id === itemAfterEdit.id ? itemAfterEdit : item));
        });

        if (!sesson) {
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
            return;
        }
        const formData = new FormData();

        //Add itemBeforeEdit properties to form data
        formData.append("itemBeforeEditID", itemBeforeEdit.id);
        formData.append("itemBeforeEditName", itemBeforeEdit.name);
        formData.append("itemBeforeEditPrice", itemBeforeEdit.price);
        formData.append("itemBeforeEditAmount", itemBeforeEdit.amount);
        formData.append("itemBeforeEditDescription", itemBeforeEdit.description);
        formData.append("itemBeforeEditCreatedDate", itemBeforeEdit.createdDate);
        formData.append("itemBeforeEditCreatedTime", itemBeforeEdit.createdTime);
        formData.append("itemBeforeEditModifiedDate", itemBeforeEdit.modifiedDate);
        formData.append("itemBeforeEditModifiedTime", itemBeforeEdit.modifiedTime);
        formData.append("itemBeforeEditImageURL", itemBeforeEdit.imageURL);
        formData.append("itemBeforeEditImageFile", itemBeforeEdit.imageFile);


        // Add item after edit properties to form data
        formData.append("itemAfterEditID", itemAfterEdit.id);
        formData.append("itemAfterEditName", itemAfterEdit.name);
        formData.append("itemAfterEditPrice", itemAfterEdit.price);
        formData.append("itemAfterEditAmount", itemAfterEdit.amount);
        formData.append("itemAfterEditDescription", itemAfterEdit.description);
        formData.append("itemAfterEditCreatedDate", itemAfterEdit.createdDate);
        formData.append("itemAfterEditCreatedTime", itemAfterEdit.createdTime);
        formData.append("itemAfterEditModifiedDate", itemAfterEdit.modifiedDate);
        formData.append("itemAfterEditModifiedTime", itemAfterEdit.modifiedTime);
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
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
        } else {
            showNotificationHandler({
                status: "error",
                message: "There was an issue editing the item",
            });
        }


    }

    async function deleteItemHandler() {
        if (!itemToDelete || !itemToDelete.data) {
            console.error("No item to delete");
            return;
        }
        setUserItems((prevItems) => {
            return prevItems.filter(item => item.id !== itemToDelete.data.id);
        });
        if (!sesson) {
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
            return;
        }
        const formData = new FormData();
        formData.append("itemToDeleteID", itemToDelete.data.id);
        formData.append("itemToDeleteName", itemToDelete.data.name);
        formData.append("itemToDeleteImageFilePathURL", itemToDelete.data.imageURL);
        const response = await fetch("/api/delete-item", {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        if (data.deleteRes) {
            showNotificationHandler({
                status: "success",
                message: "Saved",
            });
        } else {
            showNotificationHandler({
                status: "error",
                message: "There was an issue editing the item",
            });
        }
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
        notification: activeNotification,
        initialServerLoadTry: initialServerLoadTry,
        didServerItemsLoad: didServerItemsLoad,
        isItemModalOpen: isItemModalOpen,
        isDeleteModalOpen: isDeleteModalOpen,
        setInitialServerLoadTry: setInitialServerLoadTryHandler,
        setDidServerItemsLoad: setDidServerItemsLoadHandler,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler,
        getItemBeforeEdit: getItemBeforeEditHandler,
        getItemToDelete: getItemToDeleteHandler,
        getUser: getUserHandler,
        getItem: getItemHandler,
        getItems: getItemsHandler,
        addItem: addItemHandler,
        saveItemAfterEdit: saveItemAfterEditHandler,
        deleteItem: deleteItemHandler,
        showItemModal: showItemModalStateHandler,
        closeItemModal: closeItemModalStateHandler,
        showDeleteModal: showDeleteModalStateHandler,
        closeDeleteModal: closeDeleteModalStateHandler,
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