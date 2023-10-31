import BookModel from "./bookSchema";

export default class Book {
	title: string;
	author: string;
	numberOfPages: number;
	status: string;
	price: number;
	numberOfPagesRead: number;
	format: string;
	suggestedBy?: string;
	finished: boolean;

	constructor(title: string,
		author: string,
		numberOfPages: number,
		status: string,
		price: number,
		numberOfPagesRead: number,
		format: string,
		finished: boolean,
		suggestedBy?: string) {
		this.title = title
		this.author = author
		this.numberOfPages = numberOfPages
		this.status = status
		this.price = price
		this.numberOfPagesRead = numberOfPagesRead
		this.format = format
		this.suggestedBy = suggestedBy
		this.finished = finished
	}


	currentlyAt(): number {
		return this.numberOfPagesRead;
	}

	deleteBook() {
		BookModel.deleteOne(this);
	}
}

