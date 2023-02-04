import PackageViewInfo from "../../../components/package/PackageViewInfo";

const EmployeePackageView = () => {

    return (
        <div className="container">
            <PackageViewInfo></PackageViewInfo>

             {/*TODO: to fix this btn*/}
            <th>
                <button className="btn btn-primary">Mark as delivered</button>
            </th>
        </div>
    );
}

export default EmployeePackageView;
