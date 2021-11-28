const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator"); // for server side validation

const Students = require("../models/Student");

const client = require("../chache/client")
const isChached = require('../chache/chache')


//adding students


router.post(
    "/student/api",
    [
        check("name", "name is required").not().isEmpty(),
        check("phone", "give right phone number").isLength({ min: 10 }),
        check("email", "email is required").isEmail(),
        check("address", "address is required").not().isEmpty(),
        check("bloodGroup", "blood-group is required").not().isEmpty(),
        check("gender", "gender is required").not().isEmpty(),
    ],
    async (req, res) => {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const data = req.body;

            const email1 = await Students.findOne({ email: data.email });
            const phone1 = await Students.findOne({ phone: data.phone });

            if (email1) {
                return res.status(400).send("Mail is alread used !!");
            }
            if (phone1) {
                return res.status(400).send("Contact number is alread used !!");
            }

            const student = new Students({
                ...data,
            });
            let kk = JSON.stringify(data)
            client.set(data.email,kk)

            const resp = await student.save();
            res.send(resp);
        } catch (err) {
            console.error(err.message);

            res.status(500).send(err);
        }
    }
);


//getting students by email

router.get("/student/api/:email",[check('mail','invalid mail!!').isEmail()],isChached,async (req, res) => {
    const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    try {
        const email = req.params.email;

        const data = await Students.find({email}, { _id: 0 });
        if (data) {
            return res.send(data);
        } else {
            res.status(404).send("No student found !!");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error !!");
    }
});

module.exports = router;
