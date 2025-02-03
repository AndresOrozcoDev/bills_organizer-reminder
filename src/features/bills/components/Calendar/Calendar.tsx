import "./Calendar.css";
import { useState, Fragment } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Event = {
  titulo: string;
  dia: Date;
  repeticion: "semanal" | "mensual" | "anual" | "ninguna";
};
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  // Lista de eventos
  const eventos: Event[] = [
    {
      titulo: "Pagar CLARO",
      dia: new Date(2025, 1, 28),
      repeticion: "mensual",
    },
    {
      titulo: "Pagar AMEX",
      dia: new Date(2025, 1, 22),
      repeticion: "mensual",
    },
  ];

  // Función para generar todas las fechas de un evento basado en su repetición
  const getEventDates = (event: Event): string[] => {
    const dates: string[] = [];
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 5; // Hasta 5 años en el futuro

    let date = new Date(event.dia);

    while (date.getFullYear() <= endYear) {
      dates.push(date.toDateString());

      switch (event.repeticion) {
        case "semanal":
          date.setDate(date.getDate() + 7); // Sumar 7 días
          break;
        case "mensual":
          date.setMonth(date.getMonth() + 1); // Sumar 1 mes
          break;
        case "anual":
          date.setFullYear(date.getFullYear() + 1); // Sumar 1 año
          break;
        case "ninguna":
          return dates; // Solo se muestra una vez
      }
    }

    return dates;
  };

  // Obtener todas las fechas marcadas por los eventos
  const eventDays = eventos.flatMap(getEventDates);

  // Función para marcar los eventos en el calendario
  const tileClassName = ({ date }: { date: Date }) => {
    return eventDays.includes(date.toDateString()) ? "event-date" : "";
  };

  // Función para mostrar tooltip con el nombre de los eventos
  const tileContent = ({ date }: { date: Date }) => {
    const eventosDelDia = eventos
      .filter((event) => getEventDates(event).includes(date.toDateString()))
      .map((event) => event.titulo);

    return eventosDelDia.length > 0 ? (
      <span title={eventosDelDia.join(", ")} className="tooltip-event">📌</span>
    ) : null;
  };

  return (
    <Fragment>
      <div className="opt__container">
        <a href="/event" className="btn btn--small d-end">
          Agregar evento
        </a>
      </div>

      <div className="calendar__container">
      <Calendar
          onChange={onChange}
          value={value}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>
    </Fragment>
  );
}

export default MyCalendar;
