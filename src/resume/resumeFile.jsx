import React from 'react';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';
import { Avatar } from '@mui/material'
import { Email, Phone } from '@mui/icons-material';

const ResumeFile = () => {
    const {
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

    const downloadPDF = () => {
        const element = document.getElementById('resume-container');

        if (element) {
            html2pdf(element, {
                margin: 10,
                filename: 'Resume_chany_web.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            });
        }
    };

    return (
        <div className="container mt-5">
            <div id="resume-container" className=' border shadow w-100'>
                <div className="title p-3  d-flex align-item-center justify-content-between w-100" style={{background:`${color}`}}>
                    <div className="">
                        <div className='text-white display-5'>{firstName} {lastName}</div>
                        <div className="d-flex align-item-center justify-content-center">
                            {{ email } && <div className='text-white display-8 mt-2 mx-4'><Email /> {email}</div>}
                            {{ phone } && <div className='text-white display-8 mt-2 mx-4'><Phone /> {phone}</div>}
                        </div>
                    </div>
                    <Avatar alt="Uploaded" src={image} style={{ width: '90px', height: '90px' }} />
                    {/* <div className="img" style={{ backgroundImage: `url(${image})`, width: "100px", height: "100px", backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                </div> */}
                </div>
                <div className='text-start p-4'>
                    <h4 className='display-7'>Profile:</h4>
                    <p>{profile}</p>
                </div>
                <div className="info p-4 text-start">
                    <h4 className='display-7 link-underline'>education:</h4>
                    {
                        education.map((edu, i) => {
                            return (
                                <div key={i} className='p-3 m-3 lead' style={{ borderLeft: `7px ${color} solid` }}>
                                    <p><strong>subject:</strong> {edu.institution}</p>
                                    <p><strong>start:</strong>{edu.dates.start}</p>
                                    <p><strong>end:</strong>{edu.dates.end}</p>
                                </div>
                            )
                        })
                    }
                    <h4 className='display-7'>experience:</h4>
                    {
                        experience.map((exp, i) => {
                            return (
                                <div key={i} className='p-3 m-3 lead' style={{ borderLeft: `7px ${color} solid` }}>
                                    <p><strong>company name:</strong> {exp.title}</p>
                                    <p><strong>start:</strong> {exp.dates.start}</p>
                                    <p><strong>end:</strong> {exp.dates.end}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='text-start p-4'>
                    <h4 className='display-7'>Additional Information</h4>
                    <p>{freeText}</p>
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-outline-primary" onClick={downloadPDF}>
                    Download PDF
                </button>
            </div>
        </div>

        // <div className="container mt-5">
        //     <div className="card" id="resume-container">
        //         <div className="card-header bg-primary text-white text-center">
        //             <h1 className="display-4">{`${firstName} ${lastName}`}</h1>
        //             <p className="lead">{email}</p>
        //             <p className="lead">{ phone}</p>
        //         </div>

        //         <div className="card-body">
        //             <div className="mb-4 text-center">
        //                 {image && <Avatar alt="Uploaded" src={image} style={{ width: '90px', height: '90px' }} />}
        //             </div>

        //             <div className="mb-4">
        //                 <h2 className="h4">Education</h2>
        //                 <ul className="list-group">
        //                     {education.map((edu, index) => (
        //                         <li key={index} className="list-group-item">
        //                             <strong>{edu.institution}</strong>
        //                             <p className="mb-0">{`${edu.dates.start} - ${edu.dates.end}`}</p>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>

        //             <div className="mb-4">
        //                 <h2 className="h4">Experience</h2>
        //                 <ul className="list-group">
        //                     {experience.map((exp, index) => (
        //                         <li key={index} className="list-group-item">
        //                             <strong>{exp.title}</strong>
        //                             <p className="mb-0">{`${exp.dates.start} - ${exp.dates.end}`}</p>
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>

        //             <div>
        //                 <h2 className="h4">Additional Information</h2>
        //                 <p>{freeText}</p>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="text-center mt-4">
        //         <button className="btn btn-outline-primary" onClick={downloadPDF}>
        //             Download PDF
        //         </button>
        //     </div>
        // </div>
    );
};

export default ResumeFile;