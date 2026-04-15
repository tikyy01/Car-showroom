module.exports = app => {
  const controller = require("../controllers/price-list.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/price-lists:
   *   post:
   *     summary: Создать новый прайс-лист
   *     tags: [PriceLists]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               priceListNumber:
   *                 type: integer
   *                 example: 1
   *               creationDate:
   *                 type: string
   *                 format: date-time
   *                 example: 2024-01-01T00:00:00Z
   *     responses:
   *       200:
   *         description: Прайс-лист успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/price-lists:
   *   get:
   *     summary: Получить список всех прайс-листов
   *     tags: [PriceLists]
   *     responses:
   *       200:
   *         description: Список прайс-листов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PriceList'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/price-lists/{id}:
   *   get:
   *     summary: Получить прайс-лист по ID
   *     tags: [PriceLists]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID прайс-листа
   *     responses:
   *       200:
   *         description: Данные прайс-листа
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PriceList'
   *       404:
   *         description: Прайс-лист не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/price-lists/{id}:
   *   put:
   *     summary: Обновить прайс-лист по ID
   *     tags: [PriceLists]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID прайс-листа
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               priceListNumber:
   *                 type: integer
   *               creationDate:
   *                 type: string
   *                 format: date-time
   *     responses:
   *       200:
   *         description: Прайс-лист успешно обновлён
   *       404:
   *         description: Прайс-лист не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/price-lists/{id}:
   *   delete:
   *     summary: Удалить прайс-лист по ID
   *     tags: [PriceLists]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID прайс-листа
   *     responses:
   *       200:
   *         description: Прайс-лист успешно удалён
   *       404:
   *         description: Прайс-лист не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/price-lists:
   *   delete:
   *     summary: Удалить все прайс-листы
   *     tags: [PriceLists]
   *     responses:
   *       200:
   *         description: Все прайс-листы удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/price-lists", router);
};