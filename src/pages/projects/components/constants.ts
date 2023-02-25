export const propsProjectBlockView = {
    row: {
        gutter: [24, 24],
        justify: 'start'
    },
    col: {
        xl: 5,
        xxl: 4,
    },
    newProject: {},
    project: {}, 
    projectButton: {}, 
};

export const propsProjectGridView = {
    row: {
        gutter: [0, 16],
    },
    col: {
        span: 24
    },
    newProject: { fullWidth: true, block: true },
    project: { fullWidth: true }, 
    projectButton: { fullWidth: true, block: true }, 
};

export const propsFolderBlockView = {
    row: {
        gutter: [24, 24],
        justify: 'start'
    },
    col: {
        xl: 8,
        xxl: 8,
    },
    folderButton: { block: true },
    newFolder: {}, 
};

export const propsFolderGridView = {
    row: {
        gutter: [0, 16],
    },
    col: {
        span: 24
    },
    folderButton: { fullWidth: true, block: true },
    newFolder: { fullWidth: true, block: true }, 
};
