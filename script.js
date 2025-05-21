// Configuración inicial
const appConfig = {
    selectors: {
        formLogin: '#form-login',
        formRegistro: '#form-registro',
        nombreUsuario: '#nombre-usuario',
        contrasenaLogin: '#contrasena-login',
        nombreJugador: '#nombre-jugador',
        emailJugador: '#email-jugador',
        contrasenaRegistro: '#contrasena-registro',
        confirmarContrasena: '#confirmar-contrasena',
        acceso: '#acceso',
        facciones: '#facciones',
        generales: '#generales',
        opcionesFacciones: '#opciones-facciones',
        listaGenerales: '#lista-generales',
        confirmarSeleccion: '#confirmar-seleccion'
    },
    classes: {
        oculta: 'oculta'
    }
};

// Estado de la aplicación
const appState = {
    jugador: null,
    faccion: null,
    general: null
};

// Datos de facciones y generales
const facciones = {
    imperio: {
        nombre: 'Imperio Galáctico',
        generales: [
            { id: 'imp1', nombre: 'Hamir', habilidad: 'Estrategia Ofensiva', imagen: '/Generales/Facciones/IMPERIOGALACTICO/Hamir.jpg' },
            { id: 'imp2', nombre: 'Heisen', habilidad: 'Inteligencia Táctica', imagen: '/Generales/Facciones/IMPERIOGALACTICO/Heisen.jpg' },
            { id: 'imp3', nombre: 'Magnus', habilidad: 'Dominio Logístico', imagen: '/Generales/Facciones/IMPERIOGALACTICO/Magnus.jpg' },
            { id: 'imp4', nombre: 'Proyecto023', habilidad: 'Innovación Cibernética', imagen: '/Generales/Facciones/IMPERIOGALACTICO/Proyecto023.jpg' }
        ]
    },
    republica: {
        nombre: 'República de las Estrellas',
        generales: [
            { id: 'z-7', nombre: 'Z-7', habilidad: 'Tácticas defensivas', imagen: '/Generales/Facciones/REPUBLICA DE LAS ESTRELLAS/z-7.jpg' },
            { id: 'lotus_blicen', nombre: 'Lotus Blicen', habilidad: 'Diplomacia galáctica', imagen: '/Generales/Facciones/REPUBLICA DE LAS ESTRELLAS/lotus_blicen.jpg' },
            { id: 'aria_vega', nombre: 'Aria Vega', habilidad: 'Liderazgo en combate', imagen: '/Generales/Facciones/REPUBLICA DE LAS ESTRELLAS/aria_vega.jpg' },
            { id: 'blarius_hizzen', nombre: 'Blarius Hizzen', habilidad: 'Innovación tecnológica', imagen: '/Generales/Facciones/REPUBLICA DE LAS ESTRELLAS/blarius_hizzen.jpg' }
        ]
    }
};

// Referencias al DOM
const elements = {
    formLogin: document.querySelector(appConfig.selectors.formLogin),
    formRegistro: document.querySelector(appConfig.selectors.formRegistro),
    nombreUsuario: document.querySelector(appConfig.selectors.nombreUsuario),
    contrasenaLogin: document.querySelector(appConfig.selectors.contrasenaLogin),
    nombreJugador: document.querySelector(appConfig.selectors.nombreJugador),
    emailJugador: document.querySelector(appConfig.selectors.emailJugador),
    contrasenaRegistro: document.querySelector(appConfig.selectors.contrasenaRegistro),
    confirmarContrasena: document.querySelector(appConfig.selectors.confirmarContrasena),
    acceso: document.querySelector(appConfig.selectors.acceso),
    facciones: document.querySelector(appConfig.selectors.facciones),
    generales: document.querySelector(appConfig.selectors.generales),
    opcionesFacciones: document.querySelector(appConfig.selectors.opcionesFacciones),
    listaGenerales: document.querySelector(appConfig.selectors.listaGenerales),
    confirmarSeleccion: document.querySelector(appConfig.selectors.confirmarSeleccion)
};

