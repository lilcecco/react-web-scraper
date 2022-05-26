const DropDownMenu = ({ onLogout }) => {
  return (
    <ul>
        <li>Account</li>
        <li style={borderNone} onClick={onLogout}>Logout</li>

        <div className='triangle'></div>
    </ul>
  );
}

const borderNone = {
  border: 'none'
}

export default DropDownMenu;