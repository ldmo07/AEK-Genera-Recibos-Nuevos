import axios from "axios";
import { mostrarAlertaError, mostrarAlertaExitoSinTimer, mostrarAlertaFalloSinTimer } from "../helpers/alertasHelper";
import { urlObtenerCondicionesPago, apikey } from "../helpers/serviciosUrl"
export const useAxiosCondicionesPago = () => {


    const obtenerCondicionesPago = async (programa = {}, idEstudiante = '') => {

        const dataContract = {
            ObtenerCondicionesPagoNuevos: {
                ObtenerCondicionesPagoNuevos: {
                    FechaAdmision: programa.FechaAdmision,//"201660",
                    EstudianteId: idEstudiante,//"000065646",
                    Jornada: programa.Jornada,//"N",
                    CodeNivelAcademico: programa.CodeNivelAcademico,//"UG",
                    SedeId: programa.SedeID,//"UMD",
                    ProgramaAcademicoId: programa.ProgramaAcademicoID,//"ISUM"
                }
            }
        };


        const url = urlObtenerCondicionesPago;//'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/consultas-financieras/ObtenerCondicionesPago';
        const headers = {
            'apikey': apikey, //'uxpWFePgheXvuP9Tun8TYxvjb0FgeSLH',
            'Content-Type': 'application/json',
            'SOAPAction': 'ObtenerCondicionesPagoNuevos'
        };

        try {
            const { data } = await axios.post(url, dataContract, { headers });
            if (data.Envelope.Body.ObtenerCondicionesPagoNuevosResponse.ObtenerCondicionesPagoNuevosResponse.CondicionesFacturacion === "") {


                const fechaActual = new Date();
                const dia = fechaActual.getDate();
                const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
                const year = fechaActual.getFullYear();
                const fechaCompleta = `${dia}/${mes}/${year}`; // Formato: DD/MM/YYYY

                const codigo = data.Envelope.Body.ObtenerCondicionesPagoNuevosResponse.ObtenerCondicionesPagoNuevosResponse.ResultadoTransaccion.Codigo;
                const mensaje = data.Envelope.Body.ObtenerCondicionesPagoNuevosResponse.ObtenerCondicionesPagoNuevosResponse.ResultadoTransaccion.Mensaje;
                if (codigo === "Z8008") {
                    mostrarAlertaExitoSinTimer(`${fechaCompleta} Matriculas - El recibo de pago ya fue registrado como pagado, por favor acercarse al área de facturación de su sede`);
                } else {
                    mostrarAlertaFalloSinTimer(`(${fechaCompleta}) Código de error: ${codigo}  Descripción de error:${mensaje}`)
                }
                return;
            }

            const { CondicionFacturacion } = data.Envelope.Body.ObtenerCondicionesPagoNuevosResponse.ObtenerCondicionesPagoNuevosResponse.CondicionesFacturacion;
            //console.log(CondicionFacturacion,data);

            //Filrtos condiciones de pago que no sean ZDU1 O UN ZDU2 , ZRU1 , ZRU2
            const tiposExcluidos = ["ZDU1", "ZDU2", "ZRU1", "ZRU2"];
            const condicionesFacturacionFiltrados = CondicionFacturacion.filter(
                x => !tiposExcluidos.includes(x.TipoCondicion)
            );

            //return CondicionFacturacion;
            return condicionesFacturacionFiltrados;

        } catch (error) {
            mostrarAlertaError("Error consultando Condiciones de pago");
        }
    }

    return {
        obtenerCondicionesPago
    }
}
