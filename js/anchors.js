window.addEventListener("DOMContentLoaded", (event) => {
    const anchors = document.querySelectorAll("._scrollTo");

    const scrollToElement = (event, el) => {
        event.preventDefault();
        const href = el.getAttribute("href");
        const targetEl = document.querySelector(href);
        targetEl.scrollIntoView({behavior: "smooth"});
    };

    anchors.forEach((anchor) => {
        if(anchor){
            anchor.addEventListener("click", (e) => scrollToElement(e , anchor));
        }
    });
});
