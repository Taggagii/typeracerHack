// basic speed typing

let sleep = async (s) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, s * 1000);
    });
}

let typeoutText = async () => {
    let element = document.querySelector('input')
    let contentToType = document.querySelector('span[unselectable=on]').parentElement.textContent.split('');
    for (let i = 0; i < contentToType.length; ++i) {
        let letter = contentToType[i];
        element.dispatchEvent(new KeyboardEvent('keydown', {'key': letter}));
        element.value += letter;
        // await sleep(0.03);
        await sleep(0.05); // slow for testing
    };
};


// infinite restart
let textInput = document.querySelector('input.txtInput.txtInput-unfocused');

var classChangeObserver = new MutationObserver(async (event) => {
    console.log("Race has started!");
    await typeoutText();
    document.querySelector('a.raceAgainLink').click()
    await sleep(2);

    textInput = document.querySelector('input.txtInput.txtInput-unfocused');
    classChangeObserver.observe(textInput, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
    });
})


if (textInput == null) {
    console.log('cannot find thing skipping');
    await typeoutText();
    document.querySelector('a.raceAgainLink').click()
    await sleep(2);
    textInput = document.querySelector('input.txtInput.txtInput-unfocused');
    classChangeObserver.observe(textInput, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
    });
} else {
    classChangeObserver.observe(textInput, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
    });
}






// authentication of working

let imageURL = document.querySelector('img.challengeImg').src
const response = await fetch(`http://localhost:3000/?imageURL=${imageURL}`)
const textResponse = await response.text();

const cleanedTextResponse = textResponse.replace('<br />', '');

console.log(cleanedTextResponse);

let element = document.querySelector('textarea')
let contentToType = cleanedTextResponse;
for (let i = 0; i < contentToType.length; ++i) {
    let letter = contentToType[i];
    element.dispatchEvent(new KeyboardEvent('keydown', {'key': letter}));
    element.value += letter;
};
let submitButton = document.querySelector("button");
submitButton.click();

