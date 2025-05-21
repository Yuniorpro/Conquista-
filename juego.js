const juegoConfig = {
    selectors: {
        generalImagen: '#general-imagen',
        generalNombre: '#general-nombre',
        mineralesBar: '#minerales-bar',
        mineralesValor: '#minerales-valor',
        combustiblesBar: '#combustibles-bar',
        combustiblesValor: '#combustibles-valor',
        energiaBar: '#energia-bar',
        energiaValor: '#energia-valor',
        botonesContainer: '#botones',
        planetaImagen: '#planeta-imagen',
        planetaNombre: '#planeta-nombre',
        zonaEventos: '#zona-eventos'
    },
    recursos: { maxMinerales: 350, maxCombustibles: 350, maxEnergia: 50 },
    produccion: { mineralesPer10s: 5, combustiblesPer10s: 2 },
    estructuras: {
        'construir-refineria': { costoMinerales: 30, tiempoConstruccion: 35000 },
        'construir-hangar': { costoMinerales: 35, tiempoConstruccion: 35000 },
        'construir-laboratorio': { costoMinerales: 40, tiempoConstruccion: 45000 },
        'construir-ppm': {
            getCostoMinerales: (nivel) => Math.round(30 * Math.pow(1.6, nivel)),
            getTiempoConstruccion: (nivel) => Math.min(Math.round(35000 * Math.pow(1.7, nivel)), 86400000)
        },
        'mejorar-ppm': {
            getCostoMinerales: (nivel) => Math.round(30 * Math.pow(1.6, nivel)),
            getTiempoConstruccion: (nivel) => Math.min(Math.round(35000 * Math.pow(1.7, nivel)), 86400000)
        }
    },
    naves: [
        { nombre: 'Repertor', atk: 0, def: 5, imagen: '/Naves/Repertor.jpg', costoMinerales: 10, costoCombustibles: 5, tiempoFabricacion: 15000, esDron: true },
        { nombre: 'Venator', atk: 10, def: 10, imagen: '/Naves/Venator.jpg', costoMinerales: 20, costoCombustibles: 10, tiempoFabricacion: 25000, esDron: false },
        { nombre: 'Mula', atk: 0, def: 5, carga: 90, imagen: '/Naves/Mula.jpg', costoMinerales: 15, costoCombustibles: 8, tiempoFabricacion: 20000, esDron: false },
        { nombre: 'Praeceptor', atk: 20, def: 15, imagen: '/Naves/Praeceptor.jpg', costoMinerales: 30, costoCombustibles: 15, tiempoFabricacion: 35000, esDron: true },
        { nombre: 'Colonizator', atk: 5, def: 15, imagen: '/Naves/Colonizator.jpg', costoMinerales: 50, costoCombustibles: 25, tiempoFabricacion: 90000, esDron: false }
    ],
    investigaciones: {
        militar: [
            { 
                id: 'chips-avanzados', 
                nombre: 'Chips Avanzados', 
                descripcion: 'Permite crear naves Dron y desbloquea Línea Acelerada', 
                imagen: '/Laboratorio/Chipsavanzado.jpg', 
                costoMinerales: 60, 
                tiempoInvestigacion: 60000, 
                eliminaTrasCompletar: false,
                desbloquea: ['linea-acelerada']
            },
            { 
                id: 'linea-acelerada', 
                nombre: 'Línea Acelerada', 
                descripcion: 'Aumenta la velocidad de construcción de naves', 
                imagen: '/Laboratorio/Lineaacelerada.jpg', 
                getCostoMinerales: (nivel) => Math.round(80 * Math.pow(1.6, nivel)), 
                getTiempoInvestigacion: (nivel) => Math.round(120000 * Math.pow(1.5, nivel)), 
                maxNivel: 5
            },
            { 
                id: 'astrofisica-avanzada', 
                nombre: 'Astrofísica Avanzada', 
                descripcion: 'Desbloquea la investigación de Salto Espacial', 
                imagen: '/Laboratorio/AstrofisicaAvanzada.jpg', 
                costoMinerales: 100, 
                costoCombustibles: 40, 
                tiempoInvestigacion: 300000, 
                eliminaTrasCompletar: true,
                desbloquea: ['salto-espacial']
            },
            { 
                id: 'salto-espacial', 
                nombre: 'Salto Espacial', 
                descripcion: 'Activa la exploración espacial y desbloquea Salto Intergaláctico', 
                imagen: '/Laboratorio/Saltoespacial.jpg', 
                costoMinerales: 200, 
                costoCombustibles: 100, 
                tiempoInvestigacion: 600000, 
                eliminaTrasCompletar: true,
                desbloquea: ['salto-intergalactico']
            },
            { 
                id: 'salto-intergalactico', 
                nombre: 'Salto Intergaláctico', 
                descripcion: 'Permite explorar galaxias en el submenú de Exploración Espacial', 
                imagen: '/Laboratorio/Saltointergalactico.jpg', 
                costoMinerales: 300, 
                costoCombustibles: 150, 
                tiempoInvestigacion: 900000, 
                eliminaTrasCompletar: true
            }
        ],
        estructuras: [
            { nombre: 'Refinería Mejorada', descripcion: 'Aumenta producción de combustibles', imagen: '/Estructuras/Investigaciones/refineria_mejorada.jpg' },
            { nombre: 'Hangar Ampliado', descripcion: 'Reduce tiempo de fabricación de naves', imagen: '/Estructuras/Investigaciones/hangar_ampliado.jpg' }
        ],
        produccion: [
            { nombre: 'Minería Eficiente', descripcion: 'Aumenta producción de minerales', imagen: '/Estructuras/Investigaciones/mineria_eficiente.jpg' },
            { nombre: 'Energía Renovable', descripcion: 'Aumenta capacidad de energía', imagen: '/Estructuras/Investigaciones/energia_renovable.jpg' }
        ]
    },
    defaultImagen: 'https://via.placeholder.com/80'
};

