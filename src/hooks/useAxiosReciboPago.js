import axios from "axios";
import { mostrarAlertaError } from "../helpers/alertasHelper";
import { urlGenerarReciboPago, apikey, urlRutaBaseRecibos,urlGenearIdPSE } from "../helpers/serviciosUrl";

export const useAxiosReciboPago = () => {

    const generarReciboPago = async (userData = {}, infoPrograma = {}, infoCondicionesPago = [{}]) => {

        //console.log("recibo GNERAR", { infoCondicionesPago });

        //creo un nuevo arreglo de objeto que tome los TipoCondicion duplicados y tome el ultimo valor es decir el valor mas actualizado
        let infoCondicionesPagoSinDuplicados = Object.values(
            infoCondicionesPago.reduce((acc, obj) => {
                acc[obj.TipoCondicion] = obj;
                return acc;
            }, {})
        );

        //console.log({infoCondicionesPagoSinDuplicados});


        const dataContract = {
            GenerarReciboPago: {
                GenerarReciboPago: {
                    FechaAdmision: infoPrograma[0].FechaAdmision,//"202350",
                    EstudianteId: userData.UidEstudiante,//"000744451",
                    Jornada: infoPrograma[0].Jornada,//"D",
                    CodeNivelAcademico: infoPrograma[0].CodeNivelAcademico,//"UG",
                    SedeId: infoPrograma[0].SedeID,//"IEV",
                    ProgramaAcademicoId: infoPrograma[0].ProgramaAcademicoID,//"PSID",
                    Email: userData.Email,//"stefania.betancourt@uniminuto.edu.co",
                    CondicionesFacturacion: {
                        //CondicionFacturacion: infoCondicionesPago
                        CondicionFacturacion: infoCondicionesPagoSinDuplicados
                    }
                }
            }
        }

        //console.log(dataContract);

        const url = urlGenerarReciboPago;//'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/consultas-financieras/GenerarReciboPago';
        const headers = {
            'apikey': apikey,//'uxpWFePgheXvuP9Tun8TYxvjb0FgeSLH',
            'Content-Type': 'application/json',
            'SOAPAction': 'GenerarReciboPago'
        };
        try {

            const { data } = await axios.post(url, dataContract, { headers });
            const { ReciboPago } = data.Envelope.Body.GenerarReciboPagoResponse.GenerarReciboPagoResponse;
            console.log("Recibo", { ReciboPago });
            return {
                ...ReciboPago,
                urlRecibo: `${urlRutaBaseRecibos}/${ReciboPago.IdArchivo}`//`https://www.uniminuto.edu/repoqa/${ReciboPago.IdArchivo}`
            }
        } catch (error) {
            console.log({ error });
            mostrarAlertaError("Ocurrio un fallo al generar el recibo");
        }



    }

    const obtenerIdPSE = async (IdImporte,PeriodoId,datosEstudiante) => {

        const dataContract = {
            Estudiante: {
                valorTotal: IdImporte.replace(/\./g, ''),// elimino los puntos del importe"4094290",
                valorIva: "0",
                recibo_pago: PeriodoId,//"0057128637",
                descripcion_pago: "Pago de matrícula Uniminuto",
                email: datosEstudiante.EmailInstitucional,//"dpinzono@uniminuto.edu.co",
                idEstudiante: datosEstudiante.UidEstudiante,//"000065646",
                nombres: datosEstudiante.Nombre, //"DIANA PILAR",
                apellidos: datosEstudiante.Apellido,//"PINZON ORJUELA",
                telefono: datosEstudiante.TelefonoMovil//"3154372348"
            }
        }
        //console.log("$$$$$$",dataContract);
        const url = urlGenearIdPSE;//'https://uniminuto.test.digibee.io/pipeline/uniminuto/v1/pasarelas-pago/linkPagoZonaPagos';
        const headers = {
            'apikey': apikey,//'uxpWFePgheXvuP9Tun8TYxvjb0FgeSLH',
            'Content-Type': 'application/json',
            'SOAPAction': 'ZonaPagosPSE'
        };
        try {

            const { data } = await axios.post(url, dataContract, { headers });
            const { inicio_pagoV2Result } = data.inicio_pagoV2Response;
            console.log("PSE", { inicio_pagoV2Result });
            // return {
            //    idPse:inicio_pagoV2Result
            // }
            return inicio_pagoV2Result;

        } catch (error) {
            console.log({ error });
            mostrarAlertaError("Ocurrio un fallo al generar el id de PSE");
            return "";
        }
    }

    return {
        generarReciboPago,
        obtenerIdPSE
    }


}
