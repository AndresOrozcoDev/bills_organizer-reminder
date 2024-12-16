import "./Table.css";
import ViewIcon from "../../../../assets/icon/file-image-regular.svg";
import EditIcon from "../../../../assets/icon/pen-to-square-regular.svg";
import DeleteIcon from "../../../../assets/icon/xmark-solid.svg";


function Table() {
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
        <tr>
          <td>Claro</td>
          <td>43.000</td>
          <td>Dia 6</td>
          <td>
            <small className="status--column">Pendiente</small>
          </td>
          <td>
            <a href="">
              <img src={ViewIcon} alt="Ver" />
            </a>
          </td>
          <td>
            <a href="/bill/1">
              <img src={EditIcon} alt="Editar" />
            </a>
          </td>
          <td>
            <a href="">
              <img src={DeleteIcon} alt="Eliminar" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