const juegoState = {
    recursos: { minerales: 50, combustibles: 20, energia: 50 },
    estructuras: { 
        tieneRefineria: false, 
        tieneHangar: false, 
        tieneLaboratorio: false, 
        tienePPM: false, 
        nivelPPM: 0
    },
    investigaciones: {
        completadas: {},
        activas: [],
        cola: []
    },
    construccionesActivas: [],
    colaConstrucciones: [],
    produccionesNavesActivas: [],
    colaProduccionNaves: [],
    navesFabricadas: [],
    botonesActivos: { laboratorio: false, hangar: false, explorar: false },
    planetaAsignado: null
};

const elements = {
    generalImagen: null,
    generalNombre: null,
    mineralesBar: null,
    mineralesValor: null,
    combustiblesBar: null,
    combustiblesValor: null,
    energiaBar: null,
    energiaValor: null,
    botonesContainer: null,
    planetaImagen: null,
    planetaNombre: null,
    zonaEventos: null
};

// Función para convertir tiempos a formato legible
function convertirTiempo(ms) {
    const segundos = ms / 1000;
    if (segundos < 60) {
        return `${Math.round(segundos)}s`;
    } else if (segundos < 3600) {
        return `${(segundos / 60).toFixed(1)} min`;
    } else {
        return `${(segundos / 3600).toFixed(1)} h`;
    }
}

function inicializarElementosDOM() {
    console.log('Inicializando elementos del DOM...');
    const selectors = juegoConfig.selectors;
    elements.generalImagen = document.querySelector(selectors.generalImagen);
    elements.generalNombre = document.querySelector(selectors.generalNombre);
    elements.mineralesBar = document.querySelector(selectors.mineralesBar);
    elements.mineralesValor = document.querySelector(selectors.mineralesValor);
    elements.combustiblesBar = document.querySelector(selectors.combustiblesBar);
    elements.combustiblesValor = document.querySelector(selectors.combustiblesValor);
    elements.energiaBar = document.querySelector(selectors.energiaBar);
    elements.energiaValor = document.querySelector(selectors.energiaValor);
    elements.botonesContainer = document.querySelector(selectors.botonesContainer);
    elements.planetaImagen = document.querySelector(selectors.planetaImagen);
    elements.planetaNombre = document.querySelector(selectors.planetaNombre);
    elements.zonaEventos = document.querySelector(selectors.zonaEventos);

    console.log('Elementos del DOM inicializados:', {
        generalImagen: !!elements.generalImagen,
        generalNombre: !!elements.generalNombre,
        botonesContainer: !!elements.botonesContainer,
        planetaImagen: !!elements.planetaImagen,
        planetaNombre: !!elements.planetaNombre,
        zonaEventos: !!elements.zonaEventos
    });
}

function renderBottomButtons() {
    const buttonContainer = document.getElementById('botones');
    if (!buttonContainer) {
        console.error('Contenedor de botones #botones no encontrado');
        mostrarMensajeConstruccion('Error: Contenedor de botones no encontrado', 5000);
        return;
    }

    buttonContainer.innerHTML = '';

    const buttons = [
        { text: 'Construir', action: 'construir', disabled: false },
        { text: 'Lab', action: 'lab', disabled: !juegoState.botonesActivos.laboratorio },
        { text: 'Hangar', action: 'hangar', disabled: !juegoState.botonesActivos.hangar },
        { text: 'Explorar', action: 'explorar', disabled: !juegoState.botonesActivos.explorar }
    ];

    buttons.forEach(button => {
        const btnElement = document.createElement('button');
        btnElement.className = 'neon-button';
        btnElement.textContent = button.text;
        btnElement.disabled = button.disabled;
        if (button.action === 'explorar' && !button.disabled) {
            const submenu = document.createElement('div');
            submenu.className = 'submenu';
            const opcionesExploracion = [
                { text: 'Explorar Planeta', action: 'explorar-planeta' },
                { text: 'Enviar Flota', action: 'enviar-flota' },
                ...(juegoState.investigaciones.completadas['salto-intergalactico'] ? [{ text: 'Explorar Galaxia', action: 'explorar-galaxia' }] : [])
            ];
            opcionesExploracion.forEach(opcion => {
                const opcionBtn = document.createElement('button');
                opcionBtn.textContent = opcion.text;
                opcionBtn.addEventListener('click', () => handleExploracionClick(opcion.action));
                submenu.appendChild(opcionBtn);
            });
            btnElement.appendChild(submenu);
        }
        btnElement.addEventListener('click', () => handleButtonClick(button.action));
        buttonContainer.appendChild(btnElement);
    });

    console.log('Botones inferiores renderizados correctamente');
}

