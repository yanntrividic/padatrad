/**
 * Class that contains everything regarding the overlay and the interface
 * that was built on top on PagedJS'
 */

import { getTranslationPercentage, getAcceptedTranslationPercentage } from "../hooks/replace_translation.js"
import "./saver.js";
import { isBackup, getDate, getZipFromArgs, getParticipantsAsList } from "./backups.js";
import { getJson } from "./pads.js";

// Get config data
const config = await (await fetch('config/config.json')).json();

export default class Overlay {
    constructor(parent) {
        this.parent = parent ; // Parent in which will be inserted the html elements
        this.pads ; // the pads of the project
        this.backups ; // backups of the project

        this.pannel = document.createElement("aside") ;
        this.pannel.setAttribute("data-id", "overlay")
        this.pannel.style = "position: fixed;"; // otherwise pagedjs removes the position attribute

        this.miniPannel = document.createElement("aside") ;
        this.miniPannel.setAttribute("data-id", "miniOverlay")
        this.miniPannel.style = "position: fixed;"; // otherwise pagedjs removes the position attribute
        this.miniPannel.style.visibility = "hidden";

        this.modal = document.createElement("div");
        this.modal.setAttribute("data-id", "modal")
        this.modal.style = "position: fixed; display:none;"; // otherwise pagedjs removes the position attribute, and we don't want it shown by default

        this.title ; // title that will appear in the overlay
        this.infoText ; // text that will be displayed in the modal
        this.extraUrlLabel ;
        this.extraUrl ;

        this.isFirstVisit = true;

        this.translation ;
        this.buttons = [] ;
        this.links = {
            md: [],
            css: []
        } ;
    }

    /**
     * Initialization of the object
     */
    async init(){
        // From the config file
        this.pads = await getJson(config.padsUrl);
        this.title = (isBackup()?("Backup<br />" + getDate(getZipFromArgs())):config.title);
        this.infoText = config.infoText;
        this.extraUrlLabel = config.extraUrlLabel ;
        this.extraUrl = config.extraUrl ;
        this.configBtn = config.configMenuOverlayButton ;
        this.configURL = config.configMenuURL ;

        this.generatePannel() ; // Generates the main overlay pannel
        this.generateModal() ; // info modal in which is displayed the infoText
        this.generateMinipannel() ; // reduced version of the pannel
        this.isFirstVisit = isFirstVisit(); // if this is the first visit, then the infobox is displayed
        if(this.isFirstVisit) displayModal();
    }

    generateMinipannel(){
        var expand = document.createElement("div");
        expand.setAttribute("class", "expand");
        expand.innerHTML = "&#8801;";
        expand.onclick = function() {
            document.querySelector(`[data-id="overlay"]`).style.visibility = "visible";
            document.querySelector(`[data-id="miniOverlay"]`).style.visibility = "hidden";
        }
        this.miniPannel.appendChild(expand);
        this.parent.appendChild(this.miniPannel);
    }

    generatePannel() {
        var reduce = document.createElement("div");
        reduce.setAttribute("class", "reduce");
        reduce.innerHTML = "_";
        reduce.onclick = function() {
            document.querySelector(`[data-id="overlay"]`).style.visibility = "hidden";
            document.querySelector(`[data-id="miniOverlay"]`).style.visibility = "visible";
        }
        this.pannel.appendChild(reduce);

        this.generateTranslationStatus();

        // this.generateButton("btnRefresh", "Raffraîchir", () => { window.PagedPolyfill.preview(); })
        this.generateButton("btnInfo", "Infos", () => { displayModal(); })
        if (!isBackup()) this.generateButton("btnSave", "Sauvegarder", () => { savePads(); })
        if(this.extraUrl && this.extraUrlLabel) {
            this.generateButton("btnExtra", this.extraUrlLabel, () => { window.open(this.extraUrl, '_blank' ); });
        }
        this.generateButton("btnBackups", "Backups", () => { window.open('backups', '_blank' ); })
        if(this.configBtn && this.configURL) {
            this.generateButton("btnConfig", "Configuration", () => { window.open(this.configURL, '_blank' ); });
        }
        this.insertButtons();

        if (!isBackup()) {
            this.generateLinks();
            this.insertLinks();
        } else this.generateParticipants();

        this.parent.appendChild(this.pannel);
    }

    generateTranslationStatus(){
        var highlight = document.createElement("div");
        highlight.setAttribute("id", "highlight");

        var inputHighlight = document.createElement("input");
        inputHighlight.setAttribute("type", "checkbox");
        inputHighlight.setAttribute("id", "cBoxHighlight");
        inputHighlight.checked = true;
        inputHighlight.addEventListener("click", switchHighlight);

        var percentage = document.createElement("label");
        percentage.setAttribute("for", "cBoxHighlight");
        let translationPercentage = `<span style="background-color:var(--color-background-target);">` + (getTranslationPercentage()*100).toFixed(1) + "&#x202F;%" + "</span>";
        let acceptedTranslationPercentage = `<span style="background-color:var(--color-background-accepted);">` + (getAcceptedTranslationPercentage()*100).toFixed(1) + "&#x202F;%" + "</span>";
        percentage.innerHTML = "<span class=\"title\">" + this.title + "</span><br />" + acceptedTranslationPercentage + "&#x202F;/&#x202F;" + translationPercentage + "&#x00A0;";

        highlight.appendChild(percentage);
        highlight.appendChild(inputHighlight);
        this.pannel.appendChild(highlight);
    }

