// Configuración de galaxias
const galaxiasConfig = {
    galaxias: [
        { id: 'andromeda', inicial: 'A', sistemas: 5, planetasPorGalaxia: 20 },
        { id: 'vialactea', inicial: 'V', sistemas: 5, planetasPorGalaxia: 20 }
    ],
    calificaciones: ['Árido', 'Mixto', 'Ártico', 'Inhabitable'],
    probabilidades: {
        1: { Inhabitable: 0.30, Árido: 0.70 },
        2: { Árido: 0.60, Mixto: 0.40 },
        3: { Mixto: 0.95, Árido: 0.05 },
        4: { Mixto: 0.60, Ártico: 0.40 },
        5: { Ártico: 0.70, Inhabitable: 0.30 }
    },
    imagenes: {
        Árido: ['Planeta8.jpg', 'Planeta11.jpg', 'Planeta7.jpg'],
        Mixto: ['Planeta5.jpg', 'Planeta4.jpg', 'Planeta12.jpg', 'Planeta16.jpg'],
        Ártico: ['Planeta10.jpg', 'Planeta15.jpg', 'Planeta1.jpg', 'Planeta9.jpg'],
        InhabitableCupo1: ['Planeta8.jpg'],
        InhabitableCupo5: ['Planeta10.jpg', 'Planeta14.jpg']
    },
    rutaImagenes: '/Planetas/'
};

// Seleccionar calificación según probabilidades
function seleccionarCalificacion(cupo) {
    console.log('Seleccionando calificación para cupo:', cupo);
    const probs = galaxiasConfig.probabilidades[cupo];
    const rand = Math.random();
    let acum = 0;
    for (const calificacion in probs) {
        acum += probs[calificacion];
        if (rand <= acum) {
            console.log('Calificación seleccionada:', calificacion);
            return calificacion;
        }
    }
    console.warn('Usando calificación de respaldo: Árido');
    return 'Árido'; // Fallback
}

// Seleccionar imagen aleatoria según clasificación y cupo
function seleccionarImagen(calificacion, cupo) {
    console.log('Seleccionando imagen para calificación:', calificacion, 'cupo:', cupo);
    let imagenes;
    if (calificacion === 'Inhabitable') {
        imagenes = cupo === 1 ? galaxiasConfig.imagenes.InhabitableCupo1 : galaxiasConfig.imagenes.InhabitableCupo5;
    } else {
        imagenes = galaxiasConfig.imagenes[calificacion];
    }
    if (!imagenes || imagenes.length === 0) {
        console.warn(`No hay imágenes para ${calificacion} en cupo ${cupo}, usando fallback`);
        return `${galaxiasConfig.rutaImagenes}Planeta8.jpg`; // Fallback
    }
    const indiceAleatorio = Math.floor(Math.random() * imagenes.length);
    const imagen = `${galaxiasConfig.rutaImagenes}${imagenes[indiceAleatorio]}`;
    console.log('Imagen seleccionada:', imagen);
    return imagen;
}

// Generar galaxias, sistemas y planetas
function generarGalaxias() {
    console.log('Generando galaxias...');
    const galaxias = galaxiasConfig.galaxias.map(galaxia => {
        const sistemas = [];
        let planetasRestantes = galaxia.planetasPorGalaxia;
        const planetasPorSistema = [];

        // Distribuir planetas equitativamente
        const minPlanetasPorSistema = Math.floor(planetasRestantes / galaxia.sistemas);
        const sistemasConExtra = planetasRestantes % galaxia.sistemas;

        for (let i = 0; i < galaxia.sistemas; i++) {
            let numPlanetas = minPlanetasPorSistema;
            if (i < sistemasConExtra) {
                numPlanetas += 1;
            }
            numPlanetas = Math.min(Math.max(numPlanetas, 1), 5);
            planetasPorSistema.push(numPlanetas);
            planetasRestantes -= numPlanetas;
        }

        // Ajustar si hay planetas restantes
        let index = 0;
        while (planetasRestantes > 0 && index < galaxia.sistemas) {
            if (planetasPorSistema[index] < 5) {
                planetasPorSistema[index]++;
                planetasRestantes--;
            }
            index++;
        }

        // Generar sistemas
        for (let i = 1; i <= galaxia.sistemas; i++) {
            const sistemaId = String(i).padStart(2, '0');
            const numPlanetas = planetasPorSistema[i - 1];
            const planetas = [];

            for (let j = 1; j <= numPlanetas; j++) {
                const planetaId = String(j).padStart(2, '0');
                const nombre = `${galaxia.inicial}:${sistemaId}:${planetaId}`;
                const calificacion = seleccionarCalificacion(j);
                const imagen = seleccionarImagen(calificacion, j);
                planetas.push({
                    id: nombre,
                    nombre: nombre,
                    calificacion: calificacion,
                    dueno: null,
                    imagen: imagen
                });
            }

            sistemas.push({
                id: sistemaId,
                planetas: planetas
            });
        }

        return {
            id: galaxia.id,
            nombre: galaxia.id.charAt(0).toUpperCase() + galaxia.id.slice(1),
            sistemas: sistemas
        };
    });

    console.log('Galaxias generadas:', galaxias);
    return galaxias;
}

