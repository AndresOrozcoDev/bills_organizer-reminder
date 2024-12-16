import { Fragment, useState } from "react";
import Avatar from '../../../../assets/img/avatar-man.svg';
import Lenguage from '../../../../assets/img/usa.png';
import Logo from '../../../../assets/logo/favicon.png';
import "./Header.css";


interface HeaderProps {
  user: { email: string } | null;
  onSignOut: () => void;
}

function Header({ user, onSignOut }: HeaderProps) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <Fragment>
      <header>
        <div className="header--left">
          <div className="icon__container">
            <img
              src={Logo}
              className="form__logo"
              alt="Uko Logo"
            />
          </div>
        </div>
        <div className="header--right">
          <button>
            <div className="icon__container">
              <img src={Lenguage} alt="English" />
            </div>
          </button>
          <button onClick={toggleDropdown}>
            <div className="icon__container">
              <img src={Avatar} alt="Avatar man" />
            </div>
          </button>
        </div>
      </header>

      {isDropdownVisible && (
        <div className="dropdown">
          <div className="dropdowm__account">
            <button>
              <div className="icon__container">
                <img src={Avatar} alt="Avatar man" />
              </div>
              <p className="ellipsis">{user ? user.email : "Invitado"}</p>
            </button>
          </div>
          <hr></hr>
          <div className="dropdowm__buttons">
            <button onClick={onSignOut}>Cerrar sesion</button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Header;