function handleButtonClick(action) {
    switch (action) {
        case 'construir':
            console.log('Construir clicado');
            mostrarVentanaConstruccion();
            break;
        case 'lab':
            console.log('Lab clicado');
            mostrarVentanaLaboratorio();
            break;
        case 'hangar':
            console.log('Hangar clicado');
            mostrarVentanaHangar();
            break;
        case 'explorar':
            console.log('Explorar clicado');
            // El submenú se maneja mediante hover/click en CSS (.submenu)
            break;
        default:
            console.warn('Acción de botón desconocida:', action);
    }
}

function handleExploracionClick(action) {
    console.log(`Opción de exploración clicada: ${action}`);
    mostrarMensajeConstruccion(`Exploración (${action}) no implementada aún`, 3000);
    // Aquí se implementará la lógica específica de cada opción en el futuro
}

function mostrarVentanaConstruccion() {
    console.log('Mostrando ventana de construcción...');
    const ventana = document.createElement('div');
    ventana.className = 'confirmacion-ventana';
    ventana.innerHTML = `
        <div class="confirmacion-contenido">
            <h3>Construir Estructura</h3>
            <p>Selecciona una estructura para construir:</p>
            <div id="lista-estructuras"></div>
            <button id="cerrar-construccion" class="neon-button">Cerrar</button>
        </div>
    `;
    document.body.appendChild(ventana);

    const listaEstructuras = ventana.querySelector('#lista-estructuras');
    const maxNivelPPM = 20;
    const ppmNivelActual = juegoState.estructuras.nivelPPM;
    const ppmDisponible = !juegoState.estructuras.tienePPM || ppmNivelActual < maxNivelPPM;
    const ppmAccion = juegoState.estructuras.tienePPM ? 'mejorar-ppm' : 'construir-ppm';
    const ppmNombre = juegoState.estructuras.tienePPM ? `PPM (Nivel ${ppmNivelActual}/20)` : 'PPM';

    const estructurasDisponibles = [
        { id: 'construir-refineria', nombre: 'Refinería', costo: juegoConfig.estructuras['construir-refineria'].costoMinerales, tiempo: juegoConfig.estructuras['construir-refineria'].tiempoConstruccion, disponible: !juegoState.estructuras.tieneRefineria },
        { id: 'construir-hangar', nombre: 'Hangar', costo: juegoConfig.estructuras['construir-hangar'].costoMinerales, tiempo: juegoConfig.estructuras['construir-hangar'].tiempoConstruccion, disponible: !juegoState.estructuras.tieneHangar },
        { id: 'construir-laboratorio', nombre: 'Laboratorio', costo: juegoConfig.estructuras['construir-laboratorio'].costoMinerales, tiempo: juegoConfig.estructuras['construir-laboratorio'].tiempoConstruccion, disponible: !juegoState.estructuras.tieneLaboratorio },
        { id: ppmAccion, nombre: ppmNombre, costo: juegoConfig.estructuras[ppmAccion].getCostoMinerales(ppmNivelActual), tiempo: juegoConfig.estructuras[ppmAccion].getTiempoConstruccion(ppmNivelActual), disponible: ppmDisponible }
    ];

    listaEstructuras.innerHTML = estructurasDisponibles.map(estructura => `
        <div class="estructura-item ${!estructura.disponible ? 'desactivada' : ''}">
            <h4>${estructura.nombre}</h4>
            <p>Minerales: ${estructura.costo}</p>
            <p>Tiempo: ${convertirTiempo(estructura.tiempo)}</p>
            ${estructura.disponible ? `<button class="neon-button" data-id="${estructura.id}">Construir</button>` : `<p class="max-nivel">${estructura.id === 'mejorar-ppm' && ppmNivelActual >= maxNivelPPM ? 'Máximo alcanzado' : 'Ya construido'}</p>`}
        </div>
    `).join('');

    const botonesConstruir = listaEstructuras.querySelectorAll('button');
    botonesConstruir.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            if (id === 'mejorar-ppm' && juegoState.estructuras.nivelPPM >= maxNivelPPM) {
                mostrarMensajeConstruccion('La PPM ha alcanzado el nivel máximo', 3000);
                return;
            }
            iniciarConstruccion(id);
            ventana.remove();
        });
    });

    const cerrarBoton = ventana.querySelector('#cerrar-construccion');
    cerrarBoton.addEventListener('click', () => {
        console.log('Cerrando ventana de construcción');
        ventana.remove();
    });

    ventana.addEventListener('click', (e) => {
        if (e.target === ventana) {
            console.log('Cerrando ventana de construcción por clic fuera');
            ventana.remove();
        }
    });
}

