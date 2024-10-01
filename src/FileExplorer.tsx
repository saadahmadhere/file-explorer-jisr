import React, { useState } from 'react';
import { FileData } from './types';
import { Files } from './fileData';

const FileExplorer: React.FC = () => {
	const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

	const toggleFolder = (folderName: string) => {
		if (expandedFolders.includes(folderName)) {
			setExpandedFolders(expandedFolders.filter((name) => name !== folderName));
		} else {
			setExpandedFolders([...expandedFolders, folderName]);
		}
	};
	const renderFiles = (data: FileData[]) => {
		return data.map((item) => (
			<div>
				{item.type === 'folder' ? (
					<>
						<div onClick={() => toggleFolder(item.name)}>
							{expandedFolders.includes(item.name) ? '📂' : '📁'} {item.name}
						</div>
						{expandedFolders.includes(item.name) &&
							item.data &&
							renderFiles(item.data)}
					</>
				) : (
					`📄${item.name}`
				)}
			</div>
		));
	};

	return <div>{renderFiles([Files])}</div>;
};

export default FileExplorer;
