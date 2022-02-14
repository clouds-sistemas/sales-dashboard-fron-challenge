import { Router } from "express";
import multer from 'multer';

import multerConfig from '../config/multer';

import SalesController from './sales.controllers';

const upload = multer(multerConfig.multer);

const router = new Router();

router.route('/number-of-sales').get(SalesController.apiNumberOfSales);
router.route('/upload').post(upload.single('file'), SalesController.apiUploadSales);
router.route('/best-selling-products').get(SalesController.apiBestSellingProduct)
router.route('/by-month').get(SalesController.apiSalesByMonth);
router.route('/:id').delete(SalesController.apiDeleteSales);

export default router;