/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         clientCode:
 *           type: integer
 *         clientId:
 *           type: integer
 *         status:
 *           type: string
 */
module.exports = app => {
  const controller = require("../controllers/order.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/orders:
   *   post:
   *     summary: Создать новый заказ
   *     tags: [Orders]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               orderNumber:
   *                 type: string
   *                 example: ORD-001
   *               clientCode:
   *                 type: integer
   *                 example: 1
   *               orderDate:
   *                 type: string
   *                 format: date-time
   *                 example: 2024-01-15T10:00:00Z
   *               totalAmount:
   *                 type: number
   *                 example: 2500000
   *               status:
   *                 type: string
   *                 example: pending
   *               priceListNumber:
   *                 type: string
   *                 example: PL-2024-01
   *     responses:
   *       200:
   *         description: Заказ успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/orders:
   *   get:
   *     summary: Получить список всех заказов
   *     tags: [Orders]
   *     responses:
   *       200:
   *         description: Список заказов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Order'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/orders/{id}:
   *   get:
   *     summary: Получить заказ по ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID заказа
   *     responses:
   *       200:
   *         description: Данные заказа
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       404:
   *         description: Заказ не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/orders/{id}:
   *   put:
   *     summary: Обновить заказ по ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID заказа
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               totalAmount:
   *                 type: number
   *               status:
   *                 type: string
   *     responses:
   *       200:
   *         description: Заказ успешно обновлён
   *       404:
   *         description: Заказ не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/orders/{id}:
   *   delete:
   *     summary: Удалить заказ по ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID заказа
   *     responses:
   *       200:
   *         description: Заказ успешно удалён
   *       404:
   *         description: Заказ не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/orders:
   *   delete:
   *     summary: Удалить все заказы
   *     tags: [Orders]
   *     responses:
   *       200:
   *         description: Все заказы удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/orders", router);
};