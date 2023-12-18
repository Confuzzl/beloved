const excerpt = document.getElementById("excerpt");
const annotations = document.getElementById("annotations");
const focusIndicator = document.getElementById("focus_indicator");

const annotationMap = new Map([
  [
    0,
    /*html*/ `
        <p>Who is "she"?</p>
        <p>Opening the grass?</p>
        <p>What are the clouds?</p>
        `,
  ],
  [
    1,
    /*html*/ `
        <p>First instance of "a hot thing"</p>
        <p>"'Were you cold?' Beloved curled tighter and shook her head. 'Hot.'" (88)</p>
    `,
  ],
  [
    2,
    /*html*/ `
        <p>Importance of crouching?</p>
        <p>1st instance of a similar position: "She raised her head off the bed, lay down on her side and curled up." (88)</p>
        <p>2nd instance in the shed scene: "Beloved drops her hand. 'I'm like this.'  Denver watches as Beloved bends over, curls up and rocks." (146)</p>
        <p>Sweet death?</p>
        `,
  ],
  [
    3,
    /*html*/ `
    <p>What is "morning water"?</p>
    `,
  ],
  [
    4,
    /*html*/ `
    <p>Importance of being not big?</p>
    `,
  ],
  [
    5,
    /*html*/ `
    <p>Meaning of morning water clarified</p>
    <p>What about "sweet rocks"?</p>
    `,
  ],
  [
    6,
    /*html*/ `
    <p>Death is a more preferable alternative</p>
    `,
  ],
  [
    8,
    /*html*/ `
    <p>Her dead man's eyes are "locked"; she is shackled</p>
    `,
  ],
  [
    9,
    /*html*/ `
        <p>Moldy bread</p>
        <p>Another mention of "she"</p>
        <p>Brown from the dead bodies</p>
        `,
  ],
  [
    10,
    /*html*/ `
        <p>"She" doesn't have earrings anymore</p>
    `,
  ],
  [
    12,
    /*html*/ `
    <p>The "place where her face is" is the sea</p>
    `,
  ],
  [
    13,
    /*html*/ `
    <p>Another mention of being small</p>
    <p>Her dead man is singing about their home</p>
    `,
  ],
  [
    16,
    /*html*/ `
    <p>"She" doesn't get pushed, but goes in</p>
    `,
  ],
  [
    17,
    /*html*/ `
        <p>"They," the dead, are no longer crouching</p>
    `,
  ],
  [
    18,
    /*html*/ `
    <p>Confusion of identity</p>
    <p>Note the use of "my" and "our" instead of "her"</p>
    `,
  ],
  [
    19,
    /*html*/ `
    <p>Likely a description of rape</p>
    <p>"ghosts without skin stuck their fingers in her and said beloved in the dark and bitch in the light" (284)</p>
    <p>First hint of resentment</p>
    `,
  ],
  [
    20,
    /*html*/ `
    <p>Callback/foreshadowing Paul D.</p>
    <p>First instance of the "bridge" here, but was spoken of in previous chapters</p>
    `,
  ],
  [
    21,
    /*html*/ `
    <p>No longer in the slave ship</p>
    <p>Purgatory/limbo?</p>
    `,
  ],
  [
    22,
    /*html*/ `
    <p>laugh and laugher; the laugher creates the laugh</p>
    <p>Beloved sees the "she" on the slaveship here</p>
    `,
  ],
  [
    23,
    /*html*/ `
    <p>Mirroring of the grass opening</p>
    `,
  ],
  [
    26,
    /*html*/ `
    <p>The eating of Beloved removes her identity</p>
    <p>"I see me swim away" with me being the "she"</p>
    `,
  ],
  [
    27,
    /*html*/ `
        <p>"'Heavy,' murmured Beloved. 'This place is heavy.'" (65)</p>
    `,
  ],
  [
    28,
    /*html*/ `
    <p>Beloved now believes "she" was Sethe all along</p>
    `,
  ],
  [
    30,
    /*html*/ `
        <p>Retelling of the first section with Sethe as the object</p>
    `,
  ],
  [
    34,
    /*html*/ `
    <p>Answers what the clouds were</p>
    `,
  ],
  [
    45,
    /*html*/ `
    <p>Notice how Beloved never said that she forgave Sethe</p>
    `,
  ],
  [
    49,
    /*html*/ `
        <p>"Was a girl locked up in the house with a whiteman over by Deer Creek. Found him dead last summer and the girl gone. (277)"</p>
    `,
  ],
  [
    51,
    /*html*/ `
    <p>Unfortunate coincidence that Beloved's mother and Sethe had earrings</p>  
    `,
  ],
  [
    64,
    /*html*/ `
    <p>"That's how come me and Beloved could play together. Not talking. On the porch. By the creek." (243)</p>
    `,
  ],
  [
    70,
    /*html*/ `
    <p>"All I could hear was me breathing but sometimes in the day I couldn't tell whether it was me breathing or somebody next to me" (244)</p>
    `,
  ],
  [
    73,
    /*html*/ `
    <p>Hint of retributive nature</p>
    <p>Unclear how exactly she is hurt</p>
    `,
  ],
  [
    81,
    /*html*/ `
    <p>No longer the laugher, but the laughter</p>
    `,
  ],
  [
    82,
    /*html*/ `
    <p>"Whatever it is, it comes from outside this house, outside the yard, and it can come right on in the yard if it wants to. So I never leave this house and I watch over the yard, so it can't happen again and my mother won't have to kill me too." (242)</p>
    `,
  ],
]);