function iniciarConstruccion(estructuraId) {
    const estructura = juegoConfig.estructuras[estructuraId];
    if (!estructura) {
        mostrarMensajeConstruccion('Error: Estructura no encontrada', 3000);
        return;
    }

    const costoMinerales = estructura.getCostoMinerales ? estructura.getCostoMinerales(juegoState.estructuras.nivelPPM) : estructura.costoMinerales;
    const tiempoConstruccion = estructura.getTiempoConstruccion ? estructura.getTiempoConstruccion(juegoState.estructuras.nivelPPM) : estructura.tiempoConstruccion;

    if (juegoState.recursos.minerales < costoMinerales) {
        mostrarMensajeConstruccion('Recursos insuficientes para construir', 3000);
        return;
    }

    juegoState.recursos.minerales -= costoMinerales;
    const construccion = { id: estructuraId, inicio: Date.now(), duracion: tiempoConstruccion, uuid: Date.now() + Math.random() };
    juegoState.construccionesActivas.push(construccion);
    actualizarRecursos();
    guardarDatos();
    mostrarMensajeConstruccion(`Iniciada construcción: ${estructuraId} (${Math.round(tiempoConstruccion / 1000)}s)`, 3000);

    const evento = document.createElement('div');
    evento.className = 'evento estructura';
    evento.dataset.uuid = construccion.uuid;
    evento.innerHTML = `
        <p>Construyendo ${estructuraId.replace('construir-', '').replace('mejorar-', '')}</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
    `;
    elements.zonaEventos.appendChild(evento);

    const intervalo = setInterval(() => {
        const construccionActiva = juegoState.construccionesActivas.find(c => c.uuid === construccion.uuid);
        if (!construccionActiva) {
            clearInterval(intervalo);
            evento.remove();
            return;
        }

        const elapsed = Date.now() - construccionActiva.inicio;
        const progreso = Math.min((elapsed / construccionActiva.duracion) * 100, 100);
        const barra = evento.querySelector('.progress-fill');
        barra.style.width = `${progreso}%`;

        if (progreso >= 100) {
            clearInterval(intervalo);
            completarConstruccion(construccionActiva);
            evento.remove();
        }
    }, 100);
}

function completarConstruccion(construccion) {
    const maxNivelPPM = 20;
    if (construccion.id === 'construir-refineria') {
        juegoState.estructuras.tieneRefineria = true;
    } else if (construccion.id === 'construir-hangar') {
        juegoState.estructuras.tieneHangar = true;
        juegoState.botonesActivos.hangar = true;
    } else if (construccion.id === 'construir-laboratorio') {
        juegoState.estructuras.tieneLaboratorio = true;
        juegoState.botonesActivos.laboratorio = true;
    } else if (construccion.id === 'construir-ppm') {
        juegoState.estructuras.tienePPM = true;
        juegoState.estructuras.nivelPPM = 1;
    } else if (construccion.id === 'mejorar-ppm' && juegoState.estructuras.nivelPPM < maxNivelPPM) {
        juegoState.estructuras.nivelPPM += 1;
    }

    juegoState.construccionesActivas = juegoState.construccionesActivas.filter(c => c.uuid !== construccion.uuid);
    guardarDatos();
    renderBottomButtons();
    mostrarMensajeConstruccion(`Construcción completada: ${construccion.id.replace('construir-', '').replace('mejorar-', '')}`, 3000);

    if (juegoState.colaConstrucciones.length > 0) {
        const siguiente = juegoState.colaConstrucciones.shift();
        iniciarConstruccion(siguiente.id);
    }
}

function mostrarVentanaLaboratorio() {
    console.log('Mostrando ventana del laboratorio...');
    if (!juegoState.botonesActivos.laboratorio) {
        mostrarMensajeConstruccion('El laboratorio no está construido', 3000);
        return;
    }

    const ventana = document.createElement('div');
    ventana.className = 'laboratorio-ventana';
    ventana.innerHTML = `
        <div class="laboratorio-contenido">
            <h3>Laboratorio</h3>
            <div class="sector-botones">
                <button class="neon-button activo" data-categoria="militar">Militares</button>
                <button class="neon-button" data-categoria="estructuras">Estructuras</button>
                <button class="neon-button" data-categoria="produccion">Producción</button>
            </div>
            <div class="investigaciones-lista" id="investigaciones-lista"></div>
            <button id="cerrar-laboratorio" class="neon-button">Cerrar</button>
        </div>
    `;
    document.body.appendChild(ventana);

    renderizarInvestigaciones('militar');

    const botonesCategoria = ventana.querySelectorAll('.sector-botones .neon-button');
    botonesCategoria.forEach(boton => {
        boton.addEventListener('click', () => {
            const categoria = boton.dataset.categoria;
            console.log(`Categoría seleccionada: ${categoria}`);
            renderizarInvestigaciones(categoria);
            botonesCategoria.forEach(b => b.classList.remove('activo'));
            boton.classList.add('activo');
        });
    });

    const cerrarBoton = ventana.querySelector('#cerrar-laboratorio');
    cerrarBoton.addEventListener('click', () => {
        console.log('Cerrando ventana del laboratorio');
        ventana.remove();
    });

    ventana.addEventListener('click', (e) => {
        if (e.target === ventana) {
            console.log('Cerrando ventana del laboratorio por clic fuera');
            ventana.remove();
        }
    });
}

