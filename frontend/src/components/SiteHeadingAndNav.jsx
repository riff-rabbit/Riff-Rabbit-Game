import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <header>
      <img className="w-100% h-auto" src='/public/top-bar.svg' alt='logo' />
      <div className="flex p-4 justify-between">
      <a id='logo' href='/'>
        <img src='/public/Logo.svg' alt='logo' width='100' height='100' />
      </a>
      <nav>
        <ul>
          {/* <li><NavLink to='/'>Home</NavLink></li> */}

          {
            currentUser
              ? <>
                {/* <li><NavLink to='/users' end={true}>Friends</NavLink></li> */}
                <li className="bg-ct-orange text-white rounded-full px-2 bulge-on-hover hover:bg-ct-hover-purple transition-colors ease-in-out duration-300"><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
              </>
              : <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/sign-up'>Sign Up</NavLink></li>
              </>
          }
        </ul>
      </nav>
      </div>
    </header>
  );
}
