
function removeElement(elementId) {
    // Removes an element from the document
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    const parent = document.getElementById(parentId);
    const newElement = document.createElement(elementTag);
    const newContent = document.createTextNode(html);
    newElement.setAttribute('id', elementId);
    newElement.appendChild(newContent);
    parent.appendChild(newElement);
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

    const newModifier = calcModifier(score);
    removeElement(modElementId);
    addElement(modifierId, "div", modElementId, newModifier);
};

function getModifierArray(data) {
    // Retrieves an array from HTML element and converts to an array
    let modifierString = data.dataset.modifiers;
    let modifierArray = JSON.parse(modifierString);
    return modifierArray;
}

function calcSkillModifier(modifiers) {
    // Returns the sum of an array of modifiers
    let total = 0;
    modifiers.map((mod) => {
        const abilityElement = document.getElementById(mod);
        const abilityMod = parseInt(abilityElement.innerHTML);
        total += abilityMod;
    });

    return total;
}

function caclBonusTotal(modifiersTotal, rank) {
    return modifiersTotal + +rank;
}

function skillBonus(event) {
    const skill = event.target;
    const modifiers = getModifierArray(skill);

    // Update Modifier Values
    const modId = event.target.id + "-mod";
    const modParent = event.target.id + "-mod-parent";
    const modifierTotal = calcSkillModifier(modifiers);
    let newModifier = "";
    modifierTotal >= 0 ? newModifier = `+${modifierTotal}` : newModifier = `${modifierTotal}`;
    removeElement(modId);
    addElement(modParent, "div", modId, newModifier);

    // Update Bonus Values
    const bonusId = event.target.id + "-bonus"
    const bonusParent = event.target.id + "-bonus-parent";
    const bonusTotal = caclBonusTotal(modifierTotal, skill.value);
    let newBonus = "";
    bonusTotal >= 0 ? newBonus = `+${bonusTotal}` : newModifier = `${bonusTotal}`;
    removeElement(bonusId);
    addElement(bonusParent, "div", bonusId, newBonus);
}