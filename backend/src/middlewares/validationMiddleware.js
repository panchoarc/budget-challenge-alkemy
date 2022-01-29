const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body, { abortEarly: false, stripUnknown: true });

    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message }) => {
      return { [path]: message };
    });
    return res.status(400).json(errors);
  }
};

module.exports = {
  validation,
};
