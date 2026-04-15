module.exports = app => {
  const controller = require("../controllers/order-item.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/order-items:
   *   post:
   *     summary: Создать новый элемент заказа
   *     tags: [OrderItems]
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
   *               quantity:
   *                 type: integer
   *                 example: 1
   *               price:
   *                 type: number
   *                 example: 2500000
   *     responses:
   *       200:
   *         description: Элемент заказа успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/order-items:
   *   get:
   *     summary: Получить список всех элементов заказов
   *     tags: [OrderItems]
   *     responses:
   *       200:
   *         description: Список элементов заказов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/OrderItem'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/order-items/{id}:
   *   get:
   *     summary: Получить элемент заказа по ID
   *     tags: [OrderItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента заказа
   *     responses:
   *       200:
   *         description: Данные элемента заказа
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/OrderItem'
   *       404:
   *         description: Элемент заказа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/order-items/{id}:
   *   put:
   *     summary: Обновить элемент заказа по ID
   *     tags: [OrderItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента заказа
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               quantity:
   *                 type: integer
   *               price:
   *                 type: number
   *     responses:
   *       200:
   *         description: Элемент заказа успешно обновлён
   *       404:
   *         description: Элемент заказа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/order-items/{id}:
   *   delete:
   *     summary: Удалить элемент заказа по ID
   *     tags: [OrderItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента заказа
   *     responses:
   *       200:
   *         description: Элемент заказа успешно удалён
   *       404:
   *         description: Элемент заказа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/order-items:
   *   delete:
   *     summary: Удалить все элементы заказов
   *     tags: [OrderItems]
   *     responses:
   *       200:
   *         description: Все элементы заказов удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/order-items", router);
};