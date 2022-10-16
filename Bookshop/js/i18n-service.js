'use strict'

const gTrans = {
    'title': {
        en:'Welcome to my bookshop',
        he:'ברוך הבא לחנות הספרים שלי'
    },
    'add': {
        en:'create new book',
        he:'תיצור ספר חדש'
    },
    'sort-all': {
        en:'Select Sorting',
        he:'תבחר איך למיין'
    },
    'sort-rate': {
        en:'By Rating',
        he:'על פי דירוג'
    },
    'sort-price': {
        en:'By Price',
        he:'על פי מחיר'
    },
    'max-price': {
        en:'Max Price',
        he:'מחיר מקסימאלי'
    },
    'min-rate': {
        en:'Min Rate',
        he:'דירוג מינימאלי'
    },
    'prev-page': {
        en:'Prev Page',
        he:'עמוד קודם'
    },
    'next-page': {
        en:'Next Page',
        he:'עמוד הבא'
    },
    'add-title-placeholder': {
        en:'Add New Title',
        he:'תוסיף כותרת חדשה'
    },
    'add-price-placeholder': {
        en:'Add New price',
        he:'תוסיף מחיר חדש'
    },
    'read': {
        en:'Read',
        he:'לקרוא'
    },
    'update': {
        en:'Update',
        he:'לעדכן'
    },
    'delete': {
        en:'Delete',
        he:'למחוק'
    },
    'modal-title': {
        en:'Best seller',
        he:'רב מכר'
    },
    'modal-price': {
        en:'The price is:',
        he:'המחיר הוא:'
    },
    'modal-desc': {
        en:'Book description',
        he:'תיאור הספר'
    },
    // 'modal-lorem': {
    //     en:'Add New price',
    //     he:''
    // },
    'close': {
        en:'Close',
        he:'סגור'
    },
    'id': {
        en:'Id',
        he:'ת"ז'
    },
    'title-btn': {
        en:'Title',
        he:'כותרת'
    },
    'price-btn': {
        en:'Price',
        he:'מחיר'
    },
    'actions': {
        en:'Actions',
        he:'פעולות'
    },
    'Unbreakable': {
        en:'Unbreakable',
        he:'בלתי ניתן לשבירה'
    },
    'Endure': {
        en:'Endure',
        he:'לסבול'
    },
    'Relentless': {
        en:'Relentless',
        he:'ללא הפסקה'
    },
    'ADD': {
        en:'ADD',
        he:'להוסיף'
    },
}
let gCurrLang = 'en'

function getTrans(transKey) {
    const transMap = gTrans[transKey]
    if (!transMap) return 'UNKNOWN'
   
    let trans = transMap[gCurrLang]
    if (!trans) trans = transMap.en
    _saveBooksToStorage()
    return trans
}

function doTrans() {
    const els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        let trans
        if (transKey === 'modal-lorem') {
            const modal = {
                en: makeLorem(),
                he: makeLoremHE()
            }
            trans = modal[gCurrLang]
        }else{trans = getTrans(transKey)}
        //  trans = getTrans(transKey)
        el.innerText = trans
        if (el.placeholder) el.placeholder = trans
    })
}

function setLang(lang) {
    gCurrLang = lang
    _saveBooksToStorage()
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num)
}

function formatDate(time) {
    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    }
    return new Intl.DateTimeFormat(gCurrLang, options).format(time)
}