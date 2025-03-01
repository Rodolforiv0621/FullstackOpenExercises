let inputArr;
let inputTarget;
if(process.argv.length > 3){
    inputArr = process.argv.slice(3,process.argv.length).map(num => Number(num));
    if (inputArr.filter(num => isNaN(num)).length !== 0){
        console.log("Invalid input: all arguments must be numbers");
        process.exit(1);
    }
    inputTarget = Number(process.argv[2]);
}else{
    inputArr = [3, 0, 2, 4.5, 0, 3, 1];
    inputTarget = 2;
}

interface results {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (arr: number[], target: number): results =>{
    const periodLength = arr.length;
    const trainingDays = arr.filter(num => num > 0).length;
    const sum = arr.reduce((num, add) => num + add, 0);
    const average = sum/periodLength;
    const success = average >= target ? true : false;
    const grade = average/target;
    let rating;
    let ratingDescription;
    if (grade < .5){
        rating = 1;
        ratingDescription = 'needs to be better';
    }else if(grade < 1){
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }else{
        rating = 3;
        ratingDescription = 'your doing great';
    }
    
    const result = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
    return result;
};

if (require.main === module){
    console.log(calculateExercises(inputArr, inputTarget));
}


export {calculateExercises};