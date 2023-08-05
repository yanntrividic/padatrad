/**
 * @file Handles pads to use them all over the project.
 * The only modification needed to add a pad is to add an entry to `pads.json`
 * 
 * @author Yann Trividic
 * @license GPLv3
 */

import convert from "./converter.js"

export const data_suffix = "_data";
export const export_url_suffix = "/export/txt";

export function insertTag(pad){
    if(pad.type == "md") {
        insertMdTags(pad);
    } else if(pad.type == "css") {
        insertCssTag(pad);
    } else {
        console.error(`${pad.id} is neither Markdown nor CSS.`);
    }
    console.log(`${pad.id} pad loaded.`);
}

/**
 * Inserts two elements in the DOM: a section that will hold the final HTML code,
 * and a temporary elemnent that will store the Markdown data.
 * @param {Dict} pad 
 */
function insertMdTags(pad) {
    // Generate data-md element
    var data = document.createElement("div");
    data.setAttribute("id", pad.id + data_suffix);
    data.setAttribute("data-md", pad.url + export_url_suffix);
    document.body.appendChild(data);
    
    // Generate section
    var section = document.createElement("section");
    section.setAttribute("id", pad.id);
    document.body.appendChild(section);
}

/**
 * Loads the CSS contained in a pad into the DOM.
 * @param {Dict} pad 
 */
function insertCssTag(pad) {
    // Generate link element
    var link = document.createElement("link");
    link.setAttribute("id", pad.id);
    link.setAttribute("href", pad.url + export_url_suffix);
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/plain");
    document.head.append(link);
}

/**
 * Takes a pad object and loads it in the corresponding element
 * @param {Object} pad a pad object that holds a url and an id.
 * @returns a promise that is resolved once the text is loaded and converted
 */
export function load(pad) {
    if(pad.type == "md"){
        try{
            return fetch(pad.url + export_url_suffix)
            .then(async function (response) {
                // console.log(pad.id)
                let text = await response.text();
                let target = document.getElementById(pad.id);
                target.innerHTML = convert(text);
            })
        } catch(e){
            console.error("Too many reloads!");
            alert("At least one of your pad couldn't be fetched.<br />Come back in a few seconds.");
            return;
        }
    }
}