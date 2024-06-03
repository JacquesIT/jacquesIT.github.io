export function getHighestIdOfDataSet(data){
    let highestId = -1
    data.forEach(element => {
        if(element.id > highestId) highestId = element.id
    });
    return highestId;
}