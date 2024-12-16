import "./Table.css";
import ViewIcon from "../../../../assets/icon/file-image-regular.svg";

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
            <a href="" title="View bill">
              <img src={ViewIcon} alt="Ver" />
            </a>
          </td>
        </tr>
        <tr>
          <td>Claro</td>
          <td>43.000</td>
          <td>Dia 6</td>
          <td>
            <small className="status--column">Pendiente</small>
          </td>
          <td>
            <a href="" title="View bill">
              <img src={ViewIcon} alt="Ver" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
