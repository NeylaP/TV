const power = document.getElementById("power");
const indicador = document.getElementById("indicador-led");
const imagenTv = document.getElementById('imagen-tv');
const increaseChannel = document.getElementById('increase');
const decreaseChannel = document.getElementById('decrease');
const subirVol = document.getElementById('subir-vol');
const bajarVol = document.getElementById('bajar-vol');
const numberChannel = document.getElementById('number-channel');
const numberVolumen = document.getElementById('number-vol');
numberChannel.textContent = 1;
numberChannel.style.display = 'none';
numberVolumen.style.display = 'none';
imagenTv.style.display = 'none';

let is_on = false;
let currentChannel = 1;
let lastChannel = 1;
let volumen = 10;
power.addEventListener("click", () => {
    is_on = !is_on;
    this.activarIndicador();
    if (is_on) {
        imagenTv.src = this.getImagenChannel('inicio');
        imagenTv.style.display = 'block';
        setTimeout(() => {
            imagenTv.src = this.getImagenChannel(currentChannel);
            numberChannel.style.display = 'block';
        }, 1000);
    } else {
        imagenTv.style.display = 'none';
        numberChannel.style.display = 'none';
    }
});

increaseChannel.addEventListener("click", () => {
    if (is_on && currentChannel < 15) {
        this.changeChannel(currentChannel + 1)
    }
})

decreaseChannel.addEventListener("click", () => {
    if (is_on && currentChannel > 0) {
        this.changeChannel(currentChannel - 1)
    }
})

subirVol.addEventListener("click", () =>{
    if (is_on) {
        volumen = (volumen < 100) ? volumen + 1 : 100;
        numberVolumen.innerHTML = String(volumen)+' <i class="bi bi-volume-up"></i>';
        numberVolumen.style.display = 'block';
        setTimeout(() => {
            numberVolumen.style.display = 'none';
        }, 2500);
    }
})

bajarVol.addEventListener("click", () =>{
    if (is_on) {
        volumen = (volumen > 0) ? volumen - 1 : 0;
        numberVolumen.innerHTML = String(volumen)+' <i class="bi bi-volume-up"></i>';
        numberVolumen.style.display = 'block';
        setTimeout(() => {
            numberVolumen.style.display = 'none';
        }, 2500);
    }
})

function changeChannel(channel, prev = false) {
    this.activarIndicador()
    if (is_on && channel != currentChannel) {
        channel = (prev) ? lastChannel : channel;
        imagenTv.src = this.getImagenChannel(channel);
        lastChannel = currentChannel;
        currentChannel = channel;
        numberChannel.textContent = currentChannel;
    }
}

function activarIndicador() {
    indicador.classList.add('c-indicador-led');
    setTimeout(() => {
        indicador.classList.remove('c-indicador-led');
    }, 1000);
}

function getImagenChannel(channel) {
    switch (channel) {
        case 'inicio':
            return './images/Samsung-Smart-TV-logo.jpg'
        case 1:
            return './images/caracol2.jpg'
        case 2:
            return './images/start-channel.jpeg'
        case 3:
            return './images/rcn.jpg'
        case 4:
            return './images/colombia.jpg'
        case 5:
            return './images/squad.jpeg'
        case 6:
            return './images/golden.jpg'
        case 7:
            return './images/juegos.jpg'
        case 8:
            return './images/spirit.jpg'
        case 9:
            return './images/telenovelas.jpg'
        default:
            return './images/no-signal.jpg'
    }
}