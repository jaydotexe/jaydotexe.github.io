// Load the class selection section and code snippet
$("#class-selection").load("sections/class-selection.html", function () {
    const classSelect = document.getElementById('class-select');

    // register change event listener on select element
    classSelect.addEventListener('change', function () {
        // get reference to selected option
        const selectedOption = classSelect.options[classSelect.selectedIndex];

        // retrieve data attributes from selected option
        const level = selectedOption.dataset.lvl;
        const vigor = selectedOption.dataset.vigor;
        const mind = selectedOption.dataset.mind;
        const endurance = selectedOption.dataset.endurance;
        const strength = selectedOption.dataset.strength;
        const dexterity = selectedOption.dataset.dexterity;
        const intelligence = selectedOption.dataset.intelligence;
        const faith = selectedOption.dataset.faith;
        const arcane = selectedOption.dataset.arcane;

        // update table with data attribute values
        updateStats(level, vigor, mind, endurance, strength, dexterity, intelligence, faith, arcane);
    });
});

// Load the stat allocation section
$("#stat-allocation").load("sections/stat-allocation.html", function () {

    // Get all the buttons and points
    const buttons = $('#stat-allocation button');
    const levelRequirement = $('#level-requirement');

    // Add event listeners to buttons
    buttons.click(function () {
        let value = parseInt($(this).siblings('span').text()); // select only the point in the same row
        if ($(this).attr('id').includes('increment')) {
            value++;
            levelRequirement.text(parseInt(levelRequirement.text()) + 1); // increment level requirement
        } else if ($(this).attr('id').includes('decrement')) {
            if (parseInt(levelRequirement.text()) > 1) {
                value--;
                levelRequirement.text(parseInt(levelRequirement.text()) - 1); // decrement level requirement
            }
        }
        if (value < 0) value = 0;
        $(this).siblings('span').text(value); // update only the point in the same row
    });
});

// Load the equipment and spells section
$("#equipment-and-spells").load("sections/equipment-and-spells.html");

// Load the save and load section
$("#save-and-load").load("sections/save-and-load.html");

// define the callback function to set the fetched values
function updateStats(level, vigor, mind, endurance, strength, dexterity, intelligence, faith, arcane) {
    // set the fetched values to the corresponding elements
    $('#level-requirement').text(level);
    $('#vigor-points').text(vigor);
    $('#mind-points').text(mind);
    $('#endurance-points').text(endurance);
    $('#strength-points').text(strength);
    $('#dexterity-points').text(dexterity);
    $('#intelligence-points').text(intelligence);
    $('#faith-points').text(faith);
    $('#arcane-points').text(arcane);
}
