
export const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token disponible");
    }
    return token;
};