import { mysqlTable, varchar, datetime, int, text, primaryKey, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('User', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('user'),
  emailVerified: datetime('emailVerified'),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').onUpdateNow().notNull(),
});

export const accounts = mysqlTable('Account', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: varchar('userId', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('providerAccountId', { length: 255 }).notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: int('expires_at'),
  token_type: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  id_token: text('id_token'),
  session_state: varchar('session_state', { length: 255 }),
}, (table) => [
  primaryKey({ columns: [table.provider, table.providerAccountId] }),
]);

export const sessions = mysqlTable('Session', {
  id: varchar('id', { length: 255 }).primaryKey(),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().unique(),
  userId: varchar('userId', { length: 255 }).notNull(),
  expires: datetime('expires').notNull(),
});

export const verificationTokens = mysqlTable('VerificationToken', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires: datetime('expires').notNull(),
}, (table) => [
  primaryKey({ columns: [table.identifier, table.token] }),
]);