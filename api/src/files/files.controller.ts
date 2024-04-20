import {
	Controller,
	ParseFilePipe,
	Post,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service'
import { FileSizeValidator, FileTypeValidator } from './validators'

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('post')
	@UseInterceptors(FilesInterceptor('files'))
	async uploadFile(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new FileTypeValidator({
						mimeType: ['image/png', 'image/jpeg']
					}),
					new FileSizeValidator({
						size: 1024 * 1024
					})
				]
			})
		)
		files: Express.Multer.File[]
	) {
		const movedFiles = this.filesService.moveFiles(files)

		return movedFiles
	}
}
