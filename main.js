const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

// عند الضغط على أي رابط
navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(item => item.classList.remove("active"));
        this.classList.add("active");
    });
});

// عند السكروول
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            navLinks.forEach(link => link.classList.remove("active"));

            const activeLink = document.querySelector(
                `.nav-link[href="#${entry.target.id}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => observer.observe(section));



// NAVBAR



// HERO



const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const target = +counter.dataset.target;

    let count = 0;

    const updateCounter = () => {

        const increment = target / 100;

        if (count < target) {

            count += increment;

            counter.innerText = Math.ceil(count) + (target >= 1000 ? "+" : "");

            setTimeout(updateCounter, 5);

        } else {

            counter.innerText = target + (target >= 1000 ? "+" : "");

        }

    };


    updateCounter();

});



// ABOUT