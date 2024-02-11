async function fetchDataAndBinarySearch() {
    const response = await fetch("data-mappe/ddo_fullforms_2023-10-11.csv");
    const text = await response.text();
    const globalArrayOfWords = populateList(text);

    console.log("Array length:", globalArrayOfWords.length);

  /*   // Define reference word
    const referenceObject = {
        variant: "hestetyvs",
        headword: "hestetyv",
        homograph: undefined,
        partofspeech: "sb.",
        id: 53001170
    }; */

    // Binary search
    const index = binarySearch("hejsa", globalArrayOfWords, compare);
    console.log("Index: ", index);

    const specificWord = globalArrayOfWords.findIndex(wordObject => wordObject.variant === "retsstaten");
    console.log(`At what index position is "retsstaten":  ${specificWord}`);

    // Check maximum needed iterations
    const maxIterations = Math.ceil(Math.log2(globalArrayOfWords.length));
    console.log("Max iterations required:", maxIterations);
}

function populateList(text) {
    return globalArrayOfWords = text.split("\n").map(line => {
        const parts = line.split("\t");
        return {
            variant: parts[0],
            headword: parts[1],
            homograph: parts[2],
            partofspeech: parts[3],
            id: parts[4]
        };
    });
}

    // This function will return:   
    // a negative value if word comes before referenceObject.variant,
    // 0 if they are the same, and
    // a positive value if word comes after referenceObject.variant.
  function compare(word, referenceObject) {
        return word.localeCompare(referenceObject.variant);
    }
    
    function binarySearch(value, array, compare) {
        let start = 0;
        let end = array.length - 1;
        let iterations = 0;
    
        while (start <= end) {
            const middle = Math.floor((start + end) / 2);
            const comparison = compare(value, array[middle].variant);
    
            if (comparison === 0) {
                return middle; // Found the word, return its index
            } else if (comparison < 0) {
                end = middle - 1; // Update end index
            } else {
                start = middle + 1; // Update start index
            }
    
            iterations++;
        }
    
        console.log("Number of iterations: ", iterations);
        return -1; // Element not found
    }

fetchDataAndBinarySearch(); // Call the async function to start execution