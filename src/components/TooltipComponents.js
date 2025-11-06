import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import Popup from 'reactjs-popup'

const contentStyle = { background: '#FFFFE1' };
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' };

export const TooltipComponents = ({ mensaje, claseColorTailwind }) => {
    return (
        // <Popup className="flex items-center inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        //     trigger={<span className="button" type="button"> <FaQuestion className="text-blue-500" /> </span>}
        //     {...{ contentStyle, overlayStyle, arrowStyle }}
        // >
        //     <span>{mensaje}</span>
        // </Popup>
        <Popup
            className="flex items-center inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            trigger={<span className="button" type="button"><div style={{ 
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#779B00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <FaQuestion className={claseColorTailwind} />
              </div>
                </span>}
            contentStyle={{ width: "300px", ...contentStyle }} // Aquí estableces el ancho fijo
            {...{ overlayStyle, arrowStyle }}
        >
            {/* <span>{mensaje}</span> */}
            <div dangerouslySetInnerHTML={{ __html: mensaje }} />
        </Popup>

        

    )
}
