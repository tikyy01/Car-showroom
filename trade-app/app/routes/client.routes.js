module.exports = app => {
  const controller = require("../controllers/client.controller");
  const router = require("express").Router();

  /**
   * @swagger
   * /api/clients:
   *   post:
   *     summary: Создать нового клиента
   *     tags: [Clients]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 example: Иван Иванов
   *               email:
   *                 type: string
   *                 example: ivan@example.com
   *               phone:
   *                 type: string
   *                 example: +79991234567
   *     responses:
   *       200:
   *         description: Клиент успешно создан
   *       500:
   *         description: Ошибка сервера
   */
  router.post("/", controller.create);

  /**
   * @swagger
   * /api/clients:
   *   get:
   *     summary: Получить список всех клиентов
   *     tags: [Clients]
   *     responses:
   *       200:
   *         description: Список клиентов
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Client'
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/", controller.findAll);

  /**
   * @swagger
   * /api/clients/{id}:
   *   get:
   *     summary: Получить клиента по ID
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID клиента
   *     responses:
   *       200:
   *         description: Данные клиента
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Client'
   *       404:
   *         description: Клиент не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.get("/:id", controller.findOne);

  /**
   * @swagger
   * /api/clients/{id}:
   *   put:
   *     summary: Обновить клиента по ID
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID клиента
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               phone:
   *                 type: string
   *     responses:
   *       200:
   *         description: Клиент успешно обновлён
   *       404:
   *         description: Клиент не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.put("/:id", controller.update);

  /**
   * @swagger
   * /api/clients/{id}:
   *   delete:
   *     summary: Удалить клиента по ID
   *     tags: [Clients]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID клиента
   *     responses:
   *       200:
   *         description: Клиент успешно удалён
   *       404:
   *         description: Клиент не найден
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/:id", controller.delete);

  /**
   * @swagger
   * /api/clients:
   *   delete:
   *     summary: Удалить всех клиентов
   *     tags: [Clients]
   *     responses:
   *       200:
   *         description: Все клиенты удалены
   *       500:
   *         description: Ошибка сервера
   */
  router.delete("/", controller.deleteAll);

  app.use("/api/clients", router);
};