import {generateEmbeddings} from "./index.js"
import {readFileSync} from "fs"

let embedContents = readFileSync('myEmbedding.json','utf-8')

embedContents = JSON.parse(embedContents);

let suggetion =await generateEmbeddings("Intrests of akash");
suggetion = suggetion.embeddings[0].values;
// console.log(animal);

let similarity = embedContents.map((item) => {
    const datavector = Object.values(item)[0];
    return datavector.map((value, index) => {
        return value * suggetion[index]
    }).reduce((acc, curr) => acc + curr, 0);
})
console.log(similarity);
similarity = similarity.map((value, index) => {
    // console.log(`Similarity of animal with ${Object.keys(embedContents[index])[0]} is ${value}`);
    return {
        [Object.keys(embedContents[index])[0]] : value
    }
});
similarity.sort((a,b) => {
    const aValue = Object.values(a)[0];
    const bValue = Object.values(b)[0];
    return bValue - aValue;
});
console.log("Similarity Scores in descending order:", similarity[0]);
// const data = panda.map((value, index) => {
//   return value * tiger[index]
// }).reduce((acc, curr) => acc + curr, 0);

// console.log(data);
