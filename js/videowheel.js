document.querySelector('.video-wheel').addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        event.currentTarget.scrollLeft += 100;
    } else {
        event.currentTarget.scrollLeft -= 100;
    }
});