import config from "../../config.js";
import genMeta from "./utils/meta.js"
import { insertTag, export_url_suffix } from "./utils/pads.js";
import { getZipFromArgs } from "./utils/backups.js";
import "./dependencies/paged.polyfill.js";
import "./hooks/hooks.js";

import "./dependencies/markdown-it.js";
import "./dependencies/markdown-it-attrs.js";
import { bracketed_spans_plugin } from "./dependencies/markdown-it-bracketed-spans.js";

// Generates the metadata of the header
genMeta(config);

const zip = getZipFromArgs();
// if zip is not null, then we must load the archive instead of 
// loading the pads

if(!zip) { // when there is not zip argument
    // Load the pads synchronously
    const response = await fetch(config.padsUrl);
    const pads = await response.json();
    
    // Loading Markdownit and its plugins
    let md = window.markdownit({html: true});
    md.use(markdownItAttrs);
    bracketed_spans_plugin(md);
    
    // For each pad, a new tag is added in the body
    pads.forEach(pad => {
        insertTag(pad);
    });
    
    // For each pad, the content is loaded and processed into the body
    let promises = [];
    pads.forEach(pad => {
        promises.push(load(pad, md));
    })
    await Promise.all(promises);
} else { // when there is a zip
    // Here we handle the stuff according to the zip contents'
}

// Once everything was processed, we can launch PagedJS
document.body.style.display = "block";
window.PagedPolyfill.preview();

/**
 * Takes a pad object and loads it in the corresponding element
 * @param {Object} pad a pad object that holds a url and an id.
 * @returns a promise that is resolved once the text is loaded and converted
 */
function load(pad, engine) {
    if(pad.type == "md"){
        try{
            return fetch(pad.url + export_url_suffix)
            .then(async function (response) {
                // console.log(pad.id)
                await mdToHtml(pad.id, response, engine);
            })
        } catch(e){
            console.error("Too many reloads!");
            alert("At least one of your pad couldn't be fetched.<br />Come back in a few seconds.");
            return;
        }
    }
}

/**
 * Awaits a Markdown string to convert it and put it in a specific innerHTML's tag
 * @param {String} id id of the tag
 * @param {Promise} response promise that contains the markdown text to insert
 */
async function mdToHtml(id, response, engine) {
    let target = document.getElementById(id);
    target.innerHTML = engine.render(await response.text());
}