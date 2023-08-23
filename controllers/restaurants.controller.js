const connection = require('../database/index.js');
const mysql = require('mysql');

exports.createOneRestaurant =  (req, res) => {  // créer un nouveau restaurant dans la base de données
    let sql = "INSERT INTO restaurants (name, city, nbcouverts, terrasse, parking) " +
            " VALUES ('"    + req.body.name + "', '" 
                            + req.body.city + "', '"
                            + req.body.nbcouverts + "', '"
                            + req.body.terrasse + "', '"
                            + req.body.parking  + "')";
    
            connection.query(sql, (err, res) => {
            if (err) throw err;
            console.log("Insert a record !");
            });
    
        res.status(200);
}

exports.getAllRestaurant =  (req, res) => { //récupérez tous les restaurants
    var sql_template = "Select * from restaurants ";
            var replaces = ['restaurants'];

            sql = mysql.format(sql_template, replaces);
    
            connection.query(sql, function(err, rows) {
                if (err) throw err;
                res.send(rows)
            });
            // res.header("Access-Control-Allow-Origin", "*");
            res.status(200);
}

exports.getOneRestaurant = (req, res) => { //récupérez un restaurant avec l'ID 
    let id = req.params.id;

    let sql_template = "Select * from ?? WHERE ?? = " + id;
    let replaces = ['restaurants', 'id'];
    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, row, fields) {
        if (err) throw err;
    res.send(row);
});
    res.status(200);
}

