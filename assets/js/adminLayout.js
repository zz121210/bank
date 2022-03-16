addEventListener("scroll", () => {
    if(window.pageYOffset> 20) {
        document.querySelector("header").style.borderBottom ="0.1em solid"
    } else {
        document.querySelector("header").style.borderBottom ="0.1em solid rgb(238, 238, 238)"
    }
})