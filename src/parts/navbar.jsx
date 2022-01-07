import React from 'react';

function NavBar() {
  return (
    <div className="flex justify-end w-11/12 mt-4">
      <ul className="flex justify-between">
        <li className="bg-red-500 font-semibold p-2 rounded-lg text-white">
          <a href="/">Iniciar Sesion</a>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
