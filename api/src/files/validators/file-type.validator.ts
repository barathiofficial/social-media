import { FileValidator, Injectable } from '@nestjs/common'
import * as path from 'path'

type AllowedMimeType = 'image/png' | 'image/jpeg'

type ValidationOptions = {
	mimeType: AllowedMimeType[] | AllowedMimeType
}

@Injectable()
export class FileTypeValidator extends FileValidator<ValidationOptions> {
	private readonly validExtensions: string[] = ['png', 'jpeg', 'jpg']
	private message = 'Invalid file type'

	isValid(file?: Express.Multer.File) {
		if (!file) {
			this.message = 'No file was uploaded'
			return false
		}

		const extension = path.extname(file.originalname).slice(1)

		if (!this.validExtensions.includes(extension)) {
			return false
		}

		const units = new Uint8Array(file.buffer)
		const bytes: string[] = []

		units.forEach((unit) => {
			bytes.push(unit.toString(16).padStart(2, '0'))
		})

		const hex = bytes.join('').toUpperCase()
		const mimeType = this.getMimeType(hex.slice(0, 8))

		if (!mimeType) {
			return false
		}

		if (Array.isArray(this.validationOptions.mimeType)) {
			return this.validationOptions.mimeType.includes(mimeType)
		} else {
			return mimeType === this.validationOptions.mimeType
		}
	}

	buildErrorMessage() {
		return this.message
	}

	getMimeType(magicNumber: string) {
		switch (magicNumber) {
			case '89504E47':
				return 'image/png'
			case 'FFD8FFDB':
			case 'FFD8FFE0':
			case 'FFD8FFE1':
			case 'FFD8FFE2':
				return 'image/jpeg'
			default:
				return null
		}
	}
}