exports.putOneRestaurant = (req, res) => {  // mettre a jour un restaurant
    const restaurantId = req.params.id;
    const updatedRestaurant = req.body;
// Vérifie si toutes les données sont présentes dans la requête
if (!updatedRestaurant.name || !updatedRestaurant.city || !updatedRestaurant.nbcouverts || !updatedRestaurant.terrasse || !updatedRestaurant.parking) {
    return res.status(400).json({ error: "Missing required fields" });
}
//requête SQL pour mettre à jour le restaurant avec l'ID donné
const sql = "UPDATE restaurants SET name = ?, city = ?, nbcouverts = ?, terrasse = ?, parking = ? WHERE Id = ?";
// Executer la requête en utilisant les données fournies dans req.body
connection.query(sql, [updatedRestaurant.name, updatedRestaurant.city, updatedRestaurant.nbcouverts, updatedRestaurant.terrasse, updatedRestaurant.parking, restaurantId], (err, result) => {
    if (err) {
        console.error("Error updating restaurant:", err);
        return res.status(500).json({ error: "Failed to update the restaurant" });
    }
    if (result.affectedRows === 0) {
        // Aucun restaurant mis à jour (l'ID n'existe pas dans la base de données)
        return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json({ message: "Restaurant updated successfully" });
});
}

exports.deleteOneRestaurantAndEmploye = (req, res) => { //supprimez le restaurant et ces employe associé avec l'ID
    const restaurantId = parseInt(req.params.id);

// Supprime les employés associés au restaurant
    const deleteEmployeesQuery = "DELETE FROM employes WHERE restaurant_id = ?";
    connection.query(deleteEmployeesQuery, [restaurantId], (err, employeeResult) => {
    if (err) {
        console.error("Error deleting employees:", err);
        return res.status(500).json({ error: "Failed to delete employees" });
    }

    // Ensuite, supprimer le restaurant
    const deleteRestaurantQuery = "DELETE FROM restaurants WHERE Id = ?";
    connection.query(deleteRestaurantQuery, [restaurantId], (err, restaurantResult) => {
        if (err) {
            console.error("Error deleting restaurant:", err);
            return res.status(500).json({ error: "Failed to delete the restaurant" });
        }

        if (restaurantResult.affectedRows === 0) {
            // Aucun restaurant supprimé (l'ID n'existe pas dans la base de données)
            return res.status(404).json({ error: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant and associated employees deleted successfully" });
    });
  });
}

exports.createEmploye =  (req, res) => {  // ajouter des employe a un restaurant
    const restaurantId = req.params.restaurantId;
    const newEmployee = req.body;
// Vérifier si les données requises sont présentes dans le corps de la requête
    if (!newEmployee.first_name || !newEmployee.last_name || !newEmployee.hire_date || !newEmployee.restaurant_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
// Formater la requête SQL pour insérer le nouvel employé dans la table "employes"
    const sql = "INSERT INTO employes (first_name, last_name, hire_date, restaurant_id) VALUES (?, ?, ?, ?)";
    // Exécuter la requête pour insérer le nouvel employé
    connection.query(sql, [newEmployee.first_name, newEmployee.last_name, newEmployee.hire_date, newEmployee.restaurant_id], (err, result) => {
        if (err) {
            console.error("Error creating employe:", err);
            return res.status(500).json({ error: "Failed to create the employe" });
        }
        // Récupérer l'ID de l'employé nouvellement inséré
        const employeId = result.insertId;

        res.status(200).json({ message: `New employe added with ID ${employeId} to the restaurant with ID ${restaurantId}` });
    });
}

exports.showAllEmploye = (req, res) => { // récupérez la liste de tous les employés du restaurant avec l'ID 
    const restaurantId = req.params.id;
    // Formater la requête SQL pour récupérer tous les employés du restaurant avec l'ID donné
    const sql = "SELECT * FROM employes WHERE restaurant_id = ?";

// Exécuter la requête pour récupérer les employés du restaurant
    connection.query(sql, [restaurantId], (err, results) => {
        if (err) {
            console.error("Error fetching employes:", err);
            return res.status(500).json({ error: "Failed to fetch employes" });
        }

        res.status(200).json(results);
    });
}

exports.showOneEmploye =  (req, res) => { // récupérez un employés a un  restaurant avec l'ID
    const restaurantId = req.params.id;
    const employeId = req.params.idEmploye;
// Formater la requête SQL pour récupérer l'employé avec l'ID donné qui travaille dans le restaurant avec l'ID donné
    const sql = "SELECT * FROM employes WHERE Id = ? AND restaurant_id = ?";
// Exécuter la requête pour récupérer l'employé
    connection.query(sql, [employeId, restaurantId], (err, results) => {
        if (err) {
            console.error("Error fetching employe:", err);
            return res.status(500).json({ error: "Failed to fetch employe" });
        }
        if (results.length === 0) {
            // Aucun employé trouvé pour l'ID donné dans le restaurant avec l'ID donné
            return res.status(404).json({ error: "Employe not found" });
        }
        res.status(200).json(results[0]);
    });
}

exports.putOneEmploye =  (req, res) => { // mettre a jour un employés a un  restaurant avec l'ID
    const restaurantId = req.params.id;
    const employeId = req.params.idEmploye;
    const updatedEmployee = req.body;
// Vérifier si les données requises sont présentes dans le corps de la requête
    if (!updatedEmployee.first_name || !updatedEmployee.last_name || !updatedEmployee.hire_date || !updatedEmployee.restaurant_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }
// Formater la requête SQL pour mettre à jour l'employé avec l'ID donné qui travaille dans le restaurant avec l'ID donné
    const sql = "UPDATE employes SET first_name = ?, last_name = ?, hire_date = ?, restaurant_id = ? WHERE Id = ? AND restaurant_id = ?";
// Exécuter la requête pour mettre à jour l'employé
    connection.query(sql, [updatedEmployee.first_name, updatedEmployee.last_name, updatedEmployee.hire_date, updatedEmployee.restaurant_id, employeId, restaurantId], (err, result) => {
        if (err) {
            console.error("Error updating employe:", err);
            return res.status(500).json({ error: "Failed to update the employe" });
        }
        if (result.affectedRows === 0) {
            // Aucun employé mis à jour (l'ID de l'employé ou de restaurant n'existe pas dans la base de données)
            return res.status(404).json({ error: "Employe not found" });
        }
        res.status(200).json({ message: `Employe with ID ${employeId} for the restaurant with ID ${restaurantId} updated successfully` });
    });
}

exports.deleteOneEmploye =  (req, res) => { // suprimer un employés a un  restaurant avec l'ID
    const restaurantId = parseInt(req.params.restaurantId);
    const employeId = parseInt(req.params.employeId);

    //  supprimer l'employé avec l'ID qui travaille dans le restaurant 
    const sql = "DELETE FROM employes WHERE Id = ? AND restaurant_id = ?";

    // Exécuter la requête pour supprimer l'employé
    connection.query(sql, [employeId, restaurantId], (err, result) => {
        if (err) {
            console.error("Error deleting employe:", err);
            return res.status(500).json({ error: "Failed to delete the employe" });
        }

        if (result.affectedRows === 0) {
            // Aucun employé supprimé (l'ID de l'employé ou de restaurant n'existe pas dans la base de données)
            return res.status(404).json({ error: "Employe not found" });
        }

        res.status(200).json({ message: `Employe with ID ${employeId} for the restaurant with ID ${restaurantId} deleted successfully` });
    });
}
