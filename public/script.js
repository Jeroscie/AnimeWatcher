let currentPage = 1;
const animeLimit = 10 ; // Set the limit to 9 anime per page
let currentSlide = 0;
const totalSlides = 5; // Assuming there are 5 recent anime items

document.addEventListener("DOMContentLoaded", function() {
    fetchAnime(currentPage);
    fetchRecentAnime();
});

function fetchAnime(pageNumber) {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loader

    const animeContainer = document.getElementById('anime-container');
    animeContainer.innerHTML = ''; // Clear previous anime items

    fetch(`/api/popular/${pageNumber}`)
        .then(response => response.json())
        .then(data => {
            let animeCount = 0; // Initialize a counter for the number of anime items added
            data.results.forEach(anime => {
                if (animeCount < animeLimit) { // Check if the limit has been reached
                    const animeItem = document.createElement('div');
                    animeItem.classList.add('anime-item');

                    const title = document.createElement('p');
                    title.textContent = anime.title;

                    const image = document.createElement('img');
                    image.src = anime.image;
                    image.alt = anime.title;
                    image.classList.add('anime-image');

                    const link = document.createElement('a');
                    link.href = '#'; // Set href to '#' temporarily
                    link.addEventListener('click', function() {
                        viewEpisodes(anime.title); // Call function to view episodes
                    });

                    link.appendChild(image);

                    animeItem.appendChild(link);
                    animeItem.appendChild(title);
                    animeContainer.appendChild(animeItem);

                    animeCount++; // Increment the counter
                } else {
                    return; // Exit the loop if the limit has been reached
                }
            });

            loader.style.display = 'none'; // Hide loader after fetching and rendering data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loader.style.display = 'none'; // Hide loader in case of error
        });

    const animeTitles = document.querySelectorAll('.anime-title');
    animeTitles.forEach(title => {
        title.style.color = '#fff'; // Change color to white
    });
}

function fetchRecentAnime() {
    fetch("api/recent/1")
        .then(response => response.json())
        .then(data => {
            const slideContainer = document.getElementById('slide');
            slideContainer.innerHTML = ''; // Clear previous slides

            data.results.forEach(anime => {
                const slideItem = document.createElement('div');
                slideItem.classList.add('slide-item');

                const image = document.createElement('img');
                image.src = anime.image;
                image.alt = anime.title;

                const title = document.createElement('p');
                title.textContent = anime.title;

                slideItem.appendChild(image);
                slideItem.appendChild(title);

                slideContainer.appendChild(slideItem);
            });
        })
        .catch(error => console.error('Error fetching recent anime:', error));
}


function showSlide(slideIndex) {
    const slideContainer = document.getElementById('slide');
    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function nextPage() {
    currentPage++;
    fetchAnime(currentPage);
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchAnime(currentPage);
    }
}

function viewEpisodes(animeName) {
    // Encode anime name to handle special characters
    const encodedAnimeName = encodeURIComponent(animeName);
    window.location.href = `episode/episode.html?anime=${encodedAnimeName}`; // Redirect to episode page
}
