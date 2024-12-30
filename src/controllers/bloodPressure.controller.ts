import { Request, Response } from 'express';
import { BloodPressure, BloodPressureCreationAttributes } from '../models';

export const createBloodPressure = async (req: Request, res: Response) => {
  try {
    const bloodPressureData: BloodPressureCreationAttributes = req.body;
    const newBloodPressure = await BloodPressure.create(bloodPressureData);
    res.status(201).json(newBloodPressure);
  } catch (error) {
    console.error("Erreur lors de la création de la mesure de pression artérielle :", error);
    res.status(500).json({ error: 'Impossible de créer la mesure' });
  }
};

export const getBloodPressureByUserId = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const bloodPressures = await BloodPressure.findAll({ where: { userId } });
        res.json(bloodPressures);
    } catch (error) {
        console.error("Erreur lors de la récupération des mesures de pression artérielle :", error);
        res.status(500).json({ error: 'Impossible de récupérer les mesures' });
    }
};

export const getAllBloodPressure = async (req: Request, res: Response) => {
    try {
        const bloodPressures = await BloodPressure.findAll();
        res.json(bloodPressures);
    } catch (error) {
        console.error("Erreur lors de la récupération des mesures de pression artérielle :", error);
        res.status(500).json({ error: 'Impossible de récupérer les mesures' });
    }
};

export const getBloodPressureByUserIdAndDate = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const measurementDate = req.params.date;
        const bloodPressures = await BloodPressure.findAll({ where: { userId, measurementDate } });
        res.json(bloodPressures);
    } catch (error) {
        console.error("Erreur lors de la récupération des mesures de pression artérielle :", error);
        res.status(500).json({ error: 'Impossible de récupérer les mesures' });
    }
};

// get column names
export const getColumns = async (req: Request, res: Response) => {
    try {
        const columns = await BloodPressure.describe();
        res.json(columns);
    } catch (error) {
        console.error("Erreur lors de la récupération des colonnes de la table de pression artérielle :", error);
        res.status(500).json({ error: 'Impossible de récupérer les colonnes' });
    }
};