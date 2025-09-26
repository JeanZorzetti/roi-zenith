// Utility to export current boards data from localStorage
// Run this in browser console: exportBoardsData()

export const exportBoardsData = () => {
  const boardsData = localStorage.getItem('kanban-boards');

  if (!boardsData) {
    console.log('❌ No boards found in localStorage');
    return null;
  }

  const boards = JSON.parse(boardsData);

  console.log('📋 Found boards in localStorage:');
  boards.forEach((board: any, index: number) => {
    console.log(`${index + 1}. ID: ${board.id} | Title: "${board.title}" | Tasks: ${board.columns?.reduce((acc: number, col: any) => acc + (col.tasks?.length || 0), 0) || 0}`);
  });

  console.log('\n📤 Full boards data:');
  console.log(JSON.stringify(boards, null, 2));

  // Also copy to clipboard if available
  if (navigator.clipboard) {
    navigator.clipboard.writeText(JSON.stringify(boards, null, 2));
    console.log('📋 Data copied to clipboard!');
  }

  return boards;
};

// Make it globally available
(window as any).exportBoardsData = exportBoardsData;