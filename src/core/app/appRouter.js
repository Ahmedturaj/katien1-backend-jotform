import express from 'express';
import testRoutes from '../../entities/test/b.routes.js';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import adminRoutes from '../../entities/admin/admin.routes.js';
import formRouter from '../../entities/form/form.routes.js';
import ReportRouter from '../../entities/report/report.routes.js';


const router = express.Router();

// Define all your routes here
router.use('/v1/tests', testRoutes);
router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/admin', adminRoutes);
router.use('/v1/form-data', formRouter);
router.use("/v1/report", ReportRouter);


export default router;
