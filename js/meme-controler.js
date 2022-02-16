var gCanvas;
var gCtx;

function init() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    renderGallery();
}

function renderGallery() {
    const imgs = getImgs();
    var html = '';
    imgs.forEach(img => {
        html += `<img onclick="onImgClick(${img.id - 1})" src="img/${img.id}.jpg" alt="">`
    });
    document.querySelector('.gallery').innerHTML = html;
}

function onImgClick(id) {
    newMemeId(id);
    clearText();
    createNewLine();
    renderMeme();
}

function renderMeme() {
    const meme = getMeme();
    var img = new Image();
    img.src = getImgs()[meme.selectedImgId].url;
    drawImg(img);
    meme.lines.forEach(line => {
        drawText(line.txt, line.x, line.y, line.font, line.size, line.align, line.color, line.filling)
    })
}

function onMoveText(direction) {
    moveText(direction);
    renderMeme();
}

function onChangeFontSize(direction) {
    changeFontSize(direction);
    renderMeme();
}

function onChangeLine() {
    changeLine();
}

function onTextChange(eltxt) {
    const txt = eltxt.value;
    console.log(eltxt.value);
    textChange(txt);
    renderMeme();
}

function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function drawText(txt, x, y, font, size, align, color, filling) {
    console.log(txt, x, y, font, size, align, color, filling);
    gCtx.strokeStyle = color;
    gCtx.fillStyle = filling;
    gCtx.textAlign = align;
    gCtx.font = size + 'px ' + font;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function setDefaults() {
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.textAlign = "center";
    gCtx.font = '40px Impact';
}

function onCreateNewLine() {
    createNewLine();
    changeToLastLine();
    renderMeme();
}

function onAlineText(direction) {
    alineText(direction);
    renderMeme();
}

function clearText() {
    clearLines();
    renderMeme();
}