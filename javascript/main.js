const power = document.getElementById("power");
const indicador = document.getElementById("indicador-led");
const imagenTv = document.getElementById('imagen-tv');
const increaseChannel = document.getElementById('increase');
const decreaseChannel = document.getElementById('decrease');
const subirVol = document.getElementById('subir-vol');
const bajarVol = document.getElementById('bajar-vol');
const numberChannel = document.getElementById('number-channel');
const nameChannel = document.getElementById('name-channel');
const programChannel = document.getElementById('program-channel');
const channelData = document.getElementById('channel-data');
const numberVolumen = document.getElementById('number-vol');
const mute = document.getElementById('mute');
const netflix = document.getElementById('netflix');
const youtube = document.getElementById('youtube');
const startPlus = document.getElementById('start-plus');
const channelList = document.getElementById('channel-list');
const exit = document.getElementById('exit');
channelData.style.display = 'none';
imagenTv.style.display = 'none';

let is_platform = false;
let is_on = false;
let currentChannel = 1;
let lastChannel = 1;
let volumen = 10;
let is_mute = false;

const listChannel = [
    {
        name: 'CARACOL',
        program: 'DESAFÍO SUPER REGIONES',
        channel: 1,
        img: './images/caracol2.jpg'
    },
    {
        name: 'STAR CHANNEL',
        program: 'LOS SIMPSONS',
        channel: 2,
        img: './images/start-channel.jpeg'
    },
    {
        name: 'RCN',
        program: 'NOTICIAS RCN',
        channel: 3,
        img: './images/rcn.jpg'
    },
    {
        name: 'ESPN',
        program: 'COLOMBIA VS BRASIL',
        channel: 4,
        img: './images/colombia.jpg'
    },
    {
        name: 'UNIVERSAL',
        program: 'EL ESCUADRÓN SUICIDA II',
        channel: 5,
        img: './images/squad.jpeg'
    },
    {
        name: 'GOLDEN',
        program: 'HOMBRES DE NEGRO',
        channel: 6,
        img: './images/golden.jpg'
    },
    {
        name: 'SPACE',
        program: 'LOS JUEGOS DEL HAMBRE',
        channel: 7,
        img: './images/juegos.jpg'
    },
    {
        name: 'TNT',
        program: 'SPIRIT: EL CORCEL INDOMABLE',
        channel: 8,
        img: './images/spirit.jpg'
    },
    {
        name: 'TLNOVELAS',
        program: 'DESTILANDO AMOR',
        channel: 9,
        img: './images/telenovelas.jpg'
    }
];

power.addEventListener("click", () => {
    is_on = !is_on;
    this.activarIndicador();
    if (is_on) {
        imagenTv.src = this.getImagenChannel('inicio');
        imagenTv.style.display = 'block';
        let infoChannel = this.getInfoChannel(currentChannel);
        setTimeout(() => {
            imagenTv.src = infoChannel.img;
        }, 1000);
    } else {
        imagenTv.style.display = 'none';
    }
});

increaseChannel.addEventListener("click", () => {
    if (is_on && !is_platform && currentChannel < 15) {
        this.changeChannel(currentChannel + 1)
    }
})

decreaseChannel.addEventListener("click", () => {
    if (is_on && !is_platform && currentChannel > 0) {
        this.changeChannel(currentChannel - 1)
    }
})

subirVol.addEventListener("click", () => {
    if (is_on) {
        volumen = (volumen < 100) ? volumen + 1 : 100;
        numberVolumen.innerHTML = String(volumen) + ' <i class="bi bi-volume-up"></i>';
        numberVolumen.style.display = 'block';
        setTimeout(() => {
            numberVolumen.style.display = 'none';
        }, 2500);
    }
})

bajarVol.addEventListener("click", () => {
    if (is_on) {
        volumen = (volumen > 0) ? volumen - 1 : 0;
        numberVolumen.innerHTML = String(volumen) + ' <i class="bi bi-volume-up"></i>';
        numberVolumen.style.display = 'block';
        setTimeout(() => {
            numberVolumen.style.display = 'none';
        }, 2500);
    }
})

mute.addEventListener("click", () => {
    if (is_mute) {
        is_mute = false;
        numberVolumen.innerHTML = String(volumen) + ' <i class="bi bi-volume-up"></i>';
        numberVolumen.style.display = 'block';
        setTimeout(() => {
            numberVolumen.style.display = 'none';
        }, 2500);
    } else {
        is_mute = true;
        numberVolumen.innerHTML = '<i class="bi bi-volume-mute"></i>';
        numberVolumen.style.display = 'block';
    }
})

netflix.addEventListener("click", () => {
    this.activarIndicador();
    if (!is_platform && is_on) {
        is_platform = true;
        imagenTv.src = this.getImagenChannel('i-netflix');
        setTimeout(() => {
            imagenTv.src = this.getImagenChannel('netflix-full');
        }, 2000);
    }
});

youtube.addEventListener("click", () => {
    this.activarIndicador();
    if (!is_platform && is_on) {
        is_platform = true;
        imagenTv.src = this.getImagenChannel('i-youtube');
        setTimeout(() => {
            imagenTv.src = this.getImagenChannel('youtube-full');
        }, 2000);
    }
});

startPlus.addEventListener("click", () => {
    this.activarIndicador();
    if (!is_platform && is_on) {
        is_platform = true;
        imagenTv.src = this.getImagenChannel('i-start-plus');
        setTimeout(() => {
            imagenTv.src = this.getImagenChannel('start-plus-full');
        }, 2000);
    }
});

exit.addEventListener("click", () => {
    this.activarIndicador()
    if (is_on && is_platform) {
        is_platform = false;
        imagenTv.src = this.getImagenChannel(currentChannel);
    }
});

channelList.innerHTML = `<p>CHANNEL LIST</p>
<div class="list-container">`;
for (item of listChannel) {
    channelList.innerHTML += `
        <div class="list-item">
            <span class = "item-channel">${item.channel}</span>
            <div class="item-data">
                <h4>${item.name}</h4>
                <p>${item.program}</p>
            </div>
        </div>`;
}
channelList.innerHTML += `</div>`;

function changeChannel(channel, prev = false) {
    this.activarIndicador()
    if (is_on && !is_platform && channel != currentChannel) {
        channel = (prev) ? lastChannel : channel;
        const infoChannel = this.getInfoChannel(channel);
        imagenTv.src = infoChannel.img;
        nameChannel.textContent = infoChannel.name;
        programChannel.textContent = infoChannel.program;
        numberChannel.value = String(infoChannel.channel);
        lastChannel = currentChannel;
        currentChannel = channel;
        numberChannel.textContent = currentChannel;
        channelData.style.display = 'flex';
        setTimeout(() => {
            channelData.style.display = 'none';
        }, 5000);
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
        case 'i-netflix':
            return './images/intro-netflix.webp'
        case 'netflix-full':
            return './images/netflix-full.jpg'
        case 'i-youtube':
            return './images/intro-youtube.jpg'
        case 'youtube-full':
            return './images/youtube-full.jpg'
        case 'i-start-plus':
            return './images/star-plus-intro.png'
        case 'start-plus-full':
            return './images/start-plus-full.jpg'
        default:
            return './images/no-signal.jpg'
    }
}

function getInfoChannel(numeroCanal) {
    for (const canal of listChannel) {
        if (canal.channel === numeroCanal) {
            return canal;
        }
    }

    return {
        name: 'SIN INFO',
        program: '---------',
        channel: numeroCanal,
        img: './images/no-signal.jpg'
    };
}


