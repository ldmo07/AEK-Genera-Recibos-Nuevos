//Lista de las entidades de financiacion
export const lstEntidadFinanciacion = [
    { idEntidad: 1, texto: "COOP-UNINIMINUTO", desCondicion: "Val.a fin. Coop", codCondicion: "ZDFI" },
    { idEntidad: 2, texto: "COLSUBSIDIO", desCondicion: "Val.a fin. Cols", codCondicion: "ZFCB" }
]

export const lstOpcionesDonacion = [
    { id: 1, texto: "No deseo Donar", montoDonacion: 0 },
    { id: 2, texto: "Donar $5.000", montoDonacion: 5000 },
    { id: 3, texto: "Donar $10.000", montoDonacion: 10000 },
    { id: 4, texto: "Donar $20.000", montoDonacion: 20000 }
]

export const CodigosCombinacionPago = [
    { Codigo: "ZTDE", descripcion: "Pago tarjeta Debito" },
    { Codigo: "ZTCR", descripcion: "Pago tarjeta crédito" },
    { Codigo: "ZCHE", descripcion: "Pago con cheke" }
]

export const valorMinimoFinanciar = 200000;
export const valorMinimoCombinacionPago=10000;

export const mensajeConfirmacionGenerarRecibo = `<h2>Antes de generar su recibo recuerde:</h2></br>
*Realizar el pago de un solo recibo.</br></br>
*Verificar que la información del recibo sea correcta y realizar el pago antes de la fecha indicada, si no está de acuerdo con el valor a pagar, acérquese al área de facturación de su sede.
</br></br>
Está seguro de realizar la generación de recibo con estas condiciones?`;