// Tietojen validointia varten
export const validateForm = (data) => {
  return data.trim().length !== 0;
};

// Haetaan tietoja kohteesta localStorage
export const getUserData = key => {
  return JSON.parse(localStorage.getItem(key)) || null;
};

// Tietojen kirjoittaminen kohteeseen localStorage
export const saveUserData = (key, userData) => {
  localStorage.setItem(key, JSON.stringify(userData));
};

// Poistetaan tietoja kohteesta localStorage
export const deleteUserData = key => {
  localStorage.removeItem(key);
};