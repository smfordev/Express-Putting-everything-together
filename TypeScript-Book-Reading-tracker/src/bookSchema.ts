import mongoose from "mongoose";
import BookClass from "./Book";

const bookSchema = new mongoose.Schema<BookClass>({
	title: {
		type: String,
		minLength: 1,
		required: true
	},
	author: {
		type: String,
		minLength: 1,
		required: true
	},
	numberOfPages: {
		type: Number,
		min: 0,
		required: true
	},
	status: {
		type: String,
		enum: ["Read", "Re-read", "DNF", "Currently reading", "Returned Unread", "Want to read"],
		required: true
	},
	price: {
		type: Number,
		min: 0,
		required: true
	},
	numberOfPagesRead: {
		type: Number,
		min: 0,
		required: true,
		validate: {
			validator: function (this: any, val: number): boolean {
				return val <= this.numberOfPages;
			},
			message: 'should be less than `numberOfPages`'
		},
	},
	format: {
		type: String,
		minLength: 1,
		enum: ["Print", "PDF", "Ebook", "Audio Book"],
		required: true
	},
	suggestedBy: {
		type: String,
		required: false
	},
	finished: {
		type: Boolean,
		default: function (this: any, val: boolean): boolean {
			return this.numberOfPagesRead == this.numberOfPages;
		},
		required: true
	}
});

export default mongoose.model('book', bookSchema);
