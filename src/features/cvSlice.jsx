import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    resumeId:'',
    firstName: '',
    lastName: '',
    email: '',
    phone:'',
    profile:'',
    education: [],
    experience: [],
    freeText: '',
    image: null,
    color:'#0D6EFD'
};

const cvSlice = createSlice({
    name: 'cv',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setResumeId: (state, action) => {
            state.resumeId = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        addEducation: (state) => {
            state.education.push({ institution: '', dates: { start: '', end: '' } });
        },
        removeEducation: (state, action) => {
            state.education.splice(action.payload, 1);
        },
        updateEducation: (state, action) => {
            const { index, field, value } = action.payload;
            state.education[index][field] = value;
        },
        updateEducationDates: (state, action) => {
            const { index, dates } = action.payload;
            state.education[index].dates = dates;
        },
        setAllEducation:(state,action)=>{
            state.education=(action.payload)
        },
        addExperience: (state) => {
            state.experience.push({ title: '', dates: { start: '', end: '' } });
        },
        removeExperience: (state, action) => {
            state.experience.splice(action.payload, 1);
        },
        updateExperience: (state, action) => {
            const { index, field, value } = action.payload;
            state.experience[index][field] = value;
        },
        updateExperienceDates: (state, action) => {
            const { index, dates } = action.payload;
            state.experience[index].dates = dates;
        },
        setAllExperience:(state,action)=>{
            state.experience=(action.payload)
        },
        setFreeText: (state, action) => {
            state.freeText = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },
    },
});

export const {
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
    setImage,
    setAllEducation,
    setAllExperience,
    setColor,
} = cvSlice.actions;

export default cvSlice.reducer;