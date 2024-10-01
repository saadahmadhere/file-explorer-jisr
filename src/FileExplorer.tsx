import React from 'react';
import { FileData } from './types';
import { Files } from './fileData';

const FileExplorer: React.FC = () => {
	const renderFiles = (data: FileData[]) => {
		return data.map((item) => (
			<div>{item.type === 'folder' ? `📂${item.name}` : `📄${item.name}`}</div>
		));
	};

	return <div>{renderFiles([Files])}</div>;
};

export default FileExplorer;
