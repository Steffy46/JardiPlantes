// export default function (userFavorites = [], action) {
//     if (action.type === 'addFavoritePlant') {
//         let newFavorites = [...userFavorites];
//         newFavorites.push(action.plant);
//         return newFavorites

//     } else if (action.type === 'removeFavoritePlant') {

//         const filteredFav = userFavorites.filter(fav => fav._id !== action.plant);

//         return filteredFav

//     } else if (action.type === 'retrieveFavoritePlant') {
//         return action.listFavorites
//     } else {
//         return userFavorites
//     }
// }

export default function(wishList = [], action){

    if(action.type == 'savePlants'){
        return action.plants
    } else if(action.type == 'addFavoritePlant'){
        var wishListCopy = [...wishList]

        var findArticle = false

        for(let i=0;i<wishListCopy.length;i++){
            if(wishListCopy[i].title == action.plant.name){
                findArticle = true
            }
        }

        if(!findArticle){
            wishListCopy.push(action.plant)
        }
        
        return wishListCopy
    } else if(action.type == 'removeFavoritePlant'){
        var wishListCopy = [...wishList]
        var position = null

        for(let i=0;i<wishListCopy.length;i++){
            if(wishListCopy[i].title == action.title){
                position = i
            }
        }
        if(position != null){
            wishListCopy.splice(position,1)
        }

        return wishListCopy
        
    } else {
        return wishList
    }
}