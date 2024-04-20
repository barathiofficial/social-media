import { Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FilesService {
	moveFiles(files: Express.Multer.File[]) {
		const movedFiles: Express.Multer.File[] = []

		for (const file of files) {
			const fileName = `${Date.now()}-${file.originalname}`
			const filePath = path.resolve(
				__dirname,
				'..',
				'..',
				'uploads',
				fileName
			)
			fs.writeFileSync(filePath, file.buffer)

			const movedFile = {
				...file,
				filename: fileName,
				path: filePath
			}

			movedFiles.push(movedFile)
		}

		return movedFiles
	}
}
