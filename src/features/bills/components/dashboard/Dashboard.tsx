import { useState } from "react";
import { BillsByID } from "../../shared/models.ts";
import Table from "../Table/Table.tsx";
import MyCalendar from "../Calendar/Calendar.tsx";
import "./Dashboard.css";

interface DashboardProps {
  bills: BillsByID[];
  onDeleteBill: (id: string) => void;
}

function Dashboard({ bills, onDeleteBill }: DashboardProps) {
  const handleDeleteBill = (id: string) => {
    onDeleteBill(id);
  };
  const [view, setView] = useState<"table" | "calendar">("table");

  return (
    <div className="container">

      <div className="view-toggle">
        <small>Escoge tu vista</small>
        <div>
          <button
            onClick={() => setView("table")}
            className={`btn btn--small ${view === "table" ? "active" : ""}`}
          >
            Tabla
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`btn btn--small ${view === "calendar" ? "active" : ""}`}
          >
            Calendario
          </button>
        </div>
      </div>

      <hr />

      <div className="table__container">
        {view === "table" ? (
          <Table bills={bills} onDelete={handleDeleteBill} />
        ) : (
          <MyCalendar />
        )}
      </div>

      {/* <div className="table__container">
        <Table bills={bills} onDelete={handleDeleteBill} />
      </div> */}
    </div>
  );
}

export default Dashboard;
