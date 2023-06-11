import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.jobHistoryCtrl.findAll)
router.get('/:ids',indexCtrl.jobHistoryCtrl.findOne)
router.post('/',indexCtrl.jobHistoryCtrl.create)
router.put('/:id',indexCtrl.jobHistoryCtrl.update)
router.delete('/:id',indexCtrl.jobHistoryCtrl.deleted)
router.get('/query/:id',indexCtrl.jobHistoryCtrl.querySQL)

export default router