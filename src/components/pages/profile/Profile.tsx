import { capitalize } from '../';

const Profile: React.FC = () => {
  const username = localStorage.getItem("Username") || ``;
  const email = localStorage.getItem("Email") || ``;
  return (
    <div className="fixed-container">
      <div className="container">
        <div className="App">
          <header className='h3'>Welcome, {capitalize(username)}</header>
          <header className='h3'>Welcome, {capitalize(email)}</header>
          <div className="h1">Profile</div>
        </div>
      </div>
    </div>
  )
}

export default Profile;