function renderizarInvestigaciones(categoria) {
    const lista = document.getElementById('investigaciones-lista');
    if (!lista) {
        console.error('Lista de investigaciones no encontrada');
        return;
    }

    const investigaciones = juegoConfig.investigaciones[categoria] || [];
    if (investigaciones.length === 0) {
        lista.innerHTML = '<p style="font-size: 0.75rem; text-align: center;">No hay investigaciones disponibles</p>';
        return;
    }

    lista.innerHTML = investigaciones.map(investigacion => {
        const nivel = juegoState.investigaciones.completadas[investigacion.id]?.nivel || 0;
        const maxNivel = investigacion.maxNivel || 1;
        const desactivada = nivel >= maxNivel;
        const costoMinerales = investigacion.getCostoMinerales ? investigacion.getCostoMinerales(nivel) : investigacion.costoMinerales || 0;
        const costoCombustibles = investigacion.costoCombustibles || 0;
        const tiempo = investigacion.getTiempoInvestigacion ? investigacion.getTiempoInvestigacion(nivel) : investigacion.tiempoInvestigacion || 0;

        let estaDesbloqueada = true;
        if (investigacion.id === 'linea-acelerada' && !juegoState.investigaciones.completadas['chips-avanzados']) {
            estaDesbloqueada = false;
        } else if (investigacion.id === 'salto-espacial' && !juegoState.investigaciones.completadas['astrofisica-avanzada']) {
            estaDesbloqueada = false;
        } else if (investigacion.id === 'salto-intergalactico' && !juegoState.investigaciones.completadas['salto-espacial']) {
            estaDesbloqueada = false;
        }

        return `
            <div class="investigacion-item ${desactivada || !estaDesbloqueada ? 'desactivada' : ''}">
                <img src="${investigacion.imagen}" alt="${investigacion.nombre}" class="investigacion-imagen">
                <div class="investigacion-info">
                    <h4>${investigacion.nombre} (Nivel ${nivel}/${maxNivel})</h4>
                    <p>${investigacion.descripcion}</p>
                    ${costoMinerales > 0 ? `<p>Minerales: ${costoMinerales}</p>` : ''}
                    ${costoCombustibles > 0 ? `<p>Combustibles: ${costoCombustibles}</p>` : ''}
                    ${tiempo > 0 ? `<p>Tiempo: ${convertirTiempo(tiempo)}</p>` : ''}
                    ${estaDesbloqueada && !desactivada && nivel < maxNivel ? `<button class="neon-button" data-id="${investigacion.id}">Investigar</button>` : ''}
                    ${!estaDesbloqueada ? `<p style="color: #ff007a;">Requiere desbloqueo</p>` : ''}
                </div>
            </div>
        `;
    }).join('');

    const botonesInvestigar = lista.querySelectorAll('.investigacion-item button');
    botonesInvestigar.forEach(boton => {
        boton.addEventListener('click', () => {
            const id = boton.dataset.id;
            console.log(`Iniciar investigación: ${id}`);
            iniciarInvestigacion(id);
        });
    });
}

function iniciarInvestigacion(investigacionId) {
    const investigacion = juegoConfig.investigaciones.militar.find(inv => inv.id === investigacionId) ||
                         juegoConfig.investigaciones.estructuras.find(inv => inv.id === investigacionId) ||
                         juegoConfig.investigaciones.produccion.find(inv => inv.id === investigacionId);
    if (!investigacion) {
        console.error(`Investigación ${investigacionId} no encontrada`);
        mostrarMensajeConstruccion('Error: Investigación no encontrada', 3000);
        return;
    }

    const nivel = juegoState.investigaciones.completadas[investigacionId]?.nivel || 0;
    const costoMinerales = investigacion.getCostoMinerales ? investigacion.getCostoMinerales(nivel) : investigacion.costoMinerales || 0;
    const costoCombustibles = investigacion.costoCombustibles || 0;
    const tiempoInvestigacion = investigacion.getTiempoInvestigacion ? investigacion.getTiempoInvestigacion(nivel) : investigacion.tiempoInvestigacion || 0;

    if (juegoState.recursos.minerales < costoMinerales || juegoState.recursos.combustibles < costoCombustibles) {
        mostrarMensajeConstruccion('Recursos insuficientes para iniciar la investigación', 3000);
        return;
    }

    juegoState.recursos.minerales -= costoMinerales;
    juegoState.recursos.combustibles -= costoCombustibles;
    const investigacionActiva = { id: investigacionId, nivel: nivel + 1, inicio: Date.now(), duracion: tiempoInvestigacion, uuid: Date.now() + Math.random() };
    juegoState.investigaciones.activas.push(investigacionActiva);
    actualizarRecursos();
    guardarDatos();
    mostrarMensajeConstruccion(`Iniciada investigación: ${investigacion.nombre} (${Math.round(tiempoInvestigacion / 1000)}s)`, 3000);

    const evento = document.createElement('div');
    evento.className = 'evento investigacion';
    evento.dataset.uuid = investigacionActiva.uuid;
    evento.innerHTML = `
        <p>Investigando ${investigacion.nombre}</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
    `;
    elements.zonaEventos.appendChild(evento);

    const intervalo = setInterval(() => {
        const investigacionEnCurso = juegoState.investigaciones.activas.find(i => i.uuid === investigacionActiva.uuid);
        if (!investigacionEnCurso) {
            clearInterval(intervalo);
            evento.remove();
            return;
        }

        const elapsed = Date.now() - investigacionEnCurso.inicio;
        const progreso = Math.min((elapsed / investigacionEnCurso.duracion) * 100, 100);
        const barra = evento.querySelector('.progress-fill');
        barra.style.width = `${progreso}%`;

        if (progreso >= 100) {
            clearInterval(intervalo);
            completarInvestigacion(investigacionEnCurso);
            evento.remove();
        }
    }, 100);
}

