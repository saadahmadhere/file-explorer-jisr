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

	const renderFiles = (data: FileData[], level: number = 0) => {
		return data.map((item) => (
			<div key={item.name} style={{ paddingLeft: `${level * 10}px` }}>
				{item.type === 'folder' ? (
					<div>
						<div onClick={() => toggleFolder(item.name)}>
							{expandedFolders.includes(item.name) ? '📂' : '📁'} {item.name}
						</div>
						{expandedFolders.includes(item.name) &&
							item.data &&
							renderFiles(item.data, level + 1)}
					</div>
				) : (
					`📄${item.name}`
				)}
			</div>
		));
	};

	return <div>{renderFiles([Files])}</div>;
};

export default FileExplorer;
