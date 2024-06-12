
  // Function to set the token in localStorage
 export const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  // Function to get the token from localStorage
 export const getToken = () => {
    return localStorage.getItem("authToken");
  };

