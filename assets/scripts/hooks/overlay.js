/**
 * @file Pagedjs' hook that adds an overlay to pagedjs to display content that's not in the print.
 * @author Yann Trividic
 * @license GPLv3
 * @see https://gitlab.com/the-moral-of-the-xerox-vf
 *
 * based on Benoit Launay's forensic.js script
 * @see https://gitlab.coko.foundation/pagedjs/templaters/forensic
 */

class overlay extends Paged.Handler {
    constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
    }
    beforeParsed(content) {
        console.log("overlay is working...");

        let pannel = document.createElement("aside");
        pannel.setAttribute("data-id", "overlay")
        pannel.style = "position: fixed;"; // otherwise pagedjs removes the position attribute
        
        let miniPannel = this.generateMinipannel(pannel);

        generateOverlayTags(pannel);

        document.querySelector("body").appendChild(pannel);
        document.querySelector("body").appendChild(miniPannel);
        
        var modal = this.generateModalAndButton(pannel, miniPannel);

        if(this.isFirstVisit()){ // put a ! if you want to debug the modal
            this.displayModal(modal);
        }
    }

    isFirstVisit(){
        return localStorage.getItem("first-visit") == null ;
    }

    displayModal(modal){
        console.log("displayModal")
        modal.style.display = "block";
        localStorage.setItem("first-visit", "false");
    }

    generateMinipannel(pannel){
        let miniPannel = document.createElement("aside");
        miniPannel.setAttribute("data-id", "miniOverlay")
        miniPannel.style = "position: fixed;"; // otherwise pagedjs removes the position attribute
        miniPannel.style.visibility = "hidden";

        var expand = document.createElement("div");
        expand.setAttribute("class", "expand");
        expand.innerHTML = "&#8801;";
        expand.onclick = function() {
            miniPannel.style.visibility = "hidden";
            pannel.style.visibility = "visible";
        }
        miniPannel.appendChild(expand);

        return miniPannel;
    }

    /**
     * This function does too many things, we needa breake it down.
     * @param {Element} pannel 
     * @returns 
     */
    generateModalAndButton(pannel, miniPannel){

        var reduce = document.createElement("div");
        reduce.setAttribute("class", "reduce");
        reduce.innerHTML = "_";
        reduce.onclick = function() {
            pannel.style.visibility = "hidden";
            miniPannel.style.visibility = "visible";
        }
        pannel.appendChild(reduce);

        var btnInfo = document.createElement("button");
        btnInfo.setAttribute("id", "infoButton");
        btnInfo.innerText = "Infos";
        btnInfo.onclick = function() {
            modal.style.display = "block";
        }

        var btnResources = document.createElement("button");
        btnResources.setAttribute("id", "resourcesButton");
        btnResources.innerText = "Les Cahiers";
        btnResources.onclick = function() {
            window.open(
                'https://les-cahiers.studiotheatre.fr/morale', // password: "vitry"
                '_blank' // <- This is what makes it open in a new window.
              );
        }

        var btnSave = document.createElement("button");
        btnSave.setAttribute("id", "saveButton");
        btnSave.innerText = "Sauvegarder";
        btnSave.onclick = function() {
            savePads();
        }

        var btnBackups = document.createElement("button");
        btnBackups.setAttribute("id", "backupsButton");
        btnBackups.innerText = "Backups";
        btnBackups.onclick = function() {
            window.open(
                'backups',
                '_blank' // <- This is what makes it open in a new window.
              );
        }

        var highlight = document.createElement("div");
        highlight.setAttribute("id", "highlight");
        
        var inputHighlight = document.createElement("input");
        inputHighlight.setAttribute("type", "checkbox");
        inputHighlight.setAttribute("id", "cBoxHighlight");
        inputHighlight.checked = true;
        inputHighlight.setAttribute("onclick", "switchHighlight()");
        
        var labelHighlight = document.createElement("label");
        labelHighlight.setAttribute("for", "cBoxHighlight");
        labelHighlight.innerText = "Surlignage ";

        highlight.appendChild(labelHighlight);
        highlight.appendChild(inputHighlight);

        var percentage = document.createElement("div");
        let translationPercentage = `<span style="background-color:var(--color-background-target);">` + (getTranslationPercentage()*100).toFixed(1) + "&#x202F;%" + "</span>";
        let acceptedTranslationPercentage = `<span style="background-color:var(--color-background-accepted);">` + (getAcceptedTranslationPercentage()*100).toFixed(1) + "&#x202F;%" + "</span>";
        percentage.innerHTML = "Traduction<br />" + acceptedTranslationPercentage + "&#x202F;/&#x202F;" + translationPercentage ;

        var modal = document.createElement("div");
        modal.setAttribute("data-id", "modal")
        modal.style = "position: fixed; display:none;"; // otherwise pagedjs removes the position attribute, and we don't want it shown by default

        document.querySelector("body").appendChild(modal);

        var modalContent = document.createElement("div");
        modalContent.setAttribute("class", "modalContent");
        modal.appendChild(modalContent);

        var close = document.createElement("span");
        close.setAttribute("class", "close");
        close.innerHTML = "&times;"
        close.onclick = function() {
            modal.style.display = "none";
        }
        modalContent.appendChild(close);
        
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
            }
        }

        var text = document.createElement("p");
        text.innerHTML = `<p>Dans le cadre du cycle d’expositions <i>La&#x00A0;Construction du champ</i> à Vitry, les <a href="https://editionsburnaout.fr/">Éditions Burn~Août</a> et le traducteur Yann Trividic vous proposent une série d’ateliers ayant pour but la traduction collective d’une publication de Clara Lobregat Balaguer et Florian Cramer, <i>The&#x00A0;Moral of the&#x00A0;Xerox</i>.</p><p>Cette page web est un outil conçu pour traduire collectivement et simplement ce texte, tout en l’éditant et en le mettant en page. Le texte est en <span style="background-color:var(--color-background-accepted);">vert</span> lorsque la traduction a été acceptée, en <span style="background-color:var(--color-background-target);">jaune</span> quand elle n’est encore qu’à l’état d’ébauche, et en <span style="background-color:var(--color-background-alt);">rouge</span> quand des variantes existent. Cliquez sur les liens du menu pour modifier son contenu&#x202F;!</p><p>Les ateliers ont lieu un samedi sur deux à la Galerie municipale Jean-Collet, à Vitry, du 25&#x00A0;mars au 10&#x00A0;juin 2023. Les inscriptions se font par mail à l’adresse suivante&#x00A0;: <a href="mailto:eva.colpacci@mairie-vitry94.fr">eva.colpacci@mairie-vitry94.fr</a>.</p><p>Plus d’infos <a href="tract_ateliers_trad_vitry.pdf">ici</a>, code source <a href="https://gitlab.com/yanntrividic/the-moral-of-the-xerox-vf">là</a> et PDF de la version originale <a href="the_moral_of_the_xerox_balaguer_cramer.pdf">ici</a>.`;
        modalContent.appendChild(text);

        pannel.appendChild(btnInfo);
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(btnResources);
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(btnSave);
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(btnBackups);
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(highlight);
        pannel.appendChild(document.createElement("br"));
        pannel.appendChild(percentage);
        pannel.appendChild(document.createElement("br"));
        return modal;
    }
}
Paged.registerHandlers(overlay);

function switchHighlight(){
    var checkbox = document.getElementById('highlight');
    if (!checkbox.checked) {
        changeColorByClassName("target", "transparent");
        changeColorByClassName("random", "transparent");
    } else {
        changeColorByClassName("target", "var(--color-background-target)");
        changeColorByClassName("accepted", "var(--color-background-accepted)");
        changeColorByClassName("random", "var(--color-background-alt)");
    }
    checkbox.checked = !checkbox.checked;
}

function changeColorByClassName(className, color) {
    var elems = document.getElementsByClassName(className);
    for(let i = 0; i < elems.length; i++) {
        elems[i].style.backgroundColor = color;
    }
}