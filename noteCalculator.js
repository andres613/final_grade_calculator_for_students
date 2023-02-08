const btnCalculate = document.getElementById('btn-calculate');
const inputFirstNote = document.querySelector('#first-note');
const inputSecondNote = document.querySelector('#second-note');
const inputThirdNote = document.querySelector('#third-note');


const calculate = () => {
    let notes = getInputValues();
    let thirdNoteIsSetted = notes[2] != '' ? true : false;
    let messageToDisplay;
    
    if(notes[2] == '') notes[2] = 0;

    if(inputValidator(notes)){
        let preliminarNote = calculatePreliminarNote(parseFloat(notes[0]), parseFloat(notes[1]), parseFloat(notes[2]));

        if(thirdNoteIsSetted){
            messageToDisplay = userMessage('thirdNoteIsSetted', preliminarNote);
        } else {
            let calculatedNotes = getCalculatedNote(preliminarNote)
            messageToDisplay = userMessage(thirdNoteIsSetted, calculatedNotes);
        }
    } else {
        messageToDisplay = userMessage("errorValidating");
    }

    displayUserMessage(messageToDisplay);
};


const getInputValues = () => {
    let firstNote = inputFirstNote.value;
    let secondNote = inputSecondNote.value;
    let thirdNote = inputThirdNote.value;

    return [firstNote, secondNote, thirdNote];
};


const inputValidator = notes => {
    if(notes[0] == '' || notes[1] == '' || notes[0] > 5 || notes[1] > 5 || notes[2] > 5)
        return false;

    return true;
}

const calculatePreliminarNote = (firstNote, secondNote, thirdNote) => firstNote * 0.3 + secondNote * 0.3 + thirdNote * 0.4;


const getCalculatedNote = preliminarNote => {
    let thirdNoteCalculated = [];

    thirdNoteCalculated[0] = (2.1 - preliminarNote) / 0.4;
    thirdNoteCalculated[1] = (3.5 - preliminarNote) / 0.4;
    thirdNoteCalculated[2] = (4.6 - preliminarNote) / 0.4;

    return thirdNoteCalculated;
};


const userMessage = (option, calculatedNotes) => {
    let message = '';

    switch (option) {
        case "errorValidating":
            message = 'Debe ingresar al menos las dos primeras notas para determinar su estado académico \nRecuerde que deben ser valores entre 0 y 5';
            break;

        case 'thirdNoteIsSetted':
            message = `Su nota definitiva es: ${calculatedNotes}`;
            break;

        default:
            if(calculatedNotes[0] > 5)
                return 'Ha perdido la materiaaaaa';
            
            if (calculatedNotes[0] < 0){
                message += `Ya es candidato a recuperación independientemente del resultado del próximo exámen\n`;
            } else {
                message += `Para recuperar necesita: ${calculatedNotes[0]}\n`
            }

            message += 
                `Para solo pasar la materia necesita: ${calculatedNotes[1]}\n` +
                `Para ganar la materia con honores, necesita una nota igual o superior a ${calculatedNotes[2]}`
            break;
    }

    return message;
};


const displayUserMessage = message => alert(message);

btnCalculate.addEventListener('click', calculate);
