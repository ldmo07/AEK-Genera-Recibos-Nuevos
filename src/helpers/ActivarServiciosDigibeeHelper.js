
import axios from "axios"


//DATOS DE PRODUCCION
// export const urlObtenerCondicionesPago = 'https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/consultas-financieras';
// export const urlGetUserDetails = 'https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/servicios-banner';
// export const urlObtenerProgramasInscritos = 'https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/estudiante';
//export const urlGenearIdPSE='https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/pasarelas-pago';


//DATOS DE DESARROLLO
export const urlObtenerCondicionesPago = 'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/consultas-financieras';
export const urlGetUserDetails = 'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/servicios-banner';
export const urlObtenerProgramasInscritos = 'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/estudiante';
export const urlGenearIdPSE='https://uniminuto.api.digibee.io/pipeline/uniminuto/v1/pasarelas-pago';



// Este método despierta servicios en Digibee. Añadimos logging y manejo de errores para depuración.
export const ActivarServiciosDigibeeHelper = async () => {
  console.log('[ActivarServiciosDigibeeHelper] iniciando peticiones...');

  try {
    // Ejecutar las 3 peticiones en paralelo para no bloquear por la primera
    const results = await Promise.allSettled([
      axios.get(urlObtenerCondicionesPago),
      axios.get(urlGetUserDetails),
      axios.get(urlObtenerProgramasInscritos),
      axios.get(urlGenearIdPSE)
    ]);

    results.forEach((r, i) => {
      if (r.status === 'fulfilled') {
        console.log(`[ActivarServiciosDigibeeHelper] petición ${i} OK`, r.value?.status, r.value?.config?.url);
      } else {
        console.warn(`[ActivarServiciosDigibeeHelper] petición ${i} FALLÓ`, r.reason);
      }
    });

    return results;
  } catch (err) {
    // Esto no debería ocurrir con allSettled, pero lo dejamos por seguridad
    console.error('[ActivarServiciosDigibeeHelper] error inesperado', err);
    throw err;
  }
}
