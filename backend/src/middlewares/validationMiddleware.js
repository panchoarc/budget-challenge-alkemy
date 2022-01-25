const validation = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body, { abortEarly: false, stripUnknown: true });

    next();
  } catch (e) {
    /**TODO: Fix Validation Errors */

    const errors = e.inner.map((error) => {
      return { field: error.path, message: error.message };
    });
    return res.status(400).json(errors);
  }
};

module.exports = {
  validation,
};
