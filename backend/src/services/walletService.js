import prisma from '../config/database.js';

export class WalletService {
  async getBalance(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { walletBalance: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return parseFloat(user.walletBalance.toString());
  }

  async deductAmount(userId, amount, description, bookingId = null) {
    const currentBalance = await this.getBalance(userId);

    if (currentBalance < amount) {
      throw new Error(`Insufficient balance. Required: ₹${amount}, Available: ₹${currentBalance}`);
    }

    const [updatedUser, transaction] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            decrement: amount,
          },
        },
      }),
      prisma.transaction.create({
        data: {
          userId,
          amount: -amount,
          type: 'DEBIT',
          description,
          bookingId,
        },
      }),
    ]);

    return {
      newBalance: parseFloat(updatedUser.walletBalance.toString()),
      transaction,
    };
  }

  async addAmount(userId, amount, description) {
    const [updatedUser, transaction] = await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: {
          walletBalance: {
            increment: amount,
          },
        },
      }),
      prisma.transaction.create({
        data: {
          userId,
          amount: amount,
          type: 'CREDIT',
          description,
        },
      }),
    ]);

    return {
      newBalance: parseFloat(updatedUser.walletBalance.toString()),
      transaction,
    };
  }

  async getTransactionHistory(userId) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return transactions.map(t => ({
      ...t,
      amount: parseFloat(t.amount.toString()),
    }));
  }
}

export default new WalletService();