/**
 * @file Handles pads to use them all over the project.
 * The only modification needed to add a pad is to add an entry to `pads.json`
 * 
 * @author Yann Trividic
 * @license GPLv3
 */

let padsUrl;
async function fetchPads() {
    const response = await fetch(padsUrl);
    const pads = await response.json();
    return pads;
}

const data_suffix = "_data";
const export_url_suffix = "/export/txt";

console.log("handle-pads is working...");
var md = null;
window.onload = function(){
    md = window.markdownit({html: true});
    md.use(markdownItAttrs);
    bracketed_spans_plugin(md);
};

/**
 * Replaces the Markdown content of a particular element with HTML code 
 * @param {String} id 
 */
function run(id) {
    var text = document.getElementById(id + data_suffix).innerHTML,
    target = document.getElementById(id),
    html = md.render(text);
    //console.log(html);
    target.innerHTML = html;
}

/**
 * Master function that loads the content of a series of pads into the DOM
 */
 async function generateHtmlFromPads(padsUrlFromIndex){
    // We wanna replicate this :
    // <link id="pad-css" href="https://pad.roflcopter.fr/p/CSSVitry/export/txt" rel="stylesheet" type="text/plain" />
    // or, if md
    // <div data-md="https://pads.domainepublic.net/p/CouvVitry/export/txt" id="first_src"></div>
    // <section id="first"></section>
    padsUrl = padsUrlFromIndex;
    let promise = new Promise((resolve, reject) => {
        resolve(fetchPads());
    });

    let pads = await promise;

    promise = new Promise((resolve, reject) => {
        resolve(loadPads(pads));
    })
    
    await promise ;


    promise = new Promise((resolve, reject) => {
        resolve(putPadsDataHtml(padsUrl));
    })
}

function loadPads(pads){
    pads.pads.forEach((pad) => {
        if(pad.type == "md") {
            insertMdTags(pad);
        } else if(pad.type == "css") {
            insertCssTag(pad);
        } else {
            console.error(`${pad.id} is neither Markdown nor CSS.`);
        }
    });
    console.log("pads loaded.");
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
 * Generates an HTML section out of Markdown text data.
 * @param {String} id of the section generated (name of the file)
 * @param {String} content Markdown text
 */
function insertMdTagsFromBackup(id, content){
    var data = document.createElement("div");
    data.setAttribute("id", id + data_suffix);
    data.innerHTML = content
    document.body.appendChild(data);
    
    // Generate section
    var section = document.createElement("section");
    section.setAttribute("id", id);
    document.body.appendChild(section);

    run(id);
    data.remove();
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
 * Loads the CSS contained in a pad into the DOM.
 * @param {String} id of the section generated (name of the file)
 * @param {String} content CSS plain text
 */
 function insertCssTagsFromBackup(id, content) {
    // Generate link element
    var style = document.createElement("style");
    style.setAttribute("id", id);
    style.innerHTML = content;
    document.head.append(style);
}

/**
 * Processes the data elements to turn them into HTML code.
 */
function putPadsDataHtml(){
    fetchPads().then(pads => {
        pads.pads.forEach((pad) => {
            $(document).ready(function(){
                var formated = '#' + pad.id + '_data';
                let link = document.getElementById(formated);
                console.log(formated, link);
                $(formated).load($(formated).attr("data-md"), function(){
                    run(pad.id);
                    $(formated).remove();
                });
            });
        });
    });
    console.log("All the Markdown content has been converted.");
}

/**
 * Adds links for the pads into a pannel element.
 * @param {Element} pannel 
 */
window.generateOverlayTags = async function(pannel){
    // function used in the overlay to generate the list of links
    
    fetchPads().then(pads => {
        var md = [];
        var css = [];
        pads.pads.forEach((pad) => {
            if(pad.type == "md") {
                md.push(pad);
            } else if(pad.type == "css") {
                css.push(pad);
            } else {
                console.error(`${pad.id} is neither Markdown nor CSS.`);
            }
        });
        return [md, css];
    }).then(arrays => {
        addListOfLinks(arrays[0], pannel, true);
        addListOfLinks(arrays[1], pannel, false);
    });
}

/**
 * Generate a list of link elements based on a list of pads
 * @param {List of dicts} pads 
 * @param {Element} pannel 
 * @param {Boolean} isCss  
 */
function addListOfLinks(pads, pannel, isCss){
    pads.forEach((pad) => {
        let a = document.createElement("a");
        a.setAttribute("href", pad.url);
        a.setAttribute("target", "_blank");
        if(isCss) {
            a.setAttribute("onmouseover", `chco("${pad.id}", "var(--color-hover)")`); //for mouse hover highlight
            a.setAttribute("onmouseout", `chco("${pad.id}", "")`);
        }
        a.innerText = pad.string ;
        pannel.append(a);
        pannel.append(document.createElement("br"));
    });
    pannel.append(document.createElement("br"));
}

/**
 * Saves the pads' contents as raw text, zips it and downloads it.
 */
window.savePads = function(){
    var zip = new JSZip();
    
    fetchPads().then(pads => {
        pads.pads.forEach((pad) => {
            var blob = fetch(pad.url + export_url_suffix).then(resp => resp.blob());
            zip.file(pad.id + "." + pad.type, blob);
        });
    }).then(function() {
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
            //console.log(content);
        });
        
    });
}

/**
 * Changes the color of a section
 * @param {String} id 
 * @param {String} color 
 */
function chco(id, color) {
    document.querySelectorAll(("[data-id='"+id+"']")).forEach(element => {
        element.style.color = color;
    });   
}

/**
 * Reads a zip file and loads the content of the files in the corresponding HTML elements
 * @param {String} file
 */
function loadZipIntoHtml(file){
    JSZipUtils.getBinaryContent(file, function(err, data) {
        if(err) {
            throw err; // or handle err
        }
    
        JSZip.loadAsync(data).then(function (data) {
            for(let [filename, file] of Object.entries(data.files)) {
                data.file(filename).async("string").then(function(data) {
                    const ext = filename.split('.').pop();
                    const id = filename.split('.')[0]; // won't work well if several dots
                    if(ext == "md") {
                        insertMdTagsFromBackup(id, data);
                    } else if(ext == "css") {
                        insertCssTagsFromBackup(id, data);
                    }
                    //console.log(data)
                }).catch(function(err) {
                    console.error("Failed to open", filename, " as ZIP file:", err);
                })
            }  
        }); 
    });
}

