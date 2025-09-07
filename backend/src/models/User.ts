import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '../utils/database';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role?: 'USER' | 'ADMIN' | 'MANAGER';
  company?: string;
  position?: string;
}

export interface UpdateUserData {
  name?: string;
  company?: string;
  position?: string;
}

export class UserService {
  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }

  static async createUser(userData: CreateUserData): Promise<User> {
    const hashedPassword = await this.hashPassword(userData.password);
    
    return prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async findUserByEmailWithPassword(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
  }

  static async findUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  static async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  static async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}