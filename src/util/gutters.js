function createFullGutters(t, r, b, l) {
    return {
        marginTop: t,
        marginRight: r,
        marginBottom: b,
        marginLeft: l
    }
}

function createGutters(v, h) {
    return createFullGutters(v, h, v, h);
}

function createGutterStyles(gutterSize) {
    return {
        gutterVertical: createGutters(gutterSize, 0),
        gutterHorizontal: createGutters(0, gutterSize),
        gutterTop: createFullGutters(gutterSize, 0, 0, 0),
        gutterRight: createFullGutters(0, gutterSize, 0, 0),
        gutterBottom: createFullGutters(0, 0, gutterSize, 0),
        gutterLeft: createFullGutters(0, 0, 0, gutterSize)
    }
}

const gutters = {
    createFullGutters,
    createGutters,
    createGutterStyles
}

export default gutters;