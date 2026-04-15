module.exports = app => {
  const controller = require("../controllers/payment.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/payments:
   *   post:
   *     summary: Создать новый платёж
   *     tags: [Payments]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               paymentNumber:
   *                 type: string
   *                 example: PAY-001
   *               orderNumber:
   *                 type: integer
   *                 example: 1
   *               paymentDate:
   *                 type: string
   *                 format: date-time
   *                 example: 2024-01-15T10:00:00Z
   *               amount:
   *                 type: number
   *                 example: 2500000
   *               status:
   *                 type: string
   *                 example: completed
   *     responses:
   *       200:
   *         description: Платёж успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/payments:
   *   get:
   *     summary: Получить список всех платежей
   *     tags: [Payments]
   *     responses:
   *       200:
   *         description: Список платежей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Payment'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/payments/{id}:
   *   get:
   *     summary: Получить платёж по ID
   *     tags: [Payments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID платежа
   *     responses:
   *       200:
   *         description: Данные платежа
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Payment'
   *       404:
   *         description: Платёж не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/payments/{id}:
   *   put:
   *     summary: Обновить платёж по ID
   *     tags: [Payments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID платежа
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               amount:
   *                 type: number
   *               status:
   *                 type: string
   *     responses:
   *       200:
   *         description: Платёж успешно обновлён
   *       404:
   *         description: Платёж не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/payments/{id}:
   *   delete:
   *     summary: Удалить платёж по ID
   *     tags: [Payments]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID платежа
   *     responses:
   *       200:
   *         description: Платёж успешно удалён
   *       404:
   *         description: Платёж не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/payments:
   *   delete:
   *     summary: Удалить все платежи
   *     tags: [Payments]
   *     responses:
   *       200:
   *         description: Все платежи удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/payments", router);
};