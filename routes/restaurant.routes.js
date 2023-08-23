const router = require('express').Router();
const { createOneRestaurant, getAllRestaurant, getOneRestaurant, putOneRestaurant, deleteOneRestaurantAndEmploye, createEmploye, showAllEmploye, showOneEmploye, putOneEmploye, deleteOneEmploye } = require('../controllers/restaurants.controller');

// POST /restaurant
router.post('/', createOneRestaurant);   // créer un nouveau restaurant dans la base de données

// GET /restaurant
router.get('/', getAllRestaurant);  //récupérez tous les restaurants

// GET /restaurant/:id
router.get('/:id',getOneRestaurant); //récupérez un restaurant avec l'ID 

// PUT /restaurant/:id
router.put('/:id', putOneRestaurant);  // mettre a jour un restaurant

// DELETE /restaurant/:id
router.delete('/:id', deleteOneRestaurantAndEmploye);//supprimez le restaurant et ces employe associé avec l'ID

// POST /restaurant/:id/employe
router.post('/:restaurantId/employe', createEmploye); // ajouter des employe a un restaurant

// GET /restaurant/:id/employe
router.get('/:id/employe', showAllEmploye);  // récupérez la liste de tous les employés du restaurant avec l'ID 

// GET /restaurant/:id/employe/:idEmploye
router.get('/:id/employe/:idEmploye', showOneEmploye);

// PUT /restaurant/:id/employe/:idEmploye
router.put('/:id/employe/:idEmploye', putOneEmploye); // mettre a jour un employés a un  restaurant avec l'ID

// DELETE /restaurant/:id/employe/:idEmploye
router.delete('/:restaurantId/employe/:employeId', deleteOneEmploye);  // suprimer un employés a un  restaurant avec l'ID

module.exports = router;