function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function add(numbers) {
    if (!numbers) {
        return 0;
    }

    let delimiter = /,|\n/; 

    if (numbers.startsWith("//")) {
        const parts = numbers.split("\n", 2);
        const customDelimiter = parts[0].substring(2);

        if (customDelimiter.startsWith('[') && customDelimiter.endsWith(']')) {
            const delimiters = customDelimiter.slice(1, -1).split('][').map(escapeRegExp).join('|');
            delimiter = new RegExp(delimiters);
        } else {
            delimiter = new RegExp(escapeRegExp(customDelimiter));
        }
        numbers = parts[1];
    }

    const numArray = numbers.split(delimiter).map(Number);
    const negatives = numArray.filter(n => n < 0);
    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed ${negatives.join(",")}`);
    }

    return numArray.filter(num => num <= 1000).reduce((sum, num) => sum + num, 0);
}

module.exports = add;
