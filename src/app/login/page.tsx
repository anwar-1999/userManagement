"use client"
import { Form, Input, message } from 'antd';
import { useRouter } from 'next//navigation';
import AppButtons from '../Components/AppButtons';
import InputWithHead from '../Components/inputWithHead';
import { useEffect, useState } from 'react';
import styles from '../style/Login.module.scss'
import ButtonStyles from '../style/AppButtons.module.scss'
import { getAllUserInfo, setUserInfo } from '../Utils/SessionStorage';
import { loginInputsTypes } from '../Utils/Interface';

export default function Login() {
    const [form]: any = Form.useForm();
    const router: any = useRouter();
    const [loginInputs, setLoginInputs] = useState<loginInputsTypes>({
        email: null,
        password: null
    })
    let userDataJson: any = getAllUserInfo()

    const loginContentView = () => {
        try {
            return (
                <div
                    className={styles.loginContent}
                >
                    <div
                        className={styles.loginInner}
                    >
                        <div
                            className='field-title'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bolder',
                                color: 'black'
                            }}
                        >
                            Login
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Email
                            </div>
                            <div>
                                <Form.Item
                                    name="email-form"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Please enter Valid email',
                                        },
                                        {
                                            required: true,
                                            message: 'Please enter a email'
                                        }
                                    ]}
                                >
                                    <InputWithHead
                                        onChange={(e: any) => setLoginInputs({ ...loginInputs, email: e?.target?.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Password
                            </div>
                            <div>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter a password' }
                                    ]}
                                >
                                    <Input.Password
                                        className='input-field-border-bottom'
                                        onChange={(e: any) => setLoginInputs({ ...loginInputs, password: e?.target?.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: '45px'
                            }}
                        >
                            <AppButtons
                                buttonType={ButtonStyles.addBlueBtn}
                                text={"Login"}
                                htmlType='submit'
                                block={true}
                            />
                            <div
                                className='mid-center'
                                style={{
                                    margin: '10px 0px',
                                    color: 'black'
                                }}
                            >
                                Not having an Account? <span
                                    style={{
                                        textDecoration: 'underline',
                                        color: "blue",
                                        margin: '0px 5px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                    onClick={() => router.push('/signup')}
                                >Sign up</span>
                            </div>
                            <div
                                className='mid-center mgTB15'
                                onClick={() => router.push('/forgot')}
                                style={{
                                    textDecoration: 'underline',
                                    color: 'blue',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Forgot password
                            </div>

                        </div>
                    </div>
                </div>
            )
        } catch (error) {
            console.log("Error in loginContentView :: ", error);
        }
    }

    useEffect(() => {
        setUserInfo(null)
    }, [])

    const gotoListing = () => {
        try {
            let userDetail = (userDataJson || []).filter((x: any) => x?.email === loginInputs?.email)?.[0]
            setUserInfo(userDetail)
            if (
                (loginInputs?.email === userDetail?.email)
                &&
                (loginInputs?.password === userDetail?.password)
            ) {
                router.push('/listing')
            } else {
                message.error("Invalid email or password")
            }
        } catch (error) {
            console.log("Error in gotoListing :: ", error);
        }
    }

    return (
        <div
            className={styles.loginContainer}
        >
            <Form
                id="form"
                form={form}
                autoComplete="off"
                noValidate
                onFinish={() => gotoListing()}
            >
                {loginContentView()}
            </Form>
        </div>
    );
}