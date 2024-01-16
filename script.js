// Most Popular Movie
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const getMovie = async (api)=>{
    const response = await fetch(api);
    const data = await response.json();
    // console.log(data);
    showMovie(data.results);
}

const showMovie = (data)=>{

    
    document.querySelector('main').innerHTML = "";
    data.forEach((el) => {
        
        const imagePath = el.poster_path === null ? "img/image-missing.png" : IMGPATH + el.poster_path;
        
        const div = document.createElement('div');
        div.classList.add('movieCard');
        div.innerHTML=`
        <!-- Card Starts Here -->
        <div class="posterBox">
                <img src="${IMGPATH + el.poster_path}" alt="${el.title} Movie Poster">
            </div>
            <div class="desBox">
                <div class="titleAndRatingBox">
                    <div class="title">${el.title}</div>
                    <div class="rating">${(el.vote_average).toFixed(1)}</div>
                </div>
                <div class="overviewBox">
                    <div class="overviewTitle">
                        Overview :
                    </div>
                    <div class="overviewContent">
                        ${el.overview}
                    </div>
                </div>
            </div>
            <!-- Card Ends Here -->
        `
        document.querySelector('main').appendChild(div);
    });

}

document.querySelector('#searchBar').addEventListener('keyup',(e)=>{
    console.log(e.target.value);
    if(e.target.value!=''){
        getMovie(SEARCHAPI+e.target.value);
        document.querySelector('.fa-times').addEventListener('click',()=>{
            document.querySelector('#searchBar').value=""
            getMovie(APIURL);
        })
    }
    else{
        getMovie(APIURL);
    }
    
})

document.querySelector('footer').innerHTML=`<p>&copy; sahil | ${new Date().getFullYear()}</p>`

// Init Call
getMovie(APIURL);