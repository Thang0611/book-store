export const setUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}
export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user')
  return JSON.parse(user)
}

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
}
