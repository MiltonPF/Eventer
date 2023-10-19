export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    // Verifica si el token ha expirado
    const tokenExpiration = user.tokenExpiration; // Reemplaza con la propiedad real que almacena la fecha de vencimiento del token
    const currentTimestamp = new Date().getTime();
    if (tokenExpiration && currentTimestamp > tokenExpiration) {
      // Aca se puede eliminar el token y otros datos relacionados como cerrar la sesion
      return {};
    }

    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}