    generateButton(id, innerText, onclick){
        var btn = document.createElement("button");
        btn.setAttribute("id", id);
        btn.innerText = innerText;
        btn.onclick = onclick;
        this.buttons.push(btn);
    }

    insertButtons(){
        let l = document.createElement("ul");
        l.setAttribute("id", "buttonList")
        this.buttons.forEach(btn => {
            let e = document.createElement("li");
            e.append(btn);
            l.append(e);
        });
        this.pannel.append(l);
    }

    generateModal() {
        this.parent.appendChild(this.modal);

        var modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modalContent");
        this.modal.appendChild(modalContent);

        var close = document.createElement("span");
        close.setAttribute("class", "close");
        close.innerHTML = "&times;"
        close.onclick = function() {
            document.querySelectorAll(`[data-id="modal"]`)[0].style.display = "none";
        }
        modalContent.appendChild(close);

        // window.onclick = function(event) {
        //     if (event.target == this.modal) {
        //         document.querySelectorAll(`[data-id="modal"]`)[0].style.display = "none";
        //     }
        // }

        var text = document.createElement("p");
        text.innerHTML = this.infoText;
        modalContent.appendChild(text);
    }

    generateLinks(){
        this.pads.forEach(pad => {
            let a = document.createElement("a");
            a.setAttribute("href", pad.url);
            a.setAttribute("target", "_blank");
            a.setAttribute("id", pad.id + "Overlay");
            a.innerText = pad.string ;
            if(pad.type == "md") {
                a.setAttribute("class", "changeColorLink") ;
                a.addEventListener("mouseover", changeColorOver);
                a.addEventListener("mouseout", changeColorOut);
                this.links.md.push(a);
                return ;
            }
            this.links.css.push(a);
            return ;
        });
    }

    insertLinks(){
        let pl = document.createElement("ul");
        pl.setAttribute("id", "padMdList");
        this.links.md.forEach(md => {
            let e = document.createElement("li");
            e.append(md);
            addAnchor(e, md);
            pl.append(e);
        });
        this.pannel.append(pl);

        let sl = document.createElement("ul");
        sl.setAttribute("id", "padCssList");
        this.links.css.forEach(css => {
            let e = document.createElement("li");
            e.append(css);
            sl.append(e);
        });
        this.pannel.append(sl);
    }

    generateParticipants(){
        this.pannel.append(getParticipantsAsList(getZipFromArgs()));
    }

}

/**
 * Down there is mostly the functions that are event related.
 */

/**
 * Changes the color of a section
 * @param {String} id
 * @param {String} color
 */
function changeColor(event, color) {
    let id = event.target.id.split("Overlay")[0];
    document.querySelectorAll(("[data-id='"+id+"']")).forEach(element => {
        Array.from(element.children).forEach((child) => {
            child.style.setProperty('color', color, 'important');
        })
    });
}

function changeColorOver(event) {
    changeColor(event, "var(--color-hover)");
}

function changeColorOut(event) {
  changeColor(event, "");
}

/**
 * Function linked to a checkbox to highlight translation or hide the highlighting
 * @param {*} event
 */
function switchHighlight(event){
    console.log("switch!")
    var checkbox = event.target;
    if (!checkbox.checked) {
        changeColorByClassName("target", "transparent");
        changeColorByClassName("random", "transparent");
    } else {
        changeColorByClassName("target", "var(--color-background-target)");
        changeColorByClassName("accepted", "var(--color-background-accepted)");
        changeColorByClassName("random", "var(--color-background-alt)");
    }
}

function changeColorByClassName(className, color) {
    var elems = document.getElementsByClassName(className);
    for(let i = 0; i < elems.length; i++) {
        elems[i].style.setProperty('background-color', color, 'important');
    }
}

function isFirstVisit(){
    return localStorage.getItem("first-visit") == null ;
}

function displayModal(modal){
    let display = document.querySelectorAll(`[data-id="modal"]`)[0].style.display;
    if (display != "block") {
        document.querySelectorAll(`[data-id="modal"]`)[0].style.display = "block";
    } else document.querySelectorAll(`[data-id="modal"]`)[0].style.display = "none";
    localStorage.setItem("first-visit", "false");
}

function addAnchor(entry, md) {
    let anchor = document.createElement("a");
    anchor.classList = ["mdAnchor"];
    anchor.href = "#" + md.id.split("Overlay")[0];
    anchor.innerText = "\u2198";
    entry.append(anchor);
}