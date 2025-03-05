// JavaScript for handling comments with Local Storage
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    // Check if Local Storage already has comments
    let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    loadComments(); // Load comments on page load

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input
        const name = document.getElementById("name").value.trim();
        const comment = document.getElementById("comment").value.trim();

        // Check if fields are empty
        if (name === "" || comment === "") {
            alert("Please enter both your name and a comment.");
            return;
        }

        // Save comment to Local Storage
        savedComments.push({ name, text: comment });
        localStorage.setItem("comments", JSON.stringify(savedComments));

        // Reload the comment list
        loadComments();

        // Clear form fields
        document.getElementById("name").value = "";
        document.getElementById("comment").value = "";
    });

    // Function to load comments from Local Storage
    function loadComments() {
        commentList.innerHTML = ""; // Clear the comment list
        savedComments = JSON.parse(localStorage.getItem("comments")) || []; // Re-load the latest saved comments

        // If there are no comments, show a message
        if (savedComments.length === 0) {
            commentList.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
        } else {
            savedComments.forEach((comment, index) => {
                addCommentToList(comment.name, comment.text, index);
            });
        }
    }

    // Function to add comment to the list with delete button
    function addCommentToList(name, comment, index) {
        const newComment = document.createElement("li");
        newComment.innerHTML = `<strong>${name}:</strong> ${comment} 
            <button class="delete-btn" data-index="${index}">Delete</button>`;

        commentList.appendChild(newComment);
    }

    // Event Listener for Deleting Comments
    commentList.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");

            // Show confirmation message
            const confirmDelete = confirm("Are you sure you want to delete this comment?");
            if (confirmDelete) {
                savedComments.splice(index, 1); // Remove from array
                localStorage.setItem("comments", JSON.stringify(savedComments)); // Update Local Storage
                loadComments(); // Reload comments
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("comment");
    const wordCountDisplay = document.getElementById("wordCount");

    commentInput.addEventListener("input", function () {
        let words = commentInput.value.trim().split(/\s+/).filter(word => word.length > 0);
        wordCountDisplay.textContent = "Word count: " + words.length;
    });
});

