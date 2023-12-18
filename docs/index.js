const excerpt = document.getElementById("excerpt");
const annotations = document.getElementById("annotations");
const focusIndicator = document.getElementById("focus_indicator");

const annotationMap = new Map([
    [
        0,
        /*html*/ `
        <p>Who is "she"?</p>
        <p>"Sethe is the one that picked flowers, yellow flowers in the place before the crouching. Took them away from their green leaves. They are on the quilt now where we sleep." (253)</p>
        <p>"She" is slaveship Beloved's mother</p>
        `,
    ],
    [
        1,
        /*html*/ `
        <p>First instance of "a hot thing"</p>
        <p>"'Were you cold?' Beloved curled tighter and shook her head. 'Hot.'"</p>
    `,
    ],
    [
        2,
        /*html*/ `
        <p>Importance of crouching?</p>
        <p>1st instance of a similar position: "She raised her head off the bed, lay down on her side and curled up." (88)</p>
        <p>2nd instance in the shed scene: "Beloved drops her hand. 'I'm like this.'  Denver watches as Beloved bends over, curls up and rocks." (146)</p>
    `,
    ],
    [
        9,
        /*html*/ `
        <p>Moldy bread</p>
        <p>Another mention of "she"</p>
        <p>Brown from the dead bodies</p>`,
    ],
    [
        10,
        /*html*/ `
        <p>"She" doesn't have earrings anymore</p>
    `,
    ],
    [
        17,
        /*html*/ `
        <p>"They" referring to the dead</p>
    `,
    ],
    [
        19,
        /*html*/ `<p>"ghosts without skin stuck their fingers in her and said beloved in the dark and bitch in the light" (284)</p>`,
    ],
    [
        27,
        /*html*/ `
        <p>"'Heavy,' murmured Beloved. 'This place is heavy.'" (65)</p>
    `,
    ],
    [
        30,
        /*html*/ `
        <p></p>
    `,
    ],
    [
        49,
        /*html*/ `
        <p>"Was a girl locked up in the house with a whiteman over by Deer Creek. Found him dead last summer and the girl gone. (277)"</p>
    `,
    ],
    [
        57,
        /*html*/ `<p>"Whatever it is, it comes from outside this house, outside the yard, and it can come right on in the yard if it wants to. So I never leave this house and I watch over the yard, so it can't happen again and my mother won't have to kill me too." (242)</p>`,
    ],
]);

class Selected {
    /**@param {Number}i @param {HTMLSpanElement} poi @param {HTMLDivElement} annotation*/
    constructor(i) {
        this.i = i;
        this.poi = document.getElementById(`poi_${i}`);
        this.poi.setAttribute("selected", "");
        this.annotation = document.getElementById(`annotation_${i}`);
        this.annotation.setAttribute("selected", "");
    }
}

/**@type {Selected}*/
let selected;

/**@param {number}i*/
function setSelected(i) {
    selected?.poi.removeAttribute("selected");
    selected?.annotation.removeAttribute("selected");
    selected = new Selected(i);
    scroll();
}

/**@param {HTMLSpanElement}poi @param {HTMLDivElement} annotation*/
function scroll() {
    excerpt.scrollTo(0, selected["poi"].offsetTop - window.innerHeight / 2);
    annotations.scrollTo(
        0,
        selected["annotation"].offsetTop - window.innerHeight / 2
    );
}

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

    const annotation = document.createElement("div");
    annotation.id = `annotation_${count}`;
    annotation.classList.add("annotation");
    annotation.innerHTML += /*html*/ `
    <p>${poi.id}</p>
    ${annotationMap.get(count) ?? "N/A"}
    `;

    const i = count;
    const click = setSelected.bind(null, i);
    annotation.onclick = click;
    annotations.appendChild(annotation);
    poi.onclick = click;
    count++;
}
selected = new Selected(0);
