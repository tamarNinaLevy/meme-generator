let gElCanvas
let gCtx

function initEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    onResize()
    renderMeme()
}

function onResize() {
    const editSection = document.querySelector('.edit-section')
    gElCanvas.width = editSection.clientWidth * 0.9
}

function renderMeme() {
    const imageData = loadFromStorage('image')
    const imageElement = new Image()
    imageElement.src = '../../' + imageData.src
    imageElement.onload = () => {
        coverCanvasWithImg(imageElement)
        gMeme.lines.map((line, index) => {
            const y = index === 0 ? 10 + line.size : gElCanvas.height - line.size
            drawText(line.txt, gElCanvas.width / 2, y)
        })
    }
}

function coverCanvasWithImg(imageElement) {
    gElCanvas.height = (imageElement.naturalHeight / imageElement.naturalWidth) * gElCanvas.width
    gCtx.drawImage(imageElement, 0, 0, gElCanvas.width, gElCanvas.height)
}