
import "../dependencies/markdown-it.js";
import "../dependencies/markdown-it-attrs.js";
import { bracketed_spans_plugin } from "../dependencies/markdown-it-bracketed-spans.js";

// Loading Markdownit and its plugins
let md = window.markdownit({html: true});
md.use(markdownItAttrs);
bracketed_spans_plugin(md);

/**
 * Awaits a Markdown string to convert it and put it in a specific innerHTML's tag
 * @param {String} id id of the tag
 * @param {Promise} response promise that contains the markdown text to insert
 */
export default function mdToHtml(text) {
    return md.render(text);
}