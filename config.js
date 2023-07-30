/**
 * Everything in there is here to be edited, please make yourself at home!
 */

const config = {
    title: "Padatrad", // The name of your project

    // The text that will be displayed in the infobox
    infoText: `<p>Cette page web est une démo de <i>Padatrad</i>, un logiciel libre conçu pour traduire collectivement et simplement un texte, tout en l’éditant et en le mettant en page. Le texte est en <span style="background-color:var(--color-background-accepted);">vert</span> lorsque la traduction a été acceptée, en <span style="background-color:var(--color-background-target);">jaune</span> quand elle n’est encore qu’à l’état d’ébauche, et en <span style="background-color:var(--color-background-alt);">rouge</span> quand des variantes existent.</p><p><a href="https://gitlab.com/editionsburnaout/padatrad">Le code source est disponible là</a>.`, 

    sourceLanguage: "en", // The source language
    targetLanguage: "fr", // The target language

    // Edit this if you want to use another JSON file to specify the pads to load, it can be a relative or absolute URL
    padsUrl: "pads.json", 
    
    // And if you want, you can edit your metadata here.
    author: "Éditions Burn~Août",
    description: "Padatrad permet de traduire collectivement des textes et de les éditer depuis un navigateur web.",
    keywords: "traduction, édition, pagedjs, traduction collective, collaboration, burn~août",
    date: "2023",
    licence: "GPL-v3"
}