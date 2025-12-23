import axios from "axios";
import { correoOrigenEncriptado, passTuclave, smtUniminutoEncriptado, urlEnvioCorreos, userTuclave } from "../helpers/serviciosUrl";

export const useAxiosSendEmails = () => {

    const enviarCorreoElectronico = async (correoAlternoDestinatarioEnc, correoInstitucional) => {

        const url = urlEnvioCorreos

        const headers = {
            'Authorization': 'Basic ' + btoa(`${userTuclave}:${passTuclave}`).toString('base64')
        };

        const dataContract = {
            host: smtUniminutoEncriptado,
            port: 25,
            emailRemitente: correoOrigenEncriptado,
            passwordEmailRemitente: "",
            emailReceptor: correoAlternoDestinatarioEnc,
            asunto: "Recordatorio correo institucional",
            cuerpoEmail: `<body>
					<table width="60%">
					  <tr>
						<td colspan="3">
						  <img src="https://portal-na.campusm.exlibrisgroup.com/assets/CorporacionUniversitariaMinutodeDios/CorporacionUniversitariaMinutodeDiosSandbox/New-Image/18-07-2025/logoh.png" " width="130%"
						</td>
					  </tr>
					  <tr>
						<td width="6%"></td>
						<td>
						  <p align="justify">
							<br>
							<h3>&iexcl;Estimado Usuario!</h3>
						   Le informamos que su correo institucional registrado en nuestro sistema es:   <a href="https://formularios.uniminuto.edu/completatuinfo/login/index">${correoInstitucional}</a><br>  <br>
							
. Este será el medio principal para el envío de notificaciones y comunicaciones académicas importantes.
Queremos agradecerte por continuar con tus sue&ntilde;os a pesar de todo y tener en cuenta a UNIMINUTO para que juntos, desarrollemos las habilidades profesionales que ser&aacute;n una de tus herramientas para el futuro. <br><br
			
						 <br>
							Debes cambiar tu contrase&ntilde;a, para ello, ingresa al siguiente enlace y configura tus preguntas de seguridad: <a href="https://tuclave.uniminuto.edu">https://tuclave.uniminuto.edu</a>
						  </p>
						  <p>
							La tecnolog&iacute;a es nuestra aliada y cuando inicies sesi&oacute;n con tu nueva cuenta UNIMINUTO, podr&aacute;s acceder nuestras plataformas:<br><br>
							<ul>
							  <li><a href="https://genesisgo.uniminuto.edu/">Autoservicio G&eacute;nesis+</a></li>
							  <li><a href="http://www.uniminuto.edu/transformaciondigital">Herramientas de Transformaci&oacute;n Digital</a></li>
							  <li><a href="http://biblioteca.uniminuto.edu">Biblioteca</a></li>
							  <li>Wifi en las instalaciones de UNIMINUTO, ingresando a la red UMD_Campus</li>
							</ul>
							<br>
							Recuerda que nuestra oficina de <a href="http://www.uniminuto.edu/web/bienestarinstitucional/inicio">Bienestar Institucional</a> en tu sede, tiene diversas actividades deportivas y culturales donde puedes desarrollar nuevos talentos.<br>
							En caso de presentar alg&uacute;n inconveniente, puedes contactarte a trav&eacute;s de nuestro principal canal de servicio tecnol&oacute;gico en MS Teams con la <a href="https://teams.microsoft.com/_#/conversations/8:orgid:3038cd91-7627-4da1-ad50-814f8ccc0c02?ctx=chat">Mesa de Servicio Estudiantes</a>.<br>
							Tambi&eacute;n podr&aacute;s marcar a la l&iacute;nea de atenci&oacute;n de tu sede, extensi&oacute;n 6622.<br><br>
							Nuevamente, &iexcl;Bienvenido!<br>
							<b>Fraternalmente,</b><br><br>

							<b>UNIMINUTO</b><br>
							#LaUMeCuida
						  </p>
						</td>
						<td width="6%"></td>
					  </tr>
					</table>
				  </body>`,
            codigoSeguridad: ""
        }

        try {
            const { data } = await axios.post(url, dataContract, { headers });
            return data;
        } catch (error) {

            mostrarAlertaError('Ocurrio un fallo al intentar enviar el correo');
        }

    }

    return {
        enviarCorreoElectronico
    }

}
