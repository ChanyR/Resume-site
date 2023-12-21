import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    setResumeId,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setProfile,
    addEducation,
    removeEducation,
    updateEducation,
    updateEducationDates,
    addExperience,
    removeExperience,
    updateExperience,
    updateExperienceDates,
    setFreeText,
    setColor,
} from '../features/cvSlice';
import {
    setFirstNameUser,
    setLastNameUser,
    setEmailUser,
    addCv,
    setAllCvs,
    setUserId,
} from "../features/userSlice";
import UploadPicture from './uploadPicture';
import { db } from '../firebase/config'
import { collection, addDoc, getDoc, setDoc } from 'firebase/firestore'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';


const FormResume = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const firstNameRef = register("firstName", { required: true, minLength: 2 });
    const lastNameRef = register("lastName", { required: true, minLength: 2 });
    const emailRef = register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
    const phoneRef = register("phone", { required: true, minLength: 9, maxLength: 10 });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        userId,
        firstNameUser,
        lastNameUser,
        emailUser,
        cvs,
    } = useSelector((state) => state.user);

    const {
        resumeId,
        firstName,
        lastName,
        email,
        phone,
        profile,
        education,
        experience,
        freeText,
        image,
        color,
    } = useSelector((state) => state.cv);

    useEffect(() => {
        if (resumeId == null || resumeId == '') {
            dispatch(setFirstName(firstNameUser));
            dispatch(setLastName(lastNameUser));
            dispatch(setEmail(emailUser));
            dispatch(setColor("#0D6EFD"));
        }
    }, [])

    const handleAddEducation = () => {
        dispatch(addEducation());
    };

    const handleRemoveEducation = (index) => {
        dispatch(removeEducation(index));
    };

    const handleEducationChange = (index, field, value) => {
        if (field === 'dates') {
            dispatch(updateEducationDates({ index, dates: value }));
        } else {
            dispatch(updateEducation({ index, field, value }));
        }
    };

    const handleAddExperience = () => {
        dispatch(addExperience());
    };

    const handleRemoveExperience = (index) => {
        dispatch(removeExperience(index));
    };

    const handleExperienceChange = (index, field, value) => {
        if (field === 'dates') {
            dispatch(updateExperienceDates({ index, dates: value }));
        } else {
            dispatch(updateExperience({ index, field, value }));
        }
    };

    const handleColorChange = (newColor) => {
        dispatch(setColor(newColor));
        console.log(newColor);
    };

    const addNewDoc = async (data) => {
        console.log(data);
        const ref = collection(db, 'users')
        await addDoc(ref, data)
    }

    const onDelClick = async () => {
        const ref = doc(db, "users", userId);
        await deleteDoc(ref);
    }

    const addNewCvToDB = async (newItem) => {
        try {
            const cvsDB = collection(db, "cvs")
            let res = await (addDoc(cvsDB, newItem))
            let cvId = res.id;
            console.log(cvId);
            // await dispatch(addCv(cvId))
            let newCvsAr = [...cvs, cvId];
            console.log(newCvsAr);
            await dispatch(setAllCvs(newCvsAr))
            const ref = await doc(db, "users", userId)
            await updateDoc(ref, { cvs: newCvsAr });
            console.log("add ruseme to db and user cvs");
        }
        catch (error) {
            console.error('Error fetching resumes: ', error);
        }
    }

    const updateDocInDb = async (data) => {
        try {
            console.log(resumeId);
            const docRef = await doc(db, "cvs", resumeId);
            const docSnap = await getDoc(docRef);
            if (docSnap) {
                setDoc(docRef, {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    profile: data.profile,
                    education: data.education,
                    experience: data.experience,
                    freeText: data.freeText,
                    image: data.image,
                    color:data.color,
                }, {
                    merge: true
                }).then(() => console.log("Document updated"));
                console.log("Your Data Is Saving Now");
            }
        }
        catch (error) {
            console.error('Error fetching resumes: ', error);
        }
    }

    const saveData = async () => {
        const newItem = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            profile: profile,
            education: education,
            experience: experience,
            freeText: freeText,
            image: image,
            color:color,
        }
        console.log(newItem);
        if (resumeId == null || resumeId=="") {
            console.log("1");
            await addNewCvToDB(newItem);
            console.log("Your Data Is Saving Now");
            navigate("/home")
        }
        else {
            await updateDocInDb(newItem);
            console.log("Your Data Is Update Now");
            navigate("/home")
        };
    }

    return (
        <div className="container mt-5">
            <UploadPicture />
            <form onSubmit={handleSubmit(saveData)} className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                        First Name:
                    </label>
                    <input
                        {...firstNameRef}
                        type="text"
                        id="firstName"
                        className="form-control"
                        required
                        value={firstName}
                        onChange={(e) => dispatch(setFirstName(e.target.value))}
                    />
                    {errors.firstName && <div className='text-danger'>* Enter valid name: min 2 chars</div>}
                </div>
                <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                        Last Name:
                    </label>
                    <input
                        {...lastNameRef}
                        type="text"
                        id="lastName"
                        className="form-control"
                        required
                        value={lastName}
                        onChange={(e) => dispatch(setLastName(e.target.value))}
                    />
                    {errors.lastName && <div className='text-danger'>* Enter valid name: min 2 chars</div>}
                </div>
                <div className="col-md-7">
                    <label htmlFor="email" className="form-label">
                        Email:
                    </label>
                    <input
                        {...emailRef}
                        type="email"
                        id="email"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                    />
                    {errors.email && <div className='text-danger'>* Email is not valid</div>}
                </div>
                <div className="col-md-5">
                    <label htmlFor="phone" className="form-label">
                        Phone:
                    </label>
                    <input
                        {...phoneRef}
                        type="text"
                        id="phone"
                        className="form-control"
                        required
                        value={phone}
                        onChange={(e) => dispatch(setPhone(e.target.value))}
                    />
                    {errors.phone && <div className='text-danger'>* Phone invalid</div>}
                </div>
                <div className="col-12">
                    <label htmlFor="profile" className="form-label">
                        Profile:
                    </label>
                    <textarea
                        id="profile"
                        className="form-control"
                        value={profile}
                        onChange={(e) => dispatch(setProfile(e.target.value))}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Education:</label>
                    {education.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Institution"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                required
                            />
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={edu.dates.start}
                                        onChange={(e) => handleEducationChange(index, 'dates', { ...edu.dates, start: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={edu.dates.end}
                                        onChange={(e) => handleEducationChange(index, 'dates', { ...edu.dates, end: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger mt-2"
                                onClick={() => handleRemoveEducation(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleAddEducation}
                    >
                        Add Education
                    </button>
                </div>
                <div className="col-12">
                    <label className="form-label">Experience:</label>
                    {experience.map((exp, index) => (
                        <div key={index} className="mb-3">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Job Title"
                                value={exp.title}
                                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                required
                            />
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={exp.dates.start}
                                        onChange={(e) => handleExperienceChange(index, 'dates', { ...exp.dates, start: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={exp.dates.end}
                                        onChange={(e) => handleExperienceChange(index, 'dates', { ...exp.dates, end: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger mt-2"
                                onClick={() => handleRemoveExperience(index)}>
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={handleAddExperience}
                    >
                        Add Experience
                    </button>
                </div>
                <div className="col-12">
                    <label htmlFor="freeText" className="form-label">
                        Free Text:
                    </label>
                    <textarea
                        id="freeText"
                        className="form-control"
                        value={freeText}
                        onChange={(e) => dispatch(setFreeText(e.target.value))}
                    />
                </div>
                <div className="">
                    <label htmlFor="color" className="form-label me-3">
                        select color style: 
                    </label>
                    <input type="color" value={color} style={{ width: "80px", border: 'none', background: 'none' }} onChange={(e) => handleColorChange(e.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-outline-primary">
                        Save my details
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormResume;