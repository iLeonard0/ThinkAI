import React from "react"
import { Box } from "@mui/material"
import { useAuth } from "../hooks/useauth"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return <Box>Carregando...</Box>
  }

  if (!signed) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}