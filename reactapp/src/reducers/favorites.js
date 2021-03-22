
export default function(wishList = [], action){

    if(action.type === 'addArticle'){
        let wishListCopy = [...wishList]
        wishListCopy.push(action.articleLiked)

        let findArticle = false

        for(let i=0; i<wishListCopy.length; i++){
            if(wishListCopy[i].title == action.articleLiked.title){
                findArticle = true
            }
        }

        if(!findArticle){
            wishListCopy.push(action.articleLiked)
        }

        return wishListCopy
    
    } else if(action.type === 'deleteArticle') {
        console.log('00', wishList)
        console.log('01', action.title)
       let wishListCopy = [...wishList]
        console.log('02', wishListCopy);
        // let position = null


        // for(let i=0; i<wishListCopy.length; i++){
        //     if(wishListCopy[i].title == action.title){
        //         position = i
        //     }
        // }
        const wishListDeleted = wishListCopy.filter(plante => plante.id !== action.title)
        console.log('03', wishListDeleted)

        // if(position != null){
        //     wishListCopy.splice(position,1)
        // }


        return wishListDeleted
    
    } else {
        return wishList
    }
}