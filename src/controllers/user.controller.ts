import { Request, Response } from 'express';
import { User, UserCreationAttributes } from '../models'; // Importez le modèle User
// import bcrypt from 'bcrypt';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ error: 'Impossible de récupérer les utilisateurs' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ error: 'Impossible de récupérer l\'utilisateur' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const userData: Partial<UserCreationAttributes> = req.body; // Partial pour les mises à jour partielles

        // if (userData.passwordHash) {
        //     const passwordHash = await bcrypt.hash(userData.passwordHash, 10);
        //     userData.passwordHash = passwordHash;
        // }

        const [updatedRows] = await User.update(userData, { where: { id: userId } });
        if (updatedRows > 0) {
            const updatedUser = await User.findByPk(userId);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        if ((error as any).name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
        }
        res.status(500).json({ error: 'Impossible de mettre à jour l\'utilisateur' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id);
        const deletedRows = await User.destroy({ where: { id: userId } });
        if (deletedRows > 0) {
            res.status(204).send(); // 204 No Content pour une suppression réussie
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ error: 'Impossible de supprimer l\'utilisateur' });
    }
};