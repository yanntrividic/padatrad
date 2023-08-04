/**
 * This module generates meta tags for the header out of the config.js file.
 */

/**
 * Macro to easily append a meta tag to the header's document
 * @param {String} name 
 * @param {String} property 
 * @param {String} content 
 */
function addMeta(name, property, content) {
    let meta = document.createElement("meta");
    if(name) meta.setAttribute("name", name);
    if(property) meta.setAttribute("property", property);
    if(content) meta.setAttribute("content", content);
    document.head.append(meta);
}

export default (config) => {
    addMeta("description", undefined, config.description);
    addMeta("keywords", undefined, config.keywords);
    addMeta("author", undefined, config.author);
    
    addMeta(undefined, "og:site_name", window.location.host);
    addMeta(undefined, "og:title", config.title);
    addMeta(undefined, "og:description", config.description);
    addMeta(undefined, "og:author", config.author);
    addMeta(undefined, "og:type", "website");
    
    addMeta("citation_author", undefined, config.author);
    addMeta("citation_title", undefined, config.title);
    addMeta("citation_date", undefined, config.date);
    
    let linkschema = document.createElement("link");
    linkschema.rel = "schema.dc";
    linkschema.href = "https://purl.org/dc/elements/1.1/";
    document.head.append(linkschema);
    
    addMeta("DC.creator", undefined, config.author);
    addMeta("DC.publisher", undefined, config.author);
    addMeta("DC.language", undefined, config.targetLanguage);
    addMeta("DC.title", undefined, config.title);
    addMeta("DC.description", undefined, config.description);
    addMeta("DC.rights", undefined, config.licence);
    addMeta("DC.date", undefined, config.licence);
    addMeta("DC.type", undefined, "website");
    
    let linkdc = document.createElement("link");
    linkdc.rel = "dc:identifier";
    linkdc.href = window.location.host;
    document.head.append(linkdc);
    
    addMeta(undefined, "dc:creator", config.author);
    addMeta(undefined, "dc:publisher", config.author);
    addMeta(undefined, "dc:language", config.targetLanguage);
    addMeta(undefined, "dc:title", config.title);
    addMeta(undefined, "dc:description", config.description);
    addMeta(undefined, "dc:rights", config.licence);
    addMeta(undefined, "dc:date", config.licence);
    addMeta(undefined, "dc:type", "website");
}