import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({ //get todo ruta
            query: () => '/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id), // sortiranje getovanih todoova
            providesTags: ['Todos']
        }),
        addTodo: builder.mutation({ //post-add todo ruta
            query: (todo) => ({ 
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({ //patch-edit todo ruta *razlika izmedju post i patch*
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({ //delete todo ruta
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos']
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice
