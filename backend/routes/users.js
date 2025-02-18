import express from 'express';
const router = express.Router();

router.get('/profile', (req, res) => {
  res.json({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    userType: 'mentee',
  });
});

router.put('/profile', (req, res) => {
  const updates = req.body;
  res.json({
    success: true,
    message: 'Profile updated successfully',
    profile: {
      ...updates,
      id: 1,
    },
  });
});

export default router;
