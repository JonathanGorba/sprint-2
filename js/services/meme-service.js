var gImgs = [{
    id: 1,
    url: 'img/1.jpg',
    keywords: ['woman', 'free']
},
{
    id: 2,
    url: 'img/2.jpg',
    keywords: ['politics', 'man']
},
{
    id: 3,
    url: 'img/3.jpg',
    keywords: ['dog', 'animal']
},
{
    id: 4,
    url: 'img/4.jpg',
    keywords: ['baby', 'dog']
},
{
    id: 5,
    url: 'img/5.jpg',
    keywords: ['baby', 'succes']
},
{
    id: 6,
    url: 'img/6.jpg',
    keywords: ['keyboard', 'cat']
},
{
    id: 7,
    url: 'img/7.jpg',
    keywords: ['actor', 'willywonka']
},
{
    id: 8,
    url: 'img/8.jpg',
    keywords: ['baby', 'funny']
},
{
    id: 9,
    url: 'img/9.jpg',
    keywords: ['pointing', 'man']
},
{
    id: 10,
    url: 'img/10.jpg',
    keywords: ['whytho', 'man']
},
{
    id: 11,
    url: 'img/11.jpg',
    keywords: ['aliens', 'man']
},
{
    id: 12,
    url: 'img/12.jpg',
    keywords: ['funny', 'man']
},
{
    id: 13,
    url: 'img/13.jpg',
    keywords: ['kids', 'thirdworld']
},
{
    id: 14,
    url: 'img/14.jpg',
    keywords: ['man', 'politics']
},
{
    id: 15,
    url: 'img/15.jpg',
    keywords: ['baby', 'funny']
},
{
    id: 16,
    url: 'img/16.jpg',
    keywords: ['dog', 'animal']
},
{
    id: 17,
    url: 'img/17.jpg',
    keywords: ['funny', 'politics']
},
{
    id: 18,
    url: 'img/18.jpg',
    keywords: ['man', 'sports']
},
{
    id: 19,
    url: 'img/19.jpg',
    keywords: ['actor', 'man']
},
{
    id: 20,
    url: 'img/20.jpg',
    keywords: ['acctor', 'man']
},
{
    id: 21,
    url: 'img/21.jpg',
    keywords: ['actor', 'man']
},
{
    id: 22,
    url: 'img/22.jpg',
    keywords: ['woman', 'funny']
},
{
    id: 23,
    url: 'img/23.jpg',
    keywords: ['man', 'sunny']
},
{
    id: 24,
    url: 'img/24.jpg',
    keywords: ['politics', 'man']
},
{
    id: 25,
    url: 'img/25.jpg',
    keywords: ['toys', 'funny']
},];
var gMeme = {
    selectedImgId: 0,
    imgRatio:1,
    selectedLineIdx: 0,
    selectedStickerIdx: 0,
    lines: [],
    stickers: []
}
var gKeywordSearchCountMap = {'funny': 16,'cat': 8, 'baby': 2, 'dog': 5, 'man': 6};


function newMeme(idx) {
    gMeme.selectedImgId = idx;
    img= new Image();
    img.src = gImgs[idx].url;
    var height = img.height;
    var width = img.width;
    gMeme.imgRatio= (height/width);
}

function changeToSticker(idx){
    gMeme.selectedStickerIdx = idx;
}

function changeStickerSize(direction){
    if(direction==='up'){
        gMeme.stickers[gMeme.selectedStickerIdx].size+=2;
    }else{
        gMeme.stickers[gMeme.selectedStickerIdx].size-=2;
    }
}

function createSticker(sticker) {
    gMeme.stickers.push({
        url: sticker,
        x: gCanvas.width / 2,
        y: gCanvas.height / 2,
        size: 80
    });
}

function createNewLine() {
    if (gMeme.lines.length < 1) {
        var x = gCanvas.width / 2;
        var y = 50;
    } else if (gMeme.lines.length === 1) {
        var x = gCanvas.width / 2;
        var y = gCanvas.height - 50;
    } else {
        var x = gCanvas.width / 2;
        var y = gCanvas.height / 2;
    }
    gMeme.lines.push({
        txt: 'Your Text Here',
        font: 'Impact',
        size: '40',
        align: 'center',
        color: 'black',
        filling: 'white',
        x,
        y
    });
}





function clearSticker(){
    gMeme.stickers.splice(gMeme.selectedStickerIdx, 1);
}

function ChangeToLastSticker(){
    gMeme.selectedStickerIdx = gMeme.stickers.length - 1;
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function moveSticker(direction){
    const sticker = gMeme.stickers[gMeme.selectedStickerIdx];
    if (direction === 'up') {
        sticker.y -= 2;
    } else {
        sticker.y += 2;
    }
}

function clearLines() {
    gMeme.lines = [];
}

function clearStickers() {
    gMeme.stickers = [];
}

function clearLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function alineText(direction) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.align = direction;
    if (direction === 'end') {
        line.x = gCanvas.width;
    } else if (direction === 'start') {
        line.x = 0;
    } else {
        line.x = gCanvas.width / 2;
    }
}

function moveText(direction) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    if (direction === 'up') {
        line.y -= 2;
    } else {
        line.y += 2;
    }
}

function changeLine() {
    if (gMeme.lines.length <= 1) {
        return;
    } else if (gMeme.lines.length - 1 <= gMeme.selectedLineIdx) {
        gMeme.selectedLineIdx = 0;
        return;
    }
    gMeme.selectedLineIdx++;
}

function changeToLastLine() {
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function changeToLine(idx) {
    gMeme.selectedLineIdx = idx;
}

function textChange(txt) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.txt = txt;
}

function changeFontSize(direction) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    if (direction === 'up') {
        line.size++;
    } else {
        line.size--;
    }
}

function getImgs() {
    return gImgs;
}

function getMeme() {
    return gMeme;
}

function fontChange(font) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.font = font;
}

function changeColor(color) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.color = color;
}

function changeFilling(color) {
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.filling = color;
}