class Selected {
  /**@param {Number}i @param {HTMLSpanElement} poi @param {HTMLDivElement} annotation*/
  constructor(i) {
    this.i = i;
    this.poi = document.getElementById(`poi_${i}`);
    this.poi.setAttribute("selected", "");
    this.annotation = document.getElementById(`annotation_${i}`);
    this.annotation?.setAttribute("selected", "");
  }
}

/**@type {Selected}*/
let selected;

/**@param {number}i*/
function setSelected(i) {
  selected?.poi.removeAttribute("selected");
  selected?.annotation?.removeAttribute("selected");
  selected = new Selected(i);
  scroll();
}

/**@param {HTMLSpanElement}poi @param {HTMLDivElement} annotation*/
function scroll() {
  excerpt.scrollTo(0, selected["poi"].offsetTop - window.innerHeight / 2);
  if (selected["annotation"]) {
    annotations.scrollTo(
      0,
      selected["annotation"].offsetTop - window.innerHeight / 2
    );
  }
}

document.addEventListener("keydown", (event) => {});

// /**@param {number}direction*/
// function crementPair(direction) {
//     const n = Math.max(0, Math.min(selected.i + direction, count - 1));
//     setSelected(n);
// }

// excerpt.onclick = () => {
//     excerpt.focus();
//     focusIndicator.style.left = 0;
// };
// annotations.onclick = () => {
//     annotations.focus();
//     focusIndicator.style.left = "50%";
// };
// excerpt.focus();

// const wheel = (/**@type {WheelEvent}*/ event) => {
//     crementPair(Math.sign(event.deltaY));
// };
// excerpt.onwheel = wheel;
// annotations.onwheel = wheel;

let count = 0;
for (const poi of document.getElementsByClassName("poi")) {
  poi.id = `poi_${count}`;
  const poiText = document.createElement("span");
  [poiText.innerHTML, poi.innerHTML] = [poi.innerHTML, poiText.innerHTML];
  poi.appendChild(poiText);

  const i = count;
  const click = setSelected.bind(null, i);
  poi.onclick = click;

  if (annotationMap.get(count)) {
    poi.classList.add("annotated");
    const annotation = document.createElement("div");
    annotation.id = `annotation_${count}`;
    annotation.classList.add("annotation");
    annotation.innerHTML += `${annotationMap.get(count)}`;

    annotation.onclick = click;
    annotations.appendChild(annotation);
  }

  count++;
}
selected = new Selected(0);
