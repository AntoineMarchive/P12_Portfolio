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
    // Initialisation des variables
const carouselItems = document.querySelectorAll(".carousel-item");
const indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;

function updateCarousel(index) {
  carouselTrack.style.transform = `translateX(-${index * 100}%)`;
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });
}

document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel(currentIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
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
