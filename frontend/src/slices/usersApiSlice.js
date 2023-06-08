import {USERS_URL} from '../constants';
import {apiSlice} from './apiSlice'; 

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //mutation-- An endpoint definition that alters data on the server.
        //mutation is used because of POST req.
        //query would be used if GET req.
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                credentials: 'include',
                body: data,
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                credentials: 'include',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method:'PUT',
                credentials: 'include',
                body: data,
            })
        }),
    })
});

// export like this - becaue usersApislice is a children slice to the apiSlice.
export const {useLoginMutation, useRegisterMutation ,useLogoutMutation, useProfileMutation} = usersApiSlice;