// export const LocalDatabaseItems = new Map();
export const LocalDatabaseItems = [];

export function deleteItem(itemIndex) {
    if (LocalDatabaseItems.length > 0) {
        LocalDatabaseItems.splice(itemIndex, 1);
    }
}