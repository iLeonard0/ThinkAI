import React from "react"
import { Route, Routes } from "react-router"
import Login from "../pages/Login"
import { ProtectedRoute } from "../components/ProtectedRoute"
import RegisterUser from "../pages/RegisterUser"
import AiChat from "../pages/AiChat"
import MenuDrawer from "../components/menuDrawer"

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rotas Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<RegisterUser />} />

            {/* Rotas Protegidas */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MenuDrawer />}> 
                    <Route path="/chat/:id" element={<AiChat />} />
                    <Route path="/chatAi" element={<AiChat />} />

                </Route>
            </Route>
        </Routes>
    )
}