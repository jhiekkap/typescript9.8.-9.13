"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientData());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(patientService_1.default.getPatient(id));
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const entry = req.body;
        const { id } = req.params;
        const upDatedPatient = patientService_1.default.addEntry(id, entry);
        res.json(upDatedPatient);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = router;
