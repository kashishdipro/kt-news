const displayNewsDetails = newsdetails =>{
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsdetails.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col-12')
        newsDiv.innerHTML = `
            <div class="card mb-3">
                <div class="row g-1">
                    <div class="col-md-4 p-3">
                        <img src="${news.thumbnail_url}" class="img-fluid h-100 rounded p-3" alt="...">
                    </div>
                    <div class="col-md-8 p-3">
                        <div class="row row-cols-md-10 g-4">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text text-muted">${news.details.slice(0, 400)}...</p>
                            </div>
                        </div>
                        <div class="row row-cols-md-2 justify-content-start align-items-center" style="max-width: 750px;">
                            <div class="col-md-4">
                                <div class="d-flex justify-content-around align-items-center">
                                    <div>
                                        <img src="${news.author.img}" class="rounded-circle" width="50" height="50">
                                    </div>
                                    <div class="p-2">
                                        <p>${news.author.name}</p>
                                        <p class="text-muted">${news.author.published_date}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <i class="fa-regular fa-eye"></i>
                                    <h6 class="pt-1 px-1">${news.total_view}</h6>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="d-flex justify-content-center align-items-center">
                                    <h6>Rating: ${news.rating.number}</h6>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="d-flex justify-content-center align-items-center">
                                    <button class="btn btn-primary rounded-circle">
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        `; 
        newsContainer.appendChild(newsDiv);
    });
}

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
        <li onclick="loadNewsDetails('${news_category.category_id}')" class="nav-item"><a href="#" class="nav-link link-dark px-2">${news_category.category_name}</a></li>
        `;
        categoriesContainer.appendChild(categoryUl);
    });
} 

const loadNewsDetails = async category_id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}
loadNewsDetails();
loadCategories();
