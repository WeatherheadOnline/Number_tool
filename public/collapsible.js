const collapseBtn = document.getElementsByClassName("collapse-btn");

for (let i = 0; i < collapseBtn.length; i++) {
    collapseBtn[i].addEventListener("click", () => {
        this.classList.toggle("active");
        const moreOptions = this.nextElementSibling;
        if (moreOptions.style.display === "block") {
            moreOptions.style.display = "none";
        } else {
            moreOptions.style.display = "block";
        }
    });
}