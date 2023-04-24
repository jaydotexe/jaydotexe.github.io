window.onload = function () {
    // Aufruf der getDinoData Funktion zum Laden der gespeicherten Daten
    const dinoData = getDinoData();

    // Setze die Werte in die Karte
    const dinoNameElement = document.getElementById("dino-name");
    dinoNameElement.innerText = dinoData.tamedName;

    const dinoSpeciesElement = document.getElementById("dino-species");
    dinoSpeciesElement.innerText = "(" + dinoData.species + ")";

    const levelElement = document.getElementById("dino-level");
    levelElement.innerText = "Lv. " + dinoData.level;

    const healthElement = document.getElementById("dino-health");
    healthElement.innerText = dinoData.health;

    const staminaElement = document.getElementById("dino-stamina");
    staminaElement.innerText = dinoData.stamina;

    const oxygenElement = document.getElementById("dino-oxygen");
    oxygenElement.innerText = dinoData.oxygen;

    const foodElement = document.getElementById("dino-food");
    foodElement.innerText = dinoData.food;

    const weightElement = document.getElementById("dino-weight");
    weightElement.innerText = dinoData.weight;

    const meleeDamageElement = document.getElementById("dino-melee-damage");
    meleeDamageElement.innerText = dinoData.meleeDamage;

    const movementSpeedElement = document.getElementById("dino-movement-speed");
    movementSpeedElement.innerText = dinoData.movementSpeed;

    // Verstecke das gender-male-Div und zeige das gender-female-Div, wenn der Dino weiblich ist & Farbe des h2-Elements setzen
    const h2Element = document.querySelector("h2");
    const genderMaleElement = document.getElementById("gender-male");
    const genderFemaleElement = document.getElementById("gender-female");
    if (dinoData.isFemale) {
        genderMaleElement.style.display = "none";
        genderFemaleElement.style.display = "block";
        h2Element.style.color = "#f5b0cb"; // Farbe des gender-female SVG
    } else {
        genderMaleElement.style.display = "block";
        genderFemaleElement.style.display = "none";
        h2Element.style.color = "#5b9bd5"; // Farbe des gender-male SVG
    }

    // Setze das Bild des Dinos
    const dinoImageElement = document.getElementById("dino-image");
    dinoImageElement.src = `images/dossiers/Dossier_${dinoData.species.charAt(0).toUpperCase() + dinoData.species.slice(1)}.webp`;

    const colorBoxes = document.querySelectorAll(".color-box");
    for (let i = 0; i < colorBoxes.length; i++) {
        if (dinoData.colors[i] === "rgba(0, 0, 0, 0)") {
            colorBoxes[i].style.backgroundImage = "linear-gradient(45deg, white 25%, lightgray 25%, lightgray 50%, white 50%, white 75%, lightgray 75%, lightgray 100%)";
        } else {
            colorBoxes[i].style.backgroundImage = "none";
            colorBoxes[i].style.backgroundColor = dinoData.colors[i];
        }
    }

};


function processFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const content = event.target.result;
        const dinoData = parseDinoFile(content);

        // hier können wir die Werte in die Karte einfügen
        const dinoNameElement = document.getElementById("dino-name");
        dinoNameElement.innerText = dinoData.tamedName;

        const dinoSpeciesElement = document.getElementById("dino-species");
        dinoSpeciesElement.innerText = "(" + dinoData.species + ")";

        const levelElement = document.getElementById("dino-level");
        levelElement.innerText = "Lv. " + dinoData.level;

        const healthElement = document.getElementById("dino-health");
        healthElement.innerText = dinoData.health;

        const staminaElement = document.getElementById("dino-stamina");
        staminaElement.innerText = dinoData.stamina;

        const oxygenElement = document.getElementById("dino-oxygen");
        oxygenElement.innerText = dinoData.oxygen;

        const foodElement = document.getElementById("dino-food");
        foodElement.innerText = dinoData.food;

        const weightElement = document.getElementById("dino-weight");
        weightElement.innerText = dinoData.weight;

        const meleeDamageElement = document.getElementById("dino-melee-damage");
        meleeDamageElement.innerText = dinoData.meleeDamage;

        const movementSpeedElement = document.getElementById("dino-movement-speed");
        movementSpeedElement.innerText = dinoData.movementSpeed;

        // Verstecke das gender-male-Div und zeige das gender-female-Div, wenn der Dino weiblich ist & Farbe des h2-Elements setzen
        const h2Element = document.querySelector("h2");
        const genderMaleElement = document.getElementById("gender-male");
        const genderFemaleElement = document.getElementById("gender-female");
        if (dinoData.isFemale) {
            genderMaleElement.style.display = "none";
            genderFemaleElement.style.display = "block";
            h2Element.style.color = "#f5b0cb"; // Farbe des gender-female SVG
        } else {
            genderMaleElement.style.display = "block";
            genderFemaleElement.style.display = "none";
            h2Element.style.color = "#5b9bd5"; // Farbe des gender-male SVG
        }

        // Setze das Bild des Dinos
        const dinoImageElement = document.getElementById("dino-image");
        dinoImageElement.src = `images/dossiers/Dossier_${dinoData.species.charAt(0).toUpperCase() + dinoData.species.slice(1)}.webp`;

        const colorBoxes = document.querySelectorAll(".color-box");
        for (let i = 0; i < colorBoxes.length; i++) {
            if (dinoData.colors[i] === "rgba(0, 0, 0, 0)") {
                colorBoxes[i].style.backgroundImage = "linear-gradient(45deg, white 25%, lightgray 25%, lightgray 50%, white 50%, white 75%, lightgray 75%, lightgray 100%)";
            } else {
                colorBoxes[i].style.backgroundImage = "none";
                colorBoxes[i].style.backgroundColor = dinoData.colors[i];
            }
        }

        // Aufruf der saveDinoData Funktion mit dem Dino-Objekt als Parameter
        saveDinoData(dinoData);
    };

    reader.readAsText(file);
}

