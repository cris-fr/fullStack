const router = require('express').Router();
const userController = require('../controller/userController');
const versionMiddleware = require('../middleware/versionate');
const layoutOpenning = require('../view/userView');
const layoutLogin = require('../view/loginView');
const layoutSignUp = require('../view/signupView');
const {limit} = require('../middleware/limit');

// Las rutas que preceden a otras rutas tienen prioridad.
// Las rutas con parámetros, seguidas por otra ruta, ocupan el segundo lugar.
// Las rutas con parámetros se ubican en tercer lugar.
// Las rutas sin parámetros se colocan en cuarto lugar.

router.use(layoutOpenning);
router.use('/login', layoutLogin);
router.use('/signup', layoutSignUp);

router.post("/login", limit('post', '/login'), versionMiddleware("1.0.0"), userController.signInUser);
router.post("/logout", limit('post'), versionMiddleware("1.0.0"), userController.logOutUser);
router.post("/", limit('post'), versionMiddleware("1.0.0"), userController.addNewUser);

router.put("/:id", limit('put'), versionMiddleware("1.0.0"), userController.updateUserById);
router.delete("/:id", limit('delete'), versionMiddleware("1.0.0"), userController.deleteUserById);

module.exports = router;