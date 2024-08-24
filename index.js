const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const { width, height } = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });

    
    var AddtoCart = '//input[@id="add-to-cart-button"]'
    var nogracias = '//*[@id="attachSiNoCoverage"]/span/input'
    var vercarrito = '//*[@id="sw-gtc"]/span/a'

    
    await page.setViewport({ width, height });
    await page.goto('https://www.amazon.com/Hisense-40-Inch-Google-40A4K-Built/dp/B0C7VBWHLQ/ref=sr_1_1?crid=J2CP1K600MZR&dib=eyJ2IjoiMSJ9.kin9wVmDgq4CC_FQgwVMgYKNd1eG75whidHxXCsH9UZD-aq7bdCCWXjo27gbX0dPcvPtwQaRZTIHZFzBaHu2kJFseinkBYNNChphc2xP48eBIbqsU0YcR_Ow0j_IJrXVklKoRmnvciKV3V3lyUEvchTjC4WzpMqZPOtH2zVQ0U_rbC-2LxIvVs6uXAvzQMKAUxu_lmS4-lK8lL8itiouJ-tAjovZnY39zPinnA9rg9I.mo1IMhBhWzRUv4gC3vjt7_dhybkslaH5ni7jR4_oGTA&dib_tag=se&keywords=pantalla+40&qid=1724457580&sprefix=pantalla+40%2Caps%2C159&sr=8-1');
    await page.waitForTimeout(5000);
    await page.waitForXPath(AddtoCart);

    const [xpatprecio] = await page.$x('//*[@id="corePrice_feature_div"]/div/div/span[1]/span[2]/span[2]');
   
    const precio = await page.evaluate(el => el.textContent, xpatprecio)
    console.log(precio);
    const [buttoncarrito] = await page.$x(AddtoCart);
    await buttoncarrito.click();
    console.log('articulo agregado a carrito')
    
    await page.waitForTimeout(5000);
    const [buttonnogracias] = await page.$x(nogracias);
    await buttonnogracias.click();
    console.log('no gracias')
    
    await page.waitForTimeout(5000);
    const [buttonvercarrito] = await page.$x(vercarrito);
    await buttonvercarrito.click();

    await page.waitForTimeout(5000);
    const [xpatpreciocarrito] = await page.$x('//*[@id="sc-subtotal-amount-buybox"]/span');
    const preciocarrito = await page.evaluate(el => el.textContent, xpatpreciocarrito)

    console.log(preciocarrito);
    if (precio == preciocarrito) {
        console.log('Los Precios Coindicen')
    } else {
        console.log('los precios NO coindicen')
    }

    await browser.close();

})();
