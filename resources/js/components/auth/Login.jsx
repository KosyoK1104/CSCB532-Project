import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ClientAuthService from "../../services/ClientAuthService";
import toast from "react-hot-toast";
import Api from "../../services/Api";
import {useDispatch} from "react-redux";
import {Alert, Button, Card, Col, Divider, Form, Input, Row} from 'antd'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: null,
        password: null,
    })
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleLogin(event) {
        setSubmitLoading(true)
        ClientAuthService.login(form)
            .then(result => {
                navigate('/account')
            })
            .catch(error => {
                setError(Api.resolveError(error))
                toast.error(Api.resolveError(error))
            })
            .finally(() => setSubmitLoading(false))
    }

    return (
        <>
            <Row justify={"center"} className="h-100" align={"middle"}>
                <Col span={8}>
                    <Card>
                        <Divider orientation={"center"}>Login</Divider>
                        {error !== null && <Alert message={error} type="error" closable className="mb-3" showIcon
                                                  onClose={() => setError(null)}/>}
                        <Form labelCol={{ span: 4 }}
                              wrapperCol={{ span: 20 }}>
                            <Form.Item label='E-mail' name='email'>
                                <Input name='email' onChange={handleInput}/>
                            </Form.Item>

                            <Form.Item label='Password' name='password'>
                                <Input.Password name='password' onChange={handleInput}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 4, span:20}}>
                                <Button loading={submitLoading} type={"primary"} onClick={handleLogin}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
