import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.departmentsCtrl.findAll)
router.get('/:ids',indexCtrl.departmentsCtrl.findOne)
router.post('/',indexCtrl.departmentsCtrl.create)
router.put('/:id',indexCtrl.departmentsCtrl.update)
router.delete('/:id',indexCtrl.departmentsCtrl.deleted)
router.get('/query/:id',indexCtrl.departmentsCtrl.querySQL)

export default router