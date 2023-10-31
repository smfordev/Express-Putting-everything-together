import express, { Request, Response, Router } from 'express';
import BookModel from './bookSchema';
import path from "path";
import { readFileSync } from 'fs';
import Book from './Book';
const router: Router = express.Router()

router.use(express.static(path.join(__dirname, '../public')))

function createRow(book: Book): string
{
	let elements: string = "";
	elements = `
		<td class="px-6 py-4">
			${book.title}
		</td>
		<td class="px-6 py-4">
			${book.author}
		</td>
		<td class="px-6 py-4">
			${book.status}
		</td>
		<td class="px-6 py-4">
			${book.price} DH
		</td>
		<td class="px-6 py-4">
			${Math.round((book.numberOfPagesRead / book.numberOfPages) * 100)}%
		</td>
		<td class="px-6 py-4">
			${book.format}
		</td>
		<td class="px-6 py-4">
			${book.suggestedBy || "No one"}
		</td>
		<td class="px-6 py-4">
			${book.finished}
		</td>
	`
	return (`<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">${elements}</tr>`);
}

router.get('/', async (req: Request, res: Response) => {
	let books: Book[] = await BookModel.find();
	let finished: number = await BookModel.find().where({finished: true}).count()
	let rows = "";
	for (let book of books)
		rows += createRow(book);

	let template = readFileSync(path.join(__dirname, 'reader.html'), { encoding: 'utf8', flag: 'r' });
	template = template.replace('[[content]]', rows).replace('[[readBooks]]', finished.toString());
	res.send(template);
})

router.get('/register', (req: Request, res: Response) => {
	let template = readFileSync(path.join(__dirname, 'register.html'), { encoding: 'utf8', flag: 'r' });
	template = template.replace('[[content]]', '');
	res.send(template);
})

router.get('/create', (req: Request, res: Response) => {
	const book = new BookModel(req.query);
	let error = book.validateSync();
	if (error)
	{
		let template: string = readFileSync(path.join(__dirname, 'register.html'), { encoding: 'utf8', flag: 'r' });
		let err: string = error.message.split(',').join('<br/>');
		template = template.replace('[[content]]', err);
		res.send(template);
		return;
	}
	book.save();
	res.redirect('/books');
})

router.get('/all', async (req: Request, res: Response) => {
	let books = await BookModel.find();
	res.json(books);
})

export default router;
