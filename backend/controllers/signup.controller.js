const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");

//Création ustilisateur dans la base de donnée mysql
exports.signup = (req, res, next) => {
  // Validate request
  User.findOne({
    where: { email: req.body.email },
  }).then((email) => {
    if (email) {
      return res
        .status(401)
        .json({ message: "Cette adresse email est déjà inscrit" });
    } else {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = {
            firstName: req.body.firstName,
            email: req.body.email,
            password: hash,
            avatarUrl: req.body.avatarUrl,
            isSuperAdmin: req.body.isSuperAdmin,
          };
          User.create(user)
            .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};
exports.delete = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Utilisateur supprimé avec sucée!",
        });
      } else {
        res.send({
          message: `Impossible de supprmer id=${id}. Utilisateur inexistant!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Impossible de supprimer l'utilisateur id=" + id,
      });
    });
};
