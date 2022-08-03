const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, Diet } = require("../db");
const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiuRL = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
  );
  const apiInfo = await apiuRL.data.results.map((el) => {
    return {
      name: el.title,
      id: el.id,
      image: el.image,
      healthScore: el.healthScore,
      dishTypes: el.dishTypes,
      diets: el.diets,
      summary: el.summary,
      steps: el.analyzedInstructions.map((el) => {
        return el.steps.map((x) => {
          return {
            number: x.number,
            steps: x.step,
          };
        });
      }),
    };
  });

  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      atributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const api = await getApiInfo();
  const db = await getDbInfo();
  const allRecipe = api.concat(db);
  return allRecipe;
};

router.get("/recipes", async (req, res) => {
  const { name } = req.query;
  const info = await getAllRecipes();
  const filterName = await info.filter((el) =>
    el.name.toLowerCase().includes(name.toLowerCase())
  );
  filterName.length
    ? res.status(200).send(filterName)
    : res.status(404).send(`la receta:${name} no fue encontrada`);
});
router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const info = await getAllRecipes();

  const find = info.filter((el) => parseInt(el.id) === parseInt(id));

  find.length
    ? res.status(200).send(find)
    : res.status(404).send(`el id:${id} no existe`);
});
router.get("/diets", async (req, res) => {
  const newArr = [
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegetarian",
    "vegan",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "ketogenic",
    "fodmap friendly",
  ];
  
  newArr.forEach((el) => {
    Diet.findOrCreate({
      where: { name: el },
    })
  })
  const allDiets = await Diet.findAll();
  res.status(200).send(allDiets);
});
router.post("/recipes", async (req, res) => {
  const { name, summary, healthScore, step, diet, image } = req.body;

  const recipeCreate = await Recipe.create({
    name,
    summary,
    healthScore,
    step,
    image,
  });

  const dietDb = await Diet.findAll({
    where: { name: diet },
  });

  recipeCreate.addDiet(dietDb);

  res.send("la receta fue creada exitosamente");
});
router.get("/allrecipes", async (req, res) => {
  const allRecipes = await getAllRecipes();
  const map = allRecipes.map((el) => {
    return {
      steps: el.steps?el.steps:el.step,
      name: el.name,
      id: el.id,
      image: el.image,
      healthScore: el.healthScore,
      dishTypes: el.dishTypes,
      diets: el.diets?el.diets:el.diet,
      summary: el.summary,
    };
  });
  res.send(map);
});
router.get("/order/:info", async (req, res) => {
  const allRecipes = await getAllRecipes();
  const { info } = req.params;
  var arrOrder;
  if (info === "atoz") {
    arrOrder = allRecipes.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }
  if (info === "ztoa") {
    arrOrder = allRecipes.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
  }
  if (info === "scoremenos") {
    arrOrder = allRecipes.sort(function (a, b) {
      if (a.healthScore > b.healthScore) {
        return 1;
      }
      if (a.healthScore < b.healthScore) {
        return -1;
      }
      return 0;
    });
  }
  if (info === "scoremas") {
    arrOrder = allRecipes.sort(function (a, b) {
      if (a.healthScore > b.healthScore) {
        return -1;
      }
      if (a.healthScore < b.healthScore) {
        return 1;
      }
      return 0;
    });
  }
  res.send(arrOrder);
});

router.put("/put", async (req, res) => {
  const { id, healthScore } = req.body;
  const x = await getAllRecipes();

  let find = x.find((el) => el.id === id);
  if (find) {
    find.healthScore = healthScore;
    res.send(find);
  }
});
router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  const x = await getAllRecipes();

  const filter = x.filter((el) => el.id !== id);

  res.send(filter);
});

module.exports = router;
