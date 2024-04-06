/** Module to handle the pads save. */

import "../dependencies/jszip.js";
import "../dependencies/jszip-utils.min.js";
import { saveAs } from '../dependencies/FileSaver.min.js';
import { export_url_suffix } from "./pads.js";

// Get config data
const config = await (await fetch('config/config.json')).json();

/**
 * Saves the pads' contents as raw text, zips it and downloads it.
 */
window.savePads = async function(){

    const response = await fetch(config.padsUrl);
    const pads = await response.json();

    var zip = new JSZip();

    pads.forEach((pad) => {
            var blob = fetch(pad.url + export_url_suffix).then(resp => resp.blob());
            zip.file(pad.id + "." + pad.type, blob);
        });

    var date = new Date();

    const timestamp = date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + ("0" + date.getHours() ).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2);

    const title  = document.title.normalize('NFKD') // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
    .replace(/\s+/g, '_') // replace spaces with hyphens
    .replace(/-+/g, '_'); // remove consecutive hyphens

    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // Force down of the Zip file
        saveAs(content, title + "_" + timestamp + ".zip");
    });
}