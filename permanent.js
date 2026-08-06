const tableBody = document.getElementById("tableBody");

// إضافة صنف
const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", function () {

    let name = prompt("أدخل اسم الصنف:");
    if (!name) return;

    let type = prompt("أدخل النوع:");
    if (!type) return;

    let quantity = prompt("أدخل العدد:");
    if (!quantity) return;

    let table = document.getElementById("tableBody");

    let row = table.insertRow();

    row.innerHTML = `
        <td>${table.rows.length}</td>
        <td>${name}</td>
        <td>${type}</td>
        <td>${quantity}</td>
        <td>
            <button class="edit"><i class="fa-solid fa-pen"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;

    updateCards();
});
function updateCards() {

    const rows = document.querySelectorAll("#tableBody tr");

    document.querySelector(".cards .card:nth-child(1) h2").textContent = rows.length;

    let devices = 0;
    let furniture = 0;

    rows.forEach(row => {

        const item = row.cells[1].textContent;

        if (
            item.includes("لاب") ||
            item.includes("طابعة") ||
            item.includes("ماكينة") ||
            item.includes("كولدر")
        ) {
            devices++;
        } else {
            furniture++;
        }

    });

    document.querySelector(".cards .card:nth-child(2) h2").textContent = devices;
    document.querySelector(".cards .card:nth-child(3) h2").textContent = furniture;
}

updateCards();
// حذف وتعديل
tableBody.addEventListener("click", function (e) {

    // حذف
    if (e.target.closest(".delete")) {
        if (confirm("هل تريد حذف هذا الصنف؟")) {
            e.target.closest("tr").remove();
            updateNumbers();
        }
    }

    // تعديل
    if (e.target.closest(".edit")) {

        let row = e.target.closest("tr");

        let name = prompt("اسم الصنف", row.cells[1].innerText);
        if (name !== null) row.cells[1].innerText = name;

        let type = prompt("النوع", row.cells[2].innerText);
        if (type !== null) row.cells[2].innerText = type;

        let qty = prompt("العدد", row.cells[3].innerText);
        if (qty !== null) row.cells[3].innerText = qty;
    }

});

// إعادة ترقيم الصفوف
function updateNumbers() {
    [...tableBody.rows].forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });
}

// طباعة
document.querySelector(".print").addEventListener("click", () => {
    window.print();
});

// تصدير Excel
document.querySelector(".excel").addEventListener("click", function () {

    const table = document.getElementById("assetTable");

    const workbook = XLSX.utils.table_to_book(table, {
        sheet: "العهد الدائمة"
    });

    XLSX.writeFile(workbook, "العهد_الدائمة.xlsx");

});
// البحث
document.getElementById("searchInput").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    [...tableBody.rows].forEach(row => {

        row.style.display = row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";

    });

});