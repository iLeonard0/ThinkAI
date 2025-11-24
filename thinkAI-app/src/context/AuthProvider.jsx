import React, { useState, useEffect, createContext } from "react"
import { api } from "../services/api"
import { useSnackbar } from "notistack"

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = localStorage.getItem("@App:token")
      const storagedUser = localStorage.getItem("@App:user")

      if (storagedToken && storagedUser) {
        try {
          api.defaults.headers.Authorization = `Bearer ${storagedToken}`
          setUser(JSON.parse(storagedUser))
        } catch (e) {
          console.error("Erro ao parsear dados do localStorage", e)
          localStorage.removeItem("@App:token")
          localStorage.removeItem("@App:user")
        }
      }
      setLoading(false)
    }

    loadStoragedData()
  }, [])

  async function login(email, password) {
    try {
      const response = await api.post("/auth/login", { email, password })

      const { name, token } = response.data

      const userObject = { name, email }

      localStorage.setItem("@App:token", token)
      localStorage.setItem("@App:user", JSON.stringify(userObject))
      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(userObject)

    } catch (error) {
      console.error("Falha no login", error)
      throw error
    }
  }

  async function register(name, email, password) {
    try {
      const response = await api.post("/auth/register", { name, email, password })
      const { name: responseName, token } = response.data

      const userObject = { name: responseName, email }

      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(userObject)

      localStorage.setItem("@App:token", token)
      localStorage.setItem("@App:user", JSON.stringify(userObject))

      return response.data
    } catch (err) {
      console.error("Erro ao registrar:", err)
      throw err
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
      value={{ signed: !!user, user, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}