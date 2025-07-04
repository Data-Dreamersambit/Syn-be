import { Router } from "express";
import { sendContactEmail, sendMailToUser } from "../controllers/contactController.js";

const router = Router();

router.post("/email", sendContactEmail);
router.post("/send-email", sendMailToUser);

export default router;
