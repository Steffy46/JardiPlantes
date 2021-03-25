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
        // console.log('00', wishList)
        // console.log('01', action.title)
       let wishListCopy = [...wishList]
        // console.log('02', wishListCopy);
        let position = null


        for(let i=0; i<wishListCopy.length; i++){
            // console.log("03", wishListCopy[i].id, action.title)
            if(wishListCopy[i].id == action.title.id){
                position = i
            }
        }

        if(position != null){
            wishListCopy.splice(position,1)
        }
        // console.log('04', wishListCopy)


        return wishListCopy
    
    } else {
        return wishList
    }
}