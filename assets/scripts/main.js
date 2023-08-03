import config from "../../config.js";
import { insertTag, putPadDataHtml } from "./handle-pads.js";

const export_url_suffix = "/export/txt";

// Disabling PagedJS auto startup
window.PagedConfig = {
    auto: false
};

// Load the pads synchronously
const response = await fetch(config.padsUrl);
const pads = await response.json();
console.log(pads);

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
window.PagedPolyfill.preview(); 

// load JS and insert in script tags
function load(pad) {
    if(pad.type == "md"){
        return fetch(pad.url + export_url_suffix)
        .then(async function (response) {
            console.log(pad.id)
            await mdToHtml(pad.id, response);
        })
    }
}

async function mdToHtml(id, response) {
    let target = document.getElementById(id);
    target.innerHTML = md.render(await response.text());
}