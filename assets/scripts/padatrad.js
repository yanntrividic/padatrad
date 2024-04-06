/**
 * @file Padatrad is a free and opensource webapp made to facilitate the publishing of collaborative translation.
 * @author Yann Trividic
 * @license GPLv3
 * @see https://gitlab.com/editionsburnaout/padatrad
 */

import genMeta from "./utils/meta.js"
import { insertTag, load, getJson } from "./utils/pads.js";
import { getZipFromArgs, loadZipIntoHtml } from "./utils/backups.js";
import regexTypo from "./dependencies/typesetting.js";
import "./dependencies/paged.polyfill.js";
import "./hooks/hooks.js";

// Get config data
const config = await getJson("config/config.json");

// Generates the metadata of the header
genMeta(config);

const zip = getZipFromArgs();
// if zip is not null, then we must load the archive instead of
// loading the pads

if(!zip) { // when there is not zip argument, we load the app
    // Load the pads synchronously
    const pads = await getJson(config.padsUrl) ;

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
} else { // when there is a zip, we only load a non-editable backup
    // Here we handle the stuff according to the zip contents'
    document.querySelectorAll('meta[name="category"]')[0].setAttribute("content", "backup"); // specify it's a backup
    await loadZipIntoHtml(zip);
}

// Fix the typo a bit
if(config.typesetting) {
    // Make Hyphenopoly happen here.
    regexTypo();
}

// Once everything was processed, we can launch PagedJS
document.body.style.display = "block";
window.PagedPolyfill.preview();