export const getWishlist = () => {
    const wishlistRaw = localStorage.getItem('wishlist');
    if (!wishlistRaw) return [];
    try {
        const wishlist = JSON.parse(wishlistRaw);
        return Array.isArray(wishlist) ? wishlist : [];
    } catch {
        return [];
    }
};
export const addToWishlist = (productId) => {
    let wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        console.log(productId);
        
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
};

export const removeFromWishlist = (productId) => {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
};
