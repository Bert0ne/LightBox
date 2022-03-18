const THUMBNAILS = document.querySelectorAll(".thumbnail img")
const POPUP = document.querySelector('.popup')
const POPUP_CLOSE = document.querySelector(".popup__close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT =document.querySelector(".popup__arrow--left")
const ARROW_RIGHT = document.querySelector(".popup__arrow--right");

let currentImgIndex;

THUMBNAILS.forEach((thumbnail, index) => {


    const showPopup = (e) => {  
        POPUP.classList.remove("hidden");
        POPUP_IMG.src = e.target.src
        currentImgIndex = index;
        THUMBNAILS.forEach(el => {
            el.setAttribute("tabindex", -1)
        })
    }
    thumbnail.addEventListener('click', showPopup)
    thumbnail.addEventListener('keydown', (e)=> {
        if(e.code === "Enter") {
            showPopup(e)
        }
    })
})

const closePopup = function() {
    POPUP.classList.add("fade-out");

    setTimeout(() => {
        POPUP.classList.add("hidden");
        POPUP.classList.remove("fade-out");
    }, 300)

    THUMBNAILS.forEach(el => {
        el.setAttribute("tabindex", 0)
    })
}

POPUP_CLOSE.addEventListener('click', () => {
    closePopup()

})

const showNextImg = function() {
    currentImgIndex === THUMBNAILS.length - 1 ? currentImgIndex = 0 : currentImgIndex++;
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}
const showPrevImg = function() {
    currentImgIndex === 0 ? currentImgIndex = THUMBNAILS.length - 1 : currentImgIndex--;
    POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
}

ARROW_RIGHT.addEventListener('click', () => {
    showNextImg();
})

ARROW_LEFT.addEventListener('click', () => {
    showPrevImg();
})

document.addEventListener("keydown", (e) => {

    if(POPUP_IMG.classList.contains('hidden')) return;

    if (e.key === "ArrowRight") {
        showNextImg()
    };
    if (e.key === "ArrowLeft") {
        showPrevImg()
    };
    if (e.key === "Escape") {
        closePopup()
    };
});

POPUP.addEventListener('click', (e) => {
    e.target === POPUP ? closePopup() : ''
});