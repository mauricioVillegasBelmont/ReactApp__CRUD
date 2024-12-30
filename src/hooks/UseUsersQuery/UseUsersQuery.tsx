import {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "features/user/usersSlice";



const useUsersQuery = () => {
  return {
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
  };
};

export default useUsersQuery;
