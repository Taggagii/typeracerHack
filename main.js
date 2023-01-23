const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())

app.get('/', async (req, res) => {
    const text = await getContentOfImage(req.query.imageURL);
    res.send(text);
})

app.listen(port, () => {
    console.log('app is on port ' + port);
})


const getContentOfImage = async (imageURL) => {
    console.log(imageURL);
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.imagetotext.info');
    const textContentOfImage = await page.evaluate(async (urlofimage) => {
        let data = new FormData();
        data.append("base64", urlofimage);
        console.log('making the request')
        const response = await $.ajax({
                type: "POST",
                url: "https://www.imagetotext.info/image-to-text",
                timeout: 0,
                contentType: false,
                processData: false,
                mimeType: "multipart/form-data",
                data,
        });
    
        savedStuff = JSON.parse(response).text;
        console.log(savedStuff);
        return savedStuff;
    }, imageURL);

    page.close();
    browser.close();
    
    console.log(textContentOfImage);


    return textContentOfImage;
}
