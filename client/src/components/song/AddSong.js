import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
const { Option } = Select;

const AddSong = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div>
                <h1>Add your song...</h1>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    style={{ width: "500px", margin: "0 auto", padding: "10px" }}
                >
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Date of Release" name="dateOfRelease">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Artists" name="artists">
                        <Select mode="multiple" placeholder="Select artists">
                            {/* {artists.map((artist) => (
                            <Option key={artist}>{artist}</Option>
                        ))} */}
                            <Option>choose</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cover Photo" name="coverImage">
                        <Upload
                            showUploadList={true}
                            listType="picture-card"
                            accept="image/*"
                        // customRequest={uploadImage}
                        >
                            <div>
                                <div style={{ marginTop: 8 }}>Drop/Upload Files Here</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Cover Photo" name="coverImage">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ width: '150px', margin: '5px 15px' }}>+ Add Artist</button>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Fragment>
                                <Button
                                    style={{ width: "25%", padding: "5px" }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                    htmlType="button"
                                    // onClick={() => form.resetFields()}
                                >
                                    {" "}
                                    Save
                                </Button>
                                
                            </Fragment>
                        )}
                    </Form.Item>
                </Form>
            </div>

        </>
    )
}

export default AddSong