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

function displayBlogFlashcards(posts) {
    const container = document.querySelector('.blog-flashcards');
    if (!container) return;

    container.innerHTML = posts.slice(0, 4).map(post => `
        <a href="blogs.html#${post.id}" class="blog-flashcard">
            <h3>${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
        </a>
    `).join('');
}

function displayFullBlogPosts(posts) {
    const container = document.querySelector('.blog-posts-container');
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <div id="${post.id}" class="blog-post">
            <h2>${post.title}</h2>
            <div class="blog-post-meta">Posted on ${post.date}</div>
            <div class="blog-post-content">
                ${post.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

// This function will be called on both index.html and blogs.html
document.addEventListener('DOMContentLoaded', async () => {
    const posts = await loadBlogPosts();
    
    // Check if we're on the index page or the blogs page
    if (document.querySelector('.blog-flashcards')) {
        displayBlogFlashcards(posts);
    } else if (document.querySelector('.blog-posts-container')) {
        displayFullBlogPosts(posts);
    }
});