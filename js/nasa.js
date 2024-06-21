const nasaAPI = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=SAxJ4hiPTsWdLwsX2lN0FsRfNTvtwCFOfWzMF2Lp';

fetch(nasaAPI)
    .then(response => response.json())
    .then(data => {

        console.log(data);

    })