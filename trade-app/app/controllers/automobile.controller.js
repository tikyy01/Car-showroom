const db = require("../models");
const Automobile = db.automobile;
const { QueryTypes } = require("sequelize");

exports.create = (req, res) => {
  Automobile.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Automobile.findAll({ include: [{ model: db.model, include: [db.brand] }] })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Automobile.findByPk(req.params.id, { include: [{ model: db.model, include: [db.brand] }] })
    .then(data => data ? res.send(data) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Automobile.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: "Updated" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Automobile.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: "Deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Automobile.destroy({ where: {} })
    .then(() => res.send({ message: "All deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getBrandNameByAutoId = (req, res) => {
  db.sequelize.query(
    `SELECT b.name FROM brands b
     JOIN models m ON m."brandId" = b.id
     JOIN automobiles a ON a."modelId" = m.id
     WHERE a.id = :id`,
    { replacements: { id: req.params.id }, type: QueryTypes.SELECT }
  )
    .then(data => data.length ? res.send(data[0]) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getBrandByAutoId = (req, res) => {
  db.sequelize.query(
    `SELECT b.* FROM brands b
     JOIN models m ON m."brandId" = b.id
     JOIN automobiles a ON a."modelId" = m.id
     WHERE a.id = :id`,
    { replacements: { id: req.params.id }, type: QueryTypes.SELECT }
  )
    .then(data => data.length ? res.send(data[0]) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getModelByAutoId = (req, res) => {
  db.sequelize.query(
    `SELECT m.* FROM models m
     JOIN automobiles a ON a."modelId" = m.id
     WHERE a.id = :id`,
    { replacements: { id: req.params.id }, type: QueryTypes.SELECT }
  )
    .then(data => data.length ? res.send(data[0]) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getAutosByBrand = (req, res) => {
  db.sequelize.query(
    `SELECT a.* FROM automobiles a
     JOIN models m ON a."modelId" = m.id
     WHERE m."brandId" = :brandId`,
    { replacements: { brandId: req.params.brandId }, type: QueryTypes.SELECT }
  )
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.getAutosByModel = (req, res) => {
  db.sequelize.query(
    `SELECT * FROM automobiles WHERE "modelId" = :modelId`,
    { replacements: { modelId: req.params.modelId }, type: QueryTypes.SELECT }
  )
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.countAutosByBrand = (req, res) => {
  db.sequelize.query(
    `SELECT b.name, COUNT(a.id) as auto_count FROM brands b
     JOIN models m ON m."brandId" = b.id
     JOIN automobiles a ON a."modelId" = m.id
     WHERE b.id = :brandId
     GROUP BY b.name`,
    { replacements: { brandId: req.params.brandId }, type: QueryTypes.SELECT }
  )
    .then(data => res.send(data[0] || {}))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.searchAutosByModelName = (req, res) => {
  db.sequelize.query(
    `SELECT a.* FROM automobiles a
     JOIN models m ON a."modelId" = m.id
     WHERE m.name ILIKE :search`,
    { replacements: { search: `%${req.query.search}%` }, type: QueryTypes.SELECT }
  )
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};