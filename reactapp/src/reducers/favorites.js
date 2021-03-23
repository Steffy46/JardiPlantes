export default function (wishList = [], action) {
  if (action.type === "addArticle") {
    let wishListCopy = [...wishList];
    wishListCopy.push(action.articleLiked);

    let findArticle = false;

    for (let i = 0; i < wishListCopy.length; i++) {
      if (wishListCopy[i].title == action.articleLiked.title) {
        findArticle = true;
      }
    }

    if (!findArticle) {
      wishListCopy.push(action.articleLiked);
    }

    return wishListCopy;
  } else if (action.type === "deleteArticle") {
    let wishListCopy = [...wishList];
    let position = null;

    for (let i = 0; i < wishListCopy.length; i++) {
      if (wishListCopy[i].id == action.title.id) {
        position = i;
      }
    }

    if (position != null) {
      wishListCopy.splice(position, 1);
    }

    return wishListCopy;
  } else {
    return wishList;
  }
}
