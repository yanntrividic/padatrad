/**
 * @file Pagedjs' hook that handles the translation contents to be displayed
 * @author Yann Trividic
 * @license GPLv3
 * @see https://gitlab.com/the-moral-of-the-xerox-vf
 *
 * inspired of Benoit Launay's forensic.js script
 * @see https://gitlab.coko.foundation/pagedjs/templaters/forensic
 */

import config from "../../../config.js"

// TODO: at the moment, the script has a strong limitation.
//       It only allows one chunk of translation per paragraph.
//       I want to make it so there can be up to one chunk per word.
//       How to do that while not making it too heavy to use?
//          1) add a "pmark" class that will specify where to cut the paragraph.
//          2) make it so each series of p element get tranformed into spans
//             and that those spans are incapsulated within a p element
//             that will start at the first occurrence, and end when the pmark class is met.
//             We have to differentiate the sections which hold pmarks and the ones that don't.

class replaceTranslation extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }

    
    beforeParsed(content) {
        console.log("replaceTranslation is not working...");
        
        const sources = content.querySelectorAll("section > *:not(." + config.targetLanguage + ")"); // all the text we must translate
        sources.forEach((source) => {
            console.log(source);
            source.setAttribute("lang", config.sourceLanguage);
            addClass(source, "source");
            var target = this.getTarget(source);
            let sLength = this.getLength(source); // counts the number of chars
            textLength += sLength ;          // and adds it to the total length
            if (target) { // if the following element is a target element
                target.setAttribute("lang", config.targetLanguage);
                addClass(target, "target");
                target.classList.remove(config.targetLanguage);
                if (target.innerText != ""){ // if a translation is not empty
                    if (target.classList.contains("accepted")) acceptedTranslationLength += sLength ;
                    translationLength += sLength ; // the amount of translated chars is added to the translation's length
                    source.remove();
                } else target.remove();
            }
        });
    }

    afterPreview(pages){
        let alts = this.getAltsCssSelector(document);
        console.log(alts);
        addOnclickToAlts(alts);
        this.permuteAlts(alts);
    }

    /**
     * For each source element, checks if there is a target element associated
     * and returns it. Otherwise, prints an error.
     * @param {element} source a p element that countains the source text
     * @returns the p targement element
     */
    getTarget(source){
        let target;
        try {
            target = source.nextSibling.nextSibling; // all the translations
        } catch(e) {
            // End of section
            return ;
        }
        if(target &&    target.hasAttribute("class") && target.classList.contains(config.targetLanguage)){
            return target;
        } else {
            // console.error("Translation element is missing after \"" + source.innerText.slice(0, 10) + "...\"");
            return false;
        }
    }

    /**
     * Gets all the elements that can have alternative translations.
     * @param {} content document-fragment made from the original DOM
     * @returns all the spans that have a alt(\d+)? attribute up to MAX_ALTS
     */
    getAltsCssSelector(content){
        let s = ""
        for(let i = 0 ; i < listOfAltsAttrs.length; i++ ){
            s += ".target span[" + listOfAltsAttrs[i] + "], " ;
        }
        return content.querySelectorAll(s.slice(0, s.length - 2));
    }

    /**
     * On loading, saves the default value of the elements that can have alternate
     * translations, and permutes the content.
     * @param {element} alts elements that can have alternative translations
     */
    permuteAlts(alts){
        for(let i = 0 ; i < alts.length ; i++){
            let keep = alts[i].hasAttribute("default");
            alts[i].setAttribute("default", alts[i].innerText); // keeps track of the default value
            if(!keep) permuteAlt(alts[i], true);
        }
    }

    getLength(element){
        return element.innerText.length;
    }
    
}
Paged.registerHandlers(replaceTranslation);


const MAX_ALTS = 10; // number of alternates allowed in alt(\d+)?

/**
 * Adds a .random class to the elements and an onlick attribute for the permuteAlt function 
 * @param {*} alts elements that can have alternative translations
 */
function addOnclickToAlts(alts){
    for(let i = 0 ; i < alts.length ; i++){
        alts[i].classList.add("random");
        alts[i].addEventListener("click", permuteAltEvent);
    }
}

/**
 * Defines the list of attributes we will check for alternative translation
 * @returns a list of attributes
 */
function getListOfAlts(){
    let s = [];
    s.push("alt");
    for(let i = 0 ; i <= MAX_ALTS; i++ ){
        s.push('alt' + i) ;
    }
    return s;
}

const listOfAltsAttrs = getListOfAlts();

/**
 * Randomly permutes the innerText of an element in the case it has alternative
 * versions that were specified in its attributes.
 * @param {element} elem The element that will have its innertext permuted
 * @param {Boolean} replacement If replacements are allowed or not
 */
function permuteAltEvent(event){
    permuteAlt(event.target);
}

function permuteAlt(elem, replacement=false) {
    let events = [elem.innerText];
    let attrs = listOfAltsAttrs.concat(["default"]) ;
    for(let i = 0 ; i < attrs.length; i++ ){
        const attr = attrs[i];
        if(elem.getAttribute(attr)) {
            events.push(elem.getAttribute(attr));
        }
    }
    let choice = events[Math.floor(Math.random() * events.length)]; // picks a random event
    while(!replacement && elem.innerText == choice){ // if replacement is not allowed
        choice = events[Math.floor(Math.random() * events.length)];
    }
    elem.innerText = choice;
}


let textLength = 0;
let translationLength = 0;
let acceptedTranslationLength = 0;

export function getTranslationPercentage(){
    return translationLength/textLength;
}

export function getAcceptedTranslationPercentage(){
    return acceptedTranslationLength/textLength;
}

function addClass(element, className) {
    try {
        element.classList.add(className);
    } catch(e) {
        element.classList = [className];
    }
}