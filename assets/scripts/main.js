import config from "../../config.js";

// Load the pads synchronously
const response = await fetch(config.padsUrl);
const json = await response.json();
console.log(json);


// Now, we want something like this :

// // ✅ do this — async code is run in parallel!
// async function doThings() {
//     const p1 = asyncThing1();
//     const p2 = asyncThing2();
  
//     const [thing1, thing2] = await Promise.all([p1, p2]);
  
//     console.log(thing1);
//     console.log(thing2);
//   }
  
//   doThings();