import React from 'react'
import { useSelector } from 'react-redux';
import ResumeItem from './resumeItem';
import { useCollection } from '../hooks/useCollection';


const ResumeListAdmin = () => {
    const { docs: cvs } = useCollection("cvs")

    return (
        <div className="cv-list">
            <h4 className='mb-4'>All users resume in the web</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                {cvs.map((cv, index) => (
                    <ResumeItem key={index} resume={cv.id} />
                    // console.log()
                ))}
            </div>
        </div >
    )
}

export default ResumeListAdmin