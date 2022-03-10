const obj = [
    {
        name: 'Diana',
        born: 1373925600000, // Mon, Jul 15 2013
        num: 4,
        sex: 'female'
    },
    {

        name: 'Beyonce',
        born: 1366832953000, // Wed, Apr 24 2013
        num: 2,
        sex: 'female'
    },
    {            
        name: 'Albert',
        born: 1370288700000, // Mon, Jun 3 2013
        num: 3,
        sex: 'male'
    },    
    {
        name: 'Doris',
        born: 1354412087000, // Sat, Dec 1 2012
        num: 1,
        sex: 'female'
    }
]

const sort = () =>{
    obj.sort(function(a, b){
        return a.name-b.name
    })
}
console.log(obj);
const Test = () =>{
    return (
        <>
        {
            obj.map((obj)=><div>{obj.name}</div>)
        }
        <button onClick={sort}>Sort</button>
        </>
    )
}

export default Test;