import prisma from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.util.js';
import { generateToken } from '../utils/jwt.util.js';
import config from '../config/environment.js';

export class AuthService {
  async register({ email, password, name }) {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        walletBalance: config.walletInitialBalance,
      },
      select: {
        id: true,
        email: true,
        name: true,
        walletBalance: true,
        createdAt: true,
      },
    });
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    return { user, token };
  }
  async login({ email, password }) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async getUserProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        walletBalance: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default new AuthService();
