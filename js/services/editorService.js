function getMeme() {
    return gMeme
}

function getImage(id) {
    return gImages.find((image) => image.id === id)
}

function drawText(text, x, y) {
    console.log("text, x, y: ", text, x, y);
    gCtx.font = '40px Arial'; // Font size and family
    gCtx.fillStyle = 'white'; // Text color
    gCtx.textAlign = 'center'; // Center alignment
    gCtx.textBaseline = 'middle'; // Vertical alignment

    // Add shadow for better visibility (optional)
    gCtx.shadowColor = 'black';
    gCtx.shadowBlur = 10;


    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}