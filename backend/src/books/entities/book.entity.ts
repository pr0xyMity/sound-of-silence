export class Book {
  id: string;
  name: string;
  author: string;

  static fromJSON(json: any): Book {
    const book = new Book();
    book.id = json.id;
    book.name = json.name;
    book.author = json.author;
    return book;
  }
}
