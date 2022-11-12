import React from 'react';
import { useState, useEffect } from 'react';

import style from './TabComponent.module.css';
import formStyle from '../Form.module.css';

import accountImage from '../../assets/account.svg';

import {
    join_path,
    edit_profile,
    get_profile,
    edit_profile_picture,
} from '../../api/api.js';

import { Formik, Form, Field } from 'formik';

const ProfileSettings = (props) => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        (async () => {
            const profile = await get_profile(props.username);
            setProfile(profile);
        })();
    }, []);

    const on_submit = async (values, { setSubmitting, setStatus }) => {
        try {
            await edit_profile({
                displayName: values.displayName,
                description: values.description,
            });

            if (values.picture != null) {
                await edit_profile_picture(values.picture);
            }

            setProfile({
                ...profile,
                displayName: values.displayName,
                description: values.description,
            });
            setStatus('Success');
        } catch (e) {
            setStatus(`Error: ${e.message}`);
            console.log(e);
        }
        setSubmitting(false);
    };

    return (
        <div className={`${style.TabComponent}`}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    displayName: profile.displayName || '',
                    description: profile.description || '',
                    picture: null,
                }}
                // validate={validate}
                onSubmit={on_submit}
            >
                {({ isSubmitting, status, setFieldValue }) => (
                    <Form className={formStyle.Form}>
                        <h2>Profile</h2>
                        <div
                            className={`${formStyle.Error} ${formStyle.Small}`}
                        >
                            {status}
                        </div>

                        <div>
                            <h5>Username</h5>
                            <div>{profile.username}</div>
                        </div>
                        <div>
                            <h5>Picture</h5>
                            <div>
                                <img
                                    id="picture-img"
                                    src={
                                        profile.picture
                                            ? join_path(
                                                  process.env.REACT_APP_API_URI,
                                                  '/image',
                                                  profile.picture
                                              )
                                            : accountImage
                                    }
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '100%',
                                    }}
                                />
                            </div>
                            <input
                                id="picture"
                                name="picture"
                                type="file"
                                onChange={(event) => {
                                    setFieldValue(
                                        'picture',
                                        event.currentTarget.files[0]
                                    );
                                    document.querySelector('#picture-img').src =
                                        URL.createObjectURL(
                                            event.currentTarget.files[0]
                                        );
                                    document.querySelector(
                                        '#picture-img'
                                    ).onload = function () {
                                        URL.revokeObjectURL(
                                            document.querySelector(
                                                '#picture-img'
                                            ).src
                                        ); // free memory
                                    };
                                }}
                            />
                        </div>
                        <div className={formStyle.Field}>
                            <h5>Display Name</h5>
                            <Field
                                name="displayName"
                                className={formStyle.Input}
                                type="text"
                            />
                        </div>
                        <div className={formStyle.Field}>
                            <h5>Description</h5>
                            <Field
                                name="description"
                                className={formStyle.Input}
                                type="text"
                                as="textarea"
                            />
                        </div>
                        <div className={formStyle.Field}>
                            <button
                                type="submit"
                                className={formStyle.Button}
                                disabled={isSubmitting}
                            >
                                Save
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ProfileSettings;
