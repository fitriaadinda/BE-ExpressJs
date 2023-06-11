import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.jobsCtrl.findAll)
router.get('/:ids',indexCtrl.jobsCtrl.findOne)
router.post('/',indexCtrl.jobsCtrl.create)
router.put('/:id',indexCtrl.jobsCtrl.update)
router.delete('/:id',indexCtrl.jobsCtrl.deleted)
router.get('/query/:id',indexCtrl.jobsCtrl.querySQL)

export default router