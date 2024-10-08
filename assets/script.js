async function loadData() {
    const response = await fetch("./assets/data.json");
    const data = await response.json();
    const { skills, projects } = data;

    const skillsContainer = document.getElementById("skills-container");
    const carouselTrack = document.getElementById("project-track");
    const carouselIndicators = document.querySelector(".carousel-indicators");

    // Afficher les compétences avec un léger délai
    skills.forEach((skill, index) => {
        setTimeout(() => {
            const article = document.createElement("article");
            const image = document.createElement("img");
            const h3 = document.createElement("h3");

            image.src = skill.logo;
            image.alt = skill.label;
            h3.innerText = skill.label;

            article.append(image, h3);
            skillsContainer.appendChild(article);
        }, index * 200);
    });

    // Afficher les projets dans le carrousel
    projects.forEach((project) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item");

        const img = document.createElement("img");
        img.src = project.images;
        img.alt = project.title;

        img.addEventListener("click", () => {
            window.open(project.github, "_blank");
        });

        const h3 = document.createElement("h3");
        h3.innerText = project.title;

        div.appendChild(img);
        div.appendChild(h3);

        carouselTrack.appendChild(div);
    });

    // Créer les indicateurs (bullet points)
    projects.forEach((_, index) => {
        const indicator = document.createElement("span");
        indicator.classList.add("indicator");
        if (index === 0) indicator.classList.add("active");
        carouselIndicators.appendChild(indicator);
    });

    // Initialisation du carrousel
    const carouselItems = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".indicator");
    let currentIndex = 0;

    function updateCarousel(index) {
        carouselTrack.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === index);
        });
    }

    // Changer les boutons en flèches
    document.querySelector(".arrow-next").addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel(currentIndex);
    });

    document.querySelector(".arrow-prev").addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel(currentIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });
}

loadData();
