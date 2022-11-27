const DropDownMenu = ({ user }) => {
  return (
    <ul>
      <div className='triangle'></div>
      <li>{user.processes_available} processes available!</li>
    </ul>
  );
}

export default DropDownMenu;