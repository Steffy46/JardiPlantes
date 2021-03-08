export default function (userFavorites = [], action) {
    if (action.type === 'addFavoritePlant') {
        let newFavorites = [...userFavorites];
        newFavorites.push(action.plant);
        return newFavorites

    } else if (action.type === 'removeFavoritePlant') {

        const filteredFav = userFavorites.filter(fav => fav._id !== action.plant);

        return filteredFav

    } else if (action.type === 'retrieveFavoritePlant') {
        return action.listFavorites
    } else {
        return userFavorites
    }
}