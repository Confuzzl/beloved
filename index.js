const excerpt = document.getElementById("excerpt");
const annotations = document.getElementById("annotations");
const focusIndicator = document.getElementById("focus_indicator");

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

excerpt.onclick = () => {
  excerpt.focus();
  focusIndicator.style.left = 0;
};
annotations.onclick = () => {
  annotations.focus();
  focusIndicator.style.left = "50%";
};

excerpt.focus();

let i = 0;
for (const poi of document.getElementsByClassName("poi")) {
  poi.id = `poi_${i}`;
  const poiText = document.createElement("span");
  [poiText.innerHTML, poi.innerHTML] = [poi.innerHTML, poiText.innerHTML];
  poi.appendChild(poiText);

  // const value = annotationMap.get(i);
  // if (value)
  const annotation = document.createElement("div");
  annotation.id = `annotation_${i}`;
  annotation.classList.add("annotation");
  annotation.innerText = poi.id;

  const click = () => {
    setPair(poi, annotation);
    // setTimeout(() => {
    scroll(poi, annotation);
    // }, 1000);
  };

  annotation.onclick = click;
  annotations.appendChild(annotation);
  poi.onclick = click;
  i++;
}
