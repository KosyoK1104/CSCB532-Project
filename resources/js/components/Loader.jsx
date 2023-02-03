import './Loader.css';
import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className="loader">
            <ReactLoading type="spin" color="#3498db" className="loader__spinner"/>
        </div>
    )
}
//
export default Loader
