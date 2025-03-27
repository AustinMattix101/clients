import { logo192 } from '../logo';
import '../../app/App.css';

const getLoadingMarkup = (): JSX.Element => {
  return (
    <>
      <div className="App mt-bg-dark">
        <div className="App-header mt-bg-black">
          <div className="py-4 text-center">
            <img src={logo192} className="App-logo" alt="logo" />
            <h2 className="App-link font-bold mt-2">Loading...</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default getLoadingMarkup;