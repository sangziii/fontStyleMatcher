var btn = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');

btn.addEventListener('click', function(e){
    var testDiv = document.querySelector('.test');
    testDiv.style.height = "400px";
});

btn2.addEventListener('click', function(){
    var testDiv = document.querySelector('.test');
    testDiv.style.backgroundColor = "gray";
});