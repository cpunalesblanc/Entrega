const myInput = document.getElementById("canti");
function stepper(btn){
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = myInput.getAttribute("value");
    let calculoStep= (id == "mas") ? (step*1): (step * -1)
    let nuevoValue = parseInt(val) + calculoStep;

    if(nuevoValue >= min && nuevoValue <= max){
        myInput.setAttribute("value", nuevoValue);

    }
}