import { blogArray } from "./data.js";

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear()

// Function to generate the HTML for the blog posts
function getBlogPostHtml () {
    return blogArray.map((data) => {
        const { id, image, date, title, content } = data
        return`
            <a href="blog.html?id=${id}"> 
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


// Function to render the blog posts in the blog section
function render () {
    const blogSection = document.getElementById('blog-section')

    if(blogSection) {
        blogSection.innerHTML = getBlogPostHtml()

        blogSection.addEventListener('click', (event) => {
            let blogElement = event.target;
            // Traverse up the DOM to find the closest blog element
            while (blogElement && !blogElement.classList.contains("blog")) {
                blogElement = blogElement.parentNode;
            }
            if (blogElement) {
                const postId = Number(blogElement.getAttribute("data-id"));
                showFullBlogPost(postId);
            }  
        })

    } else {
        console.log('No element with ID "blog-section" found!')
    }
    
    
}

// Function to display the full content of a blog post in a modal
function showFullBlogPost (id) {

    const post = blogArray.find(data => data.id === id)
    const modal = document.getElementById('modal')
    

    if(post) {
        const modalTitle = document.getElementById('modal-title')
        const modalDate = document.getElementById('modal-date')
        const modalBody = document.getElementById('modal-body')

        modalTitle.textContent = post.title
        modalDate.textContent = post.date

        modalBody.innerHTML = post.fullBlogPost.map(entry => {     
            const { title, paragraph } = entry
            return `
                <h3>${title}</h3>
                <p>${paragraph}</p>
            `
        }).join('')        
    } else {
        console.log("Post not found!")
    }
}

render()