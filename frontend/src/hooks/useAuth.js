import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, loading } = useSelector((state) => state.auth);

  return {
    user,
    token,
    loading,
    isAuthenticated: !!token,
  };
};

export default useAuth;