/**
 * @swagger
 * components:
 *   schemas:
 *     Model:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         modelCode:
 *           type: integer
 *         name:
 *           type: string
 *         brandId:
 *           type: integer
 */

module.exports = app => {
  const controller = require("../controllers/model.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/models:
   *   post:
   *     summary: Создать новую модель
   *     tags: [Models]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelCode:
   *                 type: string
   *                 example: CAM40
   *               brandCode:
   *                 type: integer
   *                 example: 1
   *               name:
   *                 type: string
   *                 example: Camry
   *     responses:
   *       200:
   *         description: Модель успешно создана
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/models:
   *   get:
   *     summary: Получить список всех моделей
   *     tags: [Models]
   *     responses:
   *       200:
   *         description: Список моделей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Model'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/models/{id}:
   *   get:
   *     summary: Получить модель по ID
   *     tags: [Models]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID модели
   *     responses:
   *       200:
   *         description: Данные модели
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Model'
   *       404:
   *         description: Модель не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/models/{id}:
   *   put:
   *     summary: Обновить модель по ID
   *     tags: [Models]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID модели
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelCode:
   *                 type: string
   *               brandCode:
   *                 type: integer
   *               name:
   *                 type: string
   *     responses:
   *       200:
   *         description: Модель успешно обновлена
   *       404:
   *         description: Модель не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/models/{id}:
   *   delete:
   *     summary: Удалить модель по ID
   *     tags: [Models]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID модели
   *     responses:
   *       200:
   *         description: Модель успешно удалена
   *       404:
   *         description: Модель не найдена
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/models:
   *   delete:
   *     summary: Удалить все модели
   *     tags: [Models]
   *     responses:
   *       200:
   *         description: Все модели удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/models", router);
};