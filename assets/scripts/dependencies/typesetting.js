/**
 * @file Script for handling orthotypography.
 * Originally developped by Julie Blanc, revised a bit by Yann Trividic
 * @see https://gitlab.com/JulieBlanc/typesetting-tools
 */


const FRS = ["fr", 'fr-fr', 'french', 'francais', 'fra', 'français']

const config = await (await fetch('config/config.json')).json();

var frLang = null
var otherLang = null

if(FRS.indexOf(config.sourceLanguage) >= 0) {
    frLang = config.sourceLanguage
    otherLang = config.targetLanguage
}

if(FRS.indexOf(config.targetLanguage) >= 0) {
    frLang = config.targetLanguage
    otherLang = config.sourceLanguage
}

console.log(frLang)

export default function regexTypo(){
    if(frLang == null) {
        console.log("French is neither source or target language. No typesetting applied.")
        return
    }
    orthotypo(document.body);
    spaces(document.body);
    exposants();
    noHyphens();
}

function isFr(element) {
    if(element == null) return false
    if(typeof element === "string") return isFr(element.parentElement)
    if(element.classList.contains(otherLang)) return false
    if(element.classList.contains(frLang)) return true
    return isFr(element.parentElement)
}

function orthotypo( element ){
    var nodes = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, null);

    // all french caracteres: [A-Za-zÀ-ÖØ-öø-ÿœŒ]

    let array = [
        {
            // oe
            reg: /oe/g, 
            repl: 'œ' 
        },
        {
            // XIème = XIe 
            reg: /(X|I|V)ème/g, 
            repl: '$1e' 
        },
        
    ]

    var node;
    while (node = nodes.nextNode()) {
        for (var i = 0; i < array.length; i++) {
            if(node.textContent) {
                if (isFr(node.parentElement)) {
                    node.textContent = node.textContent.replace(array[i].reg, array[i].repl);
                }
            }
        } 
    }

}


function spaces( element ){
    var nodes = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, null);

    // all french caracteres: [A-Za-zÀ-ÖØ-öø-ÿœŒ]

    let array = [
        {
            // french open quotes 
            reg: /\"([A-Za-zÀ-ÖØ-öø-ÿœŒ])/g, 
            repl: '«$1' 
        },
        {
            // french close quotes 
            reg: /([A-Za-zÀ-ÖØ-öø-ÿœŒ])\"/g, 
            repl: '$1»' 
        },
        {
            // real apostrophe
            reg: /\'/g, 
            repl: '’' 
        },
        {
            // real suspension points
            reg: /\.+\.+\./g, 
            repl: '\u2026'
        },
        {
            // delete all spaces before punctuation !?;:»›”%€)].,
            reg: /\s+([!?;:»›”%€)\]\.\,])/g, 
            repl: '$1'
        },
        {
            // add narrow no break space before !?;:»›%€
            reg: /([!?;:»›%€])/g, 
            repl: '\u202F$1'
        },
        {
            // delete all spaces after «‹“[(
            reg: /([«‹“\[(])\s+/g, 
            repl: '$1'
        },
        {
            // add narrow no break space after «‹
            reg: /([«‹])/g, 
            repl: '$1\u202F'
        },
        /**
         * This part is handled by ragadjust
         */
    //     {
    //          // OPTION 1 : no break space after two letter words  (if not follow by an other two letter word)
    //         //  reg: /\s+([a-zØ-öø-ÿœ]{2})\s+([A-Za-zÀ-ÖØ-öø-ÿœŒ]{3,})/gi, 
    //         //  repl: ' $1\u00A0$2'

    //         // OPTION 2: no break space after some two letter words 
    //         reg: /\s(le|la|un|une|ce|ces|il|on|les|des|du|ils)\s+/g, 
    //         repl: ' $1\u00A0'
    //     }, 
    //     {
    //        // if prev OPTION 2: no break space after successive two letter words 
    //        reg: /\s+([a-zØ-öø-ÿœ]{2})\s+([A-Za-zÀ-ÖØ-öø-ÿœŒ]{2})\s+/g, 
    //        repl: ' $1 $2\u00A0'
    //    },
    //     {
    //         // no break space after one letter words
    //         reg: /\s+([a-zà])\s+/gi, 
    //         repl: ' $1\u00A0'
    //     },
    //     {
    //         // no break space after first word (2-5 letter) of the sentence
    //         reg: /\.\s([A-ZÀ-Ö])([A-Za-zÀ-ÖØ-öø-ÿœŒ]{1,5})\s+/g, 
    //         repl: '. $1$2\u00A0'
        // },
        {
            // no break space into names
            reg: /([A-ZÀ-ÖØŒ])([A-Za-zÀ-ÖØ-öø-ÿœŒ]+)\s+([A-ZÀ-ÖØŒ])([A-Za-zÀ-ÖØ-öø-ÿœŒ]+)/g, 
            repl: '$1$2\u00A0$3$4'
        },
        {
            // no break space before Caps + .
            reg: /\s([A-ZÀ-ÖØŒ])\./g, 
            repl: '\u00A0$1. '
        },
        {
            // no break space before 'siècle'
            reg: /(X|I|V)(er|e)\s+siècle/g, 
            repl: '$1$2\u00A0siècle'
        },
        {
            // no break space after figures table page chapitre ect. + number
            reg: /(figures?|tables?|planches?|chapitres?|pages?|parties?|sections?|volumes?|vol\.)\s+(\d|I|X|V)/g, 
            repl: '$1\u00A0$2'
        },
        {
            // p. and pp. in blibliography
            reg: /(\spp?\.)\s?(\d)/g, 
            repl: '$1\u00A0$2'
        }
    ]

    var node;

    while (node = nodes.nextNode()) {
        // search if text is into a <code> element
        var code = node.parentElement.closest("code"); 
        // if not, apply replacements
        if(code == null){
            if(node.textContent) {
                console.log(isFr(node.parentElement), node.textContent)
                if (isFr(node.parentElement)) {
                    for (var i = 0; i < array.length; i++) {
                        node.textContent = node.textContent.replace(array[i].reg, array[i].repl);
                    }
                }
            }
        }
    }
}







function exposants(){
    let paragraphs = document.querySelectorAll('p, ul, h1, h2, h3, h4, h5, h6');
    for (var p = 0; p < paragraphs.length; p++) {
        paragraphs[p].innerHTML = exposantsRegex(paragraphs[p].innerHTML);
    }
    
}


function exposantsRegex(elem){

    let array = [
        {
            // numéros
            reg: /\sno\.?\s?(\d+)/g, 
            repl: ' n<sup>o</sup>&nbsp;$1' 
        },
        {
            // siècles 
            reg: /\b(X|I|V)(er|e)\b/g, 
            repl: '$1<sup>$2</sup>' 
        },
    ]

    for (var i = 0; i < array.length; i++) {
        if (isFr(elem)) {
            elem = elem.replace(array[i].reg, array[i].repl);
        }
    }
    return elem;
    
}


function noHyphens(){
    let paragraphs = document.querySelectorAll('p');

    // Problems here because replace also content in `href`, `data`atttribute, etc.
    // for (var i = 0; i < paragraphs.length; i++) {
    //     let p = paragraphs[i];
    //     p.innerHTML = p.innerHTML.replace(/([A-ZÀ-Ö][a-zØ-öø-ÿœ]{3,})/g, '<span style="hyphens: none">$1</span>');
    // }
    
}