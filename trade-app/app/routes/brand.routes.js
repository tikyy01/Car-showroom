module.exports = app => {
  const controller = require("../controllers/brand.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/brands:
   *   post:
   *     summary: Создать новый бренд
   *     tags: [Brands]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               brandCode:
   *                 type: integer
   *                 example: 1
   *               name:
   *                 type: string
   *                 example: Toyota
   *     responses:
   *       200:
   *         description: Бренд успешно создан
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Brand'
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/brands:
   *   get:
   *     summary: Получить список всех брендов
   *     tags: [Brands]
   *     responses:
   *       200:
   *         description: Список брендов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Brand'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/brands/{id}:
   *   get:
   *     summary: Получить бренд по ID
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID бренда
   *     responses:
   *       200:
   *         description: Данные бренда
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Brand'
   *       404:
   *         description: Бренд не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/brands/{id}:
   *   put:
   *     summary: Обновить бренд по ID
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID бренда
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               brandCode:
   *                 type: integer
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: Бренд успешно обновлён
   *       404:
   *         description: Бренд не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/brands/{id}:
   *   delete:
   *     summary: Удалить бренд по ID
   *     tags: [Brands]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID бренда
   *     responses:
   *       200:
   *         description: Бренд успешно удалён
   *       404:
   *         description: Бренд не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/brands:
   *   delete:
   *     summary: Удалить все бренды
   *     tags: [Brands]
   *     responses:
   *       200:
   *         description: Все бренды удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/brands", router);
};