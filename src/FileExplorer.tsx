import React, { useState } from 'react';
import { FileData } from './types';
import { Files } from './fileData';

const FileExplorer: React.FC = () => {
	const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
	const [popupFile, setPopupFile] = useState<string | null>(null);

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
		setIsPopupOpen(false);
	};

	const handleRightClick = (event: React.MouseEvent, fileName: string) => {
		event.preventDefault();
		setIsPopupOpen(true);
		setPopupFile(fileName);
	};

	const handlePopupAction = (action: string) => {
		if (popupFile) {
			console.log(`${action} action chosen for ${popupFile}`);
		}
		setIsPopupOpen(false);
		setSelectedFile(null);
	};

	const renderFiles = (data: FileData[], level: number = 0) => {
		return data.map((item) => (
			<div key={item.name} style={{ paddingLeft: `${level * 10}px` }}>
				{item.type === 'folder' ? (
					<div className='folder'>
						<div onClick={() => toggleFolder(item.name)}>
							{expandedFolders.includes(item.name) ? '📂' : '📁'} {item.name}
						</div>
						{expandedFolders.includes(item.name) &&
							item.data &&
							renderFiles(item.data, level + 1)}
					</div>
				) : (
					<>
						<div
							className='file'
							onClick={() => handleLeftClick(item.name)}
							onContextMenu={(e) => {
								handleRightClick(e, item.name);
							}}
							style={{
								backgroundColor:
									selectedFile === item.name ? 'lightblue' : 'transparent',
							}}
						>
							📄{item.name}
						</div>
						{isPopupOpen && popupFile === item.name && (
							<div className='context-menu'>
								<div
									className='context-menu-item'
									onClick={() => handlePopupAction('copy')}
								>
									Copy
								</div>
								<div
									className='context-menu-item'
									onClick={() => handlePopupAction('delete')}
								>
									Delete
								</div>
								<div
									className='context-menu-item'
									onClick={() => handlePopupAction('rename')}
								>
									Rename
								</div>
							</div>
						)}
					</>
				)}
			</div>
		));
	};

	return <div>{renderFiles([Files])}</div>;
};

export default FileExplorer;
