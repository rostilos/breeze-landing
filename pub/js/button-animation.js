window.addEventListener("DOMContentLoaded", (event) => {
    const isIOS =
        /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const buttons = document.querySelectorAll("._button");

    const handleButtonHover = (event, button) => {
        const overlay = button.querySelector("._button__text-overlay");
        if(!overlay){
            return;
        }
        button.classList.add("hover");
        if (!button.classList.contains("active")) {
            overlay.style.clip = `rect(0px ${overlay.offsetWidth}px 24px 0)`;
        }
    };
    const handleButtonMouseLeave = (event, button) => {
        const overlay = button.querySelector("._button__text-overlay");
        if(!overlay){
            return;
        }
        button.classList.remove("hover");
        if (!button.classList.contains("active")) {
            overlay.style.clip = `rect(0px 0px 24px 0)`;
        }
    };

    const handleButtonClick = (event, button) => {
        const overlay = button.querySelector("._button__text-overlay");
        if(!overlay){
            return;
        }
        button.classList.add("active");
        if (isIOS) {
            overlay.style.filter = "invert(100)";
            overlay.style.zIndex = "10";
        } else {
            overlay.style.clip = `rect(0px ${overlay.offsetWidth}px 24px 0)`;
        }
        setTimeout(() => {
            button.classList.remove("active");
            if (!button.matches(':hover')) {
                overlay.style.clip = `rect(0px 0px 24px 0)`;
            }
        }, 1200);
    };

    buttons.forEach((button) => {
        button.addEventListener("mouseenter", (e) =>
            handleButtonHover(event, button)
        );
        button.addEventListener("mouseleave", (e) =>
            handleButtonMouseLeave(event, button)
        );
        button.addEventListener("click", (e) =>
            handleButtonClick(event, button)
        );
    });
});
