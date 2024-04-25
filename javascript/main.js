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
const btnList = document.getElementById('btn-list');
const containerList = document.getElementById('container-list');
const divChannelList = document.getElementById('channel-list');
const resultOptions = document.getElementById('result-options');
const btnMenu = document.getElementById('btn-menu');
const divMenu = document.getElementById('container-menu');
const exit = document.getElementById('exit');
const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');
const ok = document.getElementById('ok');
const info = document.getElementById('info');
channelData.style.display = 'none';
divChannelList.style.display = 'none';
imagenTv.style.display = 'none';
divMenu.style.display = 'none';
info.style.display = 'none';

let is_platform = false;
let is_on = false;
let currentChannel = 1;
let lastChannel = 1;
let volumen = 10;
let is_mute = false;
let is_list_channel = false;
let auxChannel = null;
let lastAuxChannel = null;
let opc = 1;
let is_menu = false;
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
            info.style.display = 'block';
        }, 1000);
    } else {
        imagenTv.style.display = 'none';
        info.style.display = 'none';
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
        info.style.display = 'none';
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
        info.style.display = 'none';
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
        info.style.display = 'none';
        imagenTv.src = this.getImagenChannel('i-start-plus');
        setTimeout(() => {
            imagenTv.src = this.getImagenChannel('start-plus-full');
        }, 2000);
    }
});

exit.addEventListener("click", () => {
    this.activarIndicador()
    divChannelList.style.display = 'none';
    containerList.innerHTML = '';
    auxChannel = null;
    lastAuxChannel = null;
    divMenu.style.display = 'none';
    document.getElementById('opc' + opc).style.border = "";
    is_menu = false;
    is_list_channel = false;
    opc = 1;
    if (is_on && is_platform) {
        is_platform = false;
        imagenTv.src = this.getImagenChannel(currentChannel);
    }
    info.style.display = 'block';
});

btnList.addEventListener("click", () => {
    if (is_on) {
        for (item of listChannel) {
            containerList.innerHTML += `
                <div class="list-item" id="channel${item.channel}">
                    <span class="item-channel">${item.channel}</span>
                    <div class="item-data">
                        <h4>${item.name}</h4>
                        <p>${item.program}</p>
                    </div>
                </div>`;
        }
        divChannelList.style.display = 'flex';
        is_list_channel = true;
        document.getElementById('channel' + currentChannel).style.border = "2px solid #003366";
        document.getElementById('channel' + currentChannel).scrollIntoView();
    }
});

up.addEventListener("click", () => {
    if (is_list_channel && ((auxChannel == null && currentChannel > 1) || (auxChannel != null && auxChannel > 1))) {
        lastAuxChannel = (auxChannel === null) ? currentChannel : auxChannel;
        auxChannel = (auxChannel === null) ? currentChannel - 1 : auxChannel - 1;
        if (lastAuxChannel != null) {
            document.getElementById('channel' + lastAuxChannel).style.border = "";
        }
        document.getElementById('channel' + auxChannel).style.border = "3px solid #003366";
        document.getElementById('channel' + auxChannel).scrollIntoView();
    }
    if (opc > 1) {
        document.getElementById('opc' + opc).style.border = "";
        opc--;
        this.showResultOption(opc)
        document.getElementById('opc' + opc).style.border = "3px solid #00bfff";
    }
});

down.addEventListener("click", () => {
    if (is_list_channel && auxChannel < listChannel.length) {
        lastAuxChannel = (auxChannel === null) ? currentChannel : auxChannel;
        auxChannel = (auxChannel === null) ? currentChannel + 1 : auxChannel + 1;
        if (lastAuxChannel != null || (currentChannel)) {
            document.getElementById('channel' + lastAuxChannel).style.border = "";
        }
        document.getElementById('channel' + auxChannel).style.border = "2px solid #003366";
        document.getElementById('channel' + auxChannel).scrollIntoView();
    }
    if (opc < 6) {
        document.getElementById('opc' + opc).style.border = "";
        opc++;
        this.showResultOption(opc)
        document.getElementById('opc' + opc).style.border = "3px solid #00bfff";
    }
});

ok.addEventListener("click", () => {
    if (is_on && is_list_channel) {
        changeChannel(auxChannel);
        divChannelList.style.display = 'none';
        containerList.innerHTML = '';
        auxChannel = null;
        lastAuxChannel = null;
    }
});

btnMenu.addEventListener("click", () => {
    this.activarIndicador();
    if (is_on && !is_platform && !is_list_channel) {
        is_menu = true;
        this.showResultOption(opc)
        divMenu.style.display = 'flex';
        document.getElementById('opc' + opc).style.border = "3px solid #00bfff";
    }
});

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

function showResultOption(opc) {
    switch (opc) {
        case 1:
            resultOptions.innerHTML = `<span>Imagen</span>
            <ul>
                <li><p>Modo de imagen</p><p>Natural</p></li>
                <li><p>Luz de fondo</p> <p>12</p></li>
                <li><p>Contraste</p><p>60</p></li>
                <li><p>Brillo</p><p>55</p></li>
                <li><p>Color</p><p>45</p></li>
            </ul>`
            break
        case 2:
            resultOptions.innerHTML = `<span>Sonido</span>
            <ul>
                <li><p>Sonido Modo</p><p>Música</p></li>
                <li><p>Efecto de sonido</p></li>
                <li><p>Ajustes del altavoz</p></li>
                <li><p>Configur. adicionales</p></li>
                <li><p>Reinic. de son.</p></li>
            </ul>`
            break
        case 3:
            resultOptions.innerHTML = `<span>Emisión</span>
            <ul>
                <li><p>Ajustes automático</p><p>Aire</p></li>
                <li><p>Guia</p></li>
                <li><p>Admin. de programa</p></li>
                <li><p>Editar canal</p></li>
                <li><p>Editar favoritos</p></li>
            </ul>`
            break
        case 4:
            resultOptions.innerHTML = `<span>Red</span>
            <ul>
                <li><p>Estado de red</p><p>Aire</p></li>
                <li><p>Configuración de red</p></li>
                <li><p>Wi-Fi directa</p></li>
                <li><p>Configuración del dispositivo multimedia</p></li>
                <li><p>Nombre dispos.</p><p>[TV]Samsung L....</p></li>
            </ul>`
            break
        case 5:
            resultOptions.innerHTML = `<span>Sistema</span>
            <ul>
                <li><p>Accesibilidad</p></li>
                <li><p>Configuración</p></li>
                <li><p>Idioma del menú</p><p>Español</p></li>
                <li><p>Admin. de disp.</p></li>
                <li><p>Tiempo</p></li>
            </ul>`
            break
        case 6:
            resultOptions.innerHTML = `<span>Soporte técnico</span>
            <ul>
                <li><p>Administración remota</p><p>Apagado</p></li>
                <li><p>e-Manual</p></li>
                <li><p>Autodiagnóstico</p></li>
                <li><p>Actualización de software</p></li>
                <li><p>Modo de uso</p><p>Uso domiciliario</p></li>
            </ul>`
            break
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

function actualizarTime() {
    let elementoFechaHora = document.getElementById('time');
    let fechaHora = new Date();
    let fecha = fechaHora.toLocaleDateString();
    let hora = fechaHora.toLocaleTimeString();
    elementoFechaHora.textContent = fecha + ' - ' + hora;
}

setInterval(actualizarTime, 1000);
actualizarTime();
