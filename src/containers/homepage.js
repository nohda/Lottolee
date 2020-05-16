import React, { useState } from 'react'
import {getUserLottoNumbers} from '../actions/random'
import '../css/common.css'
import Button from '@material-ui/core/Button';
import {checkCorrectCount,checkCorrectBouns,checkResult,makeLottoList,lottoAllList} from '../actions/lotto'
export default function()
{
    // makeLottoList();
    console.log('test');
    // let userLottoNumbers =  getuserLottoNumbers();
    const [userLottoNumbers,setuserLottoNumbers] = useState(getUserLottoNumbers());
    

    const handleLetClicked = () => {
        let userLottoNumbers = getUserLottoNumbers();
        setuserLottoNumbers(userLottoNumbers);
        // getAllNumbers();
        // let result = checkCorrectCount([1,2,3,4,5,6],[1,11,3,4,8,9]);
        let result = checkResult(5,false);
        console.log(lottoAllList);
        
    }
    const getBallColorClassName = (number) => {
        if(number <= 10)
        {
            return "ball_645 lrg ball1"
        }
        else if(number <= 20)
        {
            return "ball_645 lrg ball2"
        }
        else if(number <= 30)
        {
            return "ball_645 lrg ball3"
        }
        else if(number <= 40)
        {
            return "ball_645 lrg ball4"
        }
        else if(number <= 45)
        {
            return "ball_645 lrg ball5"
        }
    }
    return(
        <div>
            <p>
								<span className={getBallColorClassName(userLottoNumbers[0])}>{userLottoNumbers[0]}</span>
								<span className={getBallColorClassName(userLottoNumbers[1])}>{userLottoNumbers[1]}</span>
			 					<span className={getBallColorClassName(userLottoNumbers[2])}>{userLottoNumbers[2]}</span>
								<span className={getBallColorClassName(userLottoNumbers[3])}>{userLottoNumbers[3]}</span>
								<span className={getBallColorClassName(userLottoNumbers[4])}>{userLottoNumbers[4]}</span>
								<span className={getBallColorClassName(userLottoNumbers[5])}>{userLottoNumbers[5]}</span>
             </p>
            <Button variant="contained" color="primary" onClick={() => {handleLetClicked()}}>Let</Button>
        </div>
    );
}