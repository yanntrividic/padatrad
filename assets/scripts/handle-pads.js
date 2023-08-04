/**
 * @file Handles pads to use them all over the project.
 * The only modification needed to add a pad is to add an entry to `pads.json`
 * 
 * @author Yann Trividic
 * @license GPLv3
 */

const data_suffix = "_data";
const export_url_suffix = "/export/txt";

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

