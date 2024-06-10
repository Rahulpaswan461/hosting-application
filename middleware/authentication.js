
const { validateGeneratedToken } = require("../services/authentication");

function checkForAuthenticateUser(cookie) {
    return (req, res, next) => {
        const token = req.cookies[cookie];
        
        if (!token) {
            return next(); // No token, proceed to the next middleware/route handler
        }

        try {
            const payload = validateGeneratedToken(token); // Validate token and extract payload
            console.log("Current request user:", req.user); // Log current request user before assignment
            req.user = payload; // Assign payload to req.user
            console.log("Token validation successful, payload:", payload); // Log successful validation and payload
        } catch (error) {
            console.log("Error during token validation:", error.message); // Log specific error message
        }

        return next(); // Proceed to the next middleware/route handler
    }
}

module.exports = {
    checkForAuthenticateUser
};


module.exports ={
    checkForAuthenticateUser
}