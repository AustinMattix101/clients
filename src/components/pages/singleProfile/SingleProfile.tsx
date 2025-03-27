import { Link, useParams } from "react-router-dom"

const SingleProfile: React.FC = () => {
    const { username } = useParams();
  return (
    <section className="section product">
      <div className="fixed-container">
        <div className="container">
          <div className="App">
            <div className="h1">Single Profile</div>
            <h3>{username}</h3>
            <Link to="/profile">Back to Profile</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProfile