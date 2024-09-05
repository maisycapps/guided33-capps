const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma")

// // Current Route Location /api/authors

// GET ALL AUTHORS
router.get("/", async (req, res, next) => {
    try {
        const authors = await prisma.author.findMany()
        res.json(authors)
    } catch (error) {
        next()
    }
})

// POST NEW AUTHOR
router.post("/", async (req, res, next) => {
    try {
      const { name } = req.body;
      const author = await prisma.author.create({ data: { name } });
      res.json(author);
    } catch(error) {
      next();
    }
});

// GET AN AUTHOR BY ID
  router.get("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const author = await prisma.author.findUnique({ where: { id } });
  
      if (!author) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      res.json(author);
    } catch {
      next();
    }
});

// DELETE AN AUTHOR BY ID
router.delete("/:id", async (req, res, next) => {

    try {
      const id = +req.params.id;
  
      const authorExists = await prisma.author.findUnique({ where: { id } });
      if (!authorExists) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      await prisma.author.delete({ where: { id } });
  
      res.sendStatus(204);
    } catch {
      next();
    }
  });

// UPDATE AN AUTHOR BY ID
router.put("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const authorExists = await prisma.author.findUnique({ where: { id } });
      if (!authorExists) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      const { name } = req.body;
      if (!name) {
        return next({
          status: 400,
          message: "Author must have a name.",
        });
      }

      const author = await prisma.author.update({
        where: { id },
        data: { name },
      });
  
      res.json(author);
    } catch {
      next();
    }
});

// GET ALL BOOKS BY AUTHOR ID
router.get("/:id/books", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const author = await prisma.author.findUnique({ where: { id } });
      if (!author) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }
  
      const books = await prisma.book.findMany({ where: { authorId: id } });
  
      res.json(books);
    } catch {
      next();
    }
  });

// POST A NEW BOOK BY AN AUTHOR ID
router.post("/:id/books", async (req, res, next) => {
    try {
      const id = +req.params.id;
  
      const author = await prisma.author.findUnique({ where: { id } });
      if (!author) {
        return next({
          status: 404,
          message: `Could not find author with id ${id}.`,
        });
      }

      const { title } = req.body;
      if (!title) {
        return next({
          status: 400,
          message: "Book must have a title.",
        });
      }

      const book = await prisma.book.create({
        data: { title, author: { connect: { id } } },
      });
  
      res.json(book);
    } catch {
      next();
    }
  });