// Episode.js

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const animeName = params.get('anime');

    if (animeName) {
        fetchEpisodes(animeName);
    } else {
        console.error('Anime name not provided.');
    }
});

function fetchEpisodes(animeName) {
    fetch(`/api/anime/${animeName}`)
        .then(response => response.json())
        .then(data => {
            console.log('Anime API Response:', data);

            const episodeContainer = document.getElementById('episode-container');
            episodeContainer.innerHTML = '';

            const animeTitle = document.createElement('h2');
            animeTitle.textContent = data.results.name;
            episodeContainer.appendChild(animeTitle);

            const animeImage = document.createElement('img');
            animeImage.src = data.results.image;
            animeImage.alt = data.results.name;
            animeImage.classList.add('anime-image');
            episodeContainer.appendChild(animeImage);

            const episodesList = document.createElement('ul');
            data.results.episodes.forEach(episode => {
                const episodeItem = document.createElement('li');
                const episodeLink = document.createElement('a');
                episodeLink.textContent = `Episode ${episode[0]}`;
                episodeLink.href = `/embedded/embedded_video.html?title=${encodeURIComponent(data.results.name)}&episode=${encodeURIComponent(episode[1])}`; // Pass episode title instead of anime name
                episodeItem.appendChild(episodeLink);
                episodesList.appendChild(episodeItem);
            });
            episodeContainer.appendChild(episodesList);
        })
        .catch(error => console.error('Error fetching episodes:', error));
}