// Función para mostrar notificaciones en la UI
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    setTimeout(() => notificacion.remove(), 3000);
}

// Función genérica para gestionar visibilidad de secciones
function gestionarSecciones(seccionMostrar, seccionesOcultar = []) {
    seccionMostrar.classList.remove(appConfig.classes.oculta);
    seccionesOcultar.forEach(seccion => seccion.classList.add(appConfig.classes.oculta));
}

// Validación de datos
function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}

function validarContrasena(contrasena) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(contrasena);
}

// Guardar datos en localStorage
function guardarDatosUsuario() {
    let generalData = null;
    if (appState.faccion && appState.general) {
        const faccion = facciones[appState.faccion];
        const general = faccion.generales.find(g => g.id === appState.general);
        if (general) {
            generalData = {
                id: general.id,
                nombre: general.nombre,
                imagen: general.imagen
            };
        }
    }
    const usuario = {
        nombre: appState.jugador.nombre,
        email: appState.jugador.email,
        contrasena: appState.jugador.contrasena,
        faccion: appState.faccion,
        general: generalData,
        planetaAsignado: appState.jugador.planetaAsignado
    };
    localStorage.setItem('usuario', JSON.stringify(usuario));
    console.log('Datos de usuario guardados:', usuario);
}

// Cargar datos desde localStorage
function cargarDatosUsuario(nombre) {
    const datos = localStorage.getItem('usuario');
    if (datos) {
        try {
            const usuario = JSON.parse(datos);
            if (usuario.nombre === nombre) {
                appState.jugador = {
                    nombre: usuario.nombre,
                    email: usuario.email,
                    contrasena: usuario.contrasena,
                    planetaAsignado: usuario.planetaAsignado
                };
                appState.faccion = usuario.faccion;
                appState.general = usuario.general ? usuario.general.id : null;
                console.log('Datos de usuario cargados:', usuario);
                return usuario;
            }
        } catch (error) {
            console.error('Error al parsear datos de usuario:', error);
        }
    }
    return null;
}

// Cargar generales dinámicamente
function cargarGenerales(faccionId) {
    const faccion = facciones[faccionId];
    if (!faccion) return;

    elements.listaGenerales.innerHTML = faccion.generales.map(general => `
        <div class="general">
            <h3>${general.nombre}</h3>
            <img src="${general.imagen}" alt="${general.nombre}" class="general-img">
            <p>Habilidad: ${general.habilidad}</p>
            <button data-general="${general.id}" class="neon-button">Elegir</button>
        </div>
    `).join('');
}

// Redirigir a la página del juego
function redirigirAJuego() {
    window.location.href = 'juego.html';
}

// Mostrar resumen de selecciones guardadas
function mostrarResumenSelecciones() {
    if (appState.faccion && appState.general) {
        const faccionNombre = facciones[appState.faccion].nombre;
        const generalNombre = facciones[appState.faccion].generales.find(g => g.id === appState.general).nombre;
        mostrarNotificacion(`Sesión iniciada. Facción: ${faccionNombre}, General: ${generalNombre}`);
        redirigirAJuego();
    } else {
        mostrarNotificacion('Por favor, selecciona una facción y un general.');
        gestionarSecciones(elements.facciones, [elements.acceso]);
    }
}

// Asignar planeta aleatorio
function asignarPlanetaAleatorio(nombreUsuario) {
    console.log('Asignando planeta aleatorio para:', nombreUsuario);
    if (!window.galaxias) {
        console.error('galaxias.js no está cargado');
        return null;
    }
    try {
        // Inicializar galaxias explícitamente
        window.galaxias.inicializarGalaxias();
        const planeta = window.galaxias.asignarPlanetaAleatorio(nombreUsuario);
        if (!planeta) {
            console.error('No se pudo asignar un planeta');
            return null;
        }
        console.log('Planeta asignado:', planeta);
        return planeta;
    } catch (error) {
        console.error('Error al asignar planeta:', error);
        return null;
    }
}

