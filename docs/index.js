const excerpt = document.getElementById("excerpt");
const annotations = document.getElementById("annotations");
const focusIndicator = document.getElementById("focus_indicator");

const annotationMap = [`Who is the "she" Beloved is referring to?`];

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

/**@param {number}direction*/
function crementPair(direction) {
    const n = Math.max(0, Math.min(selected.i + direction, count - 1));
    setSelected(n);
}

/**@param {HTMLSpanElement}poi @param {HTMLDivElement} annotation*/
function scroll() {
    excerpt.scrollTo(0, selected["poi"].offsetTop - window.innerHeight / 2);
    annotations.scrollTo(
        0,
        selected["annotation"].offsetTop - window.innerHeight / 2
    );
}

excerpt.onclick = () => {
    excerpt.focus();
    focusIndicator.style.left = 0;
};
annotations.onclick = () => {
    annotations.focus();
    focusIndicator.style.left = "50%";
};
excerpt.focus();

const wheel = (/**@type {WheelEvent}*/ event) => {
    crementPair(Math.sign(event.deltaY));
};
excerpt.onwheel = wheel;
annotations.onwheel = wheel;

let count = 0;
for (const poi of document.getElementsByClassName("poi")) {
    poi.id = `poi_${count}`;
    const poiText = document.createElement("span");
    [poiText.innerHTML, poi.innerHTML] = [poi.innerHTML, poiText.innerHTML];
    poi.appendChild(poiText);

    const annotation = document.createElement("div");
    annotation.id = `annotation_${count}`;
    annotation.classList.add("annotation");
    annotation.innerText = poi.id;

    const i = count;
    const click = setSelected.bind(null, i);
    annotation.onclick = click;
    annotations.appendChild(annotation);
    poi.onclick = click;
    count++;
}
selected = new Selected(0);
