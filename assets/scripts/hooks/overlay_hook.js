/**
 * @file Pagedjs' hook that adds an overlay to pagedjs to display content that's not in the print.
 * @author Yann Trividic
 * @license GPLv3
 * @see https://gitlab.com/the-moral-of-the-xerox-vf
 *
 * based on Benoit Launay's forensic.js script
 * @see https://gitlab.coko.foundation/pagedjs/templaters/forensic
 */

import config from "../../../config.js"
import Overlay from "./overlay.js";

const response = await fetch(config.padsUrl);
const pads = await response.json();

class OverlayHook extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }
    beforeParsed(content) {
        console.log("overlay is working...");

        let overlay = new Overlay(document.body, pads, config.title, config.infoText) ;
        overlay.init();
    }
}
Paged.registerHandlers(OverlayHook);