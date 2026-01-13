import walletService from '../services/walletService.js';
export const getWalletBalance = async (req, res, next) => {
  try {
    const balance = await walletService.getBalance(req.user.id);
    res.status(200).json({
      success: true,
      data: { balance },
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionHistory = async (req, res, next) => {
  try {
    const transactions = await walletService.getTransactionHistory(req.user.id);

    res.status(200).json({
      success: true,
      count: transactions.length,
      data: { transactions },
    });
  } catch (error) {
    next(error);
  }
};

export const addMoney = async (req, res, next) => {
  try {
    const amount = Number(req.body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
      });
    }
    if (amount > 100000) {
      return res.status(400).json({
        success: false,
        message: 'Amount exceeds allowed limit',
      });
    }
    const result = await walletService.addAmount(
      req.user.id,
      amount,
      'Wallet recharge'
    );
    res.status(200).json({
      success: true,
      message: 'Money added successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
