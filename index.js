import { blogArray } from "./data.js";

// Set the current year in the footer
document.getElementById('year').textContent = new Date().getFullYear()

// Function to generate the HTML for the blog posts
function getBlogPostHtml () {
    return blogArray.map((data) => {
        const { id, image, date, title, content } = data
        return`
            <div class="blog" key="${id}">
                <img src="/images/${image}" alt="${title}" />
                <p>${date}</p>
                <h2>${title}</h2>
                <p>${content}</p>
            </div>`
    }).join('')
}

// Function to render the blog posts in the blog section
function render () {
    const blogSection = document.getElementById('blog-section')

    if(blogSection) {
        blogSection.innerHTML = getBlogPostHtml()
    } else {
        console.log('No element with ID "blog-section" found!')
    }
    
    
}

render()