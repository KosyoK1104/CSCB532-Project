import PackageViewInfo from "../../../components/package/PackageViewInfo";

const EmployeePackageView = () => {

    return (
        <div className="container">
            <PackageViewInfo></PackageViewInfo>

             {/*TODO: to fix this btn*/}
            <br></br>
            <div>
                <button className="btn btn-primary">Mark as delivered</button>
            </div>
        </div>
    );
}

export default EmployeePackageView;
