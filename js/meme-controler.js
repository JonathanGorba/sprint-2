var gCanvas;
var gCtx;
var gMode = 'gal';
var gIsDrag = false;
var gObjDragged = 'txt'
var gStartPos;

function init() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    renderGallery();
    renderMeme();
    galleryMode();
    window.addEventListener('resize', () => {
        renderMeme();
    });
    addListeners()
}

function renderGallery() {
    const imgs = getImgs();
    var html = '';
    imgs.forEach(img => {
        html += `<img onclick="onImgClick(${img.id - 1})" src="img/${img.id}.jpg" alt="">`
    });
    document.querySelector('.gallery').innerHTML = html;
}

function onImgClick(idx) {
    newMeme(idx);
    clearText();
    clearStickers();
    createNewLine();
    generatorMode();
    renderMeme();
}

function renderMeme(mode) {
    const meme = getMeme();
    resizeCanvasToDisplaySize(gCanvas, meme.imgRatio);
    var img = new Image();
    img.src = getImgs()[meme.selectedImgId].url;
    drawImg(img);
    meme.lines.forEach(line => {
        drawText(line.txt, line.x, line.y, line.font, line.size, line.align, line.color, line.filling)
    })
    meme.stickers.forEach(sticker => {
        drawSticker(sticker.url, sticker.x, sticker.y, sticker.size)
    })
    if (!(mode === 'download')) {
        if (gObjDragged === 'txt') {
            if (meme.lines.length === 0) return;
            textBox(meme.lines[meme.selectedLineIdx]);
        } else {
            if (meme.stickers.length === 0) return;
            stickerBox(meme.stickers[meme.selectedStickerIdx]);
        }
    }
}

function onMoveText(direction) {
    if (gObjDragged === 'txt') {
        moveText(direction);
    } else {
        moveSticker(direction);
    }
    renderMeme();
}

function onChangeFontSize(direction) {
    if (gObjDragged === 'txt') {
        changeFontSize(direction);
    } else {
        changeStickerSize(direction);
    }
    renderMeme();
}

function onChangeLine() {
    changeLine();
    gObjDragged = 'txt';
    renderMeme();
}

function onTextChange(eltxt) {
    if (gObjDragged === 'sticker') return;
    const txt = eltxt.value;
    textChange(txt);
    renderMeme();
}

function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function onStickerClick(sticker) {
    createSticker(sticker);
    gObjDragged = 'sticker';
    ChangeToLastSticker();
    renderMeme();
}

function drawSticker(url, x, y, size) {
    var img = new Image();
    img.src = url;
    gCtx.drawImage(img, x, y, size, size);
}

function drawText(txt, x, y, font, size, align, color, filling) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = filling;
    gCtx.textAlign = align;
    gCtx.font = size + 'px ' + font;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function stickerBox(sticker) {
    var sx = sticker.x;
    var ex = sticker.size;
    var sy = sticker.y;
    var ey = sticker.size;
    drawRect(sx, sy, ex, ey);
}

function textBox(line) {
    const txtMeasures = gCtx.measureText(line.txt);
    var sx;
    var ex;
    if (line.align === 'end') {
        sx = line.x - txtMeasures.width - line.size / 2;
    } else if (line.align === 'start') {
        sx = line.x - line.size / 2;
    } else {
        sx = line.x - txtMeasures.width / 2 - line.size / 2;
    }
    ex = (txtMeasures.width + +line.size);
    const sy = line.y - line.size;
    const ey = line.size * 1.2;
    drawRect(sx, sy, ex, ey);
}

function setDefaults() {
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.textAlign = "center";
    gCtx.font = '40px Impact';
}

function drawRect(sx, sy, ex, ey) {
    gCtx.strokeStyle = 'black';
    gCtx.lineWidth = '3px';
    gCtx.strokeRect(sx, sy, ex, ey);
}

function onCreateNewLine() {
    createNewLine();
    changeToLastLine();
    gObjDragged = 'txt';
    renderMeme();
}

function onAlineText(direction) {
    if (gObjDragged === 'sticker') return;
    alineText(direction);
    renderMeme();
}

