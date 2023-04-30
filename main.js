const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors())

app.get('/', async (req, res) => {
    try {
        const text = await getContentOfImage(req.query.imageURL);
        res.send(text);
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
    console.log('app is on port ' + port);
})


const getContentOfImage = async (imageURL) => {
    console.log(imageURL);
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('https://www.imagetotext.info');
    console.log("here we go");
    const textContentOfImage = await page.evaluate(async (urlofimage) => {
        console.log("here we are now");
        let data = new FormData();
        data.append("base64", urlofimage);
        
        console.log("avoiding csrf problems");
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
            }
        });
        
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

        console.log("response");
        console.log(response);

        console.log("afterwards?");
    
        savedStuff = JSON.parse(response).text;
        console.log(savedStuff);
        return savedStuff;
    }, imageURL);

    page.close();
    browser.close();
    
    console.log(textContentOfImage);


    return textContentOfImage;
}
