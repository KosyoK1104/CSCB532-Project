const InfoLine = ({label, value}) => {

    return (
        <div className={`form-group w-100`}>
            <label htmlFor={"recipient"}>{label}</label>
            <input type="text" className="form-control" id="recipient" name="recipient"
                   disabled
                   value={value}/>
        </div>
    )
}

export default InfoLine;
