import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.regionCtrl.findAll)
router.get('/:ids',indexCtrl.regionCtrl.findOne)
router.post('/',indexCtrl.regionCtrl.create)
router.put('/:id',indexCtrl.regionCtrl.update)
router.delete('/:id',indexCtrl.regionCtrl.deleted)
router.get('/query/:id',indexCtrl.regionCtrl.querySQL)

export default router