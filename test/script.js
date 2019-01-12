const bmarks = document.querySelectorAll('.bookmark');
for(let i = 0; i < bmarks.length; i++) {
    const bmark = bmarks[i];
    bmark.addEventListener('click', function (event) {
       console.log(event.target);
    });
}