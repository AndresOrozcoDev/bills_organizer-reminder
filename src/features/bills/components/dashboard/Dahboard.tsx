import { BillsByID } from '../../shared/models.ts';
import Table from '../Table/Table.tsx'
import "./Dashboard.css";

interface DashboardProps {
  bills: BillsByID[];
  onDeleteBill: (id: string) => void;
}


function Dashboard({ bills, onDeleteBill }: DashboardProps) {

  const handleDeleteBill = (id: string) => {
    onDeleteBill(id);
  };
  
  return (
    <div className="container">
      <div className="options__container">
        <input type="text" className="dashboard__input" placeholder="Buscar factura..."/>
        <a href="/bill" className='btn'>Agregar factura</a>
      </div>
      <div className="table__container">
        <Table bills={bills} onDelete={handleDeleteBill} />
      </div>
    </div>
  );
}

export default Dashboard;
