import {Router} from 'express';
import {getAllBikes, getBikeById, updateBike, deleteBike, addBike, getAllBidsOnBikeId, 
    addBidOnBikeId, getBikeSpecByBikeId, updateBikeSpec, addSpecOnBikeId, getBikeImagesByBikeId} from "../controllers/bike_controller.js"
import { isAdmin, isLoggedIn } from "../middleware/authenticate.js"

const router = Router();

router.get('/', getAllBikes)
router.get('/:id', getBikeById)
router.get('/:id/bids', getAllBidsOnBikeId)
router.get('/:id/spec', getBikeSpecByBikeId)
router.get('/:id/img', getBikeImagesByBikeId)
router.post('/', isLoggedIn, isAdmin, addBike)
router.post('/:bikeId', isLoggedIn, addBidOnBikeId)
router.post('/:id/spec', isLoggedIn, isAdmin, addSpecOnBikeId)
router.patch('/:id', isLoggedIn, isAdmin, updateBike)
router.patch('/:id/spec', isLoggedIn, isAdmin, updateBikeSpec)
router.delete('/:id', isLoggedIn, isAdmin, deleteBike)

export default router;
