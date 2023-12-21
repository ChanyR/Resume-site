import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import ResumeListAdmin from './resumeListAdmin';
import {
  setResumeId,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setProfile,
  setFreeText,
  setImage,
  setColor,
  setAllEducation,
  setAllExperience,
} from "../features/cvSlice";

const MainAdmin = () => {
  const {
    firstNameUser,
    lastNameUser,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setResumeId(''));
  }, []);

  const navigate = useNavigate();

  return (
    <div className='container'>
      <div className="d-flex justify-content-end align-items-center mt-5">
        <button style={{ height: '40px' }} className="btn btn-outline-primary" onClick={() => {
          dispatch(setResumeId(''));
          dispatch(setFirstName(''));
          dispatch(setLastName(''));
          dispatch(setEmail(''));
          dispatch(setPhone(''));
          dispatch(setProfile(''));
          dispatch(setAllEducation([]));
          dispatch(setAllExperience([]));
          dispatch(setFreeText(''));
          dispatch(setImage(''));
          dispatch(setColor(''));
          navigate("/resume");
        }}>create new resume</button>
      </div>
      <ResumeListAdmin className="mt-4" />
    </div>
  )
}

export default MainAdmin