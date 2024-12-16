import Table from '../Table/Table.tsx'
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="container">
      <div className="options__container">
        <input type="text" className="dashboard__input" placeholder="Buscar factura..."/>
        <button className="btn btn--small">Agregar factura</button>
      </div>
      <div className="table__container">
        <Table />
      </div>
    </div>
  );
}

export default Dashboard;
