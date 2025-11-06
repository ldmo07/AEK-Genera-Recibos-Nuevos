import React from 'react'
export const SpanErrorComponents= ({mensaje}) => {
    return (
        <span className="flex justify-center items-center text-red-500 text-sm m-2 font-medium">
            {mensaje}
        </span>
    )
}


