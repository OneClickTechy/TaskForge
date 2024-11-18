import React from 'react'
import { useGetmeQuery } from '../app/services/userSlicer'
import { Navigate } from 'react-router';
import LoadingPage from './LoadingPage';

const PrivateRoutes = ({children}) => {

    const {data: user, isLoading} = useGetmeQuery();

    if(isLoading){
        return <LoadingPage />
    }
    if(!user){
        return <Navigate to={"/login"} replace />
    }
  return (
    children
  )
}

export default PrivateRoutes