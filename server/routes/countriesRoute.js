import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.countriesCtrl.findAll)
router.get('/:ids',indexCtrl.countriesCtrl.findOne)
router.post('/',indexCtrl.countriesCtrl.create)
router.put('/:id',indexCtrl.countriesCtrl.update)
router.delete('/:id',indexCtrl.countriesCtrl.deleted)
router.get('/query/:id',indexCtrl.countriesCtrl.querySQL)

export default router