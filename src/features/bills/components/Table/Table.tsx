import { BillsByID } from "../../shared/models";
import { FileImage, X, Pencil } from "lucide-react";
import "./Table.css";
import { Fragment } from "react";

interface TableProps {
  bills: BillsByID[];
  onDelete: (id: string) => void;
}

function Table({ bills, onDelete }: TableProps) {
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <Fragment>
      <div className="options__container">
        <input
          type="text"
          className="dashboard__input"
          placeholder="Buscar factura..."
        />
        <a href="/bill" className="btn btn--small">
          Agregar factura
        </a>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Monto</th>
            <th>Limite</th>
            <th>Estado</th>
            <th>Ver</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.data.description}</td>
              <td>{bill.data.amount}</td>
              <td>{bill.data.date}</td>
              <td>
                <small
                  className={`status--column ${
                    bill.data.status.trim().toLowerCase() === "pendiente"
                      ? "status--pending"
                      : "status--paid"
                  }`}
                >
                  {bill.data.status}
                </small>
              </td>
              <td>
                <a
                  href={
                    bill.data.file
                      ? typeof bill.data.file === "string"
                        ? bill.data.file
                        : ""
                      : undefined
                  }
                >
                  <FileImage color="rgb(148, 164, 196)" size={28} />
                </a>
              </td>
              <td>
                <a href={`/bill/${bill.id}`}>
                  <Pencil color="rgb(148, 164, 196)" size={28} />
                </a>
              </td>
              <td>
                <a onClick={() => handleDelete(bill.id)}>
                  <X color="rgb(148, 164, 196)" size={28} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Table;
