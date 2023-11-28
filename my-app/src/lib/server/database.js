// database.js

import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcrypt';

let database = null;

/**
 * @returns {Promise<import('sqlite').Database>}
 */
export async function getDatabase() {
  if (!database) {
    database = await open({
      filename: path.join(process.cwd(), 'database.db'),
      driver: sqlite3.Database,
    });
  }
  return database;
}

export async function createUser({ username, password, email }) {
  const db = await getDatabase();
  const encryptedPassword = await bcrypt.hash(password, 10);
  const result = await db.run(
    `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
    username,
    encryptedPassword,
    email
  );
  return result.lastID;
}

export async function getUserById(id) {
  const db = await getDatabase();
  const result = await db.get(`SELECT * FROM users WHERE id = ?`, id);
  return result;
}

export async function updateUserAvailability(userId, availabilityData) {
  const db = await getDatabase();
  const result = await db.run(
    `UPDATE users SET availability = ? WHERE id = ?`,
    JSON.stringify(availabilityData),
    userId
  );
  return result.changes > 0; 
}

export async function userLogin({ username, password }) {
  const db = await getDatabase();
  const user = await db.get(`SELECT * FROM users WHERE username = ?`, username);

  if (!user) {
    // User not found
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    // Incorrect password
    return null;
  }

  // Valid credentials, return user information (excluding password)
  const { password: _, ...userInfo } = user;
  return userInfo;
}

export async function findUserByUsername(username) {
  const db = await getDatabase();
  const result = await db.get(`SELECT * FROM users WHERE username = ?`, username);
  return result;
}

export async function verifyPassword(candidatePassword, hashedPassword) {
  return bcrypt.compare(candidatePassword, hashedPassword);
}