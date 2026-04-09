import { useEffect, useState, useRef } from 'react';
import { ActivarServiciosDigibeeHelper } from '../helpers/ActivarServiciosDigibeeHelper'; 
import React from 'react'

/*
export const CountdownWrapper = ({ seconds = 30, children }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const total = useRef(seconds);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const iniciarServicios = async () =>{
      console.log('[CountdownWrapper] iniciando ActivarServiciosDigibeeHelper');
      try {
        const res = await ActivarServiciosDigibeeHelper();
        console.log('[CountdownWrapper] ActivarServiciosDigibeeHelper resultado:', res);
      } catch (err) {
        console.error('[CountdownWrapper] error al activar servicios:', err);
      }
    }

    iniciarServicios();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }

    const id = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);

    return () => clearTimeout(id);
  }, [timeLeft]);

  const percent = Math.max(0, Math.min(100, (timeLeft / total.current) * 100));
  const degrees = (percent / 100) * 360;

  if (finished) {
    return <>{children}</>;
  }

  return (
    <div className="countdown-container">
      <div className="countdown-card">
        <div
          className="countdown-circle"
          style={{ background: `conic-gradient(var(--accent) ${degrees}deg, rgba(255,255,255,0.06) ${degrees}deg)` }}
          aria-hidden="true"
        >
          <div className="countdown-inner">
            <div className={`countdown-number ${timeLeft <= 5 ? 'urgent' : ''}`}>
              {timeLeft}
            </div>
            <div className="countdown-subtext">segundos</div>
          </div>
        </div>

        <p className="countdown-text">El formulario estará disponible en</p>
      </div>
    </div>
  );
};
*/

export const CountdownWrapper = ({ seconds = 30, children }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const total = useRef(seconds);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const iniciarServicios = async () =>{
      console.log('[CountdownWrapper] iniciando ActivarServiciosDigibeeHelper');
      try {
        const res = await ActivarServiciosDigibeeHelper();
        console.log('[CountdownWrapper] ActivarServiciosDigibeeHelper resultado:', res);
      } catch (err) {
        console.error('[CountdownWrapper] error al activar servicios:', err);
      }
    }

    iniciarServicios();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }

    const id = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);

    return () => clearTimeout(id);
  }, [timeLeft]);

  const percent = Math.max(0, Math.min(100, (timeLeft / total.current) * 100));
  const degrees = (percent / 100) * 360;

  if (finished) {
    return <>{children}</>;
  }

  return (
    <>
      <style>{`
        :root {
          --accent: #06b6d4;
          --bg-1: #071025;
          --bg-2: #08122b;
        }

        .countdown-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .countdown-card {
          padding: 2rem 2.5rem;
          border-radius: 28px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow:
            0 30px 80px rgba(2,6,23,0.45),
            inset 0 1px 0 rgba(255,255,255,0.06);
          animation: fadeIn 0.6s ease;
        }

        .countdown-circle {
          --size: clamp(150px, 32vw, 230px);
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 20px 50px rgba(2,6,23,0.45),
            0 0 0 6px rgba(255,255,255,0.03),
            inset 0 8px 22px rgba(255,255,255,0.03);
          transition: background 0.4s ease;
        }

        .countdown-inner {
          width: calc(var(--size) - 36px);
          height: calc(var(--size) - 36px);
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.09), rgba(255,255,255,0.02) 70%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          box-shadow:
            inset 0 10px 22px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .countdown-number {
          font-size: clamp(2.4rem, 6vw, 4.4rem);
          font-weight: 700;
          letter-spacing: 1px;
          color: #f8fafc;
          text-shadow: 0 12px 30px rgba(0,0,0,0.45);
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .countdown-number.urgent {
          color: #fca5a5;
          animation: pulse 1.1s infinite;
        }

        .countdown-subtext {
          font-size: 0.85rem;
          margin-top: 6px;
          color: #e5e7eb;
          opacity: 0.9;
        }

        .countdown-text {
          font-size: 0.95rem;
          letter-spacing: 1px;
          opacity: 0.95;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="countdown-container">
        <div className="countdown-card">
          <div
            className="countdown-circle"
            style={{
              background: `conic-gradient(var(--accent) ${degrees}deg, rgba(255,255,255,0.06) ${degrees}deg)`
            }}
          >
            <div className="countdown-inner">
              <div className={`countdown-number ${timeLeft <= 5 ? 'urgent' : ''}`}>
                {timeLeft}
              </div>
              <div className="countdown-subtext">segundos</div>
            </div>
          </div>

          <p className="countdown-text">
            El formulario estará disponible en
          </p>
        </div>
      </div>
    </>
  );
};