function completarInvestigacion(investigacionActiva) {
    const investigacionId = investigacionActiva.id;
    const nivel = investigacionActiva.nivel;
    juegoState.investigaciones.completadas[investigacionId] = {
        nivel: nivel,
        timestamp: Date.now()
    };
    juegoState.investigaciones.activas = juegoState.investigaciones.activas.filter(i => i.uuid !== investigacionActiva.uuid);
    window.investigaciones.aplicarEfectos(investigacionId, nivel, juegoState, juegoConfig);
    const investigacion = juegoConfig.investigaciones.militar.find(inv => inv.id === investigacionId) ||
                         juegoConfig.investigaciones.estructuras.find(inv => inv.id === investigacionId) ||
                         juegoConfig.investigaciones.produccion.find(inv => inv.id === investigacionId);
    if (investigacionId === 'salto-espacial') {
        juegoState.botonesActivos.explorar = true;
    }
    mostrarMensajeConstruccion(`Investigación completada: ${investigacion.nombre}`, 3000);
    guardarDatos();
    renderBottomButtons();

    if (juegoState.investigaciones.cola.length > 0) {
        const siguiente = juegoState.investigaciones.cola.shift();
        iniciarInvestigacion(siguiente.id);
    }
}

function mostrarVentanaHangar() {
    console.log('Mostrando ventana del hangar...');
    if (!juegoState.botonesActivos.hangar) {
        mostrarMensajeConstruccion('El hangar no está construido', 3000);
        return;
    }

    const ventana = document.createElement('div');
    ventana.className = 'hangar-ventana';
    ventana.innerHTML = `
        <div class="hangar-contenido">
            <h3>Hangar</h3>
            <div class="naves-lista" id="naves-lista"></div>
            <button id="construir-naves" class="neon-button">Construir</button>
            <button id="cerrar-hangar" class="neon-button">Cerrar</button>
        </div>
    `;
    document.body.appendChild(ventana);

    const listaNaves = ventana.querySelector('#naves-lista');
    const navesDisponibles = juegoConfig.naves.filter(nave => {
        if (nave.esDron && !juegoState.investigaciones.completadas['chips-avanzados']) {
            return false;
        }
        return true;
    });

    listaNaves.innerHTML = navesDisponibles.map(nave => `
        <div class="nave-item">
            <img src="${nave.imagen}" alt="${nave.nombre}" class="nave-imagen">
            <div class="nave-info">
                <h4>${nave.nombre}</h4>
                <p>Minerales: ${nave.costoMinerales}</p>
                <p>Combustibles: ${nave.costoCombustibles}</p>
                <p>Tiempo: ${convertirTiempo(nave.tiempoFabricacion)}</p>
                <label>Cantidad: <input type="number" min="1" value="1" class="nave-cantidad" data-nombre="${nave.nombre}"></label>
            </div>
        </div>
    `).join('');

    const construirBoton = ventana.querySelector('#construir-naves');
    construirBoton.addEventListener('click', () => {
        const inputs = listaNaves.querySelectorAll('.nave-cantidad');
        inputs.forEach(input => {
            const cantidad = parseInt(input.value);
            const nombre = input.dataset.nombre;
            if (cantidad > 0) {
                iniciarProduccionNave(nombre, cantidad);
            }
        });
        ventana.remove();
    });

    const cerrarBoton = ventana.querySelector('#cerrar-hangar');
    cerrarBoton.addEventListener('click', () => {
        console.log('Cerrando ventana del hangar');
        ventana.remove();
    });

    ventana.addEventListener('click', (e) => {
        if (e.target === ventana) {
            console.log('Cerrando ventana del hangar por clic fuera');
            ventana.remove();
        }
    });
}

