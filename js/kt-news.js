const loadCategories = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = news_categories => {
    console.log(news_categories);
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = `
    <ul class="navbar-nav">
        <li class="nav-item"><a href="/" class="nav-link link-dark px-2 active" aria-current="page">Home</a></li>
    </ul>
    `
    news_categories.forEach(news_category => {
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('navbar-nav');
        categoryUl.innerHTML = `
        <li class="nav-item"><a href="#" class="nav-link link-dark px-2">${news_category.category_name}</a></li>
        `;
        categoriesContainer.appendChild(categoryUl);
    });
}
loadCategories();
