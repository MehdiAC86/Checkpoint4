const jwt = require("jsonwebtoken");

const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.readUserById(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      delete user.password;
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await tables.user.update(id, req.params.id);
    console.info(result);

    if (result == null) {
      res.sendStatus(204);
    } else {
      res.json({ message: "Utilisateur ajouté avec succès" });
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ ...req.body, id: insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const user = await tables.user.delete(req.params.id);
    console.info(user);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json({ message: "Utilisateur supprimé" });
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const token = jwt.sign({ id: req.user.id }, process.env.APP_SECRET);
    const refreshToken = jwt.sign(
      { id: req.user.id },
      process.env.APP_REFRESH_SECRET
    );

    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

const generateNewToken = (user) => {
  const token = jwt.sign({ id: user.id }, process.env.APP_SECRET);
  return token;
};
const refresh = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.APP_SECRET);
    const user = await tables.user.readUserById(decoded.id);
    delete user.password;

    const newToken = generateNewToken(user);

    res.cookie("token", newToken, { httpOnly: true }).json({ user });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  login,
  refresh,
  logout,
};
