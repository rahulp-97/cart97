import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'; 
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

//tag types are used to define the types of data that will be fetching from our API.
//Endpoints are just a set of operations that you want to perform against your server.
//You define them as an object using the builder syntax. There are two basic endpoint types: query and mutation.
export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['Product', 'Order', 'User' ],
    endpoints: (builder) => ({})
})