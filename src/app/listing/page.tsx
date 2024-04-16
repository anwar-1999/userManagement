
"use client"
import React, {
    useEffect,
    useState
} from 'react';
import {
    Drawer,
    Dropdown,
    Form,
    Menu,
    Modal,
    Table
} from 'antd';
import {
    MenuOutlined,
    MoreOutlined
} from '@ant-design/icons';
import AppButtons from '../Components/AppButtons';
import InputWithHead from '../Components/inputWithHead';
import { useRouter } from 'next//navigation';
import { useMediaQuery } from '@react-hook/media-query';
import styles from '../style/ListingScreen.module.scss'
import ButtonStyles from '../style/AppButtons.module.scss'
import { getUserInfo } from '../Utils/SessionStorage';
import { isSuccessType, userDetailsType } from '../Utils/Interface';

export default function ListingScreen() {
    let userInfo: any = getUserInfo()
    function generateRandomId(length: number) {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomId = '';
        for (let i = 0; i < length; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomId;
    }

    function generateUniqueId() {
        const timestamp = new Date().getTime().toString(16); // Convert current timestamp to hexadecimal string
        const randomPart = generateRandomId(16); // Generate a random part of the ID
        return timestamp + randomPart;
    }

    const uniqueId = generateUniqueId();
    const [userData, SetUserData] = useState<any>({
        allData: null,
        items: null
    })

    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isLogout, setisLogout] = useState<boolean>(false)
    const fullScreenView = useMediaQuery('only screen and (min-width: 600px)')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isEditRecord, setIsEditRecord] = useState<any>()
    const [form]: any = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const router: any = useRouter();
    const [isSuccess, SetIsSuccess] = useState<isSuccessType>({
        add: false,
        delete: false,
        edit: false
    })
    const [userDetails, SetUserDetails] = useState<userDetailsType>({
        email: null,
        name: null,
        age: null,
    })

    const menuView = (record: Array<string | number>) => {
        try {
            return (
                <div>
                    <Menu>
                        <Menu.Item>
                            <div className="edit-option-text"
                                onClick={() => editFunc(record)}
                            >
                                Edit</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="edit-option-text"
                                onClick={() => deleteFunc(record)}
                            >
                                Delete</div>
                        </Menu.Item>

                    </Menu>
                </div>
            )
        } catch (error) {
            console.log("Error In menuView", error)
        }
    }

    const columns : any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            align: 'center'
        },
        {
            title: 'Action',
            dataIndex: '',
            align: 'center',
            render: (item: any, record: any) => {
                return (
                    <>
                        < div
                            className={styles.editDelete}
                        >{fullScreenView ?
                            <>
                                <div
                                    style={{ marginRight: '10px' }}
                                >

                                    <AppButtons
                                        buttonType={ButtonStyles.greyBtn}
                                        text={"Edit"}
                                        block={true}
                                        onClick={() => editFunc(record)}

                                    />
                                </div>
                                <div>
                                    <AppButtons
                                        buttonType={ButtonStyles.redBtn}
                                        text={"Delete"}
                                        block={true}
                                        onClick={() => deleteFunc(record)}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <Dropdown overlay={
                                    menuView(record)}
                                    placement="bottomRight" className="moreIcon-svg mid-center" arrow>
                                    <MoreOutlined rev={undefined} />
                                </Dropdown>
                            </>
                            }
                        </div >
                    </>
                );
            }

        },
    ];

    useEffect(() => {

        // intially creating 2 Tenants
        let myObj =
            [
                {
                    "_id": "6613e59fb6787603e855c1b8",
                    "email": "tenantOne@gmail.com",
                    "name": "TenantOne",
                    "age": "25"
                },
                {
                    "_id": "66152d08b6787603e855c645",
                    "email": "tenantTwo@gmail.com",
                    "name": "TenantTwo",
                    "age": "26"
                }
            ]
        SetUserData({ ...userData, allData: myObj })
    }, [])

    useEffect(() => {
        if (isSuccess?.add == true) {
            SetIsSuccess({ ...isSuccess, add: false })
            setIsModalOpen(false);
            setIsDelete(false)
        } else if (isSuccess?.delete == true) {
            SetIsSuccess({ ...isSuccess, delete: false })
            setIsModalOpen(false);
            setIsDelete(false)
        } else if (isSuccess?.edit == true) {
            SetIsSuccess({ ...isSuccess, edit: false })
            setIsModalOpen(false);
            setIsEdit(false)
        }
    }, [isSuccess])

    const deleteData = async (_id: string) => {
        try {
            SetIsSuccess({ ...isSuccess, delete: true })
            const updatedAllData: any = userData.allData.filter((item: any) => item._id !== _id);
            SetUserData((prevState: any) => ({
                ...prevState,
                allData: updatedAllData
            }));
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    };

    const deleteFunc = (record: any) => {
        setIsDelete(true)
        setIsModalOpen(true)
        SetUserData({ ...userData, items: record })
    }

    const prepopulate = (value: any) => {
        form.setFieldsValue({
            ['name-form']: value && value?.name,
            ['email-form']: value && value?.email,
            ['age-form']: value && value?.age,
        })
        SetUserDetails(
            {
                ...userDetails,
                email: value?.email,
                name: value?.name,
                age: value?.age
            })
    }

    const editFunc = (record: Array<string | number>) => {
        setIsEdit(true)
        prepopulate(record)
        setIsEditRecord(record)
        setIsModalOpen(true)
    }

    const logoutFunc = () => {
        setisLogout(true)
        setIsModalOpen(true)
        setOpen(false)
    }

    const contentVeiw = () => {
        try {
            return (
                <div
                    className={styles.listContentView}
                >
                    <div
                        className={styles.topBar}
                    >
                        <div
                            style={{
                                color: 'white',
                                fontFamily: 'cursive',
                                fontSize: '15px'
                            }}
                        >
                            Tenants
                        </div>
                        {fullScreenView ?
                            <div
                                className={styles.addLogout}
                            > {userInfo?.roleId == 1 &&

                                <div
                                    style={{ marginRight: '10px' }}
                                >
                                    <AppButtons
                                        buttonType={ButtonStyles.addBlueBtn}
                                        text={"Add"}
                                        block={true}
                                        onClick={() => showModal()}
                                    />
                                </div>
                                }
                                <div
                                    style={{ marginRight: '10px' }}

                                >
                                    <AppButtons
                                        buttonType={ButtonStyles.greyBtn}
                                        text={"Reset Pwd"}
                                        block={true}
                                        onClick={() => router.push('/reset-password')}
                                    />
                                </div>
                                <div>
                                    <AppButtons
                                        buttonType={ButtonStyles.redBtn}
                                        text={"Logout"}
                                        block={true}
                                        onClick={() => logoutFunc()}
                                    />
                                </div>
                            </div>
                            :
                            <span
                                style={{ color: 'white' }}
                                onClick={() => { setOpen(true) }}
                            > <MenuOutlined rev={undefined} /></span>
                        }
                    </div>
                    <div
                        className={styles.tableContainer}
                    >
                        <Table
                            dataSource={userData && userData?.allData}
                            columns={userInfo?.roleId == 1 ? columns : (columns || []).slice(0, 3)}
                            pagination={false}
                        />
                    </div>
                </div>
            )
        } catch (error) {
            console.log("Error in contentVeiw :: ", error);
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDelete(false);
        setisLogout(false)
    };

    const onChangeInput = (e: any, key: string) => {
        SetUserDetails({ ...userDetails, [key]: e })
    }

    const onSave = () => {
        if (isEdit == true) {
            const updatedAllData = (userData || [])?.allData.map((item: any) => {
                if (item._id === isEditRecord?._id) {
                    return {
                        ...item,
                        name: userDetails?.name,
                        age: userDetails?.age,
                        email: userDetails?.email
                    };
                }
                return item;
            });
            SetUserData((prevState: any) => ({
                ...prevState,
                allData: updatedAllData
            }));
            SetIsSuccess({ ...isSuccess, edit: true })
        } else {
            const userDetailsWithId = { ...userDetails, _id: uniqueId };
            SetUserData((prevState: any) => ({
                ...prevState,
                allData: [...prevState.allData, userDetailsWithId]
            }));
            SetIsSuccess({ ...isSuccess, add: true })
        }
    }

    const modalView = () => {
        try {
            return (
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={fullScreenView ? "50%" : "90%"}
                    className={styles.ConfirmationUserPopUp}

                >{isLogout ?
                    <div>
                        <div>
                            <div
                                style={
                                    {
                                        color: 'black',
                                        fontFamily: 'sans-serif',
                                        fontSize: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                }
                            >
                                Are you Sure, Do you want Logout ?
                            </div>

                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '20px',
                                alignItems: 'center'
                            }}
                        >
                            <div
                                style={{ marginRight: '10px' }}
                            >
                                <AppButtons
                                    buttonType={ButtonStyles.cancelBtn}
                                    text={"Cancel"}
                                    block={true}
                                    onClick={() => { setIsModalOpen(false); setIsEdit(false); setIsDelete(false); setisLogout(false) }}
                                />
                            </div>
                            <div>
                                <AppButtons
                                    buttonType={ButtonStyles.redBtn}
                                    text={"Logout"}
                                    block={true}
                                    onClick={() => { setisLogout(false); router.push('/login') }}
                                />
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        {isDelete ?
                            <div>
                                <div>
                                    <div
                                        style={
                                            fullScreenView ?
                                                {
                                                    color: 'black',
                                                    fontFamily: 'sans-serif',
                                                    fontSize: '18px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }
                                                :
                                                {
                                                    color: 'black',
                                                    fontFamily: 'sans-serif',
                                                    fontSize: '16px',
                                                }
                                        }
                                    >
                                        Are you Sure, Do you want delete <span
                                            style={{
                                                fontFamily: 'sans-serif',
                                                fontWeight: 'bold',
                                                marginLeft: '5px',
                                                marginRight: '5px'
                                            }}
                                        >{userData?.items?.name}</span> ?
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginTop: '20px',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div
                                        style={{ marginRight: '10px' }}
                                    >
                                        <AppButtons
                                            buttonType={ButtonStyles.cancelBtnRed}
                                            text={"Cancel"}
                                            block={true}
                                            onClick={() => { setIsModalOpen(false); setIsEdit(false); setIsDelete(false); setisLogout(false) }}
                                        />
                                    </div>
                                    <div>
                                        <AppButtons
                                            buttonType={ButtonStyles.redBtn}
                                            text={"Delete"}
                                            block={true}
                                            onClick={() => deleteData(userData?.items?._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                            :
                            <Form
                                id="form"
                                form={form}
                                autoComplete="off"
                                noValidate
                                onFinish={() => onSave()}
                            >
                                <div
                                    className={styles.addEditContainer}
                                >
                                    <div>
                                        <div
                                            className={styles.fieldTitle}
                                        >
                                            Name
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="name-form"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please enter a name'
                                                    },
                                                    { pattern: /^[a-zA-Z]+$/, message: "Space,digits and Special Characters are not allowed" },

                                                ]}
                                            >
                                                <InputWithHead
                                                    onChange={(e: any) => onChangeInput(e?.target?.value, "name")}
                                                />
                                            </Form.Item>
                                        </div>
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
                                                    onChange={(e: any) => onChangeInput(e?.target?.value, "email")}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            className='field-title'
                                        >
                                            Age
                                        </div>
                                        <div>
                                            <Form.Item
                                                name="age-form"
                                                rules={[

                                                    {
                                                        required: true,
                                                        message: 'Please enter a age'
                                                    }
                                                ]}
                                            >
                                                <InputWithHead
                                                    type='number'
                                                    onChange={(e: any) => onChangeInput(e?.target?.value, "age")}
                                                />
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div
                                        style={
                                            fullScreenView ?
                                                {
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    marginTop: '20px',
                                                    alignItems: 'center'
                                                }
                                                :
                                                {
                                                    justifyContent: 'center',
                                                    marginTop: '20px',
                                                    alignItems: 'center'
                                                }
                                        }
                                    >
                                        <div
                                            style={
                                                fullScreenView ?
                                                    { marginRight: '10px' }
                                                    :
                                                    {}
                                            }
                                        >
                                            <AppButtons
                                                buttonType={ButtonStyles.cancelBtnRed}
                                                text={"Cancel"}
                                                block={true}
                                                onClick={() => { setIsModalOpen(false); setIsEdit(false); setisLogout(false) }}
                                            />
                                        </div>
                                        <div
                                            style={
                                                fullScreenView ?
                                                    {}
                                                    :
                                                    { marginTop: '10px' }
                                            }
                                        >
                                            <AppButtons
                                                buttonType={ButtonStyles.addBlueBtn}
                                                text={"Submit"}
                                                htmlType='submit'
                                                block={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        }
                    </>
                    }
                </Modal >
            )

        } catch (error) {
            console.log("Error in modalView :: ", error);
        }
    }

    const onClose = () => {
        setOpen(false);
    };

    const addModule = () => {
        setOpen(false)
        showModal()
    }

    const drawerView = () => {
        try {
            return (
                <>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        width={"25%"}
                    >
                        <div>
                            {userInfo?.roleId == 1 &&
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'darkgrey',
                                        color: 'white',
                                        fontWeight: 500
                                    }}
                                    onClick={() => addModule()}

                                >
                                    Add
                                </div>
                            }
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'darkgrey',
                                    color: 'white',
                                    fontWeight: 500
                                }}
                                onClick={() => logoutFunc()}
                            >
                                Logout

                            </div>
                        </div>
                    </Drawer>
                </>
            )

        } catch (error) {
            console.log("Error in ");

        }
    }

    return (
        <div
            className={styles.listingScreenContainer}
        >
            {contentVeiw()}
            {modalView()}
            {drawerView()}
        </div>
    );
}

