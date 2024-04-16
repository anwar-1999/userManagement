"use client"
import { Form, Input } from 'antd';
import { useRouter } from 'next//navigation';
import AppButtons from '../Components/AppButtons';
import InputWithHead from '../Components/inputWithHead';
import { useState } from 'react';
import styles from '../style/Login.module.scss'
import ButtonStyles from '../style/AppButtons.module.scss'
import {
    getAllUserInfo,
    getUserInfo,
    setAllUserInfo
} from '../Utils/SessionStorage';
import { signupInputsTypes } from '../Utils/Interface';

export default function Reset() {
    const [form]: any = Form.useForm();
    const router: any = useRouter();
    const [signupInputs, setSignUpInputs] = useState<signupInputsTypes>({
        email: null,
        password: null,
        roleId: null
    })
    let userDataJson: any = getAllUserInfo()
    let userIndividualDataJson: any = getUserInfo()

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
                            Reset Password

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
                                <InputWithHead
                                    disabled={true}
                                    value={userIndividualDataJson?.email}
                                />
                            </div>
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Change Password
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

                        <div
                            style={{
                                marginTop: '45px'
                            }}
                        >
                            <AppButtons
                                buttonType={ButtonStyles.addBlueBtn}
                                text={"Change Password"}
                                htmlType='submit'
                                block={true}
                            />
                        </div>
                        <span
                            className='mid-center'
                            style={{
                                textDecoration: 'underline',
                                color: "blue",
                                margin: '10px 5px',
                                cursor: 'pointer',
                                fontWeight: 'bold',

                            }}
                            onClick={() => router.push('/listing')}
                        >Back</span>

                    </div>
                </div>
            )

        } catch (error) {
            console.log("Error in loginContentView :: ", error);
        }
    }

    const gotoListing = () => {
        try {
            const updatedOldobj = userDataJson.map((obj: any) => {
                if (obj?.email === userIndividualDataJson?.email) {
                    return { ...obj, password: signupInputs?.password };
                }
                return obj;
            });
            setAllUserInfo(updatedOldobj)
            router.push('/login')
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