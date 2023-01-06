import React, {useState} from "react";
import ClientAuthService from "../../services/ClientAuthService";
import {useNavigate} from "react-router-dom";
import Api from "../../services/Api";
import {Button, Card, Col, Divider, Form, Input, Row} from "antd";

export default function Register() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        email: [],
        username: [],
        password: [],
        repeat_password: []
    })
    const [form, setForm] = useState({
        email: null,
        username: null,
        password: null,
        repeat_password: null
    })
    const [submitLoading, setSubmitLoading] = useState(false)

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleRegister() {
        setSubmitLoading(true)
        ClientAuthService.register(form)
            .then(response => navigate('/login'))
            .catch(error => {
                setErrors(Api.resolveValidationError(error))
            })
            .finally(() => setSubmitLoading(false))
    }

    return (
        <>
            <Row justify={"center"} align={"middle"}>
                <Col span={8}>
                    <Card>
                        <Divider orientation={"center"}>Register</Divider>
                        <Form labelCol={{span: 5}} wrapperCol={{span: 19}}>
                            <Form.Item label='E-mail' name='email'
                                       validateStatus={errors.email.length > 0 ? "error" : ""}
                                       help={errors.email[0] ?? ''}>
                                <Input name='email' onChange={handleInput}/>
                            </Form.Item>

                            <Form.Item label='Username' name='username'
                                       validateStatus={errors.username.length > 0 ? "error" : ""}
                                       help={errors.username[0] ?? ''}>
                                <Input name='username' onChange={handleInput}/>
                            </Form.Item>

                            <Form.Item label='Password' name='password'
                                       validateStatus={errors.password.length > 0 ? "error" : ""}
                                       help={errors.password[0] ?? ''}>
                                <Input.Password name='password' onChange={handleInput}/>
                            </Form.Item>

                            <Form.Item label='Repeat password' name='repeat_password'
                                       validateStatus={errors.repeat_password.length > 0 ? "error" : ""}
                                       help={errors.repeat_password[0] ?? ''}>
                                <Input.Password name='repeat_password' onChange={handleInput}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 5, span: 19}}>
                                <Button loading={submitLoading} type={"primary"} onClick={handleRegister}>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}
