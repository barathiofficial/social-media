import { FileValidator, Injectable } from '@nestjs/common'

type ValidationOptions = {
	size: number
}

@Injectable()
export class FileSizeValidator extends FileValidator<ValidationOptions> {
	private message = 'Invalid file type.'

	isValid(file?: Express.Multer.File) {
		if (!file) {
			this.message = 'No file was uploaded.'
			return false
		}

		if (file.size > this.validationOptions.size) {
			this.message = 'File is too large.'
			return false
		}

		return true
	}

	buildErrorMessage() {
		return this.message
	}
}
