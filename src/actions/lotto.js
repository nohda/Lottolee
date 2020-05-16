import * as axios from 'axios';

export let lottoAllList = [];
export function makeLottoList()
{
    
    let i=0;
    for (let i = 0; i < 200; i++) {
        const url = 'f' + (i+1);
        // axios.get(url).then((res)=>{
        //     lottoAllList.push(res.data);
        // })
    }
}

export function checkCorrectCount(userLottoNumbers,lottoNumbers)
{
    let correctCnt=0;
    for(let i=0;i<userLottoNumbers.length;i++)
    {
        const userLottoNumber = userLottoNumbers[i];
        if(lottoNumbers.indexOf(userLottoNumber) !== -1){
            correctCnt++;
        }
    }
    return correctCnt;
}

export function checkCorrectBouns(userLottoNumbers,bonusNumber)
{
    let isCorrectBouns = false;
    if(userLottoNumbers.indexOf(bonusNumber) !== -1)
    {
        isCorrectBouns = true;
    }
    return isCorrectBouns;
}

export function checkResult(correctCnt,isCorrectBouns)
{
    let result;
    if(correctCnt === 6)
    {
        return 1;
    }
    else if(correctCnt === 5 && isCorrectBouns === true)
    {
        return 2;
    }
    else if(correctCnt === 5 && isCorrectBouns === false)
    {
        return 3;
    }
}
