function formatNumber(num) {
    // Round to 1 decimal first
    const rounded = Math.round(num * 10) / 10;

    // If integer, show as whole
    if (Number.isInteger(rounded)) return rounded;

    // Else, show with 1 or 2 decimals
    return rounded;
}

let productsArray = [ { quantity: 0, price: 5 }, { quantity: 10, price: 2 }, { quantity: 7, price: 3 } ];

function countItemsRecursive(itemsArray) {
    if (itemsArray.length === 0) return 0;

    const { quantity = 0 } = itemsArray[0];
    return quantity + countItemsRecursive(itemsArray.slice(1));
}

function countPriceRecursive(itemsArray) {
    if (itemsArray.length === 0) return 0;

    const { quantity = 0, price = 0 } = itemsArray[0];
    return quantity * price + countPriceRecursive(itemsArray.slice(1));
}

console.log(countItemsRecursive(productsArray)); // 17

export { formatNumber, countItemsRecursive, countPriceRecursive };