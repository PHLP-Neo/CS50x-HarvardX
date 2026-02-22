let counter = 0;

function count() {
    counter += 1;
    document.querySelector("h1").innerHTML = counter;

    if (counter % 10 === 0) {
        alert(`Counter is now ${counter}`);
    }
}

document.addEventListener('DOMContentLoaded',function () {
    document.querySelector("button").onclick = count;
        //document.queryselector("Buttom").addEventListener('click',count);

    setInterval(count,1000);
});