// Validar estructura de galaxias
function validarGalaxias(galaxias) {
    console.log('Validando estructura de galaxias...');
    if (!Array.isArray(galaxias) || galaxias.length !== 2) {
        console.warn('Fallo: Número incorrecto de galaxias');
        return false;
    }
    return galaxias.every(galaxia => {
        if (!galaxia.id || !galaxia.nombre || !Array.isArray(galaxia.sistemas) || galaxia.sistemas.length !== 5) {
            console.warn('Fallo: Estructura de galaxia inválida', galaxia.id);
            return false;
        }
        let totalPlanetas = 0;
        const sistemasValidos = galaxia.sistemas.every(sistema => {
            if (!sistema.id || !Array.isArray(sistema.planetas) || sistema.planetas.length < 1 || sistema.planetas.length > 5) {
                console.warn('Fallo: Estructura de sistema inválida', sistema.id);
                return false;
            }
            totalPlanetas += sistema.planetas.length;
            return sistema.planetas.every(planeta => {
                const isValid = (
                    planeta.id &&
                    planeta.nombre &&
                    galaxiasConfig.calificaciones.includes(planeta.calificacion) &&
                    (planeta.imagen && typeof planeta.imagen === 'string')
                );
                if (!isValid) {
                    console.warn('Fallo: Estructura de planeta inválida', planeta.id);
                }
                return isValid;
            });
        });
        const isTotalValid = totalPlanetas === 20;
        if (!isTotalValid) {
            console.warn('Fallo: Número incorrecto de planetas en galaxia', galaxia.id, totalPlanetas);
        }
        return sistemasValidos && isTotalValid;
    });
}

// Cargar galaxias desde localStorage o generar nuevas
function cargarGalaxias() {
    console.log('Cargando galaxias desde localStorage...');
    const datos = localStorage.getItem('galaxias');
    if (datos) {
        try {
            const galaxias = JSON.parse(datos);
            if (validarGalaxias(galaxias)) {
                console.log('Galaxias cargadas exitosamente');
                return galaxias;
            } else {
                console.warn('Datos de galaxias inválidos, generando nuevos');
            }
        } catch (error) {
            console.error('Error al cargar galaxias:', error);
        }
    }

    const galaxias = generarGalaxias();
    guardarGalaxias(galaxias);
    return galaxias;
}

// Guardar galaxias en localStorage
function guardarGalaxias(galaxias) {
    try {
        localStorage.setItem('galaxias', JSON.stringify(galaxias));
        console.log('Galaxias guardadas en localStorage');
    } catch (error) {
        console.error('Error al guardar galaxias:', error);
    }
}

// Asignar planeta aleatorio no inhabitable y sin dueño
function asignarPlanetaAleatorio(nombreUsuario) {
    console.log('Asignando planeta aleatorio para usuario:', nombreUsuario);
    let galaxias = cargarGalaxias();
    const planetasDisponibles = [];

    // Recolectar planetas no inhabitables y sin dueño
    galaxias.forEach(galaxia => {
        galaxia.sistemas.forEach(sistema => {
            sistema.planetas.forEach(planeta => {
                if (planeta.calificacion !== 'Inhabitable' && !planeta.dueno) {
                    planetasDisponibles.push({
                        id: planeta.id,
                        nombre: planeta.nombre,
                        calificacion: planeta.calificacion,
                        imagen: planeta.imagen
                    });
                }
            });
        });
    });

    if (planetasDisponibles.length === 0) {
        console.error('No hay planetas disponibles para asignar');
        return null;
    }

    // Seleccionar planeta aleatorio
    const indiceAleatorio = Math.floor(Math.random() * planetasDisponibles.length);
    const planetaSeleccionado = planetasDisponibles[indiceAleatorio];
    console.log('Planeta seleccionado:', planetaSeleccionado);

    // Asignar dueño al planeta
    galaxias = galaxias.map(galaxia => ({
        ...galaxia,
        sistemas: galaxia.sistemas.map(sistema => ({
            ...sistema,
            planetas: sistema.planetas.map(planeta => {
                if (planeta.id === planetaSeleccionado.id) {
                    return { ...planeta, dueno: nombreUsuario };
                }
                return planeta;
            })
        }))
    }));

    // Guardar galaxias actualizadas
    guardarGalaxias(galaxias);
    return planetaSeleccionado;
}

// Inicializar galaxias
function inicializarGalaxias() {
    console.log('Inicializando galaxias...');
    const galaxias = cargarGalaxias();
    return galaxias;
}

// Exportar funciones
window.galaxias = {
    inicializarGalaxias,
    asignarPlanetaAleatorio
};