import config from "../../config.js";
import genMeta from "./meta.js"
import { insertTag } from "./handle-pads.js";
import "./hooks/hooks.js";

const export_url_suffix = "/export/txt";

// Generates the metadata of the header
genMeta(config);

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
    promises.push(load(pad));
})
await Promise.all(promises);

// Once everything was processed, we can launch PagedJS
document.body.style.display = "block";
window.PagedPolyfill.preview(); 

/**
 * Takes a pad object and loads it in the corresponding element
 * @param {Object} pad a pad object that holds a url and an id.
 * @returns a promise that is resolved once the text is loaded and converted
 */
function load(pad) {
    if(pad.type == "md"){
        return fetch(pad.url + export_url_suffix)
        .then(async function (response) {
            console.log(pad.id)
            await mdToHtml(pad.id, response);
        })
    }
}

/**
 * Awaits a Markdown string to convert it and put it in a specific innerHTML's tag
 * @param {String} id id of the tag
 * @param {Promise} response promise that contains the markdown text to insert
 */
async function mdToHtml(id, response) {
    let target = document.getElementById(id);
    target.innerHTML = md.render(await response.text());
}