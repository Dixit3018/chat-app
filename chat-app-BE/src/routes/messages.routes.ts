import express from "express";
import { deleteAllMessages, deleteMessage, getMessages, updateMessage } from "../config/controllers/message.controller";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   - name: messages
 *     description: Messages data
 * /api/messages/{id}:
 *   get:
 *     tags:
 *         - messages
 *     summary: Get messages
 *     description: Retrieve messages sent by a user to a specified user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user whose messages are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sender:
 *                     type: string
 *                     description: ID of the sender
 *                   message:
 *                     type: string
 *                     description: The message content
 *                   receiver:
 *                     type: string
 *                     description: ID of the receiver
 *       401:
 *         description: Unauthorized access due to invalid credentials
 *       400:
 *         description: Invalid receiver ID provided
 *       500:
 *         description: Internal server error
 *
 * /api/message/update:
 *   put:
 *     tags:
 *         - messages
 *     summary: Update message
 *     description: Update a particular message.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: ID of the message to delete.
 *               receiverId:
 *                 type: string
 *                 description: ID of the receiver.
 *               messageId:
 *                 type: string
 *                 description: ID of the message.
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The message ID.
 *                 message:
 *                   type: string
 *                   description: message.
 *                 sender:
 *                   type: string
 *                   description: sender Id.
 *                 receiver:
 *                   type: string
 *                   description: receiver Id.
 *             example:
 *               id: "66f3aa306b2afd3de9df13cr"
 *               sender: "66f3aa306b2afd3de9df13ty"
 *               receiver: "58f3aa306b2afd3de9df13ab"
 *               message: "hello"
 *       401:
 *         description: Unauthorized access due to invalid credentials
 *       400:
 *         description: Invalid input provided
 *       500:
 *         description: Internal server error
 *
 * /api/message:
 *   delete:
 *     tags:
 *         - messages
 *     summary: Delete a specific message
 *     description: Deletes a message sent to a specified user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: ID of the message to delete.
 *               receiverId:
 *                 type: string
 *                 description: ID of the receiver.
 *     responses:
 *       200:
 *         description: Message deleted successfully
 *       401:
 *         description: Unauthorized access due to invalid credentials
 *       400:
 *         description: Invalid input provided
 *       500:
 *         description: Internal server error
 *
 * /api/messages/{receiverId}:
 *   delete:
 *     tags:
 *         - messages
 *     summary: Delete all messages
 *     description: Deletes all messages sent to a specified user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: receiverId
 *         in: path
 *         required: true
 *         description: The ID of the user whose messages are to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All messages deleted successfully
 *       401:
 *         description: Unauthorized access due to invalid credentials
 *       400:
 *         description: Invalid input provided
 *       500:
 *         description: Internal server error
 */
router.get("/messages/:id", getMessages);
router.put("/message/update", updateMessage);
router.delete("/message", deleteMessage);
router.delete("/messages/:receiverId", deleteAllMessages);
export default router;
