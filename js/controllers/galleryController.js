function initiateGallery() {
    renderImagesIntoGallery()
}

function resetImagesContainer() {
    const imagesContainer = document.querySelector('images-container')
    imagesContainer.innerHTML = ``
}

function renderImagesIntoGallery() {
    const imagesContainer = document.querySelector('.images-container')
    gImages.map((image) => {
        imagesContainer.innerHTML += `<img src=${image.src} id=${image.id} onclick="onClickImage({src: '${image.src}', id:${image.id}})"/>`
    })
}

function onClickImage(img) {
    saveToStorage('image', img)
    window.location.href = `html/meme-editor.html`;
}

function onClickKeyWords(event) {
    const val = event.target.value
    const button = document.getElementById(val)
    gKeywordSearchCountMap[val]++
    const size = 15 + gKeywordSearchCountMap[val];
    button.style.fontSize =  size + 'px'
}