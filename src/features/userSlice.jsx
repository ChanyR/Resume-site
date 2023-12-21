import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    firstNameUser: '',
    lastNameUser: '',
    emailUser: '',
    cvs: [],
    role:'',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setFirstNameUser: (state, action) => {
            state.firstNameUser = action.payload;
        },
        setLastNameUser: (state, action) => {
            state.lastNameUser = action.payload;
        },
        setEmailUser: (state, action) => {
            state.emailUser = action.payload;
        },
        addCv: (state, action) => {
            if (state.cvs.length<=0) {
                state.cvs = [];
            }
            console.log("state");
            console.log(action.payload);
            state.cvs.push(action.payload);
            console.log(state.cvs);
        },
        setAllCvs: (state, action) => {
            state.cvs=(action.payload);
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
    },
});

export const {
    setUserId,
    setFirstNameUser,
    setLastNameUser,
    setEmailUser,
    addCv,
    setAllCvs,
    setRole,
} = userSlice.actions;

export default userSlice.reducer;