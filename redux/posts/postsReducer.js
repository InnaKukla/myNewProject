import { createSlice } from "@reduxjs/toolkit";

const state = {
    posts: [],
    profilePosts: [],
    // comments: []
};

export const postsSlice = createSlice({
    name: "posts",
    initialState: state,
    reducers: {
updatePosts: (state, { payload }) => ({
      ...state,
        posts: payload
    
    }),
updateProfilePosts: (state, { payload }) => ({
      ...state,
      profilePosts: payload
    }),
// updateComments: (state, { payload }) => ({
//       ...state,
//       comments: payload
//     }),
reset: () => ({...initialState}),
    }
})