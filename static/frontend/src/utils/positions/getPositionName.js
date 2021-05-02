export function getPositionName(positions, id) {
    for (let i = 0; i < positions.length; i++) {
        if (id === positions[i]['id']) {
            return positions[i]['position_name']
        }
    }
}