function iniciarProduccionNave(nombre, cantidad) {
    const nave = juegoConfig.naves.find(n => n.nombre === nombre);
    if (!nave) {
        mostrarMensajeConstruccion('Error: Nave no encontrada', 3000);
        return;
    }

    const costoMinerales = nave.costoMinerales * cantidad;
    const costoCombustibles = nave.costoCombustibles * cantidad;

    if (juegoState.recursos.minerales < costoMinerales || juegoState.recursos.combustibles < costoCombustibles) {
        mostrarMensajeConstruccion('Recursos insuficientes para construir naves', 3000);
        return;
    }

    juegoState.recursos.minerales -= costoMinerales;
    juegoState.recursos.combustibles -= costoCombustibles;
    const produccion = { nombre, cantidad, inicio: Date.now(), duracion: nave.tiempoFabricacion, uuid: Date.now() + Math.random() };
    juegoState.produccionesNavesActivas.push(produccion);
    actualizarRecursos();
    guardarDatos();
    mostrarMensajeConstruccion(`Iniciada construcción de ${cantidad} ${nombre} (${Math.round(nave.tiempoFabricacion / 1000)}s)`, 3000);

    const evento = document.createElement('div');
    evento.className = 'evento nave';
    evento.dataset.uuid = produccion.uuid;
    evento.innerHTML = `
        <p>Construyendo ${cantidad} ${nombre}</p>
        <div class="progress-bar"><div class="progress-fill" style="width: 0%"></div></div>
    `;
    elements.zonaEventos.appendChild(evento);

    const intervalo = setInterval(() => {
        const produccionActiva = juegoState.produccionesNavesActivas.find(p => p.uuid === produccion.uuid);
        if (!produccionActiva) {
            clearInterval(intervalo);
            evento.remove();
            return;
        }

        const elapsed = Date.now() - produccionActiva.inicio;
        const progreso = Math.min((elapsed / produccionActiva.duracion) * 100, 100);
        const barra = evento.querySelector('.progress-fill');
        barra.style.width = `${progreso}%`;

        if (progreso >= 100) {
            clearInterval(intervalo);
            completarProduccionNave(produccionActiva);
            evento.remove();
        }
    }, 100);
}

function completarProduccionNave(produccion) {
    juegoState.navesFabricadas.push({ nombre: produccion.nombre, cantidad: produccion.cantidad });
    juegoState.produccionesNavesActivas = juegoState.produccionesNavesActivas.filter(p => p.uuid !== produccion.uuid);
    guardarDatos();
    mostrarMensajeConstruccion(`Completada construcción de ${produccion.cantidad} ${produccion.nombre}`, 3000);

    if (juegoState.colaProduccionNaves.length > 0) {
        const siguiente = juegoState.colaProduccionNaves.shift();
        iniciarProduccionNave(siguiente.nombre, siguiente.cantidad);
    }
}

function producirRecursos() {
    let mineralesPor10s = juegoConfig.produccion.mineralesPer10s + juegoState.estructuras.nivelPPM;
    let combustiblesPor10s = juegoConfig.produccion.combustiblesPer10s;

    if (juegoState.estructuras.tieneRefineria) {
        combustiblesPor10s *= 1.5;
    }

    juegoState.recursos.minerales = Math.min(
        juegoState.recursos.minerales + mineralesPor10s,
        juegoConfig.recursos.maxMinerales
    );
    juegoState.recursos.combustibles = Math.min(
        juegoState.recursos.combustibles + combustiblesPor10s,
        juegoConfig.recursos.maxCombustibles
    );

    actualizarRecursos();
    guardarDatos();
}

function cargarDatosUsuario() {
    const datos = localStorage.getItem('usuario');
    if (!datos) {
        console.error('No se encontraron datos en localStorage para "usuario".');
        return null;
    }
    try {
        const usuario = JSON.parse(datos);
        if (!usuario || !usuario.general || !usuario.general.nombre || !usuario.general.imagen) {
            console.error('Datos de usuario o general incompletos:', usuario);
            return null;
        }
        juegoState.planetaAsignado = usuario.planetaAsignado || null;
        return usuario;
    } catch (error) {
        console.error('Error al parsear datos de usuario:', error.message);
        return null;
    }
}

function cargarRecursos() {
    const datos = localStorage.getItem('juego');
    if (datos) {
        try {
            const juego = JSON.parse(datos);
            juegoState.recursos = {
                minerales: Math.min(Math.max(0, juego.recursos?.minerales || 50), juegoConfig.recursos.maxMinerales),
                combustibles: Math.min(Math.max(0, juego.recursos?.combustibles || 20), juegoConfig.recursos.maxCombustibles),
                energia: Math.min(Math.max(0, juego.recursos?.energia || 50), juegoConfig.recursos.maxEnergia)
            };
            juegoState.estructuras = { ...juego.estructuras, nivelPPM: juego.estructuras?.nivelPPM || 0 };
            juegoState.botonesActivos = {
                laboratorio: !!juego.botonesActivos?.laboratorio,
                hangar: !!juego.botonesActivos?.hangar,
                explorar: !!juego.botonesActivos?.explorar
            };
            juegoState.navesFabricadas = juego.navesFabricadas || [];
            juegoState.colaProduccionNaves = juego.colaProduccionNaves || [];
            juegoState.construccionesActivas = juego.construccionesActivas || [];
            juegoState.produccionesNavesActivas = juego.produccionesNavesActivas || [];
            juegoState.investigaciones = {
                completadas: juego.investigaciones?.completadas || {},
                activas: juego.investigaciones?.activas || [],
                cola: juego.investigaciones?.cola || []
            };
            console.log('Recursos cargados:', juegoState.recursos);
        } catch (error) {
            console.error('Error al cargar recursos:', error.message);
        }
    }
}

