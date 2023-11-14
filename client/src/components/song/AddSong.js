import React, { Fragment, useEffect, useState } from "react";
import { Form, Input, Button, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
const { Option } = Select;

const AddSong = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [image, setImage] = useState("");
    const [artists, setArtists] = useState([]);

    const goToArtist = () => { navigate('/addartist') }
    const goToHomePage = () => { navigate('/homepage') }

    const uploadImage = async (options) => {
        const { file } = options;
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "payal_cloudinaryImage");
        data.append("cloud_name", "dmodq8klr");
        try {
            let resp = await fetch(
                "https://api.cloudinary.com/v1_1/dmodq8klr/image/upload",
                {
                    method: "POST",
                    body: data,
                }
            );
            resp = await resp.json();

            setImage(resp.url);
            console.log('resp.url:::', resp.url)
        } catch (error) {
            console.error("Error uploading image:", error.message);
        }
    };

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const result = await fetch("http://localhost:8888/artists");
                const data = await result.json();
                if (result.ok) {
                    setArtists(data.map((artist) => artist.name));
                } else {
                    console.error("Error fetching artists:", data.error);
                }
            } catch (error) {
                console.error("Error fetching artists:", error.message);
            }
        };

        fetchArtists();
    }, []);

    const onFinish = async (values) => {
        console.log('values::', values);

        try {
            const result = await fetch("http://localhost:8888/songs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    dateOfRelease: values.dateOfRelease,
                    coverImage: image,
                    artists: values.artists,
                }),
            });
            const data = await result.json();
            console.log('data:::', data);

            // Display data inside the console
            console.log('Song data:', {
                name: values.name,
                dateOfRelease: values.dateOfRelease,
                coverImage: image,
                artist: values.artists,
            });

            if (result.ok) {
                form.resetFields();
                alert('Song added to yor list')
                navigate("/homepage");
            }
            else if (data.error === "Song already exists") {
                // Display alert when song is already present
                alert("Song already present in you list");
                navigate('/allsongs')
            }
            else {
                console.error("Error creating song:", data.error);
            }
        } catch (error) {
            console.error("Error creating song:", error.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error("Failed:", errorInfo);
    };

    return (
        <>
            <Navbar />
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'darkgray' }}>Add your song...</h1>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
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
                            {artists.map((artist) => (
                                <Option key={artist}>{artist}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Cover Photo" name="coverImage">
                        <Upload
                            showUploadList={true}
                            listType="picture-card"
                            accept="image/*"
                            customRequest={uploadImage}
                        >
                            <div>
                                <div style={{ marginTop: 8 }}>Drop/Upload Files Here</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item label="" name="">
                        <p>add artist if not available inside list</p>
                        <button onClick={goToArtist} class="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ width: '150px', margin: '5px 5px' }}>+ Add Artist</button>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Fragment>
                                <Button
                                    style={{ width: "25%", padding: "5px" }}
                                    type="primary"
                                    htmlType="submit"
                                >
                                    Save
                                </Button>
                                <Button
                                    style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                    htmlType="button"
                                    onClick={() => form.resetFields()}
                                >
                                    {" "}
                                    Reset
                                </Button>
                                <Button
                                    style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                    htmlType="button"
                                    onClick={goToHomePage}
                                    danger
                                >
                                    {" "}
                                    Cancel
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