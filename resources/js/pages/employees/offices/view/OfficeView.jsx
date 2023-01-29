import {useParams} from "react-router-dom";

const OfficeView = () => {
    const {id} = useParams();
    return (
        <div>
            <h1>Office View</h1>
            <p>Office ID: {id}</p>
        </div>
    );
}

export default OfficeView;
