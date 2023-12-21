import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Avatar } from '@mui/material';
import { Email, Phone } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    setAllEducation,
    setAllExperience,
    setImage,
    setColor,
} from '../features/cvSlice';

const ResumeItem = (props) => {
    const cvId = props.resume;
    const [cvData, setCvData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCV();
    }, [cvId]);

    const fetchCV = async () => {
        try {
            const cvDocRef = doc(db, 'cvs', cvId);
            const cvSnapshot = await getDoc(cvDocRef);

            if (cvSnapshot.exists()) {
                const cv = cvSnapshot.data();
                console.log(cv);
                await setCvData(cv);
            } else {
                console.error(`CV with ID ${cvId} does not exist.`);
            }
        } catch (error) {
            console.error('Error fetching CV:', error);
        }
    };

    const goToEdit = () => {
        dispatch(setFirstName(cvData.firstName))
        dispatch(setLastName(cvData.lastName))
        dispatch(setEmail(cvData.email))
        dispatch(setPhone(cvData.phone))
        dispatch(setProfile(cvData.profile))
        dispatch(setAllEducation(cvData.education))
        dispatch(setAllExperience(cvData.experience))
        dispatch(setFreeText(cvData.freeText));
        dispatch(setImage(cvData.image));
        dispatch(setColor(cvData.color));
        dispatch(setResumeId(cvId));
        navigate("/resume");
    }

    return (
        <div className="container mt-5" style={{ width: '300px' }} onClick={goToEdit}>
            <div id="resume-container"
                className=" border shadow w-100"
                style={{
                    width: '100%',
                    maxWidth: '300px',
                    height: '370px',
                    overflow: 'hidden',
                    fontSize: '0.8rem',
                }}>
                <div
                    className="title p-2 d-flex align-item-center justify-content-between w-100"
                    style={{ fontSize: '1rem',background:`${cvData.color}` }}>
                    <div>
                        <div className="text-white display-5 text-start" style={{ fontSize: '1.2rem' }}>
                            {cvData.firstName} {cvData.lastName}
                        </div>
                        {cvData.email && (
                            <div className="d-flex align-item-center justify-content-start text-white display-8 mt-2 text-start" style={{ fontSize: '0.8rem' }}>
                                <Email className='me-2' />{cvData.email}
                            </div>
                        )}
                        {cvData.phone && (
                            <div className="d-flex align-item-center justify-content-start text-white display-8 mt-2 text-start" style={{ fontSize: '0.8rem' }}>
                                <Phone className='me-2' />{cvData.phone}
                            </div>
                        )}
                    </div>
                    <Avatar alt="Uploaded" src={cvData.image} style={{ width: '60px', height: '60px' }} />
                </div>
                <div className="text-start ps-2 pt-2 m-0" style={{ fontSize: '0.5rem' }}>
                    <h6 className="display-7">Profile:</h6>
                    <p>{cvData.profile}</p>
                </div>
                <div className="info ps-2 pt-2 m-0 text-start" style={{ fontSize: '0.5rem' }}>
                    <h6 className="display-7 link-underline">Education:</h6>
                    <div
                        className="ms-3 lead"
                        style={{ borderLeft:`4px ${cvData.color} solid`, height: '15px' }}
                    >{cvData.education && "---"}</div>

                    <h6 className="display-7">Experience:</h6>
                    <div
                        className="ms-3 lead "
                        style={{ borderLeft:`4px ${cvData.color} solid`, height: '15px' }}
                    ><>{cvData.experience && "---"}</></div>
                </div>
                <div className="text-start ps-2 pt-2 m-0" style={{ fontSize: '0.5rem' }}>
                    <h6 className="display-7 m-0">Additional Information</h6>
                    <p>{cvData.freeText}</p>
                </div>
            </div>
        </div>

        // <div style={{ border: '1px solid #ccc', backgroundColor: '#f0f0f0', borderRadius: '8px', padding: '10px', margin: '10px', width: '300px' }}>
        //     {cvData.image && ( // Check if imageUrl exists
        //         <img
        //             src={cvData.image} // Display the image from the URL
        //             alt="Resume Image"
        //             style={{
        //                 borderRadius: '50%',
        //                 width: '30px',
        //                 height: '30px',
        //             }}
        //         />
        //     )}

        //     {cvData.firstName && <p><strong>Full Name:</strong> {cvData.firstName} {cvData.lastName}</p>}
        //     {cvData.email && <p> {cvData.email} </p>}
        //     {cvData.experience && <p><strong>Work Experience:</strong></p>}
        //     {cvData.experience && <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        //         {cvData.experience && cvData.experience.map((exp, index) => (
        //             <li key={index}>
        //                 {exp.title && <p><strong>Company Name:</strong> {exp.title}</p>}
        //                 {exp.dates.start && <p><strong>Time Frame:</strong> {exp.dates.start}-{exp.dates.end}</p>}
        //             </li>
        //         ))}
        //     </ul>}
        //     {cvData.education && <p><strong>Education Details:</strong></p>}
        //     {cvData.education && <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        //         {cvData.education && cvData.education.map((edu, index) => (
        //             <li key={index}>
        //                 {edu.institution && <p><strong>Institution:</strong> {edu.institution}</p>}
        //                 {edu.dates.start && <p><strong>Degree:</strong> {edu.dates.start}-{edu.dates.end}</p>}
        //             </li>
        //         ))}
        //     </ul>}
        //     {/* Add other resume fields accordingly */}
        // </div>
    );
};

export default ResumeItem;