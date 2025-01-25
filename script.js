document.addEventListener("DOMContentLoaded", () => {
    const songButtons = document.querySelectorAll(".song-button");
    const videoPlayer = document.getElementById("video-player");
    const songRequestForm = document.getElementById("song-request-form");

    // Play the selected song video
    songButtons.forEach(button => {
        button.addEventListener("click", () => {
            const videoSource = button.getAttribute("data-video");
            videoPlayer.src = videoSource;
            videoPlayer.play();
        });
    });

    // Handle song request form submission
    songRequestForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const requestInput = document.getElementById("song-request");
        const requestedSong = requestInput.value.trim();

        if (requestedSong) {
            alert(`Thank you for requesting: ${requestedSong}! We'll add it soon.`);
            requestInput.value = ""; // Clear the input field
        } else {
            alert("Please enter a valid song request.");
        }
    });
});

