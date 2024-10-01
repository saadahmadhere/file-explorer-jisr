import React, { useState } from 'react';
import { FileData } from './types';
import { Files } from './fileData';

const FileExplorer: React.FC = () => {
	const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);

	const toggleFolder = (folderName: string) => {
		setSelectedFile(null);
		if (expandedFolders.includes(folderName)) {
			setExpandedFolders(expandedFolders.filter((name) => name !== folderName));
		} else {
			setExpandedFolders([...expandedFolders, folderName]);
		}
	};

	const handleLeftClick = (fileName: string) => {
		setSelectedFile(fileName);
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
					<div
						onClick={() => handleLeftClick(item.name)}
						style={{
							backgroundColor:
								selectedFile === item.name ? 'lightblue' : 'transparent',
						}}
					>
						📄{item.name}
					</div>
				)}
			</div>
		));
	};

	return <div>{renderFiles([Files])}</div>;
};

export default FileExplorer;
