/**
 * @swagger
 * components:
 *   schemas:
 *     Automobile:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         vin:
 *           type: string
 *         year:
 *           type: integer
 *         color:
 *           type: string
 *         price:
 *           type: number
 *         modelId:
 *           type: integer
 */
module.exports = app => {
  const automobile = require("../controllers/automobile.controller");
  const router = require("express").Router();

  // CRUD маршруты

  /**
   * @swagger
   * /api/automobiles:
   *   post:
   *     summary: Создать новый автомобиль
   *     tags: [Automobiles]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelId:
   *                 type: integer
   *                 example: 1
   *               modelName:
   *                 type: string
   *                 example: Camry
   *               year:
   *                 type: integer
   *                 example: 2023
   *               bodyType:
   *                 type: string
   *                 example: Sedan
   *               brandCode:
   *                 type: integer
   *                 example: 1
   *               vin:
   *                 type: string
   *                 example: JTDBE30KX30012345
   *     responses:
   *       200:
   *         description: Автомобиль успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", automobile.create);

  /**
   * @swagger
   * /api/automobiles:
   *   get:
   *     summary: Получить список всех автомобилей
   *     tags: [Automobiles]
   *     responses:
   *       200:
   *         description: Список автомобилей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Automobile'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", automobile.findAll);

  /**
   * @swagger
   * /api/automobiles/{id}:
   *   get:
   *     summary: Получить автомобиль по ID
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     responses:
   *       200:
   *         description: Данные автомобиля
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Automobile'
   *       404:
   *         description: Автомобиль не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", automobile.findOne);

  /**
   * @swagger
   * /api/automobiles/{id}:
   *   put:
   *     summary: Обновить автомобиль по ID
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               modelName:
   *                 type: string
   *               year:
   *                 type: integer
   *               bodyType:
   *                 type: string
   *               vin:
   *                 type: string
   *     responses:
   *       200:
   *         description: Автомобиль успешно обновлён
   *       404:
   *         description: Автомобиль не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", automobile.update);

  /**
   * @swagger
   * /api/automobiles/{id}:
   *   delete:
   *     summary: Удалить автомобиль по ID
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     responses:
   *       200:
   *         description: Автомобиль успешно удалён
   *       404:
   *         description: Автомобиль не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", automobile.delete);

  /**
   * @swagger
   * /api/automobiles:
   *   delete:
   *     summary: Удалить все автомобили
   *     tags: [Automobiles]
   *     responses:
   *       200:
   *         description: Все автомобили удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", automobile.deleteAll);

  // НОВЫЕ МАРШРУТЫ ДЛЯ ЛР12 (RAW SQL)

  /**
   * @swagger
   * /api/automobiles/{id}/brandname:
   *   get:
   *     summary: Получить название бренда по ID автомобиля
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     responses:
   *       200:
   *         description: Название бренда
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *       404:
   *         description: Бренд не найден
   */
  router.get("/:id/brandname", automobile.getBrandNameByAutoId);

  /**
   * @swagger
   * /api/automobiles/{id}/brand:
   *   get:
   *     summary: Получить бренд по ID автомобиля
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     responses:
   *       200:
   *         description: Данные бренда
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Brand'
   *       404:
   *         description: Бренд не найден
   */
  router.get("/:id/brand", automobile.getBrandByAutoId);

  /**
   * @swagger
   * /api/automobiles/{id}/model:
   *   get:
   *     summary: Получить модель по ID автомобиля
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID автомобиля
   *     responses:
   *       200:
   *         description: Данные модели
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Model'
   *       404:
   *         description: Модель не найдена
   */
  router.get("/:id/model", automobile.getModelByAutoId);

  /**
   * @swagger
   * /api/automobiles/bybrand/{brandId}:
   *   get:
   *     summary: Получить все автомобили по ID бренда
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: brandId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID бренда
   *     responses:
   *       200:
   *         description: Список автомобилей бренда
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Automobile'
   */
  router.get("/bybrand/:brandId", automobile.getAutosByBrand);

  /**
   * @swagger
   * /api/automobiles/bymodel/{modelId}:
   *   get:
   *     summary: Получить все автомобили по ID модели
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: modelId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID модели
   *     responses:
   *       200:
   *         description: Список автомобилей модели
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Automobile'
   */
  router.get("/bymodel/:modelId", automobile.getAutosByModel);

  /**
   * @swagger
   * /api/automobiles/brand/{brandId}/count:
   *   get:
   *     summary: Подсчитать количество автомобилей по бренду
   *     tags: [Automobiles]
   *     parameters:
   *       - in: path
   *         name: brandId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID бренда
   *     responses:
   *       200:
   *         description: Количество автомобилей
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 name:
   *                   type: string
   *                 auto_count:
   *                   type: integer
   */
  router.get("/brand/:brandId/count", automobile.countAutosByBrand);

  /**
   * @swagger
   * /api/automobiles/search/bymodelname:
   *   get:
   *     summary: Поиск автомобилей по названию модели
   *     tags: [Automobiles]
   *     parameters:
   *       - in: query
   *         name: search
   *         required: true
   *         schema:
   *           type: string
   *         description: Название модели для поиска
   *     responses:
   *       200:
   *         description: Список найденных автомобилей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Automobile'
   */
  router.get("/search/bymodelname", automobile.searchAutosByModelName);

  app.use("/api/automobiles", router);
};