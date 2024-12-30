import express from 'express';
import { 
    createBloodPressure, 
    getBloodPressureByUserId, 
    getAllBloodPressure, 
    getBloodPressureByUserIdAndDate,
    getColumns 
} from '../controllers/bloodPressure.controller';
// import { authenticate } from '../middlewares/auth.middleware';

const router = express.Router();

// router.post('/', authenticate, createBloodPressure);
// router.get('/', authenticate, getAllBloodPressure);
// router.get('/:userId', authenticate, getBloodPressureByUserId); // Route pour récupérer les mesures par utilisateur

router.post('/', createBloodPressure);
router.get('/', getAllBloodPressure);
router.get('/structure', getColumns);
router.get('/:userId', getBloodPressureByUserId); // Route pour récupérer les mesures par utilisateur
router.get('/:userId/:date', getBloodPressureByUserIdAndDate); // Route pour récupérer les mesures par utilisateur et par date

export default router;