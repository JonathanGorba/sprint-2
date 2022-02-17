var gImgs = [{
    id: 1,
    url: 'img/1.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 2,
    url: 'img/2.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 3,
    url: 'img/3.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 4,
    url: 'img/4.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 5,
    url: 'img/5.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 6,
    url: 'img/6.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 7,
    url: 'img/7.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 8,
    url: 'img/8.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 9,
    url: 'img/9.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 10,
    url: 'img/10.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 11,
    url: 'img/11.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 12,
    url: 'img/12.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 13,
    url: 'img/13.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 14,
    url: 'img/14.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 15,
    url: 'img/15.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 16,
    url: 'img/16.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 17,
    url: 'img/17.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 18,
    url: 'img/18.jpg',
    keywords: ['funny', 'cat']
},];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: []
}

function newMemeId(id) {
    gMeme.selectedImgId = id;
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

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1);
}

function clearLines() {
    gMeme.lines = [];
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
        return
    }
    gMeme.selectedLineIdx++
}

function changeToLastLine() {
    gMeme.selectedLineIdx = gMeme.lines.length - 1
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