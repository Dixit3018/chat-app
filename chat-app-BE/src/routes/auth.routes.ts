import express from "express";
import { loginUser, logout } from "../config/controllers/auth.controller";
import { createUser, uploadImage } from "../config/controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 *  tags:
 *   - name: auth
 *     description: User authentication operations
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login
 *     description: User login API.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       200:
 *         description: Successful login response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user's ID.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                     email:
 *                       type: string
 *                       description: The email of the user.
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 * 
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     summary: Signup
 *     description: User signup API that allows new users to create an account, including optional profile image upload.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:  # Changed to multipart/form-data to support image upload
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 description: The password for the user account (min 6 characters).
 *                 example: securePassword123
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Optional profile image for the user. Supports JPG, PNG, and GIF formats.
 *     responses:
 *       201:
 *         description: Successful signup response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The user's unique ID.
 *                     username:
 *                       type: string
 *                       description: The username of the user.
 *                     email:
 *                       type: string
 *                       description: The email address of the user.
 *                     image:
 *                       type: string
 *                       format: uri
 *                       description: The URL of the uploaded profile image (if any).
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user.
 *       400:
 *         description: Invalid input, such as duplicate username or email, or missing required fields.
 *       500:
 *         description: Internal server error
 *
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - auth
 *     summary: Logout
 *     description: Logout user.
 *     responses:
 *       200:
 *         description: Successful loggedout
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post("/login", loginUser);
router.post("/signup", uploadImage, createUser);
router.post("/logout", logout as any);

export default router;
