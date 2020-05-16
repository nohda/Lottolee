function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export function getUserLottoNumbers()
{
    let randomNumbers = [];
    while(1)
    {
        let randomNumber = getRandomInt(1,46);
        if(randomNumbers.indexOf(randomNumber) === -1){
            randomNumbers.push(randomNumber);
        }

        if(randomNumbers.length===6)
        {
            break;
        }
    }
    // 오름차순
    randomNumbers.sort(function(a, b) { 
        return a - b;
    });
    
    return randomNumbers;
}