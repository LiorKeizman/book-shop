
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}
function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}
function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}
function makeLoremHE(wordCount = 100) {
    const words = ['השמיים', 'מעל', 'השדה', 'היה', 'הצבע של הטלויזיה', 'חדים', 'אל', 'ערוץ מת', '.', 'כל', 'זה קרה', 'יותר או פחות', '.', 'אני', 'היה לי', 'הסיפור', 'חתיכה אחר חתיכה', 'ממספר אנשים שונים', 'ו', 'בכלליות', 'קרה', 'במקרים כאלה', 'בכל פעם', 'זה', 'היה', 'סיפור אחר לגמרי', '.', 'זה', 'היה', 'תענוג', 'להישרף']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}