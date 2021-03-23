export default function (wishList = [], action) {
  if (action.type === "addArticle") {
    let wishListCopy = [...wishList];
    wishListCopy.push(action.articleLiked);

    let findArticle = false;

    for (let i = 0; i < wishListCopy.length; i++) {
      if (wishListCopy[i].article == action.articleLiked.article) {
        findArticle = true;
      }
    }

    if (!findArticle) {
      wishListCopy.push(action.articleLiked);
    }

    return wishListCopy;
  } else if (action.type === "deleteArticle") {
    var wishListCopy = wishList.filter(
      (element) => element.id != action.articleDisliked.id
    );
    
    console.log("00", wishList);
    console.log("02", wishListCopy);

    return wishListCopy;

    //   } else if (action.type === "deleteArticle") {
    //     let wishListCopy = [...wishList];
    //     let position = null;

    //     for (let i = 0; i < wishListCopy.length; i++) {
    //       if (wishListCopy[i].article == action.articleDisliked.article) {
    //         position = i;
    //       }
    //     }

    //     if (position != null) {
    //       wishListCopy.splice(position, 1);
    //     }

    //     return wishListCopy;
  } else {
    return wishList;
  }
}
