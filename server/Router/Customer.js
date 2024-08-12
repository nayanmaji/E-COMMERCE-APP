const express = require('express')
const router = express.Router();
const Customer = require('../Model/CustomerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
      const { name, email,phone, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const customer = new Customer({ name, email,phone, password: hashedPassword });
      await customer.save();
      res.sendStatus(201);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const customer = await Customer.findOne({ phone });
        if (!customer || !(await bcrypt.compare(password, customer.password))) {
            return res.sendStatus(401);
        }
        const token = jwt.sign({ id: customer._id }, process.env.SECRET_KET, { expiresIn: 60 * 5 });
        res.json({ token, customer_id: customer._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;