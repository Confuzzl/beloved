const excerpt = document.getElementById("excerpt");
const annotations = document.getElementById("annotations");

const annotationMap = new Map([
    [0, `Who is the "she" Beloved is referring to?`],
]);

/**@type {HTMLSpanElement[]}*/
let selectedPair = null;
// let selectedPOI = null;

/**@param {HTMLSpanElement}poi @param {HTMLDivElement} annotation*/
function setPair(poi, annotation) {
    selectedPair?.[0].removeAttribute("selected");
    selectedPair?.[1].removeAttribute("selected");
    selectedPair = [poi, annotation];
    selectedPair[0].setAttribute("selected", "");
    selectedPair[1].setAttribute("selected", "");
}

/**@param {HTMLSpanElement}poi @param {HTMLDivElement} annotation*/
function scroll(poi, annotation) {
    excerpt.scrollTo(0, poi.offsetTop - window.innerHeight / 2);
    annotations.scrollTo(0, annotation.offsetTop - window.innerHeight / 2);
}

let i = 0;
for (const poi of document.getElementsByClassName("poi")) {
    poi.id = `poi_${i}`;
    // const value = annotationMap.get(i);
    // if (value)
    const annotation = document.createElement("div");
    annotation.id = `annotation_${i}`;
    annotation.classList.add("annotation");
    annotation.innerText = poi.id;
    annotation.onclick = () => {
        setPair(poi, annotation);
        scroll(poi, annotation);
        // console.log(poi.innerText);
    };
    annotations.appendChild(annotation);

    poi.onclick = () => {
        setPair(poi, annotation);
        scroll(poi, annotation);
        // console.log(selectedPair[1]);
    };

    i++;
}
