const FormErrorWrapper = ({children, error}) => {
    return (
        <div className="form-group has-validation w-100">
            <div className={`${error ? 'is-invalid' : ''}`}>
                {children}
            </div>
            {error && (
                <span className="invalid-feedback" style={{opacity: '80%'}} role="alert">
                    <strong>{error}</strong>
                </span>
            )}
        </div>
    );
}

export default FormErrorWrapper;
