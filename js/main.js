document.addEventListener("DOMContentLoaded", () => {

    const addMemberBtn = document.querySelector(".addMemberBtn button");
    const darkBg = document.querySelector(".dark_bg");
    const popup = document.querySelector(".popup");
    const closeBtn = document.querySelector(".closeBtn");

    const form = document.getElementById("myform");
    const tbody = document.querySelector("tbody");

    const searchInput = document.getElementById("search");
    const showEntries = document.querySelector(".entries select");

    const uploadInput = document.getElementById("uploading");
    const previewImg = document.querySelector(".imgholder .img");

    let dataArr = [];
    let editIndex = null; // edit qator indeksi

    // === Modal ochish ===
    addMemberBtn.addEventListener("click", () => {
        darkBg.style.display = "flex";
        popup.classList.add("active");
        form.reset();
        previewImg.src = "image/git.jpg";
        editIndex = null;
    });

    closeBtn.addEventListener("click", () => {
        popup.classList.remove("active");
        setTimeout(() => darkBg.style.display = "none", 300);
    });

    // === Rasm preview ===
    uploadInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) previewImg.src = URL.createObjectURL(file);
    });

    // === Submit ===
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const member = {
            img: previewImg.src,
            fname: document.getElementById("fName").value,
            lname: document.getElementById("lName").value, // <<-- Bu yerda 'lName' qilib o'zgartirildi
            age: document.getElementById("age").value,
            city: document.getElementById("city").value,
            position: document.getElementById("position").value,
            salary: document.getElementById("salary").value,
            date: document.getElementById("sDate").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        };

        if (editIndex === null) {
            dataArr.push(member); // yangi qo‘shish
        } else {
            dataArr[editIndex] = member; // edit holati
            editIndex = null;
        }

        form.reset();
        previewImg.src = "image/git.jpg";
        popup.classList.remove("active");
        setTimeout(() => darkBg.style.display = "none", 300);

        renderTable();
    });

    // === Table render ===
    function renderTable() {
        let tr = "";
        let filtered = filterData();

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td class="empty" colspan="11" align="center">No data available in table</td></tr>`;
            return;
        }

        filtered.forEach((item, index) => {
            tr += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.img}" width="40" height="40"/></td>
                <td>${item.fname} ${item.lname}</td>
                <td>${item.age}</td>
                <td>${item.city}</td>
                <td>${item.position}</td>
                <td>${item.salary}</td>
                <td>${item.date}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>
                    <button onclick="view(${index})"><i class="fa-regular fa-eye"></i></button>
                    <button onclick="edit(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="del(${index})"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>`;
        });

        tbody.innerHTML = tr;
    }

    // === Search & show entries ===
    searchInput.addEventListener("keyup", renderTable);
    showEntries.addEventListener("change", renderTable);

    function filterData() {
        let val = searchInput.value.toLowerCase();
        let limit = parseInt(showEntries.value);

        return dataArr.filter(item =>
            (item.fname + " " + item.lname + item.city + item.position)
                .toLowerCase()
                .includes(val)
        ).slice(0, limit);
    }

    // === Delete ===
    window.del = function(i) {
        dataArr.splice(i, 1);
        renderTable();
    }

    // === View ===
    window.view = function(i) {
        alert(`
Name: ${dataArr[i].fname} ${dataArr[i].lname}
City: ${dataArr[i].city}
Position: ${dataArr[i].position}
        `);
    }

    // === Edit ===
   window.edit = function(i) {
        const item = dataArr[i];
        editIndex = i;

        darkBg.style.display = "flex";
        popup.classList.add("active");

        previewImg.src = item.img;
        document.getElementById("fName").value = item.fname;
        document.getElementById("lName").value = item.lname; // <<-- Bu yerda 'lName' qilib o'zgartirildi
        document.getElementById("age").value = item.age;
        document.getElementById("city").value = item.city;
        document.getElementById("position").value = item.position;
        document.getElementById("salary").value = item.salary;
        document.getElementById("sDate").value = item.date;
        document.getElementById("email").value = item.email;
        document.getElementById("phone").value = item.phone;
    }

});