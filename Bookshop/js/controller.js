'use strict'

function onInit() {
    doTrans()
    renderBooks()
   

}
function onchangeDisplay(btn){
    if((btn.innerText === 'Table' && gFavDisplay) || (btn.innerText === 'Cards' && !gFavDisplay)){
        changeDisplay()
        renderBooks()  
    }
}

function renderBooks() {
    var books = getBooks()
    if(!gFavDisplay){
    var strTableHTML = books.map((book) => `
            <tr>
                    <td>${book.id}</td>
                    <td data-trans="${book.title}">${book.title}</td>
                    <td>${book.price}$</td>
                    <td>
                            <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-trans="read" onclick="onReadBook('${book.id}')">Read</button>
                            <button class="update-btn btn btn-success" data-trans="update" onclick="onUpdateBook('${book.id}')">Update</button>
                            <button class="delete-btn btn btn-danger" data-trans="delete" onclick="onDeleteBook('${book.id}')">Delete</button>
                    </td>
                </tr>    
                
`
    );
    const TH = `
        <table class="table table-dark table-striped"style="width:100%;">
           <tr>
                <th data-trans="id">Id</th>
                <th><button data-trans="title-btn" class="title-btn" onclick="onSetSortByHeader()">Title</button></th>
                <th><button data-trans="price-btn" class="title-btn" onclick="onSetHeadPriceSort()">Price</button></th>
                <th data-trans="actions">Actions</th>
            </tr>
            
`;
    strTableHTML = TH + strTableHTML.join('') + '</table>';
    document.querySelector('.container-books').innerHTML = strTableHTML
    document.querySelector('.container-books').style.display = 'block'
    document.querySelector('.container-cards').style.display = 'none'
    }else{
        var books = getBooks()
        var strHtmls = books.map(book => `
        <article class="book-preview">
        <div class="content">
        <h5>${book.title}</h5>
        <p> The price is: ${book.price}$</p>
        <div>
        <img onerror="this.src='img/Endure.jpg'" src="img/${book.title}.jpg" alt="Car by ${book.title}">
        </div>
        <button class="btn btn-info" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-trans="read" onclick="onReadBook('${book.id}')">Read</button>
        <button class="update-btn btn btn-success" data-trans="update" onclick="onUpdateBook('${book.id}')">Update</button>
        <button class="delete-btn btn btn-danger" data-trans="delete" onclick="onDeleteBook('${book.id}')">Delete</button>
        </div>
        </article>
        `)
        document.querySelector('.container-cards').innerHTML = strHtmls.join('')
        document.querySelector('.container-cards').style.display = 'block'
        document.querySelector('.container-books').style.display = 'none'

    }
}

//     var books = getBooks()
//     var strHtmls = books.map(book => `
//     <article class="book-preview">
//     <h5>${book.title}</h5>
//     <img onerror="this.src='img/Endure.jpg'" src="img/${book.title}.jpg" alt="Car by ${book.title}">
//     <button onclick="onReadBook('${book.id}')">Read</button>
//     <button onclick="onUpdateBook('${book.id}')">Update</button>
//     <button onclick="onDeleteBook('${book.id}')">Delete</button>
//     `)
//     document.querySelector('.container-books').innerHTML = strHtmls.join('')
// }
function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
}
function onAddBook(ev) {
    ev.preventDefault()
    const elTitle = document.querySelector('[name=title]')
    const title = elTitle.value
    const elPrice = document.querySelector('[name=price]')
    const newPrice = +elPrice.value
    if(title && newPrice){
    const book = addBook(title,newPrice)
    renderBooks()
    elTitle.value = ''
    elPrice.value = ''
    doTrans()
    console.log(book);
    }
}
function onOpenAddBook(){
  var ra =  document.querySelector('.input')
  ra.classList.add('open')
  console.log(ra);
}
function onCloseAdd(){
   var el =  document.querySelector('.input')
   el.classList.remove('open')
   console.log(el);
}
function onUpdateBook(bookId) {
    var newPrice = +prompt('What is the new price?')
    if(newPrice){
        updateBook(bookId,newPrice)
        renderBooks()
    }
    doTrans()

}

// function onReadBook(bookId) {
//     var book = getBookById(bookId)
//     var elModal = document.querySelector('.modal')
//     elModal.querySelector('h3').innerText = book.title
//     console.log( elModal.querySelector('h4 span .price'));
//     elModal.querySelector('h4 .price').innerText = book.price + '$'
//     elModal.querySelector('p').innerText = book.desc
//     elModal.querySelector('.rating').innerText = book.rate
//     elModal.querySelector('.minus').setAttribute('onclick', `onRatingUpdate('${book.id}', -1)`)
//     elModal.querySelector('.plus').setAttribute('onclick', `onRatingUpdate('${book.id}', +1)`)
//      elModal.classList.add('open')
// }

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elCanvas = document.querySelector('.offcanvas-body')
    elCanvas.querySelector('h3').innerText = book.title
    elCanvas.querySelector('h4 .price').innerText = book.price + '$'
    elCanvas.querySelector('.content').innerText = book.desc
    elCanvas.querySelector('.rating').innerText = book.rate
    elCanvas.querySelector('.minus').setAttribute('onclick', `onRatingUpdate('${book.id}', -1)`)
    elCanvas.querySelector('.plus').setAttribute('onclick', `onRatingUpdate('${book.id}', +1)`)
    // renderBooks()
    doTrans()
}
function onSetFilterBy(filterBy){
    filterBy = setBookFilter(filterBy)
    renderBooks()
    doTrans()

    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onRatingUpdate(bookId,count){
    const book = setRating(bookId,count)
    document.querySelector('.container-rating .rating').innerText = book.rate
    renderBooks()
    doTrans()
}
function onSetSortBy(){
    const prop = document.querySelector('.sort-by').value
    const sortBy = {
        [prop]: 1
    }
    setBookSort(sortBy)
    renderBooks()
    doTrans()
}

function onSetSortByHeader(){
    setTitleSort()
    renderBooks()
    doTrans()
}
function onSetHeadPriceSort(){
    setHeadPriceSort()
    renderBooks()
    doTrans()
}
function onCloseModal() {
document.querySelector('.modal').classList.remove('open')
}
function onNextPage(){
    nextPage()
    renderBooks()
    doTrans()
}
function onPrevPage(){
    prevPage()
    renderBooks()
    doTrans()
}
function onSetLang(lang) {
    setLang(lang)
    setDirection(lang)
    doTrans()
    // renderBooks()
}
function setDirection(lang) {
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
}