function clearText() {
    clearLines();
}

function onDeleteLine() {
    if (gObjDragged === 'txt') {
        clearLine();
        changeToLastLine();
    } else {
        clearSticker();
        ChangeToLastSticker();
    }
    renderMeme();
}

function onFontChange(font) {
    if (gObjDragged === 'sticker') return;
    fontChange(font);
    renderMeme();
}

function onChangeColor(color) {
    if (gObjDragged === 'sticker') return;
    changeColor(color);
    renderMeme();
}

function onChangeFilling(color) {
    if (gObjDragged === 'sticker') return;
    changeFilling(color);
    renderMeme();
}

function generatorMode(ev) {
    if (!(ev === 'resize')) gMode = 'gen';
    document.querySelector('.generator').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
    renderMeme();
}


function galleryMode() {
    gMode = 'gal';
    document.querySelector('.gallery').style.display = 'grid'
    document.querySelector('.generator').style.display = 'none'
}

function download() {
    renderMeme('download');
    download_image();
    renderMeme();
}

function download_image() {
    var image = gCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-meme.png";
    link.href = image;
    link.click();
}

function addListeners() {
    addMouseListeners();
    addTouchListeners();
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove);
    gCanvas.addEventListener('mousedown', onDown);
    gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove);
    gCanvas.addEventListener('touchstart', onDown);
    gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    console.log('onDown()');
    isObjClicked(pos);
    if (!gIsDrag) return;
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
    renderMeme();
}

function onMove(ev) {
    console.log('onMove()');
    const meme = getMeme();
    if (gIsDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        if (gObjDragged === 'txt') {
            drag(dx, dy, meme.lines[meme.selectedLineIdx]);
        } else {
            drag(dx, dy, meme.stickers[meme.selectedStickerIdx]);
        }
        gStartPos = pos;
        renderMeme();
    }
}

function drag(dx, dy, line) {
    line.x += dx;
    line.y += dy;
}

function onDeleteAll() {
    clearText();
    clearStickers();
    renderMeme();
}

function onUp() {
    console.log('onUp()');
    gIsDrag = false;
    document.body.style.cursor = 'default';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault()
    //     ev = ev.changedTouches[0]
    //     pos = {
    //         x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
    //         y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
    //     }
    // }
    return pos
}


// clickedpos = {x,y}
function isObjClicked(clickedPos) {
    const meme = getMeme();
    console.log('isobjcliked?');
    meme.lines.forEach((line, idx) => {
        console.log('enter');
        const txtMeasures = gCtx.measureText(line.txt);
        var sx;
        var ex;
        if (line.align === 'end') {
            sx = line.x - txtMeasures.width - line.size / 2;
        } else if (line.align === 'start') {
            sx = line.x - line.size / 2;
        } else {
            sx = line.x - txtMeasures.width / 2 - line.size / 2;
        }
        ex = (+sx + (txtMeasures.width + +line.size));
        var sy = line.y - line.size;
        var ey = (+line.y + +line.size * 0.2);
        // console.log(sx, ex, sy, ey, clickedPos);
        if ((clickedPos.x < ex && clickedPos.x > sx) && (clickedPos.y < ey && clickedPos.y > sy)) {
            console.log('yes');
            changeToLine(idx);
            renderMeme();
            gIsDrag = true;
            gObjDragged = 'txt';
        }
    })
    meme.stickers.forEach((line, idx) => {
        console.log('enter s');
        var sx = line.x;
        var sy = line.y;
        var ex = line.x + line.size;
        var ey = line.y + line.size;
        if ((clickedPos.x < ex && clickedPos.x > sx) && (clickedPos.y < ey && clickedPos.y > sy)) {
            gObjDragged = 'sticker';
            gIsDrag = true;
            changeToSticker(idx);
            console.log('yes s');
        }
    })
}

function resizeCanvasToDisplaySize(canvas, ratio) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientWidth * ratio;

    // Check if the canvas is not the same size.
    const needResize =
        canvas.width !== displayWidth ||
        canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
}