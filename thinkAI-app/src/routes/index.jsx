import React from "react"
import { Route, Routes } from "react-router"
import Login from "../pages/Login"
import { ProtectedRoute } from "../components/ProtectedRoute"
import RegisterUser from "../pages/RegisterUser"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />

            <Route element={<ProtectedRoute />}>
                {/*Security Routes */}
            </Route>
        </Routes>
    )
}