// Manejadores de eventos
function inicializarEventos() {
    // Inicio de sesión
    elements.formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = elements.nombreUsuario.value.trim();
        const contrasena = elements.contrasenaLogin.value;

        if (!validarNombre(nombre)) {
            mostrarNotificacion('El nombre debe tener al menos 3 caracteres', 'error');
            return;
        }

        if (!validarContrasena(contrasena)) {
            mostrarNotificacion('La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial', 'error');
            return;
        }

        try {
            const usuarioGuardado = cargarDatosUsuario(nombre);
            if (usuarioGuardado && usuarioGuardado.contrasena === contrasena) {
                appState.jugador = {
                    nombre: usuarioGuardado.nombre,
                    email: usuarioGuardado.email,
                    contrasena: usuarioGuardado.contrasena,
                    planetaAsignado: usuarioGuardado.planetaAsignado
                };
                appState.faccion = usuarioGuardado.faccion;
                appState.general = usuarioGuardado.general ? usuarioGuardado.general.id : null;
                mostrarNotificacion(`¡Bienvenido, ${nombre}! Conexión exitosa.`);
                mostrarResumenSelecciones();
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            mostrarNotificacion('Error: Nombre de usuario o contraseña incorrectos', 'error');
        }
    });

    // Registro de jugador
    elements.formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = elements.nombreJugador.value.trim();
        const email = elements.emailJugador.value.trim();
        const contrasena = elements.contrasenaRegistro.value;
        const confirmarContrasena = elements.confirmarContrasena.value;

        if (!validarNombre(nombre)) {
            mostrarNotificacion('El nombre debe tener al menos 3 caracteres', 'error');
            return;
        }

        if (!validarContrasena(contrasena)) {
            mostrarNotificacion('La contraseña debe tener al menos 8 caracteres, incluyendo una letra, un número y un carácter especial', 'error');
            return;
        }

        if (contrasena !== confirmarContrasena) {
            mostrarNotificacion('Las contraseñas no coinciden', 'error');
            return;
        }

        if (cargarDatosUsuario(nombre)) {
            mostrarNotificacion('El nombre de usuario ya está registrado', 'error');
            return;
        }

        try {
            appState.jugador = { nombre, email, contrasena, planetaAsignado: null };
            // Asignar planeta aleatorio
            const planetaAsignado = asignarPlanetaAleatorio(nombre);
            if (!planetaAsignado) {
                throw new Error('No se pudo asignar un planeta');
            }
            appState.jugador.planetaAsignado = planetaAsignado;
            guardarDatosUsuario();
            mostrarNotificacion(`¡Cuenta creada para ${nombre}! Elige tu facción.`);
            gestionarSecciones(elements.facciones, [elements.acceso]);
        } catch (error) {
            console.error('Error al crear la cuenta:', error);
            mostrarNotificacion('Error al crear la cuenta: No se pudo asignar un planeta', 'error');
        }
    });

    // Selección de facción
    elements.opcionesFacciones.addEventListener('click', (e) => {
        const boton = e.target.closest('button');
        if (boton && boton.dataset.faccion) {
            appState.faccion = boton.dataset.faccion;
            mostrarNotificacion(`Facción "${facciones[appState.faccion].nombre}" seleccionada`);
            cargarGenerales(appState.faccion);
            gestionarSecciones(elements.generales, [elements.facciones]);
            guardarDatosUsuario();
        }
    });

    // Selección de general
    elements.listaGenerales.addEventListener('click', (e) => {
        const boton = e.target.closest('button');
        if (boton && boton.dataset.general) {
            appState.general = boton.dataset.general;
            mostrarNotificacion(`General "${facciones[appState.faccion].generales.find(g => g.id === appState.general).nombre}" seleccionado`);
            elements.confirmarSeleccion.disabled = false;
            guardarDatosUsuario();
        }
    });

    // Confirmar selección
    elements.confirmarSeleccion.addEventListener('click', () => {
        if (appState.faccion && appState.general) {
            mostrarNotificacion('¡Selección confirmada! Iniciando el juego...');
            guardarDatosUsuario();
            redirigirAJuego();
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', inicializarEventos);