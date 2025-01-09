var gMeme = {
    selectedImgId: -1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Text Line 1',
            size: 20,
            color: 'black',
            x: 5,
            y: 0,
        },
    ]
}

function getMeme() {
    return gMeme
}

function getImage(id) {
    return gImages.find((image) => image.id === id)
}

function drawText(line) {
    const textHeight = line.size
    gCtx.font = line.size + 'px Arial'
    const textMetrics = gCtx.measureText(line.txt)
    const textWidth = textMetrics.width
    gCtx.fillStyle = line.color
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.shadowColor = 'white'
    gCtx.shadowBlur = 5
    gCtx.fillText(line.txt, line.x + textWidth / 2, line.y + textHeight)
    line.width = textWidth;
    line.height = textHeight;
}

function setLineText(text) {
    const lines = gMeme.lines
    lines[gMeme.selectedLineIdx].txt = text
    setMemeProperty('lines', lines)
}

function setMemeProperty(key, value) {
    gMeme[key] = value
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setLineSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size += val
}

function createNewLine() {
    const prevY = gMeme.lines[gMeme.lines.length - 1].y + 35
    const prevX = gMeme.lines[gMeme.lines.length - 1].x
    console.log("prevX: ", prevX);
    gMeme.lines.push({
        txt: 'Text Line 1',
        size: 20,
        color: 'black',
        x: prevX,
        y: prevY,
    })
}

function setLineBorder() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const textMetrics = gCtx.measureText(line.txt)
    const textWidth = textMetrics.width
    const textHeight = line.size
    gCtx.strokeStyle = "black"
    gCtx.lineWidth = 2
    gCtx.strokeRect(line.x, line.y, textWidth, textHeight * 1.5)
}

function isTextClicked(clickedPos) {
    const { offsetX, offsetY } = clickedPos
    for (let i = 0; i < gMeme.lines.length; i++) {
        const line = gMeme.lines[i]
        if (
            offsetX >= line.x &&
            offsetX <= line.x + line.width &&
            offsetY >= line.y &&
            offsetY <= line.y + line.height
        ) {
            gMeme.selectedLineIdx = i
            return true
        }
    }
    return false
}