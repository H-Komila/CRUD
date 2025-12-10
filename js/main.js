document.addEventListener("DOMContentLoader", () => {
    const addMemberBtn = document.querySelector(".addMemberBtn button");
    const darkBg = document.querySelector(".dark_bg");
    const popup = document.querySelector(".closeBtn");

    const form = document.getElementById("myform");
    const tbody = document.querySelector("tbody");

    const searchInput = document.getElementById("search");
    const showEntries = document.querySelector(".entries select");

    const uploadInput = document.getElementById("uploading");
    const previewImg = document.querySelector(".imgholder .img");

    let dataArr = [];
    let editIndex = null;


    addMemberBtn.addEventListener("click", () => {
        darkBg.computedStyleMap.display = "flex";
        popup.classList.add("active");
        form.reset();
        previewImg.src = "image/git.jpg";
        editIndex = null;
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
        setTimeout(() => darkBg.style.display = "none", 300);

    });

    uploadInput.addEventListener("change", function (){
        const file = this.files[0];
        if (file) previewImg.src = URL.createObjectURL(file);

    });



    




})