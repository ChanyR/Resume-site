import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ResumeItem from './resumeItem';
import {
    setResumeId,
} from "../features/cvSlice";

const ResumeList = () => {
    const {
        cvs,
    } = useSelector((state) => state.user);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setResumeId(''));
    }, []);

    return (
        <div className="cv-list">
            <h4 className='mb-4'>Your resume history</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                {cvs.map((cv, index) => (
                    <ResumeItem key={index} resume={cv} />
                ))}
            </div>
        </div >
    )
}

export default ResumeList