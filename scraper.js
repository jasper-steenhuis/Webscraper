const puppeteer = require('puppeteer');
const {jsPDF} = require('jspdf');
const { title } = require('process');
async function scrape(url) 
{
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForTimeout(5000);
    const titles = await page.evaluate(() => 
        Array.from(document.querySelectorAll('section.SegmentItemContainerstyle__StyledSegmentItemContainer-sc-10buj0t-0.eCASmG'))
        .map((phone) => ({
            title: phone.querySelector("h3").innerText.trim(),
            price: phone.querySelector("span.Pricingstyle__StyledPricing-sc-1gsjfe6-0.cYDpRX").innerText.trim()
            //*[@id="beastResultsContainer"]/div/div[1]/section[1]/div[3]/div[2]/div/span[2]
        }))
    );
   
    console.log(titles, titles.length);
    const doc = new jsPDF();
    for(i = 0; i <titles.length; i++){
        
        doc.text(titles[i].title, 10, i * 10);
        doc.text("€" + titles[i].price,175, i*10);
        
    }
    doc.save("test.pdf");
    await browser.close();
}

scrape("https://www.belsimpel.nl/telefoon/oneplus");

