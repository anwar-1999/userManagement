"use client"
import {
    Form,
    Input,
    message
} from 'antd';
import { useRouter } from 'next//navigation';
import AppButtons from '../Components/AppButtons';
import InputWithHead from '../Components/inputWithHead';
import { useState } from 'react';
import styles from '../style/Login.module.scss'
import ButtonStyles from '../style/AppButtons.module.scss'
import {
    getAllUserInfo,    
    setAllUserInfo
} from '../Utils/SessionStorage';
import { forgotInputsTypes } from '../Utils/Interface';

export default function Forgot() {
    const [form]: any = Form.useForm();
    const router: any = useRouter();
    let userDataJson: any = getAllUserInfo()
    const [forgotInputs, setForgotInputs] = useState<forgotInputsTypes>({
        email: null,
        password: null,
        otp: null,
        roleId: null
    })

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
                            Forgot Password (OTP - 1234)

                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Email
                            </div>
                            <div
                                style={{
                                    marginBottom: '10px'
                                }}
                            >
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
                                        onChange={(e: any) => setForgotInputs({ ...forgotInputs, email: e.target.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                OTP
                            </div>
                            <div>
                                <Form.Item
                                    name="otp-form"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a otp'
                                        },
                                    ]}
                                >
                                    <InputWithHead
                                        type='number'
                                        onChange={(e: any) => setForgotInputs({ ...forgotInputs, otp: e.target.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        {forgotInputs?.otp === '1234'
                            &&
                            <>
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
                                                onChange={(e: any) => setForgotInputs({ ...forgotInputs, password: e.target.value })}
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className='field-title'>
                                        Confirm Password
                                    </div>
                                    <Form.Item
                                        name="rePassword"
                                        dependencies={['password']}
                                        rules={[
                                            { required: true, message: "Please confirm your new password." },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('The new password and confirm password do not match');
                                                },
                                            })]}
                                    >
                                        <Input.Password
                                            className="input-field-border-bottom"
                                        />
                                    </Form.Item>
                                </div>
                                <div
                                    style={{
                                        marginTop: '45px'
                                    }}
                                >

                                    <AppButtons
                                        buttonType={ButtonStyles.addBlueBtn}
                                        text={"Create Password"}
                                        htmlType='submit'
                                        block={true}
                                    />
                                </div>
                            </>
                        }
                    </div>

                </div>
            )

        } catch (error) {
            console.log("Error in loginContentView :: ", error);
        }
    }

    const gotoLogin = () => {
        try {
            let userThere: boolean = userDataJson.find((x: any) => x?.email == forgotInputs?.email)
            if (userThere) {
                const updatedOldobj = userDataJson.map((obj: any) => {
                    if (obj?.email === forgotInputs?.email) {
                        return { ...obj, password: forgotInputs?.password };
                    }
                    return obj;
                });
                setAllUserInfo(updatedOldobj)
                router.push('/login')
            } else {
                message.error('Email is invalid')
            }
        } catch (error) {
            console.log("Error in gotoLogin :: ", error);
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
                onFinish={() => gotoLogin()}
            >

                {loginContentView()}
            </Form>
        </div>
    );
}