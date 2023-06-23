import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

//-- query
//query can be a function that returns either a string or an object
// which is passed to your baseQuery. If you are using fetchBaseQuery,
// this can return either a string or an object of properties in FetchArgs.
//-- keepUnusedDataFor
// This is how long RTK Query will keep your data cached for after the last component unsubscribes.
// For example, if you query an endpoint, then unmount the component,
// then mount another component that makes the same request within the given time frame, the most recent value will be served from the cache.
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({keyword, sortByPrice}) => ({
        url: `${PRODUCTS_URL}/?sort=${sortByPrice}`,
        params: {keyword},
        credentials: 'include',
      }),
      keepUnusedDataFor: 5
    }),
    getProductDetails: builder.query({
        query: (productId) => ({
            url: `${PRODUCTS_URL}/${productId}`,
            credentials: 'include',
        }),
        keepUnusedDataFor: 5
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
        credentials: 'include',
      }),
      invalidatesTags: ['Product']
    })
  }),
});

// convention is to use at prefix and Query at the end of query name.
export const {useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation} = productsApiSlice;