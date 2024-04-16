"use client"
import {
    Form,
    Input,
    Radio,
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
    setAllUserInfo,
} from '../Utils/SessionStorage';
import { signupInputsTypes } from '../Utils/Interface';

export default function SignUp() {
    const [form]: any = Form.useForm();
    const router: any = useRouter();
    let userDataJson: any = getAllUserInfo() && getAllUserInfo()
    const [signupInputs, setSignUpInputs] = useState<signupInputsTypes>({
        email: null,
        password: null,
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
                            Create Account
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
                                        onChange={(e: any) => setSignUpInputs({ ...signupInputs, email: e.target.value })}
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
                                        onChange={(e: any) => setSignUpInputs({ ...signupInputs, password: e.target.value })}
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
                        <div>
                            <Form.Item
                                name="role"
                                rules={[
                                    { required: true, message: 'Please select a role' }
                                ]}
                            >
                                <Radio.Group
                                    onChange={(e: any) => setSignUpInputs({ ...signupInputs, roleId: e.target.value })}
                                    value={signupInputs?.roleId}
                                >
                                    <Radio value={1}>Admin</Radio>
                                    <Radio value={2}>manager</Radio>
                                    <Radio value={3}>user</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div
                            style={{
                                marginTop: '45px'
                            }}
                        >
                            <AppButtons
                                buttonType={ButtonStyles.addBlueBtn}
                                text={"Sign Up"}
                                htmlType='submit'
                                block={true}
                            />
                        </div>
                        <div
                            className='mid-center'
                            style={{
                                margin: '10px 0px',
                                color: 'black'
                            }}
                        >
                            Already have an Account? <span
                                style={{
                                    textDecoration: 'underline',
                                    color: "blue",
                                    margin: '0px 5px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                                onClick={() => router.push('/login')}
                            >Login</span>
                        </div>
                    </div>

                </div>
            )
        } catch (error) {
            console.log("Error in loginContentView :: ", error);
        }
    }

    const gotoListing = () => {
        try {
            let userThere: boolean = (userDataJson || [])?.find((x: any) => x?.email == signupInputs?.email)
            if (!userThere) {
                const updatedOldobj = [...userDataJson, signupInputs];
                setAllUserInfo(updatedOldobj);
                router.push('/login')
            } else {
                message.error('Email Already Exists')
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