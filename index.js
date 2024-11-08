import { blogArray } from "./data.js";

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear()


// Function to generate the HTML for the blog posts
function getBlogPostHtml () {
    return blogArray.map((data) => {
        const { id, image, date, title, content } = data
        return`
            <a href="blog.html?id=${id}" class="blog-link" data-id="${id}">
                <div class="blog" data-id="${id}">
                    <img src="/images/${image}" alt="${title}" />
                    <p>${date}</p>
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
            </a>
            `
    }).join('')
}

// Function to render the blog posts list on index.html
function renderBlogList() {
    const blogSection = document.getElementById('blog-section');

    if (blogSection) {
        blogSection.innerHTML = getBlogPostHtml();
    } else {
        console.log('No element with ID "blog-section" found!');
    }
}

// Function to get random blogs HTML for recent posts
function getRandomBlogsHtml() {
    // Randomly shuffle blogArray and select the first 3 posts
    const randomBlogs = blogArray
        .sort(() => 0.5 - Math.random()) // Random shuffle
        .slice(0, 3); // Pick top 3 blogs

    return randomBlogs.map((data) => {
        const { id, image, date, title, content } = data;
        return `
            <a href="blog.html?id=${id}" class="blog-link" data-id="${id}">
                <div class="blog" data-id="${id}">
                    <img src="/images/${image}" alt="${title}" />
                    <p>${date}</p>
                    <h2>${title}</h2>
                    <p>${content}</p>
                </div>
            </a>
        `;
    }).join('');
}

// Function to display the full blog post on blog.html
function displayFullBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get('id'));

    // Find the post by ID
    const blogPost = blogArray.find(post => post.id === postId);

    if (blogPost) {
        const { image, date, title, fullBlogPost } = blogPost;

        const postContent = `
            <section class="blog-post">
                <p class="blog-post-date">${date}</p>
                <h2 class="blog-post-title">${title}</h2>
                ${fullBlogPost.map(post => `
                    <h3 class="blog-section-title">${post.title}</h3>
                    <p class="blog-section-paragraph">${post.paragraph}</p>
                `).join('')}
            </section>
        `;

        document.getElementById('full-blog-post-container').innerHTML = postContent;
    } else {
        document.getElementById('full-blog-post-container').innerHTML = "<p>Blog post not found!</p>";
    }
}

// Determine the page and render content accordingly
if (document.getElementById('blog-section')) {
    // We're on index.html
    renderBlogList();
    renderRecentPosts();
} else if (document.getElementById('full-blog-post-container')) {
    // We're on blog.html
    displayFullBlogPost();
}