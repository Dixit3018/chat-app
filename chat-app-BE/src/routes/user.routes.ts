import express from "express";
import { getProfileDetails, getProfileDetailsByUserID, getUsers, uploadImage } from "../config/controllers/user.controller";

const router = express.Router();

/**
 * @swagger
 *  tags:
 *   - name: users
 *     description: Users
 * 
 * /api/users:
 *   get:
 *     tags:
 *         - users
 *     summary: Get all users
 *     description: Retrieve a list of users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The user ID.
 *                   email:
 *                     type: string
 *                     description: The user's email.
 *                   username:
 *                     type: string
 *                     description: The user's username.
 *             example:
 *               - id: "66f3aa306b2afd3de9df13cr"
 *                 username: "jhonedoe"
 *                 email: "jhonedoe@gmail.com"
 *                 "lastMessage": {
 *                   "_id": "66f7d7ca9e6d2e8b95659298",
 *                  "message": "hello",
 *                   "createdAt": "2024-09-28T10:17:46.045Z"
 *                 }
 *               - id: "66f3aa306b2afd3de9df13cy"
 *                 username: "json"
 *                 email: "json@gmail.com"
 *                 "lastMessage": {
 *                   "_id": "66f7d7ca9e6d2e8b95659298",
 *                  "message": "hello",
 *                   "createdAt": "2024-09-28T10:17:46.045Z"
 *                 }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /api/users/profile:
 *   get:
 *     tags:
 *         - users
 *     summary: Get user profile details
 *     description: Retrieve the profile details of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *             example:
 *               id: "66f3aa306b2afd3de9df13cr"
 *               username: "jhonedoe"
 *               email: "jhonedoe@gmail.com"
 *                   
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /api/users/profile/{id}:
 *   get:
 *     tags:
 *         - users
 *     summary: Get user details by user ID
 *     description: Retrieve user details based on the provided user ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details from user ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The user ID.
 *                 username:
 *                   type: string
 *                   description: The user's username.
 *                 email:
 *                   type: string
 *                   description: The user's email.
 *             example:
 *               id: "66f3aa306b2afd3de9df13cr"
 *               username: "jhonedoe"
 *               email: "jhonedoe@gmail.com"
 *               image: "string"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/" ,getUsers);
router.get("/profile", getProfileDetails);
router.get("/profile/:id", getProfileDetailsByUserID);
router.post('/upload', uploadImage);


export default router;
