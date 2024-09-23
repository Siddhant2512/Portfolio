async function loadBlogPosts() {
    try {
        const response = await fetch('json/blogposts.json');
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error loading blog posts:', error);
        return [];
    }
}

function displayBlogFlashcards(posts, containerSelector = '.blog-flashcards', isMainPage = false) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error('Blog flashcards container not found');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    posts.forEach((post) => {
        const flashcard = document.createElement('a');
        flashcard.href = isMainPage ? `blogs.html#${post.id}` : `#${post.id}`; // Link to specific blog post
        flashcard.className = 'blog-flashcard';
        flashcard.innerHTML = `
            <div class="blog-flashcard-content">
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
            </div>
        `;
        container.appendChild(flashcard);
    });
}

function displayFullBlogPosts(posts) {
    const container = document.getElementById('blog-posts');
    if (!container) {
        console.error('Blog posts container not found');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    posts.forEach((post) => {
        const article = document.createElement('article');
        article.id = post.id;
        article.className = 'blog-post';
        article.innerHTML = `
            <h2>${post.title}</h2>
            <div class="blog-post-meta">${post.date}</div>
            <div class="blog-post-content">
                ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        `;
        container.appendChild(article);
    });

    // Check if there's a hash in the URL and scroll to the corresponding post
    scrollToHashPost();
}

function scrollToHashPost() {
    if (window.location.hash) {
        const targetPost = document.querySelector(window.location.hash);
        if (targetPost) {
            setTimeout(() => {
                targetPost.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

// Add event listener for hash changes
window.addEventListener('hashchange', scrollToHashPost);

// Export functions if using ES6 modules
export { loadBlogPosts, displayBlogFlashcards, displayFullBlogPosts };