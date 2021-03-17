export default function(wishlist = [], action){

    if(action.type == 'addToWishlist'){
        return action.plants
    } else if(action.type == 'addToWishlist'){
        var wishlistCopy = [...wishlist]

        var findPlant = false

        for(let i=0;i<wishlistCopy.length;i++){
            if(wishlistCopy[i].name == action.plantLiked.name){
                findPlant = true
            }
        }

        if(!findPlant){
            wishlistCopy.push(action.plantLiked)
        }
        
        return wishlistCopy
    } else if(action.type == 'saveProducts'){
        var wishlistCopy = [...wishlist]
        var position = null

        for(let i=0;i<wishlistCopy.length;i++){
            if(wishlistCopy[i].name == action.name){
                position = i
            }
        }
        if(position != null){
            wishlistCopy.splice(position,1)
        }

        return wishlistCopy
        
    } else {
        return wishlist
    }
}