### state만 jsx에서 바뀐값으로 보인다



1. 이 경우는 버튼을 클릭해도 test 변수는 증가하나 실시간으로 증가한 값을 볼수 없다
``` javascript
export default function()
{
    const test =0;
    const handleLetClicked = () => {
        test++;    
    }
    return(
        <div>
        {test}
            <Button onClick={() => {handleLetClicked()}}>Let</Button>
        </div>
    )
}

```

2. 이 경우는 버튼 클릭 시 test 값이 증가한걸로 표현된다.
``` javascript
export default function()
{
    const [test,setTest] = useState(0);

    const handleLetClicked = () => {
        setTest(++test);
    }
    return(
        <div>
        {test}
            <Button onClick={() => {handleLetClicked()}}>Let</Button>
        </div>
    )
}

```

### function 내에서 함수 생성 시

``` javascript
export default function(){
    const handleLetClicked = () => {
        setUserLottoNumber(getUserLottoNumber());
    }

}
```