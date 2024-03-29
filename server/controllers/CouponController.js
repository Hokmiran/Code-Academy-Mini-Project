const Coupon = require('../models/Coupon');

const couponController = {
  createCoupon: async (req, res) => {
    try {
      const coupon = await Coupon.create(req.body);
      res.status(201).json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create coupon' });
    }
  },
  
  getCoupon: async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.id);
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get coupon' });
    }
  },

  getAllCoupons: async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get coupons' });
    }
  },
  
  updateCoupon: async (req, res) => {
    try {
      const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.json(coupon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update coupon' });
    }
  },
  
  deleteCoupon: async (req, res) => {
    try {
      const coupon = await Coupon.findByIdAndDelete(req.params.id);
      if (!coupon) {
        return res.status(404).json({ error: 'Coupon not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete coupon' });
    }
  }
};

module.exports = couponController;