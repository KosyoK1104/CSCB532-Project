import {useSelector} from "react-redux";
import Loader from "./Loader";

const LoaderProvider = ({children}) => {
    const loading = useSelector(state => state.loading.loading);
    return (
        <>
            {loading > 0 ? <Loader/> : ''}
            {<div className={`${loading > 0 ? 'display-hidden' : ''}`}>{children}</div>}
        </>
    );
}

export default LoaderProvider;
