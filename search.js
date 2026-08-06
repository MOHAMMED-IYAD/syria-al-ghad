const students = [
    {
        name: "احمد محمد",
        grade: "العاشر",
        section: "أ",
        phone: "0599123456",
        status: "منتظم"
    },
    {
        name: "سارة علي",
        grade: "التاسع",
        // section: "ب",
        phone: "0599234567",
        status: "منتظم"
    },
    {
        name: "محمد خالد",
        grade: "الثامن",
        section: "ج",
        phone: "0599345678",
        status: "منتظم"
    },
    {
        name: "لينا يوسف",
        grade: "السابع",
        section: "أ",
        phone: "0599456789",
        status: "منتظم"
    },
    {
        name: "عمر أحمد",
        grade: "الحادي عشر",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "محمد بعلوشة",
        grade: "الحادي عشر",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "محمد مطر",
        grade: "الحادي عشر",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "_رهف شعت_",
        grade: "الحادي عشر",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "لانا الخالدي",
        grade: "الاول ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "رهف حبيبة محمد 😂😂😂😂",
        grade: "الاول ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "مهدي القوقا ",
        grade: "الثاني ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "سارة سليم ",
        grade: "الثالت ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "احمد الشاعر ",
        grade: "رابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "ملك صادق ",
        grade: "سابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "محمود ابو بكرة ",
        grade: "الحادي عشر",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },


    {
        name: "محمد المقيد   ",
        grade: "السابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "ياسمين ياسين    ",
        grade: "السابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "محمد هارون   ",
        grade: "السابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },


    {
        name: "محمد ابو رجل   ",
        grade: "السادس ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "محمد حمدان   ",
        grade: "الثاني ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "محمد زقوت   ",
        grade: "الاول ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },


    {
        name: "محمد المعصوابي   ",
        grade: "الاول ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "محمد جبر   ",
        grade: "الثاني ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "سارة عيد    ",
        grade: "الرابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },


    {
        name: " احمد العايدي     ",
        grade: "السابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "اجمد عيد    ",
        grade: "kg2 ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "احمد شاهين    ",
        grade: "الرابع ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },

    {
        name: "احمد ابو مغيصب    ",
        grade: "السادس ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
    {
        name: "احمد محمود     ",
        grade: "الحادي عشر ",
        section: "ب",
        phone: "0599567890",
        status: "منتظم"
    },
];

const searchInput = document.getElementById("searchInput");
const table = document.getElementById("studentTable");

// البحث عند الضغط على Enter
searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        searchStudent();
    }
});

function searchStudent() {

    const value = searchInput.value.trim().toLowerCase();

    if (value === "") {
        table.innerHTML = `
        <tr>
            <td colspan="5">الرجاء إدخال اسم الطالب</td>
        </tr>`;
        return;
    }

    const result = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );

    if (result.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="5">لا يوجد طالب بهذا الاسم</td>
        </tr>`;

        return;
    }

    let rows = "";

    result.forEach(student => {

        rows += `
        <tr>
            <td>${student.name}</td>
            <td>${student.grade}</td>
           
            <td>${student.phone}</td>
            <td>${student.status}</td>
        </tr>`;

    });

    table.innerHTML = rows;

}