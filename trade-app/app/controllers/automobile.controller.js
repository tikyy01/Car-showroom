const db = require("../models");
const Automobile = db.automobile;
const Brand = db.brand;
const Model = db.model;  
const Order = db.order;
const OrderItem = db.orderItem;
const Client = db.client;
const { QueryTypes } = require("sequelize");

// ------------------ CRUD ------------------

// CREATE
exports.create = (req, res) => {
  Automobile.create(req.body)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// READ ALL
exports.findAll = (req, res) => {
  Automobile.findAll()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// READ ONE
exports.findOne = (req, res) => {
  Automobile.findByPk(req.params.id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Automobile not found" });
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// UPDATE
exports.update = (req, res) => {
  Automobile.update(req.body, {
    where: { id: req.params.id }
  })
    .then(result => {
      if (result[0] === 1) {
        res.send({ message: "Automobile updated" });
      } else {
        res.send({ message: "Automobile not found" });
      }
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// DELETE ONE
exports.delete = (req, res) => {
  Automobile.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      if (result === 1) {
        res.send({ message: "Automobile deleted" });
      } else {
        res.send({ message: "Automobile not found" });
      }
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Automobile.destroy({ where: {} })
    .then(nums =>
      res.send({ message: `${nums} automobiles deleted` })
    )
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

//
//
// ------------------ RAW SQL (ЛР12) - ПОЛНОСТЬЮ ИСПРАВЛЕНО ------------------
//

// 1. Получить название бренда по ID автомобиля
exports.getBrandNameByAutoId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT b.name FROM brands b 
       JOIN automobiles a ON CAST(b.brand_code AS VARCHAR) = a.brand_code 
       WHERE a.id = ?`,
      { 
        replacements: [id],
        type: QueryTypes.SELECT 
      }
    );
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Brand not found for this auto" });
    }
    
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Получить всю запись о бренде по ID автомобиля
exports.getBrandByAutoId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT b.* FROM brands b 
       JOIN automobiles a ON CAST(b.brand_code AS VARCHAR) = a.brand_code 
       WHERE a.id = ?`,
      { 
        replacements: [id],
        type: QueryTypes.SELECT,
        model: Brand,
        mapToModel: true
      }
    );
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Brand not found for this auto" });
    }
    
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Получить модель по ID автомобиля
exports.getModelByAutoId = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT m.* FROM models m 
       JOIN automobiles a ON m.id = a.model_id 
       WHERE a.id = ?`,
      { 
        replacements: [id],
        type: QueryTypes.SELECT,
        model: Model,
        mapToModel: true
      }
    );
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Model not found for this auto" });
    }
    
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 4. Получить все автомобили по бренду
exports.getAutosByBrand = async (req, res) => {
  const { brandId } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT a.* FROM automobiles a WHERE a.brand_code = CAST(? AS VARCHAR)`,
      { 
        replacements: [brandId],
        type: QueryTypes.SELECT,
        model: Automobile,
        mapToModel: true
      }
    );
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 5. Получить все автомобили по модели
exports.getAutosByModel = async (req, res) => {
  const { modelId } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT a.* FROM automobiles a WHERE a.model_id = ?`,
      { 
        replacements: [modelId],
        type: QueryTypes.SELECT,
        model: Automobile,
        mapToModel: true
      }
    );
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 6. Подсчитать количество автомобилей по бренду
exports.countAutosByBrand = async (req, res) => {
  const { brandId } = req.params;
  
  try {
    const result = await db.sequelize.query(
      `SELECT b.name, COUNT(a.id) as auto_count 
       FROM brands b 
       LEFT JOIN automobiles a ON CAST(b.brand_code AS VARCHAR) = a.brand_code 
       WHERE b.brand_code = CAST(? AS INTEGER)
       GROUP BY b.id, b.name`,
      { 
        replacements: [brandId],
        type: QueryTypes.SELECT
      }
    );
    
    res.json(result[0] || { auto_count: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 7. Поиск автомобилей по названию модели
exports.searchAutosByModelName = async (req, res) => {
  const { search } = req.query;
  
  try {
    const result = await db.sequelize.query(
      `SELECT a.*, m.name as model_name, b.name as brand_name 
       FROM automobiles a 
       JOIN models m ON a.model_id = m.id 
       JOIN brands b ON CAST(b.brand_code AS VARCHAR) = a.brand_code 
       WHERE m.name LIKE ?`,
      { 
        replacements: [`%${search}%`],
        type: QueryTypes.SELECT
      }
    );
    
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};