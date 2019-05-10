const menus = [
    { id: 'main01', title: '새로운 포스트잇', action: 'addPostIt', group: 'main' },
    { id: 'main02', title: '전체 삭제', action: 'deleteAllPostIt', group: 'main' },
    { id: 'postIt01', title: '글자 크기 변경', action: 'changePostItFontSize', group: 'postIt' },
    { id: 'postIt02', title: '글자 색상 변경', action: 'changePostItFontColor', group: 'postIt' },
    { id: 'postIt03', title: '배경 색상 변경', action: 'changePostItBackGroundColor', group: 'postIt' },
    { id: 'postIt04', title: '펼치기', action: 'expandPostIt', group: 'postIt-expand' },
    { id: 'postIt05', title: '접기', action: 'collapsePostIt', group: 'postIt-collapse' },
    { id: 'postIt06', title: '삭제 하기', action: 'deletePostIt', group: 'postIt' }
]

export default menus