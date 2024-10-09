import express from 'express';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../controllers/session.controller.js';

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');  
});

router.get('/register', (req, res) => {
    res.render('register');  
});

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.get('/current', getCurrentUser);

export default router;