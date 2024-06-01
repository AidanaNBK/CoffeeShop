console.log('Works with');
let videoElement = document.getElementById('background-video');
videoElement.style.borderRadius = '40px';
videoElement.style.objectFit = 'cover';

let slidePosition = 1;
let leftSlideButton = document.getElementById('coffee-slider-left');
let rightSlideButton = document.getElementById('coffee-slider-right');
leftSlideButton.addEventListener('click', (e) => {
    if (slidePosition === 1){
        return
    }
    console.log("left click: ", slidePosition);
    document.getElementById(`slider-${slidePosition}`).style.visibility = 'hidden';
    document.getElementById(`slider-${slidePosition}`).style.display = 'none';
    slidePosition--;
    document.getElementById(`slider-${slidePosition}`).style.visibility = 'visible';
    document.getElementById(`slider-${slidePosition}`).style.display = 'block';
});
rightSlideButton.addEventListener('click', (e) => {
    if (slidePosition === 3){
        return
    }
    console.log("right click: ", slidePosition);
    document.getElementById(`slider-${slidePosition}`).style.visibility = 'hidden';
    document.getElementById(`slider-${slidePosition}`).style.display = 'none';
    slidePosition++;
    document.getElementById(`slider-${slidePosition}`).style.visibility = 'visible';
    document.getElementById(`slider-${slidePosition}`).style.display = 'block';
});