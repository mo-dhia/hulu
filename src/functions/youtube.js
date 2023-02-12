export const hideYtBorderAlgo = (setYtCamouflagePosition, n) => {
    const x = 1629;
    const y = -12;
    setYtCamouflagePosition(((x - n) / 50) - y)
}

export const overviewSlicer = (overview) => {
    if (overview.length > 190) {
        return overview.slice(0, 190) + "..."
    }
    else {
        return overview
    }
}