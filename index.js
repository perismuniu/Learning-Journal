import { blogArray } from "./data.js";

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();

// Function to generate the HTML for the blog posts
function getBlogPostHtml() {
    return blogArray.map((data) => {
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
    }).join('')
}

// Function to render the blog posts list on index.html
function renderBlogList() {
    const blogSection = document.getElementById('blog-section')
    if (blogSection) {
        blogSection.innerHTML = getBlogPostHtml();
    } else {
        console.log('No element with ID "blog-section" found!')
    }
}

// Function to generate HTML for recent posts without duplicates
function renderRecentPosts() {
    console.log(blogArray, 'Current blog array data')
    const recentPostsContainer = document.getElementById('recent-posts-container')
    if (!recentPostsContainer) {
        console.log('No element with ID "recent-posts-container" found!')
        return
    }

    console.log('Rendering recent posts...');
    console.log(blogArray) // Log the content of blogArray

    const displayedIds = blogArray.slice(0, 3).map(post => post.id); 
    const recentPosts = blogArray
        .filter(post => !displayedIds.includes(post.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)

    console.log(recentPosts) // Log recentPosts to see if it has data

    recentPostsContainer.innerHTML = recentPosts.map((data) => {
        const { id, image, date, title, content } = data
        return `
            <a href="blog.html?id=${id}" class="blog-link" data-id="${id}">
                <div class="recent-blog" data-id="${id}">
                    <img class="recent-img"src="/images/${image}" alt="${title}" />
                    <p class="recent-date">${date}</p>
                    <h2 class="recent-title">${title}</h2>
                    <p class="recent-content">${content}</p>
                </div>
            </a>
        `;
    }).join('')
}



// Function to display the full blog post on blog.html
function displayFullBlogPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = Number(urlParams.get('id'))

    // Find the post by ID
    const blogPost = blogArray.find(post => post.id === postId);
    const fullBlogContainer = document.getElementById('full-blog-post-container')

    if (blogPost && fullBlogContainer) {
        const { image, date, title, fullBlogPost } = blogPost
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
        fullBlogContainer.innerHTML = postContent;
    } else if (fullBlogContainer) {
        fullBlogContainer.innerHTML = "<p>Blog post not found!</p>"
    }
}

// Determine the page and render content accordingly
if (document.getElementById('blog-section')) {
    // We're on index.html
    renderBlogList()
    
} else if (document.getElementById('full-blog-post-container')) {
    // We're on blog.html
    displayFullBlogPost()
    renderRecentPosts()
}