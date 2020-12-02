
function removeElement(elementId) {
    // Removes an element from the document
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    const p = document.getElementById(parentId);
    const newElement = document.createElement(elementTag);
    const newContent = document.createTextNode(html);
    newElement.setAttribute('id', elementId);
    newElement.appendChild(newContent);
    p.appendChild(newElement);
}

function calcModifier(score) {
    // Calculates the modifier of a given score
    let modifier = Math.floor((score - 10) / 2);
    if (modifier >= 0) {
        return `+${modifier}`;
    } else {
        return `${modifier}`;
    }
}

function modifierFormula(event) {
    // Updates the modifier value of a given score
    const score = event.target.value;
    const modifierId = event.target.id.split("-")[0] + "-modifier";
    const modElementId = event.target.id.split("-")[0] + "-mod-value";

    newMod = calcModifier(score);
    removeElement(modElementId);
    addElement(modifierId, "div", modElementId, newMod);
};

function skillBonus(event) {
    console.log(event.target.value);
}