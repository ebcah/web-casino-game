let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down, hide the header
        header.style.top = "-80px";
    } else {
        // Scrolling up, show the header
        header.style.top = "0";
    }

    lastScrollTop = scrollTop;
});