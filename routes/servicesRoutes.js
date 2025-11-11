import express from 'express';
import { getServices, addService, updateService, deleteService } from '../controllers/servicesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getServices);
router.post('/', verifyToken, addService);
router.patch('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);

export default router;
