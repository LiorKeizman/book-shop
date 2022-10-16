'use strict'

const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 5
const gTitles = ['Unbreakable','Endure','Relentless']

var gPageIdx = 0
var gBooks
var gFilterBy = { maxPrice: 20, minRate: 0 }
var gFavDisplay = false
_createBooks()

function changeDisplay(){
    gFavDisplay = !gFavDisplay
  
    return gFavDisplay
}
function getBooks() {
    var books = gBooks.filter((book) =>
        book.price <= gFilterBy.maxPrice && book.rate >= gFilterBy.minRate)

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}
function nextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length)
    gPageIdx = 0
    
}
function prevPage(){
    gPageIdx--
    if(gPageIdx / PAGE_SIZE < 0){
        gPageIdx = gBooks.length
    }
    
}
function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex(book => bookId === book.id)
    console.log(bookIdx);
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}
function addBook(title, newPrice) {
    const book = _createBook(title)
    console.log(book.price);
    book.price = newPrice
    gBooks.push(book)
    _saveBooksToStorage
    return book
}
function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    // console.log(book.desc);
    return book
}
function updateBook(bookId, newPrice) {
    const books = gBooks.find(book => bookId === book.id)
    books.price = newPrice
    _saveBooksToStorage()
    return books

}
function _createBook(title) {
    return {
        id: _makeId(),
        title,
        price: getRandomIntInclusive(1, 20),
        rate: 0,
        desc: makeLorem(),
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    console.log(!books);
    if (!books || !books.length) {
        var books = []
        for (let i = 0; i < 25; i++) {
            var book = gTitles[getRandomIntInclusive(0,gTitles.length-1)]
            books.push(_createBook(book))
        }
    }
    gBooks = books
    console.log(gBooks);
    _saveBooksToStorage()
    return gBooks
}

function setRating(bookId, count) {
    const book = getBookById(bookId)
    if (book.rate === 10 && count === 1) return
    else if (book.rate === 0 && count === -1) return
    book.rate += count
    _saveBooksToStorage() 
    return book

}
function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    console.log(filterBy);
    console.log(gFilterBy.minRate);
    return gFilterBy
}



function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((a, b) => a.price - b.price)
    } else if (sortBy.rate !== undefined) {
        gBooks.sort((a, b) => b.rate - a.rate)
    }
    doTrans()
}
function setTitleSort(){
    gBooks.sort((a,b) => a.title.localeCompare(b.title))
}
function setHeadPriceSort(){
    gBooks.sort((a,b) => a.price - b.price)
}
// function rateUp(bookId){
//     var books = getBooks()
//    const book = books.find((book) => bookId === book.id)
//    console.log(book);
//     var elBtn = document.querySelector('.container-rating')
//     book.rate += 1
//     elBtn.querySelector('.rating').innerText = book.rate

// var elBtn = document.querySelector('.container-rating')
// elBtn.querySelector('.rating').innerText = book.rate++
//}  
function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

