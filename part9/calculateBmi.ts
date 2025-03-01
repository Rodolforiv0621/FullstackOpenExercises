let num1: number;
let num2: number;
if (process.argv.length == 4){
    num1 = Number(process.argv[2]);
    num2 = Number(process.argv[3]);
}else{
    num1 = 180;
    num2 = 74;
}

const calculateBmi = (weight: number, height: number): string => {
    const squareHeight: number = height*height;
    const bmi: number = weight/squareHeight * 703;

    if (bmi < 18.5){
        return 'Underweight';
    }else if(bmi < 25){
        return "Normal range";
    }else if(bmi < 30){
        return 'Overweight';
    }else if(bmi < 35){
        return "Obese";
    }else{
        return "Extremely Obese";
    }
};

if(require.main === module){
    console.log(calculateBmi(num1, num2));
}

export {calculateBmi};