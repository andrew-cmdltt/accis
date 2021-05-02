export function getSortedValues(isAsc, currentValues, id) {
    if (isAsc) {
        currentValues = currentValues.sort(function(obj1, obj2) {
            switch (id) {
                case 'nuserkey':
                    return obj1.nuserkey-obj2.nuserkey;
                case 'test_id':
                    return obj1.test_id-obj2.test_id;
                case 'nkey':
                    return obj1.nkey-obj2.nkey;
                case 'nelementkey':
                    return obj1.nelementkey-obj2.nelementkey;
                case 'id':
                    return obj1.id-obj2.id;
                case "result":
                    return obj1.maxballs-obj2.maxballs;
                default:
                    return obj1.nuserkey-obj2.nuserkey;
            }
        });
    } else {
        currentValues = currentValues.sort(function(obj1, obj2) {
            switch (id) {
                case 'test_id':
                    return obj2.test_id-obj1.test_id;
                case 'nuserkey':
                    return obj2.nuserkey-obj1.nuserkey;
                case 'nkey':
                    return obj2.nkey-obj1.nkey;
                case 'nelementkey':
                    return obj2.nelementkey-obj1.nelementkey;
                case 'id':
                    return obj2.id-obj1.id
                case "result":
                    return obj2.maxballs-obj1.maxballs;
                default:
                    return obj2.nuserkey-obj1.nuserkey;
            }
        });
    }
    return currentValues
}