function mobileNavBar() {
    const links = document.getElementById("main-nav__items");
    console.log(links);

    if (links.style.display === "none") {
        links.style.display = "block";
    } else {
        links.style.display = "none";
    }
}

mobileNavBar();