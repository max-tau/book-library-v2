const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../../src/models");
const app = require("../../src/app");
const {
  Sequelize,
  ValidationErrorItem,
  ValidationError,
} = require("sequelize");

describe("/book", () => {
  before(async () => await Book.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe("with no records in the database", () => {
    describe("POST /book", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/book").send({
          title: "Northern Lights",
          author: "Phillip Pullman",
          genre: "Fantasy",
          ISBN: "987654321",
        });

        // const newBookRecord = await Book.findByPk(response.body.id, {
        //   raw: true,
        // });

        expect(response.body.title).to.equal("Northern Lights");
        expect(response.body.author).to.equal("Phillip Pullman");
        expect(response.body.genre).to.equal("Fantasy");
        expect(response.body.ISBN).to.equal("987654321");
        expect(response.status).to.equal(201);
      });
    });
  });

  describe("with records in the database", () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: "Northern Lights",
          author: "Phillip Pullman",
          genre: "Fantasy",
          ISBN: "987654321",
        }),
        Book.create({
          title: "Consider Phlebus",
          author: "Iain M Banks",
          genre: "Sci-Fi",
          ISBN: "123456789",
        }),
        Book.create({
          title: "Alice in Wonderland",
          author: "Lewis Carroll",
          genre: "Victorian nonsense",
          ISBN: "111111111",
        }),
      ]);
    });

    describe("GET /book", () => {
      it("gets all of the book records", async () => {
        const response = await request(app).get("/book");

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe("GET /book/:id", () => {
      it("gets book record by id", async () => {
        const book = books[0];
        const response = await request(app).get(`/book/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });
    });

    describe("GET /book/titlesearch/:title", () => {
      it("gets book records by title", async () => {
        const book = books[0];
        const response = await request(app).get(
          `/book/titlesearch/${book.title}`
        );

        expect(response.status).to.equal(200);
        expect(response.body[0].title).to.equal(book.title);
      });
    });

    describe("GET /book/authorsearch/:author", () => {
      it("gets book records by author", async () => {
        const book = books[0];
        const response = await request(app).get(
          `/book/authorsearch/${book.author}`
        );

        expect(response.status).to.equal(200);
        expect(response.body[0].author).to.equal(book.author);
      });
    });

    describe("GET /book/genresearch/:genre", () => {
      it("gets book records by genre", async () => {
        const book = books[0];
        const response = await request(app).get(
          `/book/genresearch/${book.genre}`
        );

        expect(response.status).to.equal(200);
        expect(response.body[0].genre).to.equal(book.genre);
      });
    });

    describe("GET /book/ISBNsearch/:ISBN", () => {
      it("gets book records by ISBN", async () => {
        const book = books[0];
        const response = await request(app).get(
          `/book/ISBNsearch/${book.ISBN}`
        );

        expect(response.status).to.equal(200);
        expect(response.body[0].ISBN).to.equal(book.ISBN);
      });
    });

    describe("DELETE /:id", () => {
      it("deletes book record by id", async () => {
        const book = books[0];
        const response = await request(app).delete(`/book/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it("returns a 404 if the book does not exist", async () => {
        const response = await request(app).delete("/book/12345");

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal("The book could not be found.");
      });
    });
  });
});
