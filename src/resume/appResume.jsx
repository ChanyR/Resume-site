import React from 'react'
import FormResume from './formResume'
import ResumeFile from './resumeFile'

const AppResume = () => {
  return (
    <div className='d-flex'>
        <FormResume className='col-md-6'/>
        <ResumeFile className='col-md-6'/>
    </div>
  )
}

export default AppResume