import "./Table.css";
import ViewIcon from "../../../../assets/icon/file-image-regular.svg";
import EditIcon from "../../../../assets/icon/pen-to-square-regular.svg";
import DeleteIcon from "../../../../assets/icon/xmark-solid.svg";
import { BillsByID } from "../../shared/models";

interface TableProps {
  bills: BillsByID[];
  onDelete: (id: string) => void;
}

function Table({ bills, onDelete }: TableProps) {
  
  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
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
              <small className={`status--column ${bill.data.status.trim().toLowerCase() === "pendiente" ? "status--pending" : "status--paid"}`}>{bill.data.status}</small>
            </td>
            <td>
            <a href={bill.data.urlBill}>
              <img src={ViewIcon} alt="Ver" />
            </a>
          </td>
          <td>
            <a href={`/bill/${bill.id}`}>
              <img src={EditIcon} alt="Editar" />
            </a>
          </td>
          <td>
            <a onClick={() => handleDelete(bill.id)}>
              <img src={DeleteIcon} alt="Eliminar" />
            </a>
          </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
