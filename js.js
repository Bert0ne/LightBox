class LightBox {

    THUMBNAILS = document.querySelectorAll(".thumbnail img")
    POPUP = document.querySelector('.popup')
    POPUP_CLOSE = document.querySelector(".popup__close");
    POPUP_IMG = document.querySelector(".popup__img");
    ARROW_LEFT = document.querySelector(".popup__arrow--left")
    ARROW_RIGHT = document.querySelector(".popup__arrow--right");
    currentImgIndex;

    constructor() {
        this.start();
        this.closeListeners()
        this.arrowsListeners()
    }


    start() {
        this.THUMBNAILS.forEach((thumbnail, index) => {


            const showPopup = (e) => {  
                this.POPUP.classList.remove("hidden");
                this.POPUP_IMG.src = e.target.src
                this.currentImgIndex = index;
                this.THUMBNAILS.forEach(el => {
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
    }

    closePopup() {
        this.POPUP.classList.add("fade-out");
    
        setTimeout(() => {
            this.POPUP.classList.add("hidden");
            this.POPUP.classList.remove("fade-out");
        }, 300)
    
        this.THUMBNAILS.forEach(el => {
            el.setAttribute("tabindex", 0)
        })
    }   
    
    showNextImg() {
        this.currentImgIndex === this.THUMBNAILS.length - 1 ? this.currentImgIndex = 0 : this.currentImgIndex++;
        this.POPUP_IMG.src = this.THUMBNAILS[this.currentImgIndex].src;
    }
    showPrevImg() {
        this.currentImgIndex === 0 ? this.currentImgIndex = this.THUMBNAILS.length - 1 : this.currentImgIndex--;
        this.POPUP_IMG.src = this.THUMBNAILS[this.currentImgIndex].src;
    }

    closeListeners() {
        this.POPUP_CLOSE.addEventListener('click', () => {
            this.closePopup()
        })

        this.POPUP.addEventListener('click', (e) => {
            e.target === this.POPUP ? this.closePopup() : ''
        });
    }

    arrowsListeners() {
        this.ARROW_RIGHT.addEventListener('click', () => {
            this.showNextImg();
        })
        
        this.ARROW_LEFT.addEventListener('click', () => {
            this.showPrevImg();
        })
        
        document.addEventListener("keydown", (e) => {
        
            if(this.POPUP_IMG.classList.contains('hidden')) return;
        
            if (e.key === "ArrowRight") {
                this.showNextImg()
            };
            if (e.key === "ArrowLeft") {
                this.showPrevImg()
            };
            if (e.key === "Escape") {
                this.closePopup()
            };
        });
    }

}

let lightbox = new LightBox()








