import React from "react"
import { Route, Routes } from "react-router"
import Login from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />

            <Route element={<ProtectedRoute />}>
                {/*Security Routes */}
            </Route>
        </Routes>
    );
};