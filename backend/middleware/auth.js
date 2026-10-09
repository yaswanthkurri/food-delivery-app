import jwt from "jsonwebtoken";
// This is an authentication middleware. 
// Its job is to check whether the user has a valid JWT token before allowing them to access protected APIs like addToCart, removeFromCart, getCart, etc.

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized login again" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id || token_decode._id || token_decode;
        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: "ERROR" });
    }
};

export default authMiddleware;