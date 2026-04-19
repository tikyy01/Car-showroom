/**
 * @swagger
 * components:
 *   schemas:
 *     PriceListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         priceListId:
 *           type: integer
 *         automobileId:
 *           type: integer
 *         clientPrice:
 *           type: number
 */
module.exports = app => {
  const controller = require("../controllers/price-list-item.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/price-list-items:
   *   post:
   *     summary: Создать новый элемент прайс-листа
   *     tags: [PriceListItems]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               vin:
   *                 type: string
   *                 example: JTDBE30KX30012345
   *               priceListNumber:
   *                 type: integer
   *                 example: 1
   *               price:
   *                 type: number
   *                 example: 2500000
   *               discountPrice:
   *                 type: number
   *                 example: 2300000
   *     responses:
   *       200:
   *         description: Элемент прайс-листа успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/price-list-items:
   *   get:
   *     summary: Получить список всех элементов прайс-листа
   *     tags: [PriceListItems]
   *     responses:
   *       200:
   *         description: Список элементов прайс-листа
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/PriceListItem'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/price-list-items/{id}:
   *   get:
   *     summary: Получить элемент прайс-листа по ID
   *     tags: [PriceListItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента прайс-листа
   *     responses:
   *       200:
   *         description: Данные элемента прайс-листа
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PriceListItem'
   *       404:
   *         description: Элемент прайс-листа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/price-list-items/{id}:
   *   put:
   *     summary: Обновить элемент прайс-листа по ID
   *     tags: [PriceListItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента прайс-листа
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               price:
   *                 type: number
   *               discountPrice:
   *                 type: number
   *     responses:
   *       200:
   *         description: Элемент прайс-листа успешно обновлён
   *       404:
   *         description: Элемент прайс-листа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/price-list-items/{id}:
   *   delete:
   *     summary: Удалить элемент прайс-листа по ID
   *     tags: [PriceListItems]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID элемента прайс-листа
   *     responses:
   *       200:
   *         description: Элемент прайс-листа успешно удалён
   *       404:
   *         description: Элемент прайс-листа не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/price-list-items:
   *   delete:
   *     summary: Удалить все элементы прайс-листа
   *     tags: [PriceListItems]
   *     responses:
   *       200:
   *         description: Все элементы прайс-листа удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/price-list-items", router);
};