async function loadData() {
    const response = await fetch("./assets/data.json");
    const data = await response.json();
    const { skills, projects } = data;

    const skillsContainer = document.getElementById("skills-container");
    const carouselTrack = document.getElementById("project-track");

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
        }, index * 200); // délai de 200ms entre chaque compétence
    });

    // Afficher les projets dans le carrousel
    projects.forEach((project) => {
        const div = document.createElement("div");
        div.classList.add("carousel-item");

        const img = document.createElement("img");
        img.src = project.images;
        img.alt = project.title;

        const h3 = document.createElement("h3");
        h3.innerText = project.title;

        const a = document.createElement("a");
        a.href = project.github;
        a.innerText = "Voir le repo GitHub";

        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(a);

        carouselTrack.appendChild(div);
    });

    // Initialisation du carrousel
    const carouselItems = document.querySelectorAll(".carousel-item");
    let currentIndex = 0;

    document.querySelector(".next").addEventListener("click", () => {
        if (currentIndex < carouselItems.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    document.querySelector(".prev").addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = carouselItems.length - 1;
        }
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}

loadData();
