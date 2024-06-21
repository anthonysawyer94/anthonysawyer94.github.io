const api = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=SAxJ4hiPTsWdLwsX2lN0FsRfNTvtwCFOfWzMF2Lp';

fetch(api)
    .then(response => response.json())
    .then(data => {

        console.log(data);
        const length = data.photos.length;
        const marsPix = [];
        
        for (i = 0; i < 4; i ++) {
            marsPix.push(data.photos[i].img_src);
        }
        console.log('This is the pix:', marsPix);

        const element = document.getElementById('nasa');
        element.src = data.photos[8].img_src;

        
    })