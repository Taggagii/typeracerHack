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
        await sleep(0.03);
    };
};

await typeoutText();

// authentication of working


let imageURL = document.querySelector('img.challengeImg').src
const response = await fetch(`http://localhost:3000/?imageURL=${imageURL}`)
const textResponse = await response.text();
console.log(textResponse);