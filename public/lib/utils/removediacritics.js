export const removeDiacritics = (text1, text2) => {
    // receives a second argument as a text to be concatenated to the intial string
    let newtext = ""
    if (text2 === (null || 'undefined')) {
        text2 = ""
    }
    if (text1 === (null || 'undefined')) {
        console.log('text1', text1)
        text1 = ""
    }
    newtext = text1.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    // console.log('newtext', newtext);
    return newtext;
}