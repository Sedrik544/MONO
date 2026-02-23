// Simulace měnících se čísel, aby web "žil"
const energyVal = document.getElementById('energy-val');

setInterval(() => {
    let current = parseInt(energyVal.innerText);
    // Náhodné kolísání mezi 94 a 99
    let change = Math.random() > 0.5 ? 1 : -1;
    let next = current + change;
    
    if (next > 99) next = 99;
    if (next < 94) next = 94;
    
    energyVal.innerText = next;
}, 3000);

// Haptická odezva při kliknutí (jen pro mobily)
document.querySelectorAll('button, .module').forEach(el => {
    el.addEventListener('click', () => {
        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    });
});
