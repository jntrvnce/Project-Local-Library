function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
    let borrowedBooks = books.reduce((acc,book)=>{
      return acc + (!book.borrows[0].returned)
    },0)
    return borrowedBooks;
  }

// Helper sort function:
function sortObj(obj){
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if(obj[keyA] > obj[keyB]) {
      return -1;
    } else if(obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getMostCommonGenres(books) {
//   const booksGenres = books.map((book)=> {
//      const genre = book.genre;
//      return ({name : genre});
//   });
//   const groupedByCount = booksGenres.reduce((arr, bookGenre) => {
//     if(!arr[bookGenre.name])
//        arr[bookGenre.name] = 1
//    else
//      arr[bookGenre.name] += 1
//      return arr;
//  },{})
//  let topGenres = [];
//  for (count in groupedByCount)
//  {
//    const genreCount = groupedByCount[count];
//    topGenres.push({name:count, count: genreCount});
//  }
//  topGenres.sort((genreA,genreB)=>genreA.count < genreB.count ? 1 : -1);
//  topGenres.length = 5;
//  console.log(topGenres);
// return arr;
 const count = books.reduce((acc, { genre }) => {
  if(acc[genre]) {
    acc[genre] += 1
  } else {
    acc[genre] = 1;
  }
  return acc;
  },{})
 const sorted = sortObj(count)
 return sorted.map((name) => ({ name, count: count[name]})).slice(0, 5)
 }

 function getMostPopularBooks(books) {
  //book.borrowscount
  let popularBooks = books.map ((book)=>{
    const popularity = {
      name:book.title, 
      count:book.borrows.length
    }
    return popularity
  })
  return popularBooks.sort((titleA, titleB) => titleB.count - titleA.count).slice(0, 5);
  // popularBooks.sort((bookA,bookB)=>bookA.count < bookB.count ? 1 : -1);
  // console.log(popularBooks);
  // popularBooks.length = 5;
  // return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  let authorNames = books.map((book)=>{
    for (authorObj in authors)
    {
      const author = authors[authorObj];
      if(author.id === book.authorId)
          book.authorName = `${author.name.first} ${author.name.last}`;
    }
      return {authorName : book.authorName,
        borrowCount : book.borrows.length}
  });
  console.log(authorNames);
  const groupedBorrowCount = authorNames.reduce((arr, author) =>{
      const found = arr.find(sameAuthor =>
        sameAuthor.name === author.authorName);
      if (!found)
        arr.push({name: author.authorName, count : author.borrowCount});
      else {
        arr.map((duplicateAuthor)=>{
          if (duplicateAuthor.name === author.authorName)
            duplicateAuthor.count += author.borrowCount;
        })
      }
    return arr;
  },[])
  groupedBorrowCount.sort((authorA,authorB)=>authorA.count < authorB.count ? 1 : -1);
  groupedBorrowCount.length = 5;
  return groupedBorrowCount;
}
 
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};