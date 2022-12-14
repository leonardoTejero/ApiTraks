
const express = require("express");
const { authMiddleware } = require("../middleware/session");
const { checkRol } = require("../middleware/rol");
const { validatorRegister } = require("../validators/auth")
const { validatorGetItem } = require("../validators/tracks")
const { getUsers, createUser, deleteUser, getUser, updateUser } = require("../controllers/users"); 

const router = express.Router();


/** 
 *  Obtener todos los usuarios
 * @openapi
 * /users:
 *      get:
 *        tags:
 *          - users
 *        summary: "Obtener  todos los usuarios"
 *        security:
 *          - bearerAuth: []    
 *        responses: 
 *          '200':
 *            content:
 *              application/json:
 *                schema: 
 *                  type: array
 *                  items: 
 *                  $ref: '#/components/schemas/users'       
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Error del servidor
 */
router.get("/", authMiddleware, checkRol(["admin"]), getUsers);

/** 
 *  Obtener un usuario por id
 * @openapi
 * /users/{id}:
 *      get:
 *        tags:
 *          - users
 *        summary: "Obtener un usuario en especifico"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID del usuario
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *            '200':
 *              content:
 *                application/json:
 *                  schema: 
 *                    $ref: '#/components/schemas/users'   
 *            '401':
 *              description: User Unauthorized
 *            '400':
 *              description: Bad Request
 *            '500':
 *              description: Server Error            
 */
router.get("/:id", authMiddleware, validatorGetItem, getUser);

// TODO usar el mismo controlador de auth register y eliminar este
/**  
 * crear un usuario con permisos de administrador
 * @openapi
 * /users:
 *      post:
 *        tags:
 *          - users
 *        summary: "Crear un nuevo usuario"
 *        description: "Crear un nuevo usuarion en la aplicacion, con permisos de administrador "
 *        security:
 *          - bearerAuth: []
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/users"
 *        responses:
 *          '200':
 *            description: Success     
 *          '401':
 *            description: User Unauthorized
 *          '400':
 *            description: Bad Request
 *          '500':
 *            description: Server Error
 */
router.post("/", authMiddleware, checkRol(["admin"]), validatorRegister, createUser); 

/** 
 *  Actualizar un usuario
 * @openapi
 * /users/{id}:
 *      put:
 *        tags:
 *          - users
 *        summary: "Actualizar un usuario"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID del usuario 
 *              required: true
 *              schema:
 *                type: string
 *        requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/users"
 *        responses:
 *          '200':
 *            description: Success     
 *          '401':
 *            description: User unauthorized           
 *          '400':
 *            description: Bad Request      
 *          '500':
 *            description: Server Error      
 */
router.put("/:id", authMiddleware, checkRol(["admin", "user"]), validatorGetItem, validatorRegister, updateUser); 

/**
 *   Eliminar un archivo por el id
 * @openapi
 * /users/{id}:
 *      delete:
 *        tags:
 *          - users
 *        summary: "Eliminar un usuario"
 *        security:
 *          - bearerAuth: []
 *        parameters:
 *            - name: id
 *              in: path
 *              description: ID del usuario
 *              required: true
 *              schema:
 *                type: string
 *        responses:
 *         '200':
 *           description: Success
 *         '401':
 *           description: User Unauthorized
 *         '400':
 *           description: Bad Request
 *         '500':
 *           description: Server Error
 */
router.delete("/:id", authMiddleware, checkRol(["admin"]), validatorGetItem, deleteUser); 


module.exports = router;