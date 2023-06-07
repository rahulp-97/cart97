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
                body: data,
            })
        }),
        
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        })
    })
});

export const {useLoginMutation, useLogoutMutation} = usersApiSlice;