import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.employeesCtrl.findAll)
router.get('/:ids',indexCtrl.employeesCtrl.findOne)
router.post('/',indexCtrl.employeesCtrl.create)
router.put('/:id',indexCtrl.employeesCtrl.update)
router.delete('/:id',indexCtrl.employeesCtrl.deleted)
router.get('/query/:id',indexCtrl.employeesCtrl.querySQL)

export default router