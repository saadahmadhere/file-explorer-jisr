export type FileType = 'folder' | 'file';

export interface FileData {
	type: FileType;
	name: string;
	data?: FileData[];
	meta?: string;
}