function guardarDatos() {
    try {
        localStorage.setItem('juego', JSON.stringify({
            recursos: juegoState.recursos,
            estructuras: juegoState.estructuras,
            botonesActivos: juegoState.botonesActivos,
            navesFabricadas: juegoState.navesFabricadas,
            colaProduccionNaves: juegoState.colaProduccionNaves,
            construccionesActivas: juegoState.construccionesActivas,
            produccionesNavesActivas: juegoState.produccionesNavesActivas,
            investigaciones: {
                completadas: juegoState.investigaciones.completadas,
                activas: juegoState.investigaciones.activas,
                cola: juegoState.investigaciones.cola
            }
        }));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al guardar datos:', error.message);
    }
}

function mostrarMensajeConstruccion(mensaje, duracion = 3000) {
    const mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = mensaje;
    mensajeElemento.style.position = 'fixed';
    mensajeElemento.style.bottom = '10px';
    mensajeElemento.style.left = '50%';
    mensajeElemento.style.transform = 'translateX(-50%)';
    mensajeElemento.style.background = 'rgba(20, 20, 50, 0.7)';
    mensajeElemento.style.padding = '0.5rem';
    mensajeElemento.style.color = '#e0e0ff';
    document.body.appendChild(mensajeElemento);
    setTimeout(() => mensajeElemento.remove(), duracion);
}

function mostrarGeneral(usuario) {
    if (!elements.generalImagen || !elements.generalNombre) {
        console.error('Elementos del DOM para general no encontrados');
        return;
    }
    elements.generalNombre.textContent = usuario.general.nombre;
    elements.generalImagen.src = usuario.general.imagen;
    elements.generalImagen.alt = usuario.general.nombre;
    elements.generalImagen.onerror = () => {
        elements.generalImagen.src = juegoConfig.defaultImagen;
    };
}

function mostrarPlaneta() {
    if (!elements.planetaImagen || !elements.planetaNombre) {
        console.error('Elementos del DOM para planeta no encontrados');
        return;
    }
    if (juegoState.planetaAsignado) {
        elements.planetaNombre.textContent = juegoState.planetaAsignado.nombre;
        elements.planetaImagen.src = juegoState.planetaAsignado.imagen;
        elements.planetaImagen.alt = juegoState.planetaAsignado.nombre;
        elements.planetaImagen.onerror = () => {
            elements.planetaImagen.src = juegoConfig.defaultImagen;
        };
    } else {
        elements.planetaNombre.textContent = 'Sin planeta asignado';
        elements.planetaImagen.src = juegoConfig.defaultImagen;
    }
}

function actualizarRecursos() {
    const { minerales, combustibles, energia } = juegoState.recursos;
    elements.mineralesBar.style.width = `${(minerales / juegoConfig.recursos.maxMinerales) * 100}%`;
    elements.mineralesValor.textContent = `${Math.floor(minerales)}/${juegoConfig.recursos.maxMinerales}`;
    elements.combustiblesBar.style.width = `${(combustibles / juegoConfig.recursos.maxCombustibles) * 100}%`;
    elements.combustiblesValor.textContent = `${Math.floor(combustibles)}/${juegoConfig.recursos.maxCombustibles}`;
    elements.energiaBar.style.width = `${(energia / juegoConfig.recursos.maxEnergia) * 100}%`;
    elements.energiaValor.textContent = `${Math.floor(energia)}/${juegoConfig.recursos.maxEnergia}`;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando juego...');
    try {
        inicializarElementosDOM();
        const usuario = cargarDatosUsuario();
        if (!usuario) {
            mostrarMensajeConstruccion('Error: No se pudo cargar el usuario', 5000);
            setTimeout(() => window.location.href = 'index.html', 5000);
            return;
        }
        cargarRecursos();
        mostrarGeneral(usuario);
        mostrarPlaneta();
        actualizarRecursos();
        renderBottomButtons();
        guardarDatos();

        setInterval(producirRecursos, 10000);

        // Restaurar construcciones activas
        juegoState.construccionesActivas.forEach(construccion => {
            iniciarConstruccion(construccion.id);
        });

        // Restaurar producciones de naves activas
        juegoState.produccionesNavesActivas.forEach(produccion => {
            iniciarProduccionNave(produccion.nombre, produccion.cantidad);
        });

        // Restaurar investigaciones activas
        juegoState.investigaciones.activas.forEach(investigacion => {
            iniciarInvestigacion(investigacion.id);
        });
    } catch (error) {
        console.error('Error general durante la inicialización del juego:', error.message, error.stack);
        mostrarMensajeConstruccion('Error crítico al iniciar el juego', 5000);
    }
});