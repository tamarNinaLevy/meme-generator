let gElCanvas
let gCtx

function initEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function onResize() {
    const editSection = document.querySelector('.edit-section')
    gElCanvas.width = editSection.clientWidth * 0.9
    renderMeme()
}

function renderMeme() {
    const imageData = loadFromStorage('image')
    setMemeProperty('selectedImgId', imageData.id)
    const imageElement = new Image()
    imageElement.src = '../../' + imageData.src
    imageElement.onload = () => {
        coverCanvasWithImg(imageElement)
        gMeme.lines.map((line, index) => {
            drawText(line)
            if (index === gMeme.selectedLineIdx) {
                setInputText()
                setLineBorder()
            }
        })
    }
}

function coverCanvasWithImg(imageElement) {
    gElCanvas.height = (imageElement.naturalHeight / imageElement.naturalWidth) * gElCanvas.width
    gCtx.drawImage(imageElement, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onChangeText(event) {
    setLineText(event.target.value)
    renderMeme()
}

function onDownloadMeme(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'generated-meme'
}

function onChangeColor(event) {
    const color = event.target.value
    setLineColor(color)
    renderMeme()
}

function onClickFontSize(val) {
    setLineSize(val)
    renderMeme()
}

function onAddLine() {
    createNewLine()
    setMemeProperty('selectedLineIdx', gMeme.lines.length - 1)
    renderMeme()
}

function onClickSwitchLine() {
    const indexCurr = gMeme.selectedLineIdx
    let next = indexCurr + 1
    if (next === gMeme.lines.length)
        next = 0
    setMemeProperty('selectedLineIdx', next)
    renderMeme()
}

function onClickText(event) {
    const { offsetX, offsetY } = event
    const clicked = isTextClicked({ offsetX, offsetY })
    if (clicked)
        renderMeme()
}

function setInputText() {
    const input = document.getElementsByClassName('content')[0]
    input.value = gMeme.lines[gMeme.selectedLineIdx].txt
}