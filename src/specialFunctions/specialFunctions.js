import distance from '@turf/distance'


export const gettingDistance = (from, to) => {
    // let to = [-75.534, 39.123];
    let options = { units: "kilometers" };
    let distanceOfPoints = distance(from, to, options);
    return distanceOfPoints.toLocaleString();
};

export const trimmedResult = (placename) => {
    let trimmedString = placename.substring(0, 55);
    return trimmedString + "...";
};