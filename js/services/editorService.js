var gMeme = {
    selectedImgId: -1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Text Line 1',
            size: 20,
            color: 'black',
            x: 5,
            y: 5,
            width: 0,
            height: 0,
            alignment: 'right',
            font: 'Arial'
        },
    ]
}

function getMeme() {
    return gMeme
}

function getImage(id) {
    return gImages.find((image) => image.id === id)
}

function getCorrectedPath(imgSrc) {
    const basePath = location.hostname.includes('github.io') ? '' : '../../';
    return basePath + imgSrc;
}

function drawText(line) {
    const textHeight = line.size
    gCtx.font = line.size + 'px ' + line.font
    const textMetrics = gCtx.measureText(line.txt)
    const textWidth = textMetrics.width
    gCtx.fillStyle = line.color
    gCtx.textAlign = line.alignment
    gCtx.textBaseline = 'center'
    gCtx.shadowColor = 'white'
    gCtx.shadowBlur = 5
    gCtx.fillText(line.txt, line.x + textWidth, line.y + textHeight)
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

function setLineSelectedSize(val) {
    gMeme.lines[gMeme.selectedLineIdx].size = val
}

function createNewLine() {
    const prevY = gMeme.lines[gMeme.lines.length - 1].y + gMeme.lines[gMeme.lines.length - 1].size + 10
    const prevX = gMeme.lines[gMeme.lines.length - 1].x
    gMeme.lines.push({
        txt: 'Text Line 1',
        size: 20,
        color: 'black',
        x: prevX,
        y: prevY,
        width: 0,
        height: 0,
        alignment: 'right',
        font: 'Arial'
    })
}

function setLineBorder() {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const textMetrics = gCtx.measureText(line.txt)
    const textWidth = textMetrics.width
    const textHeight = line.size
    gCtx.strokeStyle = "black"
    gCtx.lineWidth = 2
    gCtx.strokeRect(line.x, line.y, textWidth * 2, textHeight * 1.5)
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

function setLineAlignment(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].alignment = alignment
}

function setLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setPositionText(val) {
    gMeme.lines[gMeme.selectedLineIdx].y += val
}

function deleteLine() {
    const newLines = gMeme.lines.filter((line, index) => {
        if (index !== gMeme.selectedLineIdx)
            return true
        return false
    })
    setMemeProperty('lines', newLines)
}