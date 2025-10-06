import React, { useState, useEffect } from "react"
import { api } from "../services/api"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = localStorage.getItem("@App:token")
      const storagedUser = localStorage.getItem("@App:user")

      if (storagedToken && storagedUser) {
        api.defaults.headers.Authorization = `Bearer ${storagedToken}`
        setUser(JSON.parse(storagedUser))
      }

      setLoading(false)
    }

    loadStoragedData()
  }, [])

  async function login(email, password) {
    try {
      const response = await api.post("/login", { email, password })
      const { token, user } = response.data

      localStorage.setItem("@App:token", token)
      localStorage.setItem("@App:user", JSON.stringify(user))
      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user)
    } catch (error) {
      console.error("Falha no login", error)
      throw error
    }
  }

  function logout() {
    localStorage.removeItem("@App:token")
    localStorage.removeItem("@App:user")
    api.defaults.headers.Authorization = null
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
