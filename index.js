/*
    autoDelcom - Automation for Delcom [createActivity]
    Made with <3 in Medan
    (c) kangPHP 2022
*/

/* deklarasi variabel */
const puppet = require("puppeteer");
const tesseract = require("tesseract.js");

const timeItem = [
    {"judul":"Saat Teduh","mulai":"05:00","selesai":"05:20","keterangan":"Berdoa, bernyanyi lagu kidung jemaat, membaca nats firman"},
    {"judul":"Kurve","mulai":"05:20","selesai":"06:00","keterangan":"Membersihkan kamar"},
    {"judul":"Kegiatan Sebelum Perkuliahan","mulai":"06:00","selesai":"07:00","keterangan":"Mandi, mempersiapkan barang yang akan dibawa untuk kegiatan dalam satu hari, sarapan pagi"},
    {"judul":"Makan Siang","mulai":"12:00","selesai":"12:40","keterangan":"Jam Makan Siang"},
    {"judul":"Kegiatan Perkuliahan","mulai":"07:00","selesai":"17:00","keterangan":"Belajar via Zoom"},
    {"judul":"Kurve","mulai":"17:00","selesai":"18:00","keterangan":"Membersihkan asrama, membersihkan kamar"},
    {"judul":"Makan Malam","mulai":"19:00","selesai":"19:30","keterangan":"Jam Makan Malam"},
    {"judul":"Malam Kolaboratif","mulai":"19:30","selesai":"21:00","keterangan":"Belajar Mandiri dan Mengisi Time Table"},
    {"judul":"Ibadah Malam","mulai":"21:00","selesai":"21:20","keterangan":"Saat teduh"},
    {"judul":"Bersiap untuk Silent Time","mulai":"21:25","selesai":"22:00","keterangan":"Merapikan tempat tidur dan lemari pakaian dan bersiap untuk tidur"}
];

var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var nday = year + "-0" + month + "-" + day;

async function main ()
{
    /* deklarasi variabel */
    const browser = await puppet.launch({
        defaultViewport: null,
        headless:false,
        args: ['--start-maximized']
    });
    const page = await browser.newPage();

    /* gambar diskip requestnya biar ringan di load */
    await page.setRequestInterception(true);
    page.on('request',(request) => {
        if(request.resourceType == "image") request.abort();
        else request.continue();
    })

    /* gas ke page */
    await page.goto('https://delcom.org/login',{waitUntil:'networkidle0',timeout:0});
    
    //await page.waitForSelector("div.input-group-prepend:nth-child(1) > span:nth-child(1) > img:nth-child(1)");
    //const element = await page.$('div.input-group-prepend:nth-child(1) > span:nth-child(1) > img:nth-child(1)');
    //await element.screenshot({path: 'captcha/captcha.jpg'});

    /* untuk ngisi login formnya */
    await page.type('input[name=username]','email'); /* username/email */
    await page.type('input[type=password]','password disini'); /* password */

    await page.type('input[name=captcha]','K3tampananQu!');
    await page.click('button[type=submit]', {waitUntil:'networkidle0'});
    
    /* delay biar ga ngefreeze */
    await new Promise(resolve => setTimeout(resolve, 500));

    let objectCount = timeItem.length;
    for(let j = 0; j < objectCount; j++)
    {    
        await new Promise(resolve => setTimeout(resolve, 1000));

        /* pergi ke halaman time table */
        await page.goto('https://delcom.org/activity/timeTable/add', {waitUntil:'networkidle0', timeout:0});
        
        await new Promise(resolve => setTimeout(resolve, 5000));

        /* tambah timetable */
        await page.type('input[name=judul]', timeItem[j].judul);
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.select('select[name="tanggal"]', nday);
        await new Promise(resolve => setTimeout(resolve, 500));

        await page.$eval('#jam_mulai', el => el.value = '');
        await page.type('input[name=jam_mulai]', timeItem[j].mulai);
        await new Promise(resolve => setTimeout(resolve, 500));

        await page.$eval('#jam_selesai', el => el.value = '');
        await page.type('input[name=jam_selesai]', timeItem[j].selesai);
        await new Promise(resolve => setTimeout(resolve, 500));

        await page.type('input[name=keterangan]', timeItem[j].keterangan);
        await new Promise(resolve => setTimeout(resolve, 500));

        await page.click('button[type=submit]', {waitUntil:'networkidle0'});
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /* nutup browsernya */
    await browser.close();

    console.log("Berhasil!");
}

main();