function parseDinoFile(content) {
    const nameIndex = content.indexOf("TamedName=");
    const nameEndIndex = content.indexOf("\n", nameIndex);
    const tamedName = content.substring(nameIndex + 10, nameEndIndex);

    const levelIndex = content.indexOf("CharacterLevel=");
    const levelEndIndex = content.indexOf("\n", levelIndex);
    const level = content.substring(levelIndex + 15, levelEndIndex);

    const genderIndex = content.indexOf("bIsFemale=");
    const genderEndIndex = content.indexOf("\n", genderIndex);
    const isFemale = content.substring(genderIndex + 10, genderEndIndex).trim() === "True";

    const classIndex = content.indexOf("DinoNameTag=");
    const classEndIndex = content.indexOf("\n", classIndex);
    const species = content.substring(classIndex + 12, classEndIndex).trim();

    const healthIndex = content.indexOf("Health=");
    const healthEndIndex = content.indexOf("\n", healthIndex);
    const health = Math.floor(parseFloat(content.substring(healthIndex + 7, healthEndIndex)));

    const staminaIndex = content.indexOf("Stamina=");
    const staminaEndIndex = content.indexOf("\n", staminaIndex);
    const stamina = Math.floor(parseFloat(content.substring(staminaIndex + 8, staminaEndIndex)));

    const oxygenIndex = content.indexOf("Oxygen=");
    const oxygenEndIndex = content.indexOf("\n", oxygenIndex);
    const oxygen = Math.floor(parseFloat(content.substring(oxygenIndex + 7, oxygenEndIndex)));

    const foodIndex = content.indexOf("food=");
    const foodEndIndex = content.indexOf("\n", foodIndex);
    const food = Math.floor(parseFloat(content.substring(foodIndex + 5, foodEndIndex)));

    const weightIndex = content.indexOf("Weight=");
    const weightEndIndex = content.indexOf("\n", weightIndex);
    const weight = Math.floor(parseFloat(content.substring(weightIndex + 7, weightEndIndex)));

    const meleeDamageIndex = content.indexOf("Melee Damage=");
    const meleeDamageEndIndex = content.indexOf("\n", meleeDamageIndex);
    const meleeDamage = Math.floor(parseFloat(content.substring(meleeDamageIndex + 13, meleeDamageEndIndex)) * 100) + "%";

    const movementSpeedIndex = content.indexOf("Movement Speed=");
    const movementSpeedEndIndex = content.indexOf("\n", movementSpeedIndex);
    const movementSpeed = Math.floor(parseFloat(content.substring(movementSpeedIndex + 15, movementSpeedEndIndex)) + 100) + "%";

    // Parse der Farben
    const colors = [];

    const colorRegex = /ColorSet\[(\d+)]=\(R=([\d.]+),G=([\d.]+),B=([\d.]+),A=([\d.]+)\)/;
    const colorizationStartIndex = content.indexOf("[Colorization]");

    if (colorizationStartIndex >= 0) {
        const colorizationEndIndex = content.indexOf("\n", colorizationStartIndex);
        const colorizationLines = content.substring(colorizationEndIndex).split("\n");

        for (let i = 0; i < colorizationLines.length; i++) {
            const colorMatch = colorRegex.exec(colorizationLines[i]);
            if (colorMatch) {
                const [, index, r, g, b, a] = colorMatch;
                const alpha = (r === "0.000000" && g === "0.000000" && b === "0.000000" && parseFloat(a) === 1) ? 0 : 1;
                colors[index] = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${alpha})`;
            }
        }
    }

    return {
        tamedName,
        level,
        isFemale,
        species,
        health,
        stamina,
        oxygen,
        food,
        weight,
        meleeDamage,
        movementSpeed,
        colors,
    };
}

function saveDinoData(dinoData) {
    const serializedData = JSON.stringify(dinoData);
    localStorage.setItem("dinoData", serializedData);
}

function getDinoData() {
    const serializedData = localStorage.getItem("dinoData");
    if (!serializedData) {
        return null;
    }
    return JSON.parse(serializedData);
}

