import { Request, Response } from 'express';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { User } from '../models'; // Import depuis models/index.ts

// const secretKey = process.env.JWT_SECRET || 'secret'; // Clé secrète pour JWT

export const register = async (req: Request, res: Response) => {
    try {

        // REGISTER WITH PASSWORD
        // const { username, password } = req.body;
        // const passwordHash = await bcrypt.hash(password, 10); // Hacher le mot de passe
        // const user = await User.create({ username, passwordHash });

        const { username, email, avatarUrl } = req.body;
        console.log(req.body);
        console.log(username, email, avatarUrl);
        const user = await User.create({ username, email, avatarUrl });
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        // Gestion des erreurs (par exemple, si le nom d'utilisateur existe déjà)
        res.status(500).json({ error: 'Failed to register user <br> ' + error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // LOGIN WITH PASSWORD
        // const { username, password } = req.body;
        // const user = await User.findOne({ where: { username } });
        // if (!user || !await bcrypt.compare(password, user.passwordHash)) {
        //     return res.status(401).json({ error: 'Invalid credentials' });
        // }
        // const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Créer un JWT
        // res.json({ token });
        
        const { username } = req.body;
        const user = await User.findOne({ where: { username } });
        res.json({ user });

    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};