
function removeElement(elementId) {
    // Removes an element from the document
    const element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
};

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    const parent = document.getElementById(parentId);
    const newElement = document.createElement(elementTag);
    const newContent = document.createTextNode(html);
    newElement.setAttribute('id', elementId);
    newElement.appendChild(newContent);
    parent.appendChild(newElement);
};

function calcModifier(score) {
    // Calculates the modifier of a given ability score
    let modifier = Math.floor((score - 10) / 2);
    return modifier;
};

function getModifierArray(data) {
    // Retrieves an array from HTML element and converts to an array
    let modifierString = data.dataset.modifiers;
    let modifierArray = JSON.parse(modifierString);
    return modifierArray;
};

function calcSkillModifier(modifiers) {
    // Returns the sum of an array of modifiers
    let total = 0;
    modifiers.map((mod) => {
        const abilityElement = document.getElementById(mod);
        const abilityMod = parseInt(abilityElement.innerHTML);
        total += abilityMod;
    });

    return total;
};

function updateModifier(elementId, parentId, total) {
    // Update a modifier/bonus dynamically
    let newTotal = "";
    total >= 0 ? newTotal = "+" + total : newTotal = total;
    removeElement(elementId);
    addElement(parentId, "div", elementId, newTotal);
};

function updateSkillMod(skill) {
    // Determine total skill modifier 
    const modifiers = getModifierArray(skill);
    const modId = skill.id + "-mod";
    const modParent = skill.id + "-mod-parent";
    const modifierTotal = calcSkillModifier(modifiers);
    updateModifier(modId, modParent, modifierTotal);
}

function updateSkillBonus(skill) {
    // Determine total skill bonus
    const modifier = parseInt(document.getElementById(skill.id + "-mod").innerHTML);
    const bonusId = skill.id + "-bonus"
    const bonusParent = skill.id + "-bonus-parent";
    const bonusTotal = modifier + +skill.value;
    updateModifier(bonusId, bonusParent, bonusTotal);
};

function handleRankChange(event) {
    // Update the skill changed in the event
    updateSkillBonus(event.target);
};

function handleScoreChange(event) {
    // Updates the modifier value of a given score
    const abilityScore = event.target;
    const modId = abilityScore.id + "-mod";
    const modParent = abilityScore.id + "-mod-parent";
    const modTotal = calcModifier(abilityScore.value);

    // Update each skill's bonus/penalty and total
    const skills = Array.from(document.getElementsByClassName("skills__rank"));
    skills.map(skill => {
        updateSkillMod(skill);
        updateSkillBonus(skill);
    });

    updateModifier(modId, modParent, modTotal);
};

