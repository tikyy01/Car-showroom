/**
 * @swagger
 * components:
 *   schemas:
 *     Delivery:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         city:
 *           type: string
 *         address:
 *           type: string
 *         orderId:
 *           type: integer
 */
module.exports = app => {
  const controller = require("../controllers/delivery.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/deliveries:
   *   post:
   *     summary: Создать новую доставку
   *     tags: [Deliveries]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               orderNumber:
   *                 type: integer
   *                 example: 1
   *               vin:
   *                 type: string
   *                 example: JTDBE30KX30012345
   *               deliveryDate:
   *                 type: string
   *                 format: date-time
   *                 example: 2024-01-15T10:00:00Z
   *               deliveryType:
   *                 type: string
   *                 example: courier
   *     responses:
   *       200:
   *         description: Доставка успешно создана
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/deliveries:
   *   get:
   *     summary: Получить список всех доставок
   *     tags: [Deliveries]
   *     responses:
   *       200:
   *         description: Список доставок
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Delivery'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/deliveries/{id}:
   *   get:
   *     summary: Получить доставку по ID
   *     tags: [Deliveries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID доставки
   *     responses:
   *       200:
   *         description: Данные доставки
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Delivery'
   *       404:
   *         description: Доставка не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/deliveries/{id}:
   *   put:
   *     summary: Обновить доставку по ID
   *     tags: [Deliveries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID доставки
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               deliveryDate:
   *                 type: string
   *                 format: date-time
   *               deliveryType:
   *                 type: string
   *     responses:
   *       200:
   *         description: Доставка успешно обновлена
   *       404:
   *         description: Доставка не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/deliveries/{id}:
   *   delete:
   *     summary: Удалить доставку по ID
   *     tags: [Deliveries]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID доставки
   *     responses:
   *       200:
   *         description: Доставка успешно удалена
   *       404:
   *         description: Доставка не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/deliveries:
   *   delete:
   *     summary: Удалить все доставки
   *     tags: [Deliveries]
   *     responses:
   *       200:
   *         description: Все доставки удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/deliveries", router);
};