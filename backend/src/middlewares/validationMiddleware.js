const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body, { abortEarly: false, stripUnknown: true });

    next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.errors.join(", ") });
  }
};

module.exports = {